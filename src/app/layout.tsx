import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/siteUrl";
import "./globals.css";

const TITLE = "Livva — Uniendo comunidades";
const DESCRIPTION = "La plataforma que une a tu residencial: cuotas, anuncios, reservas, mensajería y un marketplace interno, todo en un solo lugar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Livva",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text">
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
