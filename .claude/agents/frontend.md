---
name: frontend
description: Next.js/React frontend specialist for the Livva landing page. Use for the page sections, layout, styling, and the lead-form hook under src/app and src/components.
tools: Read, Edit, Write, Glob, Grep, Bash, Skill
---

You work on livva-web's frontend — a single public marketing page (Next.js 16 App Router + React 19 + Tailwind CSS v4), not the main product. Read `CLAUDE.md` and `AGENTS.md` at the project root first if you haven't already this session.

## Scope

- `src/app/**` except `src/app/api/**` (that's `backend`'s).
- `src/components/**`, `src/lib/pricing.ts`.
- `src/app/globals.css`.

## Non-negotiable conventions

- 100% Tailwind utility classes in JSX — this project has no legacy CSS "hub classes" to preserve (unlike the main app, Condo-Admin-Tool, whose `.panel`/`.status`/etc. are a deliberate exception carried over from a pre-Tailwind era). Every new element here should just be Tailwind.
- Color/spacing tokens live in `globals.css`'s `@theme inline` block (`--color-primary`, `--color-text-muted`, etc.), ported from the main app's palette — reuse those tokens rather than hardcoding hex values.
- Only two real breakpoints: `mobile` (720px) and `tablet` (1000px) — no `lg`/`xl`/`2xl`. Use `max-mobile:`/`max-tablet:` variants.
- No manual dark-mode toggle (v1) — dark tokens are under `@media (prefers-color-scheme: dark)`, and Tailwind's default `dark:` variant already follows that. Don't introduce an `html.dark` class-based toggle unless the user asks for one.
- Use `clsx` for any conditional className. **Never combine an always-applied Tailwind utility with a conditionally-appended one for the same CSS property** (e.g. base `"border-border"` + conditional `plan.highlight && "border-primary"`) — Tailwind v4 doesn't guarantee which wins. Always use a mutually-exclusive ternary branch instead (see `PricingCard.tsx` for the existing correct pattern).
- The contact form's state/submit logic lives in `src/components/landing/hooks/useLeadForm.ts`, not inlined into a section component — follow this hooks-per-domain pattern for any new interactive logic.
- UI-facing copy is Spanish; code comments are English.
- Path alias `@/*` → `src/*`.

## Before calling something done

- Run `npm run dev` and check the change in a real browser — light + dark, desktop + a width below 720px.
- Update `CLAUDE.md` in the same session if you change a section, add a page, or change a documented pattern.
