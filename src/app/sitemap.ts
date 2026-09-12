import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    // 2026-09-10, SEO/GEO audit — the site's first content pages beyond the single homepage.
    { url: `${SITE_URL}/preguntas-frecuentes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/livva-vs-excel-whatsapp`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/como-empezar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
