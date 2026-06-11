import { cn } from "@/lib/utils/cn";

/**
 * Card — Sistema de card con slots composables
 *
 * Diseño: Superficie blanca, borde sutil neutro, sombra de marca,
 * borde radius lg. Hover opcional eleva la card.
 *
 * Composición:
 *   <Card>
 *     <CardImage src="..." alt="..." />
 *     <CardHeader>
 *       <CardTitle>Título</CardTitle>
 *       <CardMeta>Metadato</CardMeta>
 *     </CardHeader>
 *     <CardBody>Contenido</CardBody>
 *     <CardFooter>Footer</CardFooter>
 *   </Card>
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Agrega efecto de elevación al hacer hover */
  hover?: boolean;
  /** Hace la card clickeable visualmente (cursor pointer) */
  clickable?: boolean;
}

export function Card({ children, className, hover = false, clickable = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg border border-border",
        "shadow-card overflow-hidden",
        "transition-shadow duration-200",
        hover && "hover:shadow-md",
        clickable && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-5 pt-5 pb-3", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("font-display text-xl font-bold text-text leading-snug", className)}>
      {children}
    </h3>
  );
}

export function CardMeta({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs text-text-muted mt-1", className)}>{children}</p>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-5 py-3 text-text-muted text-sm leading-relaxed", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-5 pb-5 pt-3 flex items-center gap-3", className)}>
      {children}
    </div>
  );
}
