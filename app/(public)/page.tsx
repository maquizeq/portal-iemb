import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iglesia Evangélica Metodista en Bolivia",
  description:
    "Portal oficial de la Iglesia Evangélica Metodista en Bolivia. Más de 130 años de fe, educación y acción social presentes en los 9 departamentos del país.",
};

/**
 * Home Page — Placeholder de Fase 1
 *
 * Esta página se reemplaza completamente en Fase 2 con las secciones
 * del diseño aprobado (Hero, Pilares, Noticias, Mapa, etc.)
 *
 * Su único objetivo ahora es verificar que el layout (Navbar + Footer)
 * funciona correctamente y que el Design System está activo.
 */
export default function HomePage() {
  return (
    <section className="section-padding">
      <div className="container-iemb text-center">
        <span className="section-label mb-6">Bienvenidos</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-6">
          Iglesia Evangélica Metodista
          <br />
          <span className="text-primary-700">en Bolivia</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-10">
          Más de 130 años de fe, educación y acción social presentes
          en los nueve departamentos del país.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          Portal en construcción — Fase 2 próximamente
        </div>
      </div>
    </section>
  );
}
