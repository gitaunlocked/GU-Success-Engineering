#!/usr/bin/env node
//
// Writes a ready-to-send copy of the outreach email for each college into
// emails/colleges/, rewritten from emails/college-outreach.{html,txt}.
//
//   npm run emails:build              # every college that has a poster
//   npm run emails:build -- IITK26_SE # just one
//
// Colleges whose poster is missing are skipped: each poster carries its own
// access code in a "USE CODE" badge, so sending another college's artwork would
// print the wrong code for the reader.
//
import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

import {
  activeCodes,
  couponColleges,
  hasPoster,
  posterFileFor,
  renderForCode,
  GENERATED_DIR,
  TEMPLATE_CODE,
} from './lib/outreach.mjs'

const args = process.argv.slice(2).map((a) => a.trim().toUpperCase()).filter(Boolean)

const requested = args.length ? args : activeCodes()
const unknown = requested.filter((c) => !couponColleges[c])
if (unknown.length) {
  console.error(`\n  unknown access code(s): ${unknown.join(', ')}`)
  console.error(`  valid: ${activeCodes().join(', ')}\n`)
  process.exit(1)
}

const outDir = resolve(process.cwd(), GENERATED_DIR)
mkdirSync(outDir, { recursive: true })

const written = []
const skipped = []

for (const code of requested) {
  if (!hasPoster(code)) {
    skipped.push({ code, college: couponColleges[code], need: posterFileFor(code) })
    continue
  }
  const { html, text, college } = renderForCode(code)
  writeFileSync(resolve(outDir, `${code}.html`), html, 'utf-8')
  writeFileSync(resolve(outDir, `${code}.txt`), text, 'utf-8')
  written.push({ code, college })
}

console.log(`\n  master template: emails/college-outreach.html (written for ${TEMPLATE_CODE})`)
console.log(`  output:          ${GENERATED_DIR}/\n`)

if (written.length) {
  console.log(`  built ${written.length}:`)
  for (const w of written) console.log(`    ${w.code.padEnd(12)} ${w.college}`)
}

if (skipped.length) {
  console.log(`\n  skipped ${skipped.length} — no poster yet:`)
  for (const s of skipped) console.log(`    ${s.code.padEnd(12)} ${s.college.padEnd(22)} needs public/${s.need}`)
  console.log(`\n  Each poster shows its own access code, so these can't reuse another college's.`)
}

console.log()
