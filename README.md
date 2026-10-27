# TeslaBlox ⚡

A personal website for Tesla Riley Shyaka — adventures, family, favorites, dreams, and a photo
gallery. Built with Next.js (App Router), TypeScript, and Tailwind CSS, and exported as a static
site (no backend, no database, no accounts).

The full content/behavior spec is in `tesla_riley_shyaka.md`. `CLAUDE.md` has build notes,
decisions, and asset-inventory context for anyone (human or AI) picking this project back up.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The first run (and every `npm run dev` /
`npm run build`) automatically processes the source photos before starting — see below.

## How photos work

Source photos live in two folders that are **not** served directly:

- `photos/` — Tesla's general photo collection.
- `teslas-trip/` — the photographed pages of Tesla's printed Kabale memory book.

`scripts/process-images.mjs` reads both folders, strips **all** metadata (EXIF/GPS included),
generates a few responsive WebP sizes per image, and writes the result to `public/photos/`,
`public/trip/`, and a manifest at `src/data/generated/photo-manifest.json`. Nothing in
`public/photos`, `public/trip`, or `src/data/generated` should be hand-edited — it's all
regenerated automatically by:

```bash
npm run images   # or just run `npm run dev` / `npm run build`, which do this for you
```

### Adding new photos

Drop a `.jpg`/`.jpeg`/`.png`/`.webp` file into `photos/` and rerun the app (or `npm run images`).
It will automatically show up in the gallery. Categorization is a best-effort guess based on
filename keywords (see `CATEGORY_RULES` in `scripts/process-images.mjs`) — add a keyword rule
there if you want a new photo (or type of photo) to land in a specific category, or just let it
fall into the "Everyday Tesla" default bucket.

### Adding a new adventure/trip

1. Add the source photos for the trip to a new folder (following the pattern of
   `teslas-trip/`), and add it + its rule to `EXCLUDED_PHOTOS`/processing logic in
   `scripts/process-images.mjs` (copy the `processTripPages` call for the new folder).
2. Create a new data file under `src/data/` (copy the shape of `src/data/trip-kabale.ts`) with
   the cleaned-up chapters, timeline, and original-page order for the new trip.
3. Add a new route under `src/app/adventures/<trip-name>/page.tsx` (copy
   `src/app/adventures/kabale/page.tsx`) and a card for it on `src/app/adventures/page.tsx`.

No other page needs to change — the Adventures index and homepage preview are data-driven.

### Updating weekly homework

`/homework` is a locked, sequential weekly quiz Tesla's dad maintains by hand. Everything lives
in `src/data/homework.ts` — read the comment at the top of that file before editing it; the
short version:

- `homeworkWeeks` is chronological (oldest first). **Append** a new week to the end with its
  `questions` and `topics` — it unlocks automatically once Tesla gets 100% on the week before it.
- After he takes a week, you can add a `result` (score/date/note) to that entry — that's what
  shows up in the public "Daddy's Homework Log," independent of the automatic unlock tracking.
- The quiz password (`HOMEWORK_PASSWORD`) and retry cooldown (`RETRY_COOLDOWN_MINUTES`) are also
  config constants at the top of that file.

The unlock progress itself is tracked client-side (localStorage) on whichever device Tesla
actually uses — it won't sync across devices without a real backend. See `CLAUDE.md` for the
full architecture notes if something needs debugging.

## Content rules worth knowing

- Every fact on this site comes from `tesla_riley_shyaka.md` or from Tesla's own Kabale memory
  book (see `internal-notes/kabale-trip.md` for the full raw transcription). Nothing is invented
  — please keep it that way when adding content.
- Tesla's exact date of birth is intentionally never in the public site or in any tracked file —
  see `private/dob.md` (gitignored) and the privacy notes in `CLAUDE.md`.
- `private/` and `internal-notes/` are gitignored on purpose and should stay that way.

## Build & deploy

```bash
npm run build   # outputs a fully static site to ./out
```

`next.config.ts` uses `output: "export"` with `images.unoptimized: true`, so `out/` can be
served by any static host (no Node server required).

### Hosting on GitHub Pages

`.github/workflows/deploy.yml` builds and deploys the site automatically on every push to
`main`, via GitHub's official Pages Actions — nothing to run by hand after the one-time setup
below.

1. Create the GitHub repo (skip if it already exists) and push this project to it:
   ```bash
   git remote add origin https://github.com/<your-username>/teslablox.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**. (One-time;
   GitHub won't auto-detect the workflow as the Pages source otherwise.)
3. Push to `main` (or re-run the workflow from the **Actions** tab) — the site publishes to
   `https://<your-username>.github.io/teslablox/`.

The site is served from a custom domain (**teslariley.com**, DNS on Cloudflare) at the root, not
a `/teslablox/` subpath, so the workflow does **not** set `NEXT_PUBLIC_BASE_PATH` — if this ever
moves back to bare `<username>.github.io/teslablox/` hosting without a custom domain, re-add
`env: { NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }} }` to the build step in
`.github/workflows/deploy.yml` (see `next.config.ts` and `src/lib/photos.ts` for where it's
consumed).

Custom domain DNS (already set up): four `A` records on `@` pointing at GitHub Pages'
IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), a `CNAME` on `www` pointing at
`kalzbra.github.io`, all set to **DNS only** (not proxied) in Cloudflare, plus the custom domain
entered under the repo's **Settings → Pages**.
