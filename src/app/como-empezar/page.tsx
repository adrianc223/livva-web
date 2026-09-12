import type { Metadata } from "next";
import { GettingStartedPageContent } from "@/components/landing/GettingStartedPageContent";
import { GETTING_STARTED_FAQS } from "@/lib/gettingStarted";
import { SITE_URL } from "@/lib/siteUrl";

// 2026-09-12, SEO/GEO audit follow-up. The home page's "Cómo empezar" section answers the
// adoption objection inside the main flow; this is the deep page for the search intent, in the
// same pattern the comparison page established.
//
// **`/como-empezar`, and the alternatives were rejected for a reason worth keeping.**
// `/implementacion` and `/capacitacion` presuppose exactly what this page exists to deny — a URL
// with "capacitación" in it confirms to the reader that there is a training to sit through — and
// `/onboarding` is English for an audience that does not search in English.
const TITLE = "Cómo empezar a usar Livva en tu condominio";
const DESCRIPTION =
  "Tres formas de meter a tus residentes, guías por rol dentro de la app y una demo que se crea sola. Sin capacitaciones ni implementación.";
const PAGE_URL = `${SITE_URL}/como-empezar`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Livva", locale: "es_CR", type: "website", images: [{ url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630, alt: "Livva" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/opengraph-image.png`] },
};

// FAQPage rather than HowTo: Google retired HowTo rich results from search, so that markup buys no
// visual treatment, while FAQPage keeps both the rich result and clean question/answer pairs for
// AI answer extraction. Built from the same array the page renders, so the schema and the visible
// content can never drift — the same rule /preguntas-frecuentes already follows.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GETTING_STARTED_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function ComoEmpezarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GettingStartedPageContent />
    </>
  );
}
