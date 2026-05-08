import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/pdf-merge";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Unir PDFs Online Gratis — Fusionar PDF",
    template: "%s | PDF Merge",
  },
  description:
    "Fusiona múltiples archivos PDF en uno solo con drag & drop. Reordena los PDFs antes de unirlos. 100% en el navegador, sin registro, sin límite de tamaño.",
  keywords: [
    "unir pdf online gratis",
    "fusionar pdf gratis",
    "combinar pdf online",
    "merge pdf free",
    "juntar archivos pdf",
    "pdf merge online",
    "combine pdf files free",
    "unir varios pdf en uno",
    "fusionar documentos pdf",
    "pdf combiner gratis",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Unir PDFs Online Gratis — Fusionar PDF",
    description:
      "Fusiona múltiples PDFs en uno con drag & drop. Reordena antes de unir. Sin registro. Por MACM.",
    url: SITE_URL,
    siteName: "PDF Merge — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unir PDFs Online Gratis",
    description: "Fusiona múltiples PDFs en uno. Sin registro. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/PDFMerge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
