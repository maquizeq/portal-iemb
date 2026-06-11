/**
 * Definición del menú de navegación principal
 *
 * Fuente de verdad para Navbar (Server) y NavbarClient (drawer móvil).
 * Al cambiar la navegación, solo se modifica este archivo.
 */
export interface NavLink {
  label: string;
  href: string;
  /** Muestra el link con énfasis visual (borde/color diferente) */
  highlighted?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Autoridades", href: "/autoridades" },
  { label: "Noticias", href: "/noticias" },
  { label: "Radio TV", href: "/radio-tv" },
  { label: "Recursos", href: "/recursos", highlighted: true },
  { label: "Iglesias", href: "/iglesias" },
];

/** Links secundarios del footer */
export const footerLinksInstitucional = [
  { label: "Fe Metodista", href: "/nosotros/fe-metodista" },
  { label: "Historia", href: "/nosotros/historia" },
  { label: "Acción Social", href: "/nosotros/accion-social" },
  { label: "Contacto", href: "/contacto" },
  { label: "Política de Privacidad", href: "/privacidad" },
];

/** Redes sociales — completar con URLs reales */
export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/iemb.bolivia", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com/@iemb", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com/iemb.bolivia", icon: "instagram" },
] as const;
