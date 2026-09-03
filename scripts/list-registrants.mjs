// Reads the Success Engineering registrations and prints them as a table plus
// a CSV. Read-only: it never writes to the database.
//
//   node scripts/list-registrants.mjs
//   node scripts/list-registrants.mjs --exclude IITK26_SE --out non-iitk.csv
//   node scripts/list-registrants.mjs --only "IIT BHU"
//
// --exclude and --only match either the college name or the access code, so
// "IIT Kanpur" and "IITK26_SE" select the same people. Both are repeatable.
import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import { registrationsCollectionName } from '../data/registrations.js';

config();

const argv = process.argv.slice(2);
const flagValues = (name) =>
  argv.reduce((acc, a, i) => (a === name && argv[i + 1] ? [...acc, argv[i + 1]] : acc), []);

const excludes = flagValues('--exclude').map((v) => v.toLowerCase());
const onlys = flagValues('--only').map((v) => v.toLowerCase());
const outFile = flagValues('--out')[0] || 'registrants.csv';

const keysOf = (r) => [r.college, r.institute, r.couponCode, r.code].filter(Boolean).map((v) => String(v).toLowerCase());
const matches = (r, list) => keysOf(r).some((k) => list.includes(k));

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'gitaunlocked';
const collName = registrationsCollectionName();

if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);

const all = await db.collection(collName).find({}).sort({ createdAt: 1 }).toArray();

const rows = all.filter(
  (r) => (!onlys.length || matches(r, onlys)) && (!excludes.length || !matches(r, excludes))
);

console.log(`collection: ${dbName}.${collName}`);
if (onlys.length) console.log(`only:    ${onlys.join(', ')}`);
if (excludes.length) console.log(`exclude: ${excludes.join(', ')}`);
console.log(`registrants: ${rows.length}${rows.length !== all.length ? ` of ${all.length}` : ''}\n`);

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
    // Free-text on the form, so expect anything from "CSE" to a stray word.
    ['Branch', (r) => r.branch],
    ['Gender', (r) => r.gender],
    ['City', (r) => r.city],
    ['Registered (IST)', (r) => fmt(r.createdAt)],
  ];

  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [
    cols.map(([h]) => esc(h)).join(','),
    ...rows.map((r, i) => cols.map(([, get]) => esc(get(r, i))).join(',')),
  ].join('\r\n');

  // The BOM is what makes Excel read the file as UTF-8 instead of mangling
  // any non-ASCII name.
  writeFileSync(outFile, '\uFEFF' + csv, 'utf-8');
  console.log(`\nCSV written to ${outFile}`);

  const byCollege = rows.reduce((acc, r) => {
    const k = r.college || r.couponCode || 'Unknown';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  console.log('\nBy college:');
  for (const [k, v] of Object.entries(byCollege).sort((a, b) => b[1] - a[1])) console.log(`  ${v}\t${k}`);
}

await client.close();
