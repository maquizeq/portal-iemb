import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  /** Variante predefinida para casos de uso comunes */
  variant?: "text" | "avatar" | "image" | "card";
}

/**
 * Skeleton — Placeholder animado para estados de carga
 *
 * Sustituye al spinner global. Muestra la forma del contenido
 * antes de que carguen los datos, reduciendo el layout shift.
 *
 * Uso básico:
 *   <Skeleton className="h-4 w-3/4" />          → línea de texto
 *   <Skeleton className="h-48 w-full" />         → imagen
 *   <Skeleton variant="avatar" />                 → avatar circular
 */
export function Skeleton({ className, variant }: SkeletonProps) {
  const variantStyles = {
    text:   "h-4 w-full rounded",
    avatar: "h-12 w-12 rounded-full",
    image:  "h-48 w-full rounded-lg",
    card:   "h-64 w-full rounded-lg",
  };

  return (
    <div
      role="status"
      aria-label="Cargando..."
      className={cn(
        "animate-pulse bg-neutral-200",
        variant ? variantStyles[variant] : "",
        className
      )}
    />
  );
}

/** Esqueleto de card de noticia completa */
export function NewsCardSkeleton() {
  return (
    <div className="bg-surface rounded-lg border border-border shadow-card overflow-hidden">
      <Skeleton variant="image" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
