import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

let adminDb = null

export const getAdminDb = () => {
  if (adminDb) return adminDb

  let serviceAccount

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  } else {
    const filePath = resolve(process.cwd(), 'service-account.json')
    if (!existsSync(filePath)) {
      throw new Error(
        'Firebase Admin: No credentials found. Set FIREBASE_SERVICE_ACCOUNT env var or place service-account.json in the project root.'
      )
    }
    serviceAccount = JSON.parse(readFileSync(filePath, 'utf-8'))
  }

  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.firebasestorage.app`

  const app = getApps().length === 0
    ? initializeApp({ credential: cert(serviceAccount), storageBucket })
    : getApp()

  adminDb = getFirestore(app)
  return adminDb
}
