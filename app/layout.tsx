import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import "./globals.css";

/*
 * FUENTES — next/font carga las fuentes de Google directamente desde el servidor
 * de Next.js (no desde Google). Esto elimina la petición de red al browser y
 * previene el FOUT (Flash of Unstyled Text).
 *
 * Cada fuente se convierte en una variable CSS que luego se asigna en globals.css
 * dentro del bloque @theme.
 */

/** Playfair Display — Títulos H1, H2, headings institucionales */
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap", // El texto se muestra con la fuente de respaldo hasta que carga
});

/** Inter — Cuerpo de texto, UI, navegación, formularios */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Lora — Versículos bíblicos, citas institucionales, blockquotes */
const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/*
 * METADATA GLOBAL — Herencia jerárquica de Next.js
 * Esta metadata se aplica a todas las páginas que no definen la suya propia.
 * Las páginas hijas pueden sobreescribir campos específicos con su propio
 * export const metadata.
 *
 * El template "%s — IEMB" hace que cada página tenga:
 * "Noticias — IEMB", "Autoridades — IEMB", etc.
 */
export const metadata: Metadata = {
  // metadataBase es necesario para que Next.js construya URLs absolutas
  // para og:image, canonical links, etc.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://iemb.org.bo"
  ),
  title: {
    default: "Iglesia Evangélica Metodista en Bolivia — IEMB",
    template: "%s — IEMB",
  },
  description:
    "Portal oficial de la Iglesia Evangélica Metodista en Bolivia. Más de 130 años de fe, educación y acción social presentes en los 9 departamentos del país.",
  keywords: [
    "Iglesia Metodista Bolivia",
    "IEMB",
    "fe metodista",
    "acción social Bolivia",
    "iglesias Bolivia",
    "educación cristiana",
  ],
  authors: [{ name: "Iglesia Evangélica Metodista en Bolivia" }],
  creator: "IEMB",
  publisher: "Iglesia Evangélica Metodista en Bolivia",
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: "IEMB — Iglesia Evangélica Metodista en Bolivia",
    title: "Iglesia Evangélica Metodista en Bolivia — IEMB",
    description:
      "Portal oficial de la Iglesia Evangélica Metodista en Bolivia. Más de 130 años de fe, educación y acción social.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iglesia Evangélica Metodista en Bolivia — IEMB",
    description:
      "Portal oficial de la Iglesia Evangélica Metodista en Bolivia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // El favicon y los íconos de la app se gestionan en /public/
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * lang="es" es crítico para:
     * - Accesibilidad: los lectores de pantalla usan el idioma correcto
     * - SEO: Google indexa el contenido en español para Bolivia
     *
     * Las variables de fuente se pasan como className al <html>
     * para que estén disponibles en todo el DOM via CSS variables.
     */
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${inter.variable} ${lora.variable}`}
    >
      <body className="min-h-dvh antialiased bg-background text-text">
        {children}
      </body>
    </html>
  );
}
