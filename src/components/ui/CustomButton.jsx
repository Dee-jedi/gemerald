// src/components/ui/Button.jsx

import { cn } from "../../lib/utils"; // If you're using a classnames utility

const variants = {
  primary: `
    bg-[var(--color-card)]
    text-[var(--color-text)]
    border-l-4
    border-[var(--color-wood)]
    pl-4
    hover:opacity-80
    transition-opacity duration-[var(--transition-duration)]
  `,
  secondary: `
    bg-[var(--color-card)]
    text-[var(--color-text)]
    border border-[var(--color-border)]
    hover:bg-[var(--color-bg)]
  `,
  outline: `
    bg-transparent
    text-[var(--color-text)]
    border border-[var(--color-text)]
    hover:bg-[var(--color-card)]
  `,
  glass: `
    bg-white/10 
    backdrop-blur-md 
    border border-white/20 
    text-white 
    hover:text-[var(--color-wood)]
    hover:border-[var(--color-soft-amber)/40]
    shadow-sm
    relative
    overflow-hidden
    transition-all
    duration-[var(--transition-duration)]
  `,
};

const sizes = {
  sm: "px-3 py-1 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-5 py-3 text-lg rounded-xl",
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled = false,
  type = "button",
  loading = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "transition duration-300 ease-in-out font-medium flex items-center justify-center",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer", // Only add cursor-pointer when not disabled
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        children
      )}

      {/* Only show the gradient overlay on hover */}
      {!disabled && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></span>
      )}
    </button>
  );
};

export default Button;
