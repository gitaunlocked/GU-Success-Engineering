import { getMongoDb } from '../utils/mongo'
import { promises as fs } from 'node:fs'
import path from 'node:path'

// Coerce every field to a trimmed, length-capped string (prevents NoSQL
// operator injection — we never let an object/array reach a Mongo document).
const str = (v, max = 500) => {
  const s = (typeof v === 'string' ? v : v == null ? '' : String(v)).trim()
  return s.length > max ? s.slice(0, max) : s
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SPECIALIZATIONS = ['DSA with C++', 'Data Analysis', 'Machine Learning']

// Access codes that unlock free registration -> college.
// Keep in sync with data/innerProgramming.js (couponColleges).
const COUPON_COLLEGES = {
  GUWAHATI2026: 'IIT Guwahati',
  IITG2026: 'IIT Guwahati',
  IITBHU2026: 'IIT BHU',
  IITPKD2026: 'IIT Palakkad',
  IITJODH2026: 'IIT Jodhpur',
  IITROPAR2026: 'IIT Ropar',
  IITJAMMU2026: 'IIT Jammu',
  IITBHILAI2026: 'IIT Bhilai',
  MNITJAIPUR2026: 'MNIT Jaipur',
}

// Collection name is intentionally "guwahati…" so these registrations are
// stored separately from every other event's data.
const COLLECTION = () =>
  (process.env.MONGODB_GUWAHATI_COLLECTION || 'guwahatiInnerProgramming').trim()

// Local fallback file — lets the form work in dev even without a MongoDB URI.
const FALLBACK_FILE = path.resolve(
  process.cwd(),
  'server/data/guwahati-inner-programming.json',
)

async function saveToFallback(record) {
  await fs.mkdir(path.dirname(FALLBACK_FILE), { recursive: true })
  let existing = []
  try {
    existing = JSON.parse(await fs.readFile(FALLBACK_FILE, 'utf8'))
    if (!Array.isArray(existing)) existing = []
  } catch {
    /* file doesn't exist yet */
  }
  if (existing.some((r) => r.email === record.email)) {
    return { duplicate: true }
  }
  existing.push(record)
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(existing, null, 2), 'utf8')
  return { duplicate: false }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const reg = {
    name: str(body?.name, 120),
    email: str(body?.email, 200).toLowerCase(),
    phone: str(body?.phone, 20),
    whatsapp: str(body?.whatsapp, 20),
    college: str(body?.college, 200),
    branch: str(body?.branch, 120),
    year: str(body?.year, 40),
    track: str(body?.track, 60),
    reason: str(body?.reason, 1000),
    couponCode: str(body?.couponCode, 40).toUpperCase(),
  }

  // ---- Server-side validation (never trust the client) ----
  const missing = ['name', 'college', 'branch', 'year'].filter((k) => !reg[k])
  if (missing.length) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill all required fields.' })
  }
  if (!EMAIL_RE.test(reg.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' })
  }
  if (reg.phone.replace(/\D/g, '').length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid phone number.' })
  }
  if (reg.whatsapp.replace(/\D/g, '').length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid WhatsApp number.' })
  }
  if (reg.track && !SPECIALIZATIONS.includes(reg.track)) {
    throw createError({ statusCode: 400, statusMessage: 'Please choose a valid technical specialization.' })
  }

  // Access code is mandatory and must be valid — it unlocks free registration.
  const couponCollege = COUPON_COLLEGES[reg.couponCode]
  if (!couponCollege) {
    throw createError({ statusCode: 400, statusMessage: 'A valid access code is required to register.' })
  }

  const record = {
    ...reg,
    couponCollege,
    fee: 0,
    event: 'inner-programming-workshop',
    source: 'guwahati',
    createdAt: new Date().toISOString(),
  }

  // Treat a placeholder connection string (still containing <...> or xxxxx)
  // as "not configured" so we skip a guaranteed-to-fail DNS lookup.
  const uri = (process.env.MONGODB_URI || '').trim()
  const hasRealUri = uri && !/[<>]|xxxxx/.test(uri)

  // Prefer MongoDB; fall back to a local JSON file when no URI is configured
  // (or the DB is unreachable) so registrations are never silently lost in dev.
  if (hasRealUri) {
    try {
      const db = await getMongoDb()
      const collection = db.collection(COLLECTION())
      await collection.createIndex({ email: 1 }, { unique: true }).catch(() => {})

      const existing = await collection.findOne({ email: reg.email }, { projection: { _id: 1 } })
      if (existing) return { success: false, duplicate: true }

      await collection.insertOne({ ...record, createdAt: new Date() })
      return { success: true, storedIn: 'mongodb' }
    } catch (err) {
      if (err?.code === 11000) return { success: false, duplicate: true }
      console.error('inner-programming-register (mongo) error:', err?.message || err)
      // fall through to local storage rather than losing the registration
    }
  }

  try {
    const { duplicate } = await saveToFallback(record)
    if (duplicate) return { success: false, duplicate: true }
    return { success: true, storedIn: 'local-file' }
  } catch (err) {
    console.error('inner-programming-register (file) error:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not save your registration. Please try again shortly.',
    })
  }
})
