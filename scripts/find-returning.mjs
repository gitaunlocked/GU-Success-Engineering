// Cross-matches the 2026 Success Engineering registrations against every other
// registration collection in the database to find people who signed up before.
// Read-only.
//
//   node scripts/find-returning.mjs
//
// Matching is deliberately generous — email, any phone number, and a
// normalised name — because a returning student may re-register with a
// personal address or a differently spelled name.
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'gitaunlocked';
const currentName = process.env.MONGODB_SE_2026_COLLECTION || 'successEngineering2026';

if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const email = (v) => String(v ?? '').trim().toLowerCase() || null;
// Indian numbers turn up as 98..., +9198..., 098..., and with spaces or dashes.
const phone = (v) => {
  const d = String(v ?? '').replace(/\D/g, '');
  const last10 = d.slice(-10);
  return last10.length === 10 ? last10 : null;
};
// Collapse case, punctuation, spacing and honorifics so "Dr. A. B. Sharma" and
// "ab sharma" land on the same key.
const name = (v) => {
  const s = String(v ?? '')
    .toLowerCase()
    .replace(/\b(mr|mrs|ms|dr|prof)\.?\s+/g, '')
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  return s.length ? s.sort().join(' ') : null;
};

const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);

const collections = (await db.listCollections().toArray()).map((c) => c.name);
const current = await db.collection(currentName).find({}).sort({ createdAt: 1 }).toArray();

// Anything that looks like a registration list, other than the current one.
const priorNames = collections.filter(
  (n) => n !== currentName && /registration|registrant|success|se[A-Z]|programme|program|inner/i.test(n)
);

console.log(`\ncurrent:  ${currentName} (${current.length})`);
console.log(`scanning: ${priorNames.join(', ') || '(none found)'}\n`);

const prior = [];
for (const n of priorNames) {
  const docs = await db.collection(n).find({}).toArray();
  console.log(`  ${String(docs.length).padStart(5)}  ${n}`);
  for (const d of docs) prior.push({ ...d, __from: n });
}

// Index the older records by every identifier they expose.
const byEmail = new Map();
const byPhone = new Map();
const byName = new Map();
const push = (map, key, doc) => {
  if (!key) return;
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(doc);
};

for (const d of prior) {
  push(byEmail, email(d.email), d);
  for (const p of [d.phone, d.whatsapp, d.mobile, d.contact]) push(byPhone, phone(p), d);
  push(byName, name(d.name || d.fullName), d);
}

const hits = [];
for (const r of current) {
  const reasons = new Map(); // prior doc -> list of matching fields

  const add = (doc, why) => {
    const k = String(doc._id);
    if (!reasons.has(k)) reasons.set(k, { doc, why: new Set() });
    reasons.get(k).why.add(why);
  };

  for (const d of byEmail.get(email(r.email)) || []) add(d, 'email');
  for (const p of [r.phone, r.whatsapp]) {
    for (const d of byPhone.get(phone(p)) || []) add(d, 'phone');
  }
  for (const d of byName.get(name(r.name)) || []) add(d, 'name');

  if (reasons.size) hits.push({ current: r, matches: [...reasons.values()] });
}

console.log(`\n${'='.repeat(70)}`);
console.log(`returning registrants: ${hits.length} of ${current.length}`);
console.log('='.repeat(70));

const ist = (d) =>
  d ? new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' }) : '—';

for (const { current: r, matches } of hits) {
  console.log(`\n${r.name}  ·  ${r.college || r.couponCode || ''}`);
  console.log(`  now:    ${r.email}  ${r.phone || ''}   (${ist(r.createdAt)})`);
  for (const { doc, why } of matches) {
    console.log(
      `  before: ${doc.email || '—'}  ${doc.phone || doc.whatsapp || ''}   ` +
        `[${doc.__from}${doc.college ? ` · ${doc.college}` : ''}] (${ist(doc.createdAt)})`
    );
    console.log(`          name on file: ${doc.name || '—'}   matched on: ${[...why].join(' + ')}`);
  }
}

if (!hits.length) console.log('\nNo overlap found on email, phone or name.\n');

// Same person appearing twice inside the current list — a different question,
// but it comes up whenever the returning-student one is asked.
console.log(`\n${'='.repeat(70)}`);
console.log('duplicates within the current list');
console.log('='.repeat(70));

for (const [field, key] of [
  ['email', (r) => email(r.email)],
  ['phone', (r) => phone(r.phone) || phone(r.whatsapp)],
  ['name', (r) => name(r.name)],
]) {
  const groups = new Map();
  for (const r of current) {
    const k = key(r);
    if (!k) continue;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(r);
  }
  const dupes = [...groups.entries()].filter(([, v]) => v.length > 1);
  console.log(`\nby ${field}: ${dupes.length} repeated`);
  for (const [k, v] of dupes) {
    console.log(`  ${k}`);
    for (const r of v) console.log(`    ${r.name}  ${r.email}  ${r.phone}  ${r.college || ''}`);
  }
}

await client.close();
