# CLAUDE.md — TeslaBlox

This file orients any Claude session working in this repo. The full build spec lives in
`tesla_riley_shyaka.md` — treat it as the source of truth for content, tone, and requirements.
This file adds project-specific facts discovered while inspecting the actual assets, plus
conventions to keep the build consistent across sessions.

## What this project is

A static-first Next.js personal website for a child, Tesla Riley Shyaka (age 8, Primary 3,
Uganda/family in Kabale + Tokyo). Digital scrapbook / portfolio / family memory book. Not a SaaS
product — no backend, no accounts, no analytics, no public comments/chat/contact form.

## Current repo state

- Git repo initialized on `main`. Next.js app scaffolded via `create-next-app` (App Router,
  TypeScript, Tailwind, ESLint, `src/` dir, `@/*` import alias, npm).
- Node v26.3.0, npm 11.16.0 available. No exiftool/imagemagick installed — use the `sharp`
  npm package for all image processing (resizing + metadata stripping) instead of shelling out.

## Asset inventory (as of 2026-09-27)

### `photos/` — 39 images + 1 video, flat folder, mixed naming conventions
- Some are opaque UUID filenames (`250b0107-....jpg`) — no semantic info, must categorize
  visually or leave uncategorized. Do not guess.
- Some are descriptive (`tesla_swim.jpeg`, `tesla_all_family.jpg`, `tesla_cousin_martin.jpg`,
  `tesla_daddy.jpeg`, `tesla_graduation.jpg`, `tesla_murchisonfalls.JPG`, `tesla_giraffe.jpeg`,
  `tesla_excited_school.jpg`, etc.) — safe to use the filename as a *weak signal* for category
  tagging (e.g. "swim" → Swimming, "family"/"cousin" → Family) but never invent a caption beyond
  what the filename plausibly supports.
- `tesla_2years_video.mp4` — a video file. **Decided: excluded from this build entirely.** Do not
  reference it from the gallery, manifest, or any page. Revisit only if asked later.
- `tesla_murchisonfalls.JPG` — Murchison Falls is a *different* trip from the Kabale journal.
  **Decided: gallery-only with a neutral caption, no dedicated Adventures/story entry** (no
  journal text exists for it).
- Some filenames name a specific cousin (`tesla_cousin_martin.jpg`) — **"Martin" is not in the
  approved cousins list** in the spec (Leora, Asante, Munashe, Amaani, Simba, Krystal, Tendo).
  Do not add Martin to the Cousins section identity list; the filename alone is not confirmed
  authoritative content, and the spec says not to expose info about cousins beyond what's
  explicitly supplied. Photo can still appear in the gallery with a neutral caption.
- EXIF/GPS: `sips` didn't surface GPS blocks on the samples checked, but do not rely on manual
  spot-checks — the image build pipeline must unconditionally strip all EXIF metadata (via
  `sharp().rotate().withMetadata(false)` or equivalent) when generating the web-optimized copies
  used on the public site, regardless of whether GPS was confirmed present in the source.

### `teslas-trip/` — 11 images, all photographed on 2026-09-21
- **Correction to the spec's assumption**: these are NOT handwritten journal pages. They are
  photographs of a *typed/printed* booklet titled **"Tesla's Memory Book while in Kabale — Made
  by Tesla Riley Shaka"** (11 numbered pages, printed page numbers 2–11 visible plus an
  unnumbered title page). This makes transcription straightforward (text is already legible
  print) rather than true handwriting OCR, but every rule in spec §16/§40 (preserve voice, don't
  invent unclear words, treat this as the authoritative account of the trip) still applies.
- Filenames are random UUIDs with no ordering signal — order was determined by reading the
  printed page numbers in each photo. **Canonical page order** (filename → printed page):

  | Order | Filename | Printed page |
  |---|---|---|
  | 1 | `5DF7367A-2186-46DC-8247-B4C5D8881796.jpg` | title page (unnumbered) |
  | 2 | `4C72D10C-DE19-453B-A72B-5B8CA055596B.jpg` | 2 (Chapter 1 begins) |
  | 3 | `25DA4056-468D-4147-8286-68FF95AEB576.jpg` | 3 |
  | 4 | `A2C0C7F7-81C8-4845-AC4E-EEE8B45DB30D.jpg` | 4 |
  | 5 | `0BFFBE33-9B62-4D88-9DFA-EEFA027B55D2.jpg` | 5 |
  | 6 | `BC0DA54D-212F-47C2-8A09-BB57305F1A92.jpg` | 6 |
  | 7 | `7C5BA684-872F-4C9B-9FE7-C964B4ABE7BA.jpg` | 7 |
  | 8 | `CB92CF04-8D28-4DEC-B5C8-96806A23E80B.jpg` | 8 |
  | 9 | `9E87F002-B7A8-4661-AFA0-74E8B55C00BD.jpg` | 9 |
  | 10 | `98A5E111-3F7D-4910-8AC8-7A381671DFE5.jpg` | 10 |
  | 11 | `7CF093D8-A1BC-4860-94A3-99E189B411B1.jpg` | 11 (closing page) |

