"use client";

/**
 * NavbarClient — Client Component
 *
 * Gestiona el estado interactivo del navbar:
 * - Scroll: cambia fondo de transparente a blanco/sólido
 * - Drawer: abre/cierra el menú móvil
 *
 * Recibe el logo y los links del navbar (Server Component padre)
 * como children y props, siguiendo el patrón de composición:
 * Server pasa datos → Client agrega interactividad.
 */
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

interface NavbarClientProps {
  children: React.ReactNode; // Logo + nav de escritorio del Server Component
  links: NavLink[];          // Links para el drawer móvil
}

export function NavbarClient({ children, links }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para cambiar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    // Verificar estado inicial al montar (para pages que no empiezan en top)
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar drawer al navegar a otra página
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Prevenir scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Barra principal del navbar */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          "border-b",
          isScrolled || isDrawerOpen
            ? "bg-white/95 backdrop-blur-sm border-border shadow-sm"
            : "bg-white border-transparent"
        )}
      >
        <div className="container-iemb flex items-center justify-between h-16">
          {/* Logo + navegación de escritorio (vienen del Server Component) */}
          {children}

          {/* Botón hamburguesa — solo visible en móvil */}
          <button
            type="button"
            onClick={toggleDrawer}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-drawer"
            aria-label={isDrawerOpen ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "md:hidden flex items-center justify-center",
              "w-10 h-10 rounded-md",
              "text-neutral-700 hover:text-primary-700 hover:bg-primary-50",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
            )}
          >
            {isDrawerOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* ================================================================
          DRAWER MÓVIL
          ================================================================ */}

      {/* Overlay — cierra el drawer al hacer click fuera */}
      {isDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-dropdown bg-neutral-900/50 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel del drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-label="Menú de navegación"
        aria-modal="true"
        className={cn(
          "md:hidden fixed top-16 right-0 bottom-0 z-navbar",
          "w-72 bg-white border-l border-border shadow-xl",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Links del menú móvil */}
        <nav
          aria-label="Menú móvil"
          className="flex-1 overflow-y-auto py-6 px-4"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg",
                    "text-base font-medium text-neutral-800",
                    "hover:bg-primary-50 hover:text-primary-700",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-primary-700 focus-visible:ring-inset",
                    pathname === link.href && "bg-primary-50 text-primary-700",
                    link.highlighted && "font-semibold text-primary-700"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del drawer */}
        <div className="px-4 py-6 border-t border-border">
          <p className="text-xs text-text-light text-center">
            Iglesia Evangélica Metodista en Bolivia
          </p>
        </div>
      </div>
    </>
  );
}
