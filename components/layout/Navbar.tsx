/**
 * Navbar — Server Component
 *
 * Renderiza la estructura estática del navbar: logo + links de escritorio.
 * El comportamiento dinámico (scroll, drawer móvil) vive en NavbarClient.tsx.
 *
 * Por qué Server Component: el contenido es estático, no necesita estado.
 * Esto significa que el HTML del navbar se genera en el servidor — no hay
 * JavaScript de React que ejecutar en el browser para renderizarlo.
 */
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/constants/navigation";
import { NavbarClient } from "./NavbarClient";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  return (
    <header className="sticky top-0 z-navbar w-full">
      {/*
       * NavbarClient gestiona:
       * - La clase de fondo (transparente → blanco al scroll)
       * - El estado del drawer móvil
       * Recibe los links del servidor via props para no duplicar la config.
       */}
      <NavbarClient links={navLinks}>
        {/* Logo — visible en escritorio y móvil */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0"
          aria-label="Portal IEMB — Ir al inicio"
        >
          {/* Logo SVG institucional */}
          <Image
            src="/logos/iemb-logo.svg"
            alt="Iglesia Evangélica Metodista en Bolivia"
            width={120}
            height={40}
            priority // El logo está above the fold — carga inmediata
            className="h-9 w-auto"
          />
        </Link>

        {/* Navegación principal — solo visible en escritorio (md+) */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                "text-neutral-800 transition-colors duration-150",
                "hover:text-primary-700 hover:bg-primary-50",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-primary-700 focus-visible:ring-offset-1",
                link.highlighted && [
                  "text-primary-700 font-semibold",
                  "border border-primary-200 bg-primary-50",
                  "hover:bg-primary-100",
                ]
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </NavbarClient>
    </header>
  );
}
