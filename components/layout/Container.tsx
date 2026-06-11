import type { ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Permite cambiar el tag HTML semántico (div, section, article, aside…) */
  as?: ElementType;
}

/**
 * Container — Wrapper de ancho máximo con padding responsivo
 *
 * Implementa el sistema de contenedor del Design System:
 * - Max-width: 1240px (centrado con margin auto)
 * - Padding horizontal: 20px → 32px → 48px → 64px (Mobile First)
 *
 * Usa la clase .container-iemb definida en globals.css para
 * poder referenciarlo también fuera de componentes React.
 *
 * Uso:
 *   <Container>contenido</Container>
 *   <Container as="section" className="bg-primary-700">...</Container>
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("container-iemb", className)}>
      {children}
    </Tag>
  );
}
