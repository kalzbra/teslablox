# TeslaBlox homework API

A small Cloudflare Worker + D1 (SQLite) database behind the website's `/homework` page, served at
**https://api.teslariley.com**. It holds the homework questions *and answers*, checks the
password, grades every answer, enforces the 15-minute retry cooldown, decides which week is open,
and records every attempt (which is what fills in the public "Daddy's Homework Log").

Nothing secret ships to the browser: questions arrive without answers, and the correct answer +
explanation only come back after Tesla has answered that question.

## Adding a new week of homework

1. Edit `src/weeks.ts` — **append** a new week to the end of `homeworkWeeks` (copy an existing
   one). Give it a unique `id`, an `opensOn` date (`YYYY-MM-DD`, Tokyo time), `questions`,
   `topics`, and optionally `resources` (links shown after the quiz — check each link is real,
   free, and kid-safe first).
2. Deploy: `cd api && npm run deploy`.

A week opens when Tesla has a perfect score on the week before it **and** its `opensOn` date has
arrived. Scores are logged automatically. To add a comment next to a week in the public log, set
`logNote` on that week and redeploy.

## Local development

```bash
cd api
npm install
npm run db:migrate:local   # once, creates the local SQLite DB
npm run dev                # http://localhost:8787 — password comes from api/.dev.vars
```

For the website to talk to the local API, the repo root has a gitignored `.env.local` with
`NEXT_PUBLIC_HOMEWORK_API=http://localhost:8787`. To test a date-gated week, start the Worker with
a fake clock: `npx wrangler dev --var NOW_OVERRIDE:2026-11-01T16:00:00Z`.

## One-time production setup (already done if api.teslariley.com works)

```bash
cd api
npx wrangler login
npx wrangler d1 create teslablox          # paste the database_id into wrangler.toml
npm run db:migrate:remote
npx wrangler secret put HOMEWORK_PASSWORD  # the homework password
npm run deploy                             # also creates the api.teslariley.com DNS record
```

Changing the password later: `npx wrangler secret put HOMEWORK_PASSWORD` again (no redeploy
needed). Devices that remembered the old one will be asked for the new one.

## Looking at the raw data

```bash
npx wrangler d1 execute teslablox --remote --command "SELECT * FROM attempts ORDER BY started_at DESC LIMIT 20"
```

To wipe all progress (e.g. after testing): `--command "DELETE FROM answers; DELETE FROM attempts;"`.
