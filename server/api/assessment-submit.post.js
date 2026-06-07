import { getMongoDb } from '../utils/mongo'
import { computeScores, serializeAnswers } from '../../data/successProfileAssessment.js'

const str = (v, max = 500) => {
  const s = (typeof v === 'string' ? v : v == null ? '' : String(v)).trim()
  return s.length > max ? s.slice(0, max) : s
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const answers = body?.answers

  if (!answers || typeof answers !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid assessment answers.' })
  }

  const required = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8']
  const missing = required.filter((id) => !answers[id]?.optionId)
  if (missing.length) {
    throw createError({ statusCode: 400, statusMessage: 'Please answer all questions.' })
  }

  const name = str(body?.name, 120)
  const email = str(body?.email, 200).toLowerCase()
  const college = str(body?.college, 200)

  if (email && !EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address.' })
  }

  const scores = computeScores(answers)
  const serialized = serializeAnswers(answers)

  const record = {
    event: 'success-engineering',
    assessment: 'success-profile',
    name: name || null,
    email: email || null,
    college: college || null,
    answers: serialized,
    scores: {
      overall: scores.overall,
      aiAdaptability: scores.dimensions.find((d) => d.key === 'aiAdaptability')?.score,
      careerClarity: scores.dimensions.find((d) => d.key === 'careerClarity')?.score,
      growthPotential: scores.dimensions.find((d) => d.key === 'growthPotential')?.score,
      selfAwareness: scores.dimensions.find((d) => d.key === 'selfAwareness')?.score,
    },
    createdAt: new Date(),
  }

  try {
    const db = await getMongoDb()
    const collection = db.collection(
      (process.env.MONGODB_ASSESSMENT_COLLECTION || 'seAssessmentResponses').trim(),
    )
    await collection.insertOne(record)
  } catch (err) {
    console.error('assessment-submit error:', err?.message || err)
    // Still return scores — storage is best-effort for students.
  }

  return {
    success: true,
    scores: {
      overall: scores.overall,
      overallLabel: scores.label,
      dimensions: scores.dimensions,
    },
  }
})
