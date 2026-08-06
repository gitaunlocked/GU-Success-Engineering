# Per-college outreach emails

Generated files — **don't edit them here.** Edit the master template at
`emails/college-outreach.html` / `.txt`, then rebuild:

```bash
npm run emails:build                # every college that has a poster
npm run emails:build -- NITC26_SE   # just one
```

Each `<CODE>.html` / `<CODE>.txt` pair is the master template with that college's
access code substituted into all six links and into the poster URL.

## Adding a college

A college is only built once its poster exists at:

```
public/posters/se-2026-<slug>.png
```

where `<slug>` is the access code minus the `26_SE` suffix, lowercased —
`NITC26_SE` becomes `se-2026-nitc.png`.

The build skips any college whose poster is missing, and lists what it needs.
This is deliberate: every poster prints its own access code in a "USE CODE"
badge, so reusing another college's artwork would show the reader a code that
isn't theirs.

## Sending

```bash
npm run outreach -- --code NITC26_SE --to a@nitc.ac.in          # dry run
npm run outreach -- --code NITC26_SE --file list.txt --send
```

The sender prefers the file in this folder when it exists, so what goes out is
the copy that was reviewed rather than a fresh rewrite.
