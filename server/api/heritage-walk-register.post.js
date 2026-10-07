import { readMultipartFormData } from 'h3'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { getMongoDb } from '../utils/mongo'
import {
  collegeRegions,
  regionSpot,
  destinationById,
  courseOptions,
  genderOptions,
  yearOptions,
  openQuestions,
} from '~/data/heritageWalk.js'

// Coerce every field to a trimmed, length-capped string (prevents NoSQL
// operator injection — we never let an object/array reach a Mongo document).
const str = (v, max = 500) => {
  const s = (typeof v === 'string' ? v : v == null ? '' : String(v)).trim()
  return s.length > max ? s.slice(0, max) : s
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
// Vercel serverless functions cap request bodies at ~4.5 MB. We keep the
// screenshot itself under 4 MB so the base64-encoded document still fits.
const MAX_FILE_BYTES = 4 * 1024 * 1024

const COLLECTION = () =>
  (process.env.MONGODB_HERITAGE_WALK_COLLECTION || 'heritageWalkRegistrations').trim()

// Local fallback file — keeps registrations working in dev even without a
// MongoDB URI (mirrors refresh-retreat-register).
const FALLBACK_FILE = path.resolve(process.cwd(), 'server/data/heritage-walk.json')

async function saveToFallback(record) {
  await fs.mkdir(path.dirname(FALLBACK_FILE), { recursive: true })
  let existing = []
  try {
    existing = JSON.parse(await fs.readFile(FALLBACK_FILE, 'utf8'))
    if (!Array.isArray(existing)) existing = []
  } catch {
    /* first-time write */
  }
  if (existing.some((r) => r.mobile === record.mobile)) return { duplicate: true }
  existing.push(record)
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(existing, null, 2), 'utf8')
  return { duplicate: false }
}

// Pull a text field out of a multipart body (h3 exposes non-file parts too).
const partText = (parts, name) => {
  const p = parts.find((f) => f.name === name && !f.filename)
  return p?.data ? p.data.toString('utf8') : ''
}

export default defineEventHandler(async (event) => {
  let parts
  try {
    parts = await readMultipartFormData(event)
  } catch (err) {
    console.error('heritage-walk-register (multipart) error:', err?.message || err)
    throw createError({ statusCode: 400, statusMessage: 'Could not read the form data. Please try again.' })
  }
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No form data received.' })
  }

  const reg = {
    fullName: str(partText(parts, 'fullName'), 120),
    mobile: str(partText(parts, 'mobile'), 20),
    gender: str(partText(parts, 'gender'), 40),
    collegeEmail: str(partText(parts, 'collegeEmail'), 160).toLowerCase(),
    college: str(partText(parts, 'college'), 120),
    course: str(partText(parts, 'course'), 60),
    year: str(partText(parts, 'year'), 40),
    branch: str(partText(parts, 'branch'), 120),
    mentor: str(partText(parts, 'mentor'), 120),
    consentAccepted: partText(parts, 'consentAccepted') === 'true',
  }
  // Long-form answers; capped generously rather than at the 500-char default.
  for (const q of openQuestions) {
    reg[q.id] = str(partText(parts, q.id), 4000)
  }

  // ---- Field validation (server-side, never trust the client) ----
  if (!reg.fullName) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter your full name.' })
  }
  if (reg.mobile.replace(/\D/g, '').length !== 10) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid 10-digit mobile number.' })
  }
  if (!genderOptions.includes(reg.gender)) {
    throw createError({ statusCode: 400, statusMessage: 'Please select a gender option from the list.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.collegeEmail)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid college email address.' })
  }
  // The college must be one we actually run a circuit for. Checking against the
  // mapping rather than a separate list means a college can never pass
  // validation and then be allotted no destination.
  if (!collegeRegions[reg.college]) {
    throw createError({ statusCode: 400, statusMessage: 'Please select your college from the list.' })
  }
  if (!courseOptions.includes(reg.course)) {
    throw createError({ statusCode: 400, statusMessage: 'Please select your course from the list.' })
  }
  if (!yearOptions.includes(reg.year)) {
    throw createError({ statusCode: 400, statusMessage: 'Please select your year from the list.' })
  }
  if (!reg.branch) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter your branch.' })
  }
  for (const q of openQuestions) {
    if (reg[q.id].length < q.minLength) {
      throw createError({
        statusCode: 400,
        statusMessage: `Please answer "${q.label}" in at least ${q.minLength} characters.`,
      })
    }
  }
  if (!reg.consentAccepted) {
    throw createError({ statusCode: 400, statusMessage: 'Please accept the participation terms to submit.' })
  }

  // The destination is derived here, not read from the form: the client shows
  // it for confirmation, but a posted value could say anything.
  const destination = destinationById[regionSpot[collegeRegions[reg.college]]]

  // ---- Payment screenshot (required, PNG/JPG/PDF, <= 4 MB) ----
  const file = parts.find((f) => f.name === 'paymentScreenshot' && f.filename)
  if (!file || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'Please upload your payment screenshot.' })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Payment screenshot must be a PNG, JPG or PDF file.' })
  }
  if (file.data.length > MAX_FILE_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Payment screenshot must be under 4 MB.' })
  }

  const record = {
    ...reg,
    destination: destination.name,
    destinationId: destination.id,
    region: collegeRegions[reg.college],
    event: 'success-engineering',
    programme: 'heritage-walk',
    paymentScreenshot: {
      filename: str(file.filename || 'payment-screenshot', 200),
      contentType: str(file.type, 80),
      sizeBytes: file.data.length,
      data: file.data.toString('base64'),
    },
    verified: false,
    createdAt: new Date().toISOString(),
  }

  // Treat a placeholder connection string (still containing <...> or xxxxx)
  // as "not configured" so we skip a guaranteed-to-fail DNS lookup.
  const uri = (process.env.MONGODB_URI || '').trim()
  const hasRealUri = uri && !/[<>]|xxxxx/.test(uri)

  // Prefer MongoDB; fall back to a local JSON file when no URI is configured
  // (or the DB is unreachable) so registrations are never silently lost.
  if (hasRealUri) {
    try {
      const db = await getMongoDb()
      const collection = db.collection(COLLECTION())
      // De-dupe on mobile number — this form doesn't collect an email.
      await collection.createIndex({ mobile: 1 }, { unique: true }).catch(() => {})

      const existing = await collection.findOne({ mobile: reg.mobile }, { projection: { _id: 1 } })
      if (existing) return { success: false, duplicate: true }

      await collection.insertOne({ ...record, createdAt: new Date() })
      return { success: true, destinationId: destination.id, destination: destination.name, storedIn: 'mongodb' }
    } catch (err) {
      if (err?.code === 11000) return { success: false, duplicate: true }
      console.error('heritage-walk-register (mongo) error:', err?.message || err)
      // fall through to local storage rather than losing the registration
    }
  }

  try {
    const { duplicate } = await saveToFallback(record)
    if (duplicate) return { success: false, duplicate: true }
    return { success: true, destinationId: destination.id, destination: destination.name, storedIn: 'local-file' }
  } catch (err) {
    console.error('heritage-walk-register (file) error:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not save your registration. Please try again shortly.',
    })
  }
})
