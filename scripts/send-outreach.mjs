#!/usr/bin/env node
//
// Sends the college outreach email in emails/college-outreach.{html,txt}.
//
//   node scripts/send-outreach.mjs --code IITK26_SE --to a@iitk.ac.in        # dry run
//   node scripts/send-outreach.mjs --code IITK26_SE --file lists/iitk.txt --send
//
// Dry run is the default and --send is the only way to deliver anything: the
// recipients here are real students, so an accidental blast can't be undone.
//
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// The site's canonical list, so a code this script accepts is always a code the
// registration form will honour.
import { couponColleges } from '../data/successEngineering.js'

dotenv.config({ path: resolve(process.cwd(), '.env') })

const clean = (v) => String(v ?? '').trim()

// The template ships with IITK's code baked into its links; --code rewrites it.
const TEMPLATE_CODE = 'IITK26_SE'
const DEFAULT_SUBJECT =
  'Success Engineering 2026 — Building the Human Edge in the Age of AI (Free for {{college}})'

const args = process.argv.slice(2)
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 || i === args.length - 1 ? fallback : args[i + 1]
}
const has = (name) => args.includes(`--${name}`)

const code = clean(flag('code', TEMPLATE_CODE)).toUpperCase()
const live = has('send')
const subjectArg = flag('subject')
const fromArg = clean(flag('from'))
const ccArg = clean(flag('cc'))
// Google throttles bursts and treats them as spam signals, so pace the sends.
const gapMs = Number(flag('gap', '4000'))

const die = (msg) => {
  console.error(`\n  error: ${msg}\n`)
  process.exit(1)
}

const college = couponColleges[code]
if (!college) {
  die(
    `unknown access code "${code}".\n  valid codes: ${Object.keys(couponColleges).join(', ')}`
  )
}

// ---------------------------------------------------------------- recipients

const bareAddress = (entry) => (entry.match(/<([^>]+)>/)?.[1] ?? entry).trim().toLowerCase()

// De-duplicates on the address itself so "Name <a@b.com>" and "a@b.com"
// appearing in two different lists don't produce two emails to one person.
const dedupeAddresses = (entries) => {
  const seen = new Map()
  for (const entry of entries) {
    const addr = bareAddress(entry)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr)) die(`not a valid email: "${entry}"`)
    if (!seen.has(addr)) seen.set(addr, entry)
  }
  return [...seen.values()]
}

const parseRecipients = () => {
  const out = []
  const push = (raw) => {
    const line = raw.split('#')[0].trim()
    if (line) out.push(line)
  }

  clean(flag('to')).split(',').forEach(push)

  const file = flag('file')
  if (file) {
    const path = resolve(process.cwd(), file)
    if (!existsSync(path)) die(`recipient file not found: ${path}`)
    readFileSync(path, 'utf-8').split(/\r?\n/).forEach(push)
  }

  return dedupeAddresses(out)
}

const recipients = parseRecipients()
const ccList = ccArg ? dedupeAddresses(ccArg.split(',').filter((s) => s.trim())) : []
if (!recipients.length) {
  die('no recipients. pass --to a@b.com,c@d.com and/or --file list.txt')
}

// ------------------------------------------------------------------ template

const load = (file) => {
  const path = resolve(process.cwd(), file)
  if (!existsSync(path)) die(`missing template: ${path}`)
  return readFileSync(path, 'utf-8')
}

let html = load('emails/college-outreach.html')
let text = load('emails/college-outreach.txt')

if (code !== TEMPLATE_CODE) {
  const before = html.split(TEMPLATE_CODE).length - 1
  if (!before) die(`template no longer contains ${TEMPLATE_CODE}; links can't be retargeted`)
  html = html.replaceAll(TEMPLATE_CODE, code)
  text = text.replaceAll(TEMPLATE_CODE, code)
}

