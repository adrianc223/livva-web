import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.APP_URL || "https://livva.vercel.app";
  return [{ url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
