import type { Metadata } from "next";
import { ComparisonPageContent } from "@/components/landing/ComparisonPageContent";
import { SITE_URL } from "@/lib/siteUrl";

// 2026-09-10, SEO/GEO audit — the single highest-leverage content gap found: a bottom-of-funnel
// comparison page. This is the URL/title shape a Costa Rican administrator (or an AI assistant
// answering on their behalf) would actually search for when comparing tools.
const TITLE = "Livva vs. Excel y WhatsApp para administrar tu condominio";
const DESCRIPTION = "Cuotas, anuncios, reservas y comunicación: así cambia administrar tu condominio en Costa Rica al pasar de Excel y WhatsApp a Livva.";
const PAGE_URL = `${SITE_URL}/livva-vs-excel-whatsapp`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  // **`images` has to be explicit here.** `src/app/opengraph-image.png` is a file convention and
  // is inherited only until a page declares its own `openGraph` object — declaring one without
  // `images` drops the inherited tag entirely, which is what happened: verified in production,
  // this page served zero `og:image` while the home page served one. It matters more than usual
  // here because these pages get shared on WhatsApp, where a link with no image degrades to a
  // line of grey text — and the comparison page is the one an administrator forwards to their
  // junta directiva.
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Livva", locale: "es_CR", type: "website", images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: "Livva" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/opengraph-image.png`] },
};

export default function LivvaVsExcelWhatsappPage() {
  return <ComparisonPageContent />;
}
