import { MongoClient } from 'mongodb'

// Reuse a single connection across requests (and across hot-reloads in dev /
// invocations in serverless) instead of opening a new one every time.
let clientPromise = null

// Trim stray whitespace / carriage returns (.env files saved with CRLF line
// endings otherwise leave a trailing "\r" on every value).
const clean = (v) => (typeof v === 'string' ? v.trim() : v)

export const getMongoDb = async () => {
  const uri = clean(process.env.MONGODB_URI)
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add your MongoDB connection string to .env')
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    })
    clientPromise = client.connect()
  }

  const client = await clientPromise
  // Database name comes from MONGODB_DB, otherwise from the URI's default db.
  const dbName = clean(process.env.MONGODB_DB) || undefined
  return client.db(dbName)
}
