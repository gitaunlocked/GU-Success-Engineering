// Reads the Success Engineering registrations and prints them as a table plus
// a CSV. Read-only: it never writes to the database.
import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
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
const db = client.db(dbName);

const rows = await db.collection(collName).find({}).sort({ createdAt: 1 }).toArray();

console.log(`collection: ${dbName}.${collName}`);
console.log(`total registrants: ${rows.length}\n`);

if (rows.length) {
  const fmt = (d) =>
    d ? new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) : '';

  console.table(
    rows.map((r, i) => ({
      '#': i + 1,
      Name: r.name || '',
      College: r.college || r.institute || '',
      Code: r.couponCode || r.code || '',
      Email: r.email || '',
      Phone: r.phone || '',
      Year: r.year || '',
      Course: r.course || '',
      Registered: fmt(r.createdAt),
    }))
  );

  const cols = [
    ['#', (r, i) => i + 1],
    ['Name', (r) => r.name],
    ['College', (r) => r.college || r.institute],
    ['Access Code', (r) => r.couponCode || r.code],
    ['Email', (r) => r.email],
    ['Phone', (r) => r.phone],
    ['WhatsApp', (r) => r.whatsapp],
    ['Year', (r) => r.year],
    ['Course', (r) => r.course],
    ['Gender', (r) => r.gender],
    ['Registered (IST)', (r) => fmt(r.createdAt)],
  ];

  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [
    cols.map(([h]) => esc(h)).join(','),
    ...rows.map((r, i) => cols.map(([, get]) => esc(get(r, i))).join(',')),
  ].join('\r\n');

  // The BOM is what makes Excel read the file as UTF-8 instead of mangling
  // any non-ASCII name.
  writeFileSync('registrants.csv', '\uFEFF' + csv, 'utf-8');
  console.log('\nCSV written to registrants.csv');

  const byCollege = rows.reduce((acc, r) => {
    const k = r.college || r.couponCode || 'Unknown';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  console.log('\nBy college:');
  for (const [k, v] of Object.entries(byCollege).sort((a, b) => b[1] - a[1])) console.log(`  ${v}\t${k}`);
}

await client.close();
