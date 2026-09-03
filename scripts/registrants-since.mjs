// Exports registrants who signed up after a given IST moment, with just the
// columns needed for outreach. Read-only.
//
//   node scripts/registrants-since.mjs --since "2026-08-08 14:00" --out recent.csv
import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import { registrationsCollectionName } from '../data/registrations.js';

config();

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};

const sinceArg = flag('--since');
const outFile = flag('--out') || 'registrants-recent.csv';

if (!sinceArg) {
  console.error('\n  usage: --since "2026-08-08 14:00" [--out file.csv]   (time is IST)\n');
  process.exit(1);
}

// Interpret the argument as IST regardless of the machine's timezone.
const since = new Date(`${sinceArg.replace(' ', 'T')}:00+05:30`.replace(/:00:00\+/, ':00+'));
if (Number.isNaN(since.getTime())) {
  console.error(`\n  could not parse --since "${sinceArg}"\n`);
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'gitaunlocked';
const collName = registrationsCollectionName();

if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();

const all = await client.db(dbName).collection(collName).find({}).sort({ createdAt: 1 }).toArray();
const rows = all.filter((r) => r.createdAt && new Date(r.createdAt).getTime() >= since.getTime());

const ist = (d) =>
  new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

const cols = [
  ['Name', (r) => r.name],
  ['Phone', (r) => r.phone || r.whatsapp],
  ['Email', (r) => r.email],
  ['College', (r) => r.college || r.institute],
  ['Branch', (r) => r.branch],
];

const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const csv = [
  cols.map(([h]) => esc(h)).join(','),
  ...rows.map((r) => cols.map(([, get]) => esc(get(r))).join(',')),
].join('\r\n');

// BOM so Excel reads it as UTF-8.
writeFileSync(outFile, '\uFEFF' + csv, 'utf-8');

console.log(`\nsince ${ist(since)} IST`);
console.log(`${rows.length} of ${all.length} registrants -> ${outFile}\n`);
console.table(
  rows.map((r, i) => ({
    '#': i + 1,
    Name: r.name || '',
    Phone: r.phone || '',
    Email: r.email || '',
    College: r.college || '',
    Branch: r.branch || '',
  }))
);

await client.close();
