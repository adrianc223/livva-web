import type { Metadata } from "next";
import Script from "next/script";
import { PRICING_PLANS, totalWithIva } from "@/lib/pricing";
import { SITE_URL } from "@/lib/siteUrl";
import "./globals.css";

// 2026-09-10, SEO audit: rewritten to lead with the actual keywords a Costa Rican condo
// administrator searches ("administración de condominios", "Costa Rica") — the previous
// brand-only title/description contained neither. The title tag stays purely functional (that's
// what ranking weighs); the mission voice lives in the visible on-page copy instead (see Hero.tsx).
const TITLE = "Livva | Administración de condominios en Costa Rica";
const DESCRIPTION = "Livva une a tu condominio: cuotas, anuncios, reservas y mensajería en un solo lugar. La administración de condominios en Costa Rica, hecha simple.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // A real <link rel="canonical"> — this project has two live domains (livvaadmin.com and the
  // *.vercel.app default) resolving in parallel; without this, that's a real duplicate-content
  // signal. Every other page's own metadata should set this to its own SITE_URL + path.
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Livva",
    locale: "es_CR",
    type: "website",
  },
};

// Organization + SoftwareApplication structured data (2026-09-10, SEO audit — was explicitly
// deferred pending a live domain; livvaadmin.com has been live since 2026-09-09, so this was
// overdue). A single @graph connects the two entities rather than two disconnected <script>
// blocks, per the seo-audit skill's guidance — search engines and AI crawlers parse a connected
// graph more reliably. The pricing tiers are graduated per-unit rates (see src/lib/pricing.ts),
// not a single flat price, so `offers` is an AggregateOffer spanning the real published per-unit
// rates rather than a fabricated single "price" schema.org has no clean way to represent — this
// stays honest about what these numbers actually mean.
//
// **These carry IVA, because the pricing cards do.** Structured data that disagrees with the
// visible page is a spam signal, not a rounding difference, so the moment the published price
// became the with-IVA total this had to follow. Derive it here rather than hardcoding, so the
// two cannot drift the next time a tier moves.
const finitePlans = PRICING_PLANS.filter((plan) => plan.monthlyRatePerUnit !== null);
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Livva",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-light.svg`,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}#software`,
      name: "Livva",
      description: DESCRIPTION,
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      provider: { "@id": `${SITE_URL}#organization` },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CRC",
        lowPrice: Math.min(...finitePlans.map((plan) => totalWithIva(plan.monthlyRatePerUnit as number))),
        highPrice: Math.max(...finitePlans.map((plan) => totalWithIva(plan.monthlyRatePerUnit as number))),
        offerCount: PRICING_PLANS.length,
        url: `${SITE_URL}#planes`,
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        {/* Cloudflare Web Analytics — the "site_token" here is meant to be public (it's a
            per-site beacon id, not a credential), see https://developers.cloudflare.com/web-analytics/.
            Chosen over zone-level Cloudflare analytics because DNS is deliberately unproxied
            (see docs/ONBOARDING.md) so Vercel can issue its own certificate — that means
            Cloudflare's edge never sees this site's real traffic, so this RUM beacon is the only
            Cloudflare product that actually measures visits/pageviews here. */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "b09a1e6bcb484c528241db8c3a96e724"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
