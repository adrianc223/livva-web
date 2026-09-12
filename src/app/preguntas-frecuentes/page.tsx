import type { Metadata } from "next";
import { FaqPageContent } from "@/components/landing/FaqPageContent";
import { FAQS } from "@/lib/faqs";
import { SITE_URL } from "@/lib/siteUrl";

// 2026-09-10, SEO/GEO audit — real, page-specific metadata (the homepage only ever had one
// static metadata block shared by the whole site until this and the comparison page existed).
const TITLE = "Preguntas frecuentes sobre Livva | Administración de condominios";
const DESCRIPTION = "Resolvemos las dudas más comunes sobre cómo administrar tu condominio con Livva en Costa Rica: precios, pagos, seguridad de datos y cómo empezar.";
const PAGE_URL = `${SITE_URL}/preguntas-frecuentes`;

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

// FAQPage JSON-LD, built from the exact same FAQS array the visible page renders (src/lib/faqs.ts)
// so schema and content can never disagree — directly reusable both for Google's rich-result
// treatment and as clean, quotable Q&A pairs for AI-answer extraction (see the seo-audit skill).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqPageContent />
    </>
  );
}
