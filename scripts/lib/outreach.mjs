// Shared between scripts/build-college-emails.mjs and scripts/send-outreach.mjs
// so the per-college rewrite rules and poster naming live in one place.
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

import { couponColleges } from '../../data/successEngineering.js'

export { couponColleges }

export const MASTER_HTML = 'emails/college-outreach.html'
export const MASTER_TEXT = 'emails/college-outreach.txt'
export const GENERATED_DIR = 'emails/colleges'

// The master template is written against IIT Kanpur; every other college is
// produced by rewriting this code and the matching poster.
export const TEMPLATE_CODE = 'IITK26_SE'

// IITJ26_SE is a retired alias still honoured at registration, but it points at
// the same college as IITJMU26_SE. Generating both would produce two emails for
// IIT Jammu, so the alias is skipped when building the set.
export const LEGACY_CODES = new Set(['IITJ26_SE'])

export const activeCodes = () =>
  Object.keys(couponColleges).filter((c) => !LEGACY_CODES.has(c))

// IITK26_SE -> iitk, NITC26_SE -> nitc. Each college's poster carries its own
// access code in a "USE CODE" badge, so they are not interchangeable.
export const posterSlug = (code) => code.replace(/26_SE$/, '').toLowerCase()

// Posters arrive in whatever format the designer exported, so any of these is
// accepted. PNG is listed first and is what a missing poster is reported as.
const POSTER_EXTS = ['png', 'jpg', 'jpeg', 'webp']

// Matches a poster reference inside the template regardless of its extension.
// Built fresh on each call because it is global and therefore stateful.
export const posterRef = () => /posters\/se-2026-[a-z]+\.(?:png|jpe?g|webp)/g

export const posterFileFor = (code) => {
  const slug = posterSlug(code)
  const found = POSTER_EXTS.map((ext) => `posters/se-2026-${slug}.${ext}`).find((rel) =>
    existsSync(resolve(process.cwd(), 'public', rel)),
  )
  return found || `posters/se-2026-${slug}.${POSTER_EXTS[0]}`
}

export const posterPathFor = (code) =>
  resolve(process.cwd(), 'public', posterFileFor(code))

export const hasPoster = (code) => existsSync(posterPathFor(code))

const read = (file) => {
  const path = resolve(process.cwd(), file)
  if (!existsSync(path)) throw new Error(`missing template: ${path}`)
  return readFileSync(path, 'utf-8')
}

// Colleges are often reached through a student office bearer who forwards the
// mail to the batch lists. That covering note sits above the email proper,
// divided by a rule, and is deliberately plain: it should read as a line typed
// by a person rather than part of the designed campaign below it.
export const FORWARD_ROLE = 'General Secretary'

const forwardNoteHtml = (role) => {
  const p = 'margin:0 0 14px;font-size:15px;line-height:1.65;color:#33405e'
  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px 12px 0">' +
    `<p style="${p}">Dear ${role},</p>` +
    `<p style="${p}">Please forward this mail to the students list.</p>` +
    `<p style="${p}">Regards,<br>Team Success Engineering</p>` +
    '<hr style="border:none;border-top:1px solid #c9cfdd;margin:24px 0 0">' +
    '</div>'
  )
}

const forwardNoteText = (role) =>
  [
    `Dear ${role},`,
    '',
    'Please forward this mail to the students list.',
    '',
    'Regards,',
    'Team Success Engineering',
    '',
    '-'.repeat(56),
    '',
    '',
  ].join('\n')

// Rewrites the master template for one college: the six links that carry the
// access code, and the poster URL. Throws rather than returning a half-rewritten
// email, since a wrong code on the poster is worse than no email at all.
export const renderForCode = (code, { forward = false, role = FORWARD_ROLE } = {}) => {
  if (!couponColleges[code]) throw new Error(`unknown access code: ${code}`)

  let html = read(MASTER_HTML)
  let text = read(MASTER_TEXT)

  // Only the code inside a registration link is the reader's own. The template
  // also prints IITK26_SE in the table of every institution's code, and that
  // row belongs to Kanpur no matter who is reading, so it is left alone.
  const linkToken = `code=${TEMPLATE_CODE}`

  if (!html.includes(linkToken)) {
    throw new Error(`${MASTER_HTML} no longer contains ${linkToken} links`)
  }

  if (!posterRef().test(html)) {
    throw new Error(`${MASTER_HTML} no longer references a posters/se-2026-*.* image`)
  }

  // Always rewritten, even for the template's own college: the poster may have
  // been re-exported in a different format since the master was written.
  html = html.replace(posterRef(), posterFileFor(code))

  if (code !== TEMPLATE_CODE) {
    html = html.replaceAll(linkToken, `code=${code}`)
    text = text.replaceAll(linkToken, `code=${code}`)
  }

  const leftovers = code === TEMPLATE_CODE ? 0 : html.split(linkToken).length - 1
  if (leftovers) throw new Error(`${leftovers} ${linkToken} links survived the rewrite`)

  if (forward) {
    // The note goes inside the template's outer wrapper so that pasting the
    // result into Gmail keeps note and email as one body.
    const openWrapper = '<div dir="ltr">'
    if (!html.startsWith(openWrapper)) {
      throw new Error(`${MASTER_HTML} no longer starts with ${openWrapper}; cannot place the forwarding note`)
    }
    html = openWrapper + forwardNoteHtml(role) + html.slice(openWrapper.length)
    text = forwardNoteText(role) + text
  }

  return { html, text, college: couponColleges[code] }
}
