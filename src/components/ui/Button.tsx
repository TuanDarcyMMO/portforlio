"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps, SizeVariant, ColorVariant } from "@/types";

const sizeVariants: Record<SizeVariant, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

const colorVariants: Record<ColorVariant, string> = {
  primary: "bg-primary text-white hover:bg-opacity-90",
  secondary: "bg-secondary text-white hover:bg-opacity-90",
  accent: "bg-accent text-white hover:bg-opacity-90",
  default: "bg-gray-700 text-white hover:bg-gray-600",
};

export function Button({
  className,
  variant = "default",
  size = "md",
  isLoading = false,
  icon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        sizeVariants[size],
        colorVariants[variant],
        "hover:shadow-lg",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="animate-spin">⏳</span>}
      {icon && !isLoading && <span>{icon}</span>}
      {children}
    </button>
  );
}
