import { readMultipartFormData } from 'h3'
import { randomUUID } from 'crypto'
import { getAdminDb } from '../utils/firebase-admin'
import { getStorage } from 'firebase-admin/storage'
import { getApp } from 'firebase-admin/app'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)

  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const file = files.find(f => f.name === 'image')
  if (!file || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'No image field found' })
  }

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Allowed: png, jpg, webp, svg, gif' })
  }

  if (file.data.length > 5 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: 'File too large. Max 5MB.' })
  }

  try {
    getAdminDb()

    const ext = file.filename?.split('.').pop() || 'png'
    const filename = `courses/${randomUUID()}.${ext}`

    const bucket = getStorage(getApp()).bucket()
    const fileRef = bucket.file(filename)

    await fileRef.save(file.data, {
      metadata: { contentType: file.type }
    })

    await fileRef.makePublic()

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`

    return { url: publicUrl }
  } catch (err) {
    console.error('Upload error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image. Please try again.'
    })
  }
})
