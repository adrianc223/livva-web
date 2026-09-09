# Roadmap

## Leads → master dashboard integration — done (2026-09-09)

Leads now reach both an email (`sendLeadNotificationEmail`) and a real `LandingLead` row in Condo-Admin-Tool's database (via a shared-secret server-to-server call — see CLAUDE.md's "Lead capture" section here and that repo's own "Leads (from livva-web)" section). `/master/leads` lists them with a "Nueva" badge, and `/master/analytics`'s "Leads" tab charts them. Reply is a plain `mailto:` link from that page — no in-app compose/send exists or is planned.

**Still not built, if ever wanted**: marking a lead "contacted"/"converted" beyond the binary new/seen state a badge already gives; anything CRM-shaped (notes, follow-up reminders, pipeline stages) — this was deliberately kept to "read the list, badge what's new, reply by email" rather than building toward a full CRM nobody asked for yet.

## Custom domain

No domain purchased yet — the site ships to Vercel's default `*.vercel.app` URL. When a domain is bought, update `APP_URL` in Vercel's Production env var and add the domain in the Vercel project's Domains settings; `robots.ts`/`sitemap.ts`/`layout.tsx` all read it through `src/lib/siteUrl.ts`'s single `SITE_URL` export, so no code change should be needed beyond that env var. Also regenerate `src/app/opengraph-image.png` if the domain change comes with any visual rebrand (it doesn't embed the domain itself, so a plain domain swap needs no regeneration).

## Structured data (JSON-LD)

Not added yet — see CLAUDE.md's "SEO & accessibility" section. Worth adding an `Organization` (and maybe `Product`, once pricing is final) JSON-LD block once a real domain is bought; low value before then since it's mostly a ranking/rich-result signal tied to a stable, indexed domain.
