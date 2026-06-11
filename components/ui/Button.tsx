import { cn } from "@/lib/utils/cn";

/*
 * Button — Componente base del Design System IEMB
 *
 * Variantes:
 *   primary   → CTA principal (Carmesí/Burdeos)
 *   secondary → CTA secundario (Dorado)
 *   outline   → Acciones secundarias (borde Carmesí)
 *   ghost     → Acciones terciarias (sin fondo)
 *   link      → Enlace en línea de texto
 *
 * Tamaños:
 *   sm → Formularios, filtros, acciones secundarias
 *   md → Default — la mayoría de CTAs
 *   lg → Hero, secciones destacadas
 *
 * El componente extiende HTMLButtonElement para aceptar todos
 * los atributos HTML nativos (onClick, disabled, type, form, etc.)
 */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Estado de carga — muestra spinner y deshabilita el botón */
  loading?: boolean;
  /** Ícono a la izquierda del texto */
  leftIcon?: React.ReactNode;
  /** Ícono a la derecha del texto */
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-700 text-white",
    "hover:bg-primary-600",
    "active:bg-primary-800",
    "focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2",
    "disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed",
  ].join(" "),

  secondary: [
    "bg-secondary-500 text-neutral-900",
    "hover:bg-secondary-600",
    "active:bg-secondary-700",
    "focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2",
    "disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed",
  ].join(" "),

  outline: [
    "border-2 border-primary-700 text-primary-700 bg-transparent",
    "hover:bg-primary-50",
    "active:bg-primary-100",
    "focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2",
    "disabled:border-neutral-300 disabled:text-neutral-400 disabled:cursor-not-allowed",
  ].join(" "),

  ghost: [
    "text-neutral-700 bg-transparent",
    "hover:bg-neutral-100 hover:text-neutral-900",
    "active:bg-neutral-200",
    "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
    "disabled:text-neutral-400 disabled:cursor-not-allowed",
  ].join(" "),

  link: [
    "text-primary-700 bg-transparent underline-offset-4",
    "hover:underline hover:text-primary-600",
    "focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-1",
    "disabled:text-neutral-400 disabled:cursor-not-allowed disabled:no-underline",
    "p-0 h-auto font-normal", // Resetea padding y altura
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3.5 py-2 h-8 gap-1.5",
  md: "text-base px-5 py-2.5 h-10 gap-2",
  lg: "text-lg px-7 py-3.5 h-12 gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        // Base — todos los botones
        "inline-flex items-center justify-center",
        "font-semibold rounded-md",
        "transition-colors duration-150",
        "select-none cursor-pointer",
        "focus-visible:outline-none",
        // Variante y tamaño
        variantStyles[variant],
        variant !== "link" && sizeStyles[size],
        // Estado de loading
        loading && "opacity-75 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Spinner de carga */}
      {loading && (
        <svg
          className="animate-spin -ml-0.5 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {/* Ícono izquierdo */}
      {!loading && leftIcon && (
        <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>
      )}

      {children}

      {/* Ícono derecho */}
      {rightIcon && (
        <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
}
