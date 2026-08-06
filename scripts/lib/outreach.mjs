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

export const posterFileFor = (code) => `posters/se-2026-${posterSlug(code)}.png`

export const posterPathFor = (code) =>
  resolve(process.cwd(), 'public', posterFileFor(code))

export const hasPoster = (code) => existsSync(posterPathFor(code))

const read = (file) => {
  const path = resolve(process.cwd(), file)
  if (!existsSync(path)) throw new Error(`missing template: ${path}`)
  return readFileSync(path, 'utf-8')
}

// Rewrites the master template for one college: the six links that carry the
// access code, and the poster URL. Throws rather than returning a half-rewritten
// email, since a wrong code on the poster is worse than no email at all.
export const renderForCode = (code) => {
  if (!couponColleges[code]) throw new Error(`unknown access code: ${code}`)

  let html = read(MASTER_HTML)
  let text = read(MASTER_TEXT)

  if (!html.includes(TEMPLATE_CODE)) {
    throw new Error(`${MASTER_HTML} no longer contains ${TEMPLATE_CODE}`)
  }

  const fromPoster = posterFileFor(TEMPLATE_CODE)
  if (!html.includes(fromPoster)) {
    throw new Error(`${MASTER_HTML} no longer references ${fromPoster}`)
  }

  if (code !== TEMPLATE_CODE) {
    html = html.replaceAll(fromPoster, posterFileFor(code))
    html = html.replaceAll(TEMPLATE_CODE, code)
    text = text.replaceAll(TEMPLATE_CODE, code)
  }

  const leftovers = code === TEMPLATE_CODE ? 0 : html.split(TEMPLATE_CODE).length - 1
  if (leftovers) throw new Error(`${leftovers} ${TEMPLATE_CODE} references survived the rewrite`)

  return { html, text, college: couponColleges[code] }
}
