
import React from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const CustomButton = ({
  variant = "primary",
  size = "md",
  children,
  className,
  loading = false,
  icon,
  iconPosition = "left",
  ...props
}: CustomButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent",
    outline: "border border-primary/20 bg-transparent text-foreground hover:bg-primary/5",
    ghost: "bg-transparent text-foreground hover:bg-primary/5 border border-transparent",
    link: "bg-transparent text-foreground underline-offset-4 hover:underline p-0 h-auto border-none shadow-none focus:ring-0"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {icon && iconPosition === "left" && <span>{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </span>
      
      {/* Hover effect overlay */}
      <span className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></span>
    </button>
  );
};

export default CustomButton;
