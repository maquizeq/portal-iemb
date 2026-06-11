import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "primary" | "secondary" | "accent" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:   "bg-neutral-100 text-neutral-700",
  primary:   "bg-primary-100 text-primary-700",
  secondary: "bg-secondary-100 text-secondary-700",
  accent:    "bg-accent-100 text-accent-700",
  outline:   "border border-neutral-300 text-neutral-600 bg-transparent",
};

/**
 * Badge — Etiqueta compacta para categorías, estados y clasificaciones
 *
 * Uso:
 *   <Badge>Institucional</Badge>
 *   <Badge variant="accent">Acción Social</Badge>
 *   <Badge variant="primary">Noticias</Badge>
 */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "text-xs font-semibold",
        "px-2.5 py-0.5",
        "rounded-full",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
