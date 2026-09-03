import { getMongoDb } from '../utils/mongo'
import {
  computeScores,
  serializeAnswers,
  scoredQuestionIds,
  textQuestionIds,
} from '../utils/humanPotentialScoring'

const MIN_TEXT_LENGTH = 2

const str = (v, max = 1000) => {
  const s = (typeof v === 'string' ? v : v == null ? '' : String(v)).trim()
  return s.length > max ? s.slice(0, max) : s
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const answers = body?.answers

  if (!answers || typeof answers !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid assessment answers.' })
  }

  const name = str(body?.name, 120)
  const phone = str(body?.phone, 20)
  const college = str(body?.college, 200)

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter your name.' })
  }
  if (!college) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter your college.' })
  }
  if (phone.replace(/\D/g, '').length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Please enter a valid phone number.' })
  }

  const missing = scoredQuestionIds.filter((id) => !answers[id]?.optionId)
  if (missing.length) {
    throw createError({ statusCode: 400, statusMessage: 'Please answer all questions.' })
  }

  const reflections = {}
  for (const id of textQuestionIds) {
    const text = str(answers[id]?.text, 2000)
    if (text.length < MIN_TEXT_LENGTH) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Please answer all the short-answer questions.',
      })
    }
    reflections[id] = text
  }

  const scores = computeScores(answers)
  const serialized = serializeAnswers(answers)

  const dimScore = (key) => scores.dimensions.find((d) => d.key === key)?.score

  const record = {
    event: 'success-engineering',
    assessment: 'human-potential',
    session: 'session-2',
    name,
    phone,
    college,
    answers: serialized,
    reflections,
    scores: {
      overall: scores.overall,
      futureReadiness: dimScore('futureReadiness'),
      resilience: dimScore('resilience'),
      problemSolving: dimScore('problemSolving'),
      peopleAndDirection: dimScore('peopleAndDirection'),
    },
    createdAt: new Date(),
  }

  try {
    const db = await getMongoDb()
    const collection = db.collection(
      (process.env.MONGODB_HP_ASSESSMENT_COLLECTION || 'seHumanPotentialResponses').trim(),
    )
    await collection.insertOne(record)
  } catch (err) {
    console.error('human-potential-submit error:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not save your assessment. Please try again shortly.',
    })
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
