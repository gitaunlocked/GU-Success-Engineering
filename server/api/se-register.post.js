import { getMongoDb } from '../utils/mongo'
import { sendRegistrationEmails } from '../utils/registration-emails'

// Coerce every field to a trimmed string (prevents NoSQL operator injection —
// we never let an object/array reach a Mongo query or document).
const str = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v)).trim()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const reg = {
    name: str(body?.name),
    college: str(body?.college),
    branch: str(body?.branch),
    year: str(body?.year),
    email: str(body?.email).toLowerCase(),
    phone: str(body?.phone),
    whatsapp: str(body?.whatsapp),
    city: str(body?.city),
    reason: str(body?.reason),
    couponCode: str(body?.couponCode),
  }

  // ---- Server-side validation (never trust the client) ----
  const missing = ['name', 'college', 'branch', 'year', 'city'].filter((k) => !reg[k])
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

  try {
    const db = await getMongoDb()
    const collectionName = (process.env.MONGODB_COLLECTION || 'seRegistrations').trim()
    const collection = db.collection(collectionName)

    // Ensure a unique index on email so duplicates are impossible at the DB level.
    await collection.createIndex({ email: 1 }, { unique: true }).catch(() => {})

    // Pre-check for a friendly duplicate response.
    const existing = await collection.findOne({ email: reg.email }, { projection: { _id: 1 } })
    if (existing) {
      return { success: false, duplicate: true }
    }

    await collection.insertOne({
      ...reg,
      event: 'success-engineering',
      source: 'landing',
      createdAt: new Date(),
    })

    // Best-effort emails — never block a successful registration.
    const mail = await sendRegistrationEmails(reg)

    return { success: true, emailed: mail.emailed }
  } catch (err) {
    // Unique-index race => treat as duplicate.
    if (err?.code === 11000) {
      return { success: false, duplicate: true }
    }
    console.error('se-register error:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not save your registration. Please try again shortly.',
    })
  }
})
