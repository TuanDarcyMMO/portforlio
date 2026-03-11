"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CardProps } from "@/types";

export function Card({
  className,
  variant = "default",
  hover = true,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl border border-white/10 p-6 transition-all duration-300";

  const variantStyles = {
    default: "bg-white/5 backdrop-blur-sm",
    glass: "bg-white/10 backdrop-blur-lg border-white/20",
    gradient: "bg-gradient-to-br from-primary/20 to-accent/20",
  };

  const hoverStyles = hover ? "hover:shadow-lg hover:border-white/20 hover:bg-white/10" : "";

  return (
    <div className={cn(baseStyles, variantStyles[variant], hoverStyles, className)} {...props}>
      {children}
    </div>
  );
}
