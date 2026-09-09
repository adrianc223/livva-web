# Roadmap

## Leads → master dashboard integration (deferred)

Leads submitted through the landing page's contact form currently only trigger an email (`sendLeadNotificationEmail`, `src/lib/email/resend.ts`) to `LEAD_NOTIFY_EMAIL` — nothing is persisted, and there's no way to see past leads except in an inbox.

The plan, for a future session: add a real inbox for these in the main app's master dashboard (`Condo-Admin-Tool`'s `/master`), likely as:
- A `LandingLead` Prisma model (name, community, email, plan, message, createdAt, maybe a `contacted` boolean) — modeled loosely after `ApprovalRequest`'s shape (a simple record + status), not a full CRM.
- A `POST` endpoint the landing page's `/api/leads` route calls (or is replaced by) instead of only emailing.
- A `/master/leads` page listing them, mirroring `/master/feedback`'s pattern (list newest-first, mark-as-read/contacted on open).

Until that lands, email is the only record — nothing here should be treated as a durable lead database.

## Custom domain

No domain purchased yet — the site ships to Vercel's default `*.vercel.app` URL. When a domain is bought, update `APP_URL` in Vercel's env vars and add the domain in the Vercel project's Domains settings; `robots.ts`/`sitemap.ts`/`layout.tsx`'s `metadataBase` all read `APP_URL`, so no code change should be needed beyond that.
