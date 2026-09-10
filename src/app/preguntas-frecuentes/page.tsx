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
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Livva", locale: "es_CR", type: "website" },
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
