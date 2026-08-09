#!/usr/bin/env node
//
// Stacks a short covering note above a full email, divided by a rule, and
// writes the combination as one pasteable file.
//
//   node scripts/compose-note-email.mjs \
//     --note emails/organiser-contacts.html \
//     --email emails/colleges/IITK26_SE.html \
//     --out emails/colleges/IITK26_SE-reminder.html
//
// Composed from the sources each time rather than hand-pasted, so editing the
// note or rebuilding the college emails keeps the combined file correct.
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i === -1 ? null : argv[i + 1];
};

const notePath = flag('--note');
const emailPath = flag('--email');
const outPath = flag('--out');

if (!notePath || !emailPath || !outPath) {
  console.error('\n  usage: --note <file> --email <file> --out <file>\n');
  process.exit(1);
}

const read = (p) => {
  const full = resolve(process.cwd(), p);
  if (!existsSync(full)) {
    console.error(`\n  missing file: ${p}\n`);
    process.exit(1);
  }
  return readFileSync(full, 'utf-8');
};

const note = read(notePath);
const email = read(emailPath);

// The campaign email is a 600px card centred on a grey band, so the note is
// dropped into a matching band to keep one column down the whole message.
const banded = (inner) =>
  '<div dir="ltr"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"' +
  ' style="border-collapse:collapse;background:#eef1f8;"><tr><td align="center" style="padding:28px 12px 0;">' +
  '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"' +
  ' style="width:600px;max-width:600px;border-collapse:collapse;"><tr>' +
  // 40px inset matches the campaign card's inner padding so both texts share
  // the same left edge.
  '<td align="left" style="padding:0 40px;">' +
  inner +
  '</td></tr></table></td></tr></table></div>';

const label =
  '<div style="font-family:Arial,Helvetica,sans-serif;padding:26px 0 0;">' +
  '<div style="height:1px;background:#c9cfdd;line-height:1px;font-size:0;">&nbsp;</div>' +
  '<p style="margin:14px 0 0;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;' +
  'color:#8892a8;font-weight:bold;">For your reference — the invitation shared with students</p>' +
  '</div>';

writeFileSync(resolve(process.cwd(), outPath), banded(note + label) + email, 'utf-8');

console.log(`\n  note:  ${notePath}`);
console.log(`  email: ${emailPath}`);
console.log(`  wrote: ${outPath}\n`);
