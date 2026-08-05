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
    gender: str(body?.gender),
    college: str(body?.college),
    course: str(body?.course),
    branch: str(body?.branch),
    year: str(body?.year),
    email: str(body?.email).toLowerCase(),
    phone: str(body?.phone),
    // The form collects a single contact number (asked for as WhatsApp), so
    // fall back to `phone` when `whatsapp` isn't sent. Keeps the stored
    // document shape consistent with earlier registrations.
    whatsapp: str(body?.whatsapp) || str(body?.phone),
    city: str(body?.city),
    reason: str(body?.reason),
    couponCode: str(body?.couponCode),
  }

  // ---- Server-side validation (never trust the client) ----
  const missing = ['name', 'gender', 'college', 'course', 'branch', 'year', 'city'].filter((k) => !reg[k])
  if (missing.length) {
    throw createError({ statusCode: 400, statusMessage: 'Please fill all required fields.' })
  }
  if (!EMAIL_RE.test(reg.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' })
  }
  if (reg.phone.replace(/\D/g, '').length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid phone number.' })
  }

  try {
    const db = await getMongoDb()
    // Academic Session 2026 registrations are kept in their own collection so
    // the Summer edition's `seRegistrations` stays intact as a historical
    // record, and so a returning student isn't blocked by the unique email
    // index from the earlier edition.
    //
    // Deliberately read from a NEW env var rather than the old generic
    // MONGODB_COLLECTION: that one is still set to `seRegistrations` in the
    // deployed environment and would otherwise keep overriding this default,
    // silently sending 2026 signups to the old collection.
    const collectionName = (process.env.MONGODB_SE_2026_COLLECTION || 'successEngineering2026').trim()
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
      // Tags the edition on the document itself, so records stay
      // self-describing even if collections are ever merged.
      edition: 'academic-session-2026',
      source: 'landing',
      createdAt: new Date(),
    })

    // Best-effort emails — never block a successful registration.
    // Pass the request origin so the poster can be fetched over HTTP on
    // serverless deploys (where public/ isn't on the function's filesystem).
    let baseUrl = ''
    try {
      baseUrl = getRequestURL(event).origin
    } catch {
      /* origin unavailable — loadPoster will fall back to env/filesystem */
    }
    const mail = await sendRegistrationEmails(reg, { baseUrl })

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
