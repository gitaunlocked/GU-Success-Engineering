# Landing page snapshots

Three snapshots of the Success Engineering landing page, oldest first.

| Folder | What it is |
| --- | --- |
| `2026-08-31-pre-new-theme/` | The **live gitaunlocked.com page** as it stood before any redesign — "Building the Human Edge in the Age of AI", 3 sessions. Full source under `code/`, git state under `git/`, and revert instructions in `REVERT.md`. This is the one to restore from. |
| `2026-08-31-new-theme/` | A **rejected** midnight-and-gold editorial redesign ("Navigate College. Explore Opportunities. Build Your Future."). Screenshots only, kept for reference. Not in the codebase any more. |
| `2026-09-02-journey-theme/` | Screenshots of the **current** page — "Making the Most of Your Engineering Journey", second edition, 2 podcasts plus the Success Potential Assessment. Built on the original gradient theme and section flow. |

Only `2026-08-31-pre-new-theme/` contains source code; the other two are visual
records. To revert the site, follow `2026-08-31-pre-new-theme/REVERT.md`.

## Regenerating a screenshot set

```
npm run dev
node scripts/landing-snapshot.mjs --url=http://localhost:3000/ --out=backups/<folder>/screenshots
```

Note the `--out` flag: without it the script writes into
`2026-08-31-pre-new-theme/screenshots` by default and will overwrite the
reference set for the original page.
