import type { Metadata } from "next";
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
      <body className="min-h-full flex flex-col bg-background text-text">{children}</body>
    </html>
  );
}
