/**
 * cn() — Utilidad para composición de clases CSS de Tailwind
 *
 * Combina clsx (clases condicionales) con tailwind-merge (resolución de conflictos).
 *
 * Sin tailwind-merge: cn("px-4", "px-6") → "px-4 px-6" (conflicto, gana el último)
 * Con tailwind-merge: cn("px-4", "px-6") → "px-6"      (resuelto correctamente)
 *
 * Uso:
 *   cn("base-class", isActive && "active-class", className)
 *   cn("text-sm text-neutral-600", { "text-primary-700": isHighlighted })
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
