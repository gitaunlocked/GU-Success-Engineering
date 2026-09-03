# Pre-redesign snapshot — 31 August 2026

Taken immediately before the new theme + new page work began, so the current
gitaunlocked.com landing page can be restored or referenced later.

The live landing page at this point is the Success Engineering event page:
`/` renders `components/success-engineering/Landing.vue` because
`SHOW_SUCCESS_ENGINEERING` is `true` in `config/site.js`. Setting that flag to
`false` swaps in the older Gita Unlocked homepage
(`components/HomePageComponents.vue`), which is also captured here.

## What's in here

| Path | Contents |
| --- | --- |
| `code/` | Copy of every source file that renders the site (140 files, ~1 MB) |
| `screenshots/` | Full-page and per-section PNGs at three widths, plus a PDF |
| `git/` | Commit SHA, working-tree status, and a patch of uncommitted source edits |

`code/` deliberately excludes `node_modules/`, build output, `public/`
(56 MB of images, already tracked in git), and anything holding student data
(`server/data/`, CSV/XLSX exports).

## Screenshots

Captured from `http://localhost:3000/` with `scripts/landing-snapshot.mjs`.

- `desktop-00-above-the-fold.png` / `desktop-full-page.png` — 1440 px wide
- `tablet-00-above-the-fold.png` / `tablet-full-page.png` — 834 px wide, 2x
- `mobile-00-above-the-fold.png` / `mobile-full-page.png` — 390 px wide, 2x
- `section-01-nav` … `section-14-footer` — each section clipped individually at
  1440 px, 2x: nav, hero, what's new, about, why, speakers, impact, gains,
  journey, team, register, faq, contact, footer
- `landing-page.pdf` — whole page, text still selectable

The page reveals most sections with `visibleOnce` motion variants and counts the
"So Far" statistics up on scroll, so the script scrolls the full height before
each capture. Screenshots taken without that step show those sections blank.

To re-capture later and compare against these:

```bash
node scripts/landing-snapshot.mjs --out=/tmp/after
```

## Git state at snapshot time

- Branch: `main`
- HEAD: `3c1193a161d84936ee346a56efed1232b6d7d0e5` — "Narrow Contact Us to the three reachable organisers"
- `git/uncommitted-source.patch` holds the source edits that were not committed
  at this point (the Podcast 2 reminder email). `git/git-status-at-snapshot.txt`
  lists every modified and untracked path.

Nothing was committed, tagged, or pushed while taking this snapshot — the
working tree is exactly as it was.

## How to revert

**Restore only the landing page** (most likely case — the new theme replaced it):

```bash
cp backups/2026-08-31-pre-new-theme/code/components/success-engineering/Landing.vue \
   components/success-engineering/Landing.vue
cp backups/2026-08-31-pre-new-theme/code/data/successEngineering.js data/successEngineering.js
cp backups/2026-08-31-pre-new-theme/code/pages/index.vue pages/index.vue
cp backups/2026-08-31-pre-new-theme/code/layouts/landing.vue layouts/landing.vue
cp backups/2026-08-31-pre-new-theme/code/config/site.js config/site.js
```

**Restore the whole site source**:

```bash
rsync -a backups/2026-08-31-pre-new-theme/code/ ./
```

That overwrites the tracked source directories with the snapshot but leaves
`public/`, `node_modules/`, and data files untouched. Run `git diff` afterwards
to review before keeping it.

**Revert via git instead** (returns to the last commit before the redesign,
including `public/`):

```bash
git checkout 3c1193a -- app.vue nuxt.config.ts tailwind.config.js config layouts \
  assets pages components data server public
```

Then re-apply the uncommitted work if you want it:

```bash
git apply backups/2026-08-31-pre-new-theme/git/uncommitted-source.patch
```