- Story covers **27 August 2026 – 9 September 2026** (a trip that already happened relative to
  today, 2026-09-27 — not a future date, just written with the year spelled out).
- The booklet spells the surname **"Shaka"** ("Tesla Riley Shaka" / "TESLA SHAKA RILEY"), while
  the spec's authoritative profile (§5) spells it **"Shyaka"**. Public site should use the
  spec's authoritative spelling ("Shyaka") everywhere *except* when directly quoting/showing the
  original booklet images, where his own spelling should be left untouched since it's his
  authentic voice/artifact.
- People named in the journal who are **not** in the spec's approved family/cousins list:
  grandmother (called "Kaaka" — a Runyankore/Rukiga term), grandfather (called "Shwenkuru"),
  "Patience" (lives in the household during the trip — relationship not stated, do not guess
  "cousin" or "sister"), friends "Lea" and "Ayebare", a girl "Whitney" and "her cousin Alvin"
  (Alvin is stated as Whitney's cousin, not Tesla's), aunt "Pretty" (explicitly called "tesla's
  aunt" in the text, so that label is safe to use in the trip story), and a wedding couple "Drake
  and Abia". Per spec §40, the printed source is authoritative for the trip story — these names
  may appear *within the Kabale trip narrative* exactly as Tesla wrote them, but must not be
  merged into the site's general "Cousins" section (limited to the 7 approved names) or given an
  invented relationship label anywhere else on the site.
- Full page-by-page raw transcription and cleanup notes: see `internal-notes/kabale-trip.md`
  (private working file — not page content for the public site, just the working transcript).

## Privacy rules (non-negotiable, from spec §4/§42)

- Full exact DOB must never appear in this file or anywhere else that's tracked by git or ships
  to the browser/public metadata — see `private/dob.md` (gitignored, not tracked) if you need it
  for internal reference. Public copy says "Born in 2017" or omits birth year entirely.
- No GPS/EXIF exposed in shipped images. No school name/location. No home address. No exact
  current location. No public comments/chat/contact form. No child accounts. No unnecessary
  analytics/tracking.

## Tech stack (decided)

- Next.js (App Router) + TypeScript + React + Tailwind CSS, scaffolded with `create-next-app`.
- **Static export**, deployment target host unspecified/non-Vercel: `next.config.ts` must use
  `output: 'export'` and `images.unoptimized: true` (static export can't use the Next image
  optimization API) — responsive sizes are pre-generated at build time via `sharp` instead, and
  served as `next/image` with `unoptimized` or plain `<img>`.
- `sharp` (build-time only) for image optimization + metadata stripping. Keep runtime JS
  minimal; avoid heavy animation/carousel libraries — prefer CSS transitions + small hand-rolled
  components, respecting `prefers-reduced-motion`.
- Package manager: npm (only one available/installed in this environment).

## Planned structure

```
src/
  app/                (routes: home, about, favorites, adventures, adventures/kabale,
                        gallery, dreams, nikola-tesla, fun-zone)
  components/
  data/
    tesla.ts           public profile (birthYear only, no exact DOB)
    family.ts          parents + cousins (approved list only)
    favorites.ts        interests/characters/song
    trip-kabale.ts      cleaned transcription, chapter-split, timeline
    nikola-tesla.ts
    quiz.ts
    facts.ts
  lib/                 photo discovery/categorization helpers, image manifest
  styles/
private/               DOB and any non-public facts (gitignored)
internal-notes/         working notes, OCR/transcription uncertainty log (gitignored, not built)
photos/                 source images (gitignored from web bundle; processed copies generated
                        into public/ at build time)
teslas-trip/            source journal photos (same treatment)
```

## Content rules

- Never invent achievements, awards, friends, locations, quotes, or favorite foods/teams beyond
  what spec or the Kabale booklet actually state.
- Dreams section: present Tesla's YouTube dream and Dad's scientist hope as equally valid, end
  with the "maybe both" twist. Never declare one better.
- Nikola Tesla content: accurate, simple, no exaggerated claims ("invented electricity" etc.).
- Tone: warm, simple, child-friendly. Avoid corporate words (exceptional, extraordinary, genius,
  prodigy) and avoid exaggeration.

## How to extend later

- New adventure = new entry in a trips data file + a photo subfolder; should not require
  touching unrelated pages (component built once, data-driven).
- New photos just get dropped into `photos/`; gallery discovery is automatic, no manual manifest
  editing required (build a manifest-generation step, not a hand-maintained list).

## Decisions locked in (2026-09-27)

- **Deployment**: static export, hosted on **GitHub Pages** via `.github/workflows/deploy.yml`
  (builds on every push to `main`, deploys `out/` through GitHub's official Pages Actions).
  Next.js config uses `output: 'export'`, `images.unoptimized: true`.
- **Video** (`photos/tesla_2years_video.mp4`): left out of this build entirely.
- **Murchison Falls photo** (`tesla_murchisonfalls.JPG`): gallery-only with a neutral caption, no
  dedicated Adventures/story entry.
- **Git**: initialized at project root from the start of scaffolding, branch `main`.
- Name spelling: use spec's authoritative "Shyaka" in all site-authored copy; the booklet's own
  "Shaka" spelling is left untouched only where the scanned journal images/byline are shown.
- Package manager: npm.

## Decisions locked in (2026-09-27, later same day)

- **Site name/brand**: "TeslaBlox" (was "Tesla's World" during initial scaffolding) — brand text
  in the navbar, footer, hero headline, and every page `<title>` was updated accordingly. This
  is a display/brand name only; Tesla's own name/data (`src/data/tesla.ts`) is unchanged.
- **Hosting**: GitHub Pages, presumed repo name `teslablox` (the workflow reads the actual repo
  name at build time via `${{ github.event.repository.name }}`, so it self-adjusts if the repo
  is named differently).
- **GitHub Pages basePath**: project-page hosting serves from `/<repo-name>/`, not the domain
  root, so `next.config.ts` reads `NEXT_PUBLIC_BASE_PATH` (set by the workflow) for
  `basePath`/`assetPrefix`. The gallery/lightbox render plain `<img>` tags built from the photo
  manifest rather than `next/link`/`next/image`, so they don't get Next's automatic basePath
  rewriting — `src/lib/photos.ts`'s `srcSet()`/`largestSrc()` prepend it by hand. If this ever
  moves to a custom domain or a `<user>.github.io` root repo, delete the `NEXT_PUBLIC_BASE_PATH`
  line from the workflow and both env reads become a no-op.
- YouTube favorite card now links to a specific channel
  (`https://www.youtube.com/@MargaretTuryahebwa`) rather than the generic youtube.com homepage —
  confirmed live, appears to be real family video content. Update `src/data/favorites.ts` if this
  should change again.

## Decisions locked in (2026-10-05)

- **Homepage hero**: rotates between 3 curated solo (no-one-else-in-frame) photos of Tesla every
  5s, with click-to-jump dot indicators, via `HeroPhotoRotator.tsx` + `src/data/hero-photos.ts`
  (just an ordered list of manifest photo ids — update that list to swap a photo in/out). Auto-
  rotation is skipped entirely under `prefers-reduced-motion`.
- **Fun Zone expanded**: added Memory Match (emoji-pairs matching game, reuses the Favorites
  emojis) and Word Scramble (unscramble approved facts/interests as single words) alongside the
  existing quiz/random fact/random photo. Both are intentionally "lightweight interactions" per
  spec §22, not full game engines. Quiz grew from 6 to 12 questions, pulling in newly-supplied
  facts (Liverpool FC, favorite country Japan, birth month, auntie Carol, Temple Run, favorite
  car brand).
- **Important gotcha — no `Math.random()` in a client component's render path.** Static export
  prerenders "use client" components to HTML at build time, then hydrates in the browser; if
  render output depends on `Math.random()` (or anything non-deterministic), the server-rendered
  HTML and the client's first render disagree and React throws a hydration-mismatch error (hit
  this with the Quiz answer-shuffle and Word Scramble/Memory Match). Fix pattern used throughout:
  `src/lib/seeded-random.ts`'s `seededShuffle()` — a pure function of a seed (e.g. derived from
  `step`/`round` state, which IS identical on server and client) instead of true randomness.
  `Math.random()` remains fine inside event handlers (`onClick` etc.) since those only ever run
  client-side, and in a `useEffect`/post-mount `useState` setter for content that isn't visible
  until some other interaction reveals it (e.g. Memory Match's initial deck order — all cards
  render face-down identically regardless of what's underneath, so no mismatch is possible there).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
