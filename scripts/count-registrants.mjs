// College-wise registration counts for the 2026 edition. Read-only.
//
//   node scripts/count-registrants.mjs
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'gitaunlocked';
const collName = process.env.MONGODB_SE_2026_COLLECTION || 'successEngineering2026';

if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();

const rows = await client.db(dbName).collection(collName).find({}).sort({ createdAt: 1 }).toArray();

const ist = (d) =>
  d ? new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) : '—';

const byCollege = new Map();
for (const r of rows) {
  const key = r.college || r.institute || r.couponCode || r.code || 'Unknown';
  const bucket = byCollege.get(key) || { count: 0, code: r.couponCode || r.code || '' };
  bucket.count += 1;
  byCollege.set(key, bucket);
}

const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
const last24h = rows.filter((r) => r.createdAt && new Date(r.createdAt).getTime() >= dayAgo).length;

console.log(`\ncollection:  ${dbName}.${collName}`);
console.log(`total:       ${rows.length}`);
console.log(`last 24h:    ${last24h}`);
console.log(`first:       ${ist(rows[0]?.createdAt)}`);
console.log(`latest:      ${ist(rows[rows.length - 1]?.createdAt)}\n`);

console.table(
  [...byCollege.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([college, { count, code }]) => ({ College: college, Code: code, Registrants: count }))
);

await client.close();
