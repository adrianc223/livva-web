import type { Metadata } from "next";
import "./globals.css";

const APP_URL = process.env.APP_URL || "https://livva.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: "Livva — Uniendo comunidades",
  description: "La plataforma que une a tu residencial: cuotas, anuncios, reservas, mensajería y un marketplace interno, todo en un solo lugar.",
  openGraph: {
    title: "Livva — Uniendo comunidades",
    description: "La plataforma que une a tu residencial: cuotas, anuncios, reservas, mensajería y un marketplace interno, todo en un solo lugar.",
    url: APP_URL,
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
