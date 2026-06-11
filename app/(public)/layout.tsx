import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout del grupo de rutas públicas — (public)
 *
 * Este layout envuelve todas las páginas del portal visible al público:
 * Home, Nosotros, Noticias, Iglesias, Recursos, Radio TV, etc.
 *
 * El grupo de rutas (admin) tiene su propio layout separado —
 * los visitantes del portal nunca cargan el CSS o JS del panel admin.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Skip to main content — accesibilidad WCAG 2.1 */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
