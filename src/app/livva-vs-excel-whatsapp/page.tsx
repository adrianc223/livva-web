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
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Livva", locale: "es_CR", type: "website" },
};

export default function LivvaVsExcelWhatsappPage() {
  return <ComparisonPageContent />;
}
