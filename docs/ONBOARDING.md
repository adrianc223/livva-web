# Onboarding: working on livva-web from a new machine

This is the reference for picking this project back up on a machine that's never touched it before. This repo is deliberately the lighter of the two Livva projects — most of the shared-account/credential setup is identical to the main app's; see `Condo-Admin-Tool/docs/ONBOARDING.md` (sibling repo) for the fuller version of this doc, including its database setup. This file covers what's specific to livva-web.

## The two Livva projects, in short

| | **livva-web** (this repo) | **Condo-Admin-Tool** |
|---|---|---|
| What it is | Public one-page marketing/landing site | The real product — tenant + master dashboards |
| GitHub | `github.com/adrianc223/livva-web` | `github.com/adrianc223/Condo-Admin-Tool` |
| Vercel project | `livva-web` | `livva-admin` |
| Vercel scope | `adrianc223s-projects` (same account for both) | `adrianc223s-projects` |
| Production URL | `https://livva-web.vercel.app` | `https://livva-admin.vercel.app` |
| Database | None | Postgres (Neon), via Prisma |

Both auto-deploy on every push to `main` (Vercel's GitHub integration, already connected — nothing to redo). See CLAUDE.md's "Project overview" for exactly what's ported from the main app (palette, fonts, hero style, logo, pricing tiers) and `Condo-Admin-Tool/docs/ONBOARDING.md` for the full shared/not-shared breakdown.

## What you need before an AI assistant can do what it does here (git commits/pushes, Vercel deploys, env var management)

### 1. Accounts (yours already, nothing to create)
- GitHub account `adrianc223`, with push access to this repo.
- Vercel account `adrianc223` (scope `adrianc223s-projects`), with access to the `livva-web` project.
- A Resend account — only needed to test the contact form's email delivery locally; the site itself (and every other section) works with zero env vars.

### 2. Tools to install
- **Git**.
- **Node.js** — Vercel has this project pinned to Node 24.x; anything reasonably recent (20+) will likely run the dev server fine.
- **npm** (bundled with Node).
- **Vercel CLI**: `npm install -g vercel`.

### 3. One-time interactive logins (the human does these — an AI assistant can't complete an OAuth/browser flow)
- **Git ↔ GitHub**: on Windows, `git config --global credential.helper manager` (Git for Windows' default) — the first `git push`/`git pull` against `github.com/adrianc223/livva-web` pops a browser login; every git operation after that on the same machine (including ones an assistant runs for you) just works.
- **Vercel CLI**: run `vercel login` once. After that, `vercel ls`/`vercel link`/`vercel env add`/`vercel --prod`/`vercel git connect` all run non-interactively — this is exactly what set up this project's env vars and deployed it in the first place, with no password prompts.

### 4. Clone + set up

```bash
git clone https://github.com/adrianc223/livva-web.git
cd livva-web
npm install
vercel link                  # scope "adrianc223s-projects", project "livva-web"
vercel env pull .env.local   # optional — only needed to test the contact form's real email
                              # delivery locally (pulls RESEND_API_KEY/EMAIL_FROM/
                              # LEAD_NOTIFY_EMAIL/APP_URL straight from Vercel)
npm run dev
```

That's it — no database, no Prisma, no required `.env` for the page itself to render and be edited.

### 5. Security notes
- Never commit `.env.local` (already gitignored) and never paste a secret's actual value into chat — `vercel env pull` (read) and `vercel env add` (write, piping the value from a local file so it's never echoed) are the safe paths, and are exactly what was used to configure this project's Resend/site-URL env vars.
- If an assistant finds itself not logged in to `vercel`/`git` on a new machine, the right move is to say so and ask you to run the one-time login — not to look for a workaround.
