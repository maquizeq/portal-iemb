/**
 * Footer — Server Component
 *
 * Footer institucional del portal IEMB.
 * 4 columnas en escritorio → 2 columnas en tablet → 1 columna en móvil.
 *
 * Contenido:
 *   Col 1: Identidad (Logo + tagline + descripción)
 *   Col 2: Navegación principal
 *   Col 3: Links institucionales
 *   Col 4: Contacto + Redes sociales
 */
import Link from "next/link";
import Image from "next/image";
import {
  navLinks,
  footerLinksInstitucional,
  socialLinks,
} from "@/lib/constants/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Línea decorativa superior — color de la marca */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-secondary-500 to-primary-700" />

      {/* Contenido principal del footer */}
      <div className="container-iemb py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ---- COLUMNA 1: Identidad ---- */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Inicio">
              <Image
                src="/logos/iemb-logo-white.svg"
                alt="IEMB — Iglesia Evangélica Metodista en Bolivia"
                width={130}
                height={44}
                className="h-10 w-auto mb-4"
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 mb-5">
              Más de 130 años de fe, educación y acción social
              en los nueve departamentos de Bolivia.
            </p>
            {/* Redes sociales */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguir en ${social.label}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:bg-primary-700 hover:text-white transition-colors duration-200"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* ---- COLUMNA 2: Navegación ---- */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Portal
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-secondary-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- COLUMNA 3: Institucional ---- */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Institución
            </h3>
            <ul className="space-y-2.5">
              {footerLinksInstitucional.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-secondary-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- COLUMNA 4: Contacto ---- */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true">
                  {/* Ícono de ubicación */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <p className="text-sm text-neutral-400">
                  La Paz, Bolivia<br />
                  {/* Actualizar con dirección real */}
                  Dirección institucional
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-primary-400 flex-shrink-0" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.21 3.58 2 2 0 0 1 3.22 1.4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <a href="tel:+59122000000" className="text-sm text-neutral-400 hover:text-secondary-400 transition-colors">
                  {/* Actualizar con teléfono real */}
                  +591 2 000 0000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-primary-400 flex-shrink-0" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <a href="mailto:info@iemb.org.bo" className="text-sm text-neutral-400 hover:text-secondary-400 transition-colors">
                  info@iemb.org.bo
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* ---- Barra inferior — copyright ---- */}
      <div className="border-t border-neutral-800">
        <div className="container-iemb py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © {currentYear} Iglesia Evangélica Metodista en Bolivia.
            Todos los derechos reservados.
          </p>
          <Link
            href="/privacidad"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}

/** Íconos SVG inline para redes sociales — sin dependencia de librería */
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    youtube: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  };
  return <>{icons[name] ?? null}</>;
}
