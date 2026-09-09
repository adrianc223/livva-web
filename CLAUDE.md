@AGENTS.md

# CLAUDE.md

This file documents how `livva-web` works. **Living document** — update the relevant section here in the same session you ship a change, same convention as the main app.

## Project overview

`livva-web` is the public, informational landing page for **Livva** — a separate, much smaller Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 project from the real product (`Condo-Admin-Tool`, elsewhere on this machine). It's a single scrolling page (`src/app/page.tsx` → `src/components/landing/LandingPage.tsx`) pitching the product ("Uniendo comunidades"), presenting 3 pricing tiers by unit count, and capturing leads through a contact form. There is **no database, no auth, and no multi-tenancy** here — this is intentionally the lightest possible project, not a scaled-down clone of the main app's architecture.

Visual identity (palette, fonts, hero styling) is deliberately ported from the main app so the two feel like the same brand — see `src/app/globals.css` (pine palette + `mobile`/`tablet` breakpoints, copied from Condo-Admin-Tool's `globals.css`) and `src/components/landing/Hero.tsx` (dark pine hero panel with the same decorative ring, copied from `LoginScreen.tsx`'s style). `src/components/Logo.tsx` and `public/logo-light.svg`/`logo-dark.svg` are ported verbatim from the main app. `src/app/icon.png`/`apple-icon.png` are copied directly from the main app's already-generated brand icons (same 512×512 pine-square mark) rather than regenerated.

## Commands

```bash
npm run dev      # start Next.js dev server (localhost:3000)
npm run build    # next build
npm run start    # run production build
npm run lint     # eslint (flat config, eslint-config-next)
```

No database, no Prisma, no `.env` requirement to run the dev server. `RESEND_API_KEY`/`EMAIL_FROM`/`LEAD_NOTIFY_EMAIL` are only needed for the contact form to actually deliver an email (see "Lead capture" below) — without them the form still works from the visitor's side, it just soft-fails to send (console warning) rather than throwing.

## Page structure (`src/components/landing/`)

One page, composed in `LandingPage.tsx` (a client component, since it owns the shared lead-form state) in this order: `Header` (sticky nav) → `Hero` (`#inicio`) → `ValueProps` → `Features` (`#funciones`) → `HowItWorks` → `Pricing` (`#planes`) → `ContactSection` (`#contacto`) → `Footer`.

- **Pricing** (`Pricing.tsx` + `PricingCard.tsx`) reads from `src/lib/pricing.ts`'s `PRICING_PLANS`/`ANNUAL_DISCOUNT_PERCENT` — **these numbers are hand-kept in sync with Condo-Admin-Tool's `src/lib/billing/annualPricing.ts`** (₡1,300 / ₡950 / ₡750 per unit/month for ≤30 / ≤120 / 120+ units, 12% annual discount), since this repo has no access to that app's `src/lib`. If the main app's tiers ever change, update `src/lib/pricing.ts` here by hand to match.
- **Lead capture**: clicking a `PricingCard`'s "Quiero este plan" button calls `selectPlanAndScroll` (from `src/components/landing/hooks/useLeadForm.ts`, owned by `LandingPage.tsx` and passed down as props) — this sets the shared `selectedPlan` state and scrolls to `#contacto`, where `ContactSection` renders that plan pre-selected in its `<select>`. This hooks-per-domain pattern (state/submit logic in its own `useX.ts`, not inlined into the section component) follows the same convention the main app uses for all its domain hooks.
- Submitting the form `POST`s to `/api/leads` (`src/app/api/leads/route.ts`), which validates every field server-side, checks a hidden honeypot field (`website`) for basic bot resistance, and calls `sendLeadNotificationEmail` (`src/lib/email/resend.ts`) — a near-verbatim port of the main app's `sendAdminFeedbackEmail` pattern (`Resend` client soft-fails if `RESEND_API_KEY` isn't set, `escapeHtml` on every interpolated field, styled HTML email matching the pine palette).

## Lead capture — deferred integration

**Leads are only ever emailed, never stored.** `POST /api/leads` sends one email to `LEAD_NOTIFY_EMAIL` per submission and that's it — there is no `LandingLead` model, no database, no admin inbox for past leads in this project. Wiring leads into the main app's master dashboard as a real, browsable inbox is a deliberately deferred future task — see `docs/ROADMAP.md`'s "Leads → master dashboard integration" section for the planned shape of that (a `LandingLead` Prisma model in `Condo-Admin-Tool`, modeled loosely after its `ApprovalRequest` pattern, plus a `/master/leads` page). Don't add persistence here without the user explicitly asking for it — that reopens data-retention questions this project currently has none of.

## Deployment

Deployed to Vercel via GitHub integration (`github.com/adrianc223/livva-web` → auto-deploys `main` on push), same workflow as the main app. No custom domain yet — ships to the default `*.vercel.app` URL; see `docs/ROADMAP.md`'s "Custom domain" section for what changes when one is bought. Vercel env vars: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, optionally `EMAIL_FROM`/`APP_URL`.

## Conventions

- **UI text** is Spanish; **code comments** are English — same split as the main app.
- Tailwind CSS v4 utility classes only — this project has no legacy plain-CSS "hub classes" to preserve (unlike the main app's deliberate `.panel`/`.status`/etc. exception), so every element here should be 100% Tailwind.
- Color tokens live in `globals.css`'s `@theme inline` block (`--color-primary`, `--color-text-muted`, etc.) — reuse them, don't hardcode hex values.
- Only two real breakpoints: `mobile` (720px), `tablet` (1000px) — no `lg`/`xl`/`2xl`.
- No manual dark-mode toggle (v1) — dark tokens live under `@media (prefers-color-scheme: dark)`, and Tailwind's default `dark:` variant already follows that.
- `clsx` for conditional classNames; never combine an always-applied Tailwind utility with a conditionally-appended one for the same CSS property (see `PricingCard.tsx` for the correct mutually-exclusive-ternary pattern) — same gotcha the main app has documented.
- New interactive logic goes in its own hook under `src/components/landing/hooks/useX.ts`, not inlined into a section component.
- Path alias `@/*` → `src/*`.
- 5 subagents live under `.claude/agents/` (`frontend`, `backend`, `security`, `qa`, `seo`), ported from the main app and rescoped to what this single-page site actually needs.
- **Document as you go**: update this file's relevant section in the same session you change how a section, the lead flow, or a pattern works.