// Gmail and Outlook hide remote images from unrecognised senders, which would
// drop the poster — the most persuasive part of the email. Attaching it and
// referencing it by cid makes it render on first open instead.
const attachments = []
const posterPath = resolve(process.cwd(), 'public/posters/se-2026-iitk.png')
if (existsSync(posterPath)) {
  attachments.push({
    filename: 'Success-Engineering-2026.png',
    content: readFileSync(posterPath),
    cid: 'sePoster',
  })
  html = html.replace(/src="https?:\/\/[^"]*se-2026-iitk\.png"/g, 'src="cid:sePoster"')
}

const subject = (subjectArg || DEFAULT_SUBJECT).replaceAll('{{college}}', college)

const linkCount = html.split(`code=${code}`).length - 1
const posterMode = attachments.length ? 'inline attachment (cid)' : 'MISSING — no poster found'

const fromHeader = fromArg || clean(process.env.MAIL_FROM) || clean(process.env.SMTP_USER)

console.log(`
  college     ${college}  (${code})
  subject     ${subject}
  from        ${fromHeader || '(unset)'}
  cc          ${ccList.length ? ccList.join(', ') : '(none)'}
  poster      ${posterMode}
  links       ${linkCount} carrying code=${code}
  recipients  ${recipients.length}
  mode        ${live ? 'LIVE — really sending' : 'DRY RUN — nothing will be sent'}
`)
recipients.forEach((r, i) => console.log(`    ${String(i + 1).padStart(3)}. ${r}`))

// Copying the CC on every message would mean N copies in their inbox for an N
// person list, so they're only copied on the first one.
if (ccList.length && recipients.length > 1) {
  console.log(`\n  note: cc applies to the first recipient only (${bareAddress(recipients[0])}).`)
}

if (!live) {
  const out = resolve(process.cwd(), `.outreach-preview-${code}.html`)
  writeFileSync(out, html.replace(/src="cid:sePoster"/g, `src="/posters/se-2026-iitk.png"`))
  console.log(`
  Wrote ${out} for a final look.
  Nothing was sent. Re-run with --send to deliver.
`)
  process.exit(0)
}

// ---------------------------------------------------------------------- send

const SMTP_HOST = clean(process.env.SMTP_HOST)
const SMTP_USER = clean(process.env.SMTP_USER)
const SMTP_PASS = clean(process.env.SMTP_PASS)
if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  die('SMTP_HOST / SMTP_USER / SMTP_PASS must be set in .env before --send')
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(clean(process.env.SMTP_PORT)) || 587,
  secure: clean(process.env.SMTP_SECURE) === 'true',
  auth: { user: SMTP_USER, pass: SMTP_PASS },
})

try {
  await transporter.verify()
  console.log(`  SMTP connection to ${SMTP_HOST} verified.\n`)
} catch (err) {
  die(`SMTP login failed: ${err.message}`)
}

const from = fromHeader || SMTP_USER
const replyTo = clean(process.env.ADMIN_NOTIFY_EMAIL) || from
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let sent = 0
const failures = []

for (const [i, to] of recipients.entries()) {
  try {
    // One message per recipient rather than a shared BCC, so each student sees
    // a normal personal email in their inbox instead of a visible bulk blast.
    const cc = i === 0 && ccList.length ? ccList : undefined
    await transporter.sendMail({ from, to, cc, replyTo, subject, text, html, attachments })
    sent++
    console.log(`  [${i + 1}/${recipients.length}] sent    ${to}`)
  } catch (err) {
    failures.push({ to, error: err.message })
    console.log(`  [${i + 1}/${recipients.length}] FAILED  ${to} — ${err.message}`)
  }
  if (i < recipients.length - 1) await sleep(gapMs)
}

console.log(`\n  done — ${sent} sent, ${failures.length} failed`)
if (failures.length) {
  failures.forEach((f) => console.log(`    ${f.to} — ${f.error}`))
  process.exit(1)
}
