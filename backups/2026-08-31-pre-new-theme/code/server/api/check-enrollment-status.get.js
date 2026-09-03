import { getAdminDb } from '../utils/firebase-admin'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { enrollmentId } = query

  if (!enrollmentId) {
    throw createError({ statusCode: 400, statusMessage: 'enrollmentId is required' })
  }

  try {
    const db = getAdminDb()
    const enrollmentDoc = await db.collection('enrollments').doc(enrollmentId).get()

    if (!enrollmentDoc.exists) {
      throw createError({ statusCode: 404, statusMessage: 'Enrollment not found' })
    }

    const enrollment = enrollmentDoc.data()

    return {
      status: enrollment.status,
      razorpayPaymentId: enrollment.razorpayPaymentId || null
    }
  } catch (err) {
    if (err.statusCode) throw err

    console.error('Check enrollment status error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check enrollment status'
    })
  }
})
