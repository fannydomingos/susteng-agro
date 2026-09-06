import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, poppins } from "@/lib/fonts";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Substratos de fibra de coco`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricao,
  keywords: [
    "fibra de coco",
    "pó de coco",
    "substrato agrícola",
    "substrato de coco",
    "economia circular",
    "coco verde",
    "Brasília",
    "Distrito Federal",
    "viveiro",
    "mudas",
  ],
  authors: [{ name: site.nome }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: `${site.nome} — ${site.slogan}`,
    description: site.descricao,
    images: [
      {
        url: "/images/hero-fibra.jpg",
        width: 1200,
        height: 630,
        alt: "Fibra de coco produzida pela SustentAgro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nome} — ${site.slogan}`,
    description: site.descricao,
    images: ["/images/hero-fibra.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06211d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
