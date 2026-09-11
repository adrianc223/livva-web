# Roadmap

## Leads → master dashboard integration — done (2026-09-09)

Leads now reach both an email (`sendLeadNotificationEmail`) and a real `LandingLead` row in Condo-Admin-Tool's database (via a shared-secret server-to-server call — see CLAUDE.md's "Lead capture" section here and that repo's own "Leads (from livva-web)" section). `/master/leads` lists them with a "Nueva" badge, and `/master/analytics`'s "Leads" tab charts them. Reply is a plain `mailto:` link from that page — no in-app compose/send exists or is planned.

**Still not built, if ever wanted**: marking a lead "contacted"/"converted" beyond the binary new/seen state a badge already gives; anything CRM-shaped (notes, follow-up reminders, pipeline stages) — this was deliberately kept to "read the list, badge what's new, reply by email" rather than building toward a full CRM nobody asked for yet.

## Custom domain — done (2026-09-10)

`livvaadmin.com` has been live since 2026-09-09 and is added in Vercel's project settings. The "update `APP_URL` in Vercel's Production env var" half of this instruction was initially missed — discovered during a live SEO audit against production (`og:url`, `sitemap.xml`, `robots.txt`'s `Sitemap:` line were all still serving the old `*.vercel.app` domain) and briefly set on the *wrong* Vercel project during the fix attempt (see Condo-Admin-Tool's `docs/ONBOARDING.md` for that incident — it broke real activation-email links in the actual app for a short window, unrelated to this site). Now correctly set on **this** project's (`livva-web`'s) own Production `APP_URL`, redeployed, and verified live: `sitemap.xml`/`robots.txt` both correctly serve `livvaadmin.com` in production. `src/lib/siteUrl.ts`'s fallback also points at `https://livvaadmin.com` now, so a future missing env var degrades to the correct domain instead of the stale one.

## Structured data (JSON-LD) — done (2026-09-10)

`Organization` + `SoftwareApplication` (`@graph`) sitewide in `layout.tsx`, plus a page-specific `FAQPage` on `/preguntas-frecuentes` — see CLAUDE.md's "SEO & accessibility" section for what each contains and why pricing is represented as an `AggregateOffer` rather than a single fabricated price.

## SEO/GEO audit and content expansion — done (2026-09-10)

A live audit (using the new cross-repo `seo` agent + `seo-audit` skill from Condo-Admin-Tool — see that repo's own CLAUDE.md) against the real production site found the domain/canonical bug above, a zero-keyword copy problem (confirmed against 3 real Costa Rican competitor sites), missing structured data, and zero bottom-of-funnel content. User approved a concrete plan; shipped: rewritten title/description/h1/section headings (keyword-first, mission voice kept as framing rather than dropped), the JSON-LD above, and two new content pages (`/preguntas-frecuentes`, `/livva-vs-excel-whatsapp`) — see CLAUDE.md's "SEO & accessibility" section for the full detail.

**Still open, flagged but not done in this pass**:
- A real WCAG AA contrast failure in the `--color-text-muted` token at small sizes — flagged for `frontend`/`ui-ux`.
- Mobile LCP (3.6s measured, lab data, against a 2.5s target) and ~414KB of wasted image bytes in `Features.tsx`'s screenshot carousel — flagged for `frontend`; the `next/image` tradeoff this project's own CLAUDE.md already flagged as "revisit if it becomes a measured problem" has now measurably become one.
- A dedicated follow-up pass to identify real SaaS *software* competitors (not just condo-administration *service* companies like ADICON/Macondo/ADMINSA) — the original audit's network connectivity was interrupted before this could be completed.
- Google Business Profile + Costa Rican business-directory listings (ASOCONDO, the Cámara de Construcción's directory) — a distribution/GEO lever, not a code task; ~85% of AI-assistant brand mentions come from third-party pages, not the owned site, per the `seo-audit` skill's research.
