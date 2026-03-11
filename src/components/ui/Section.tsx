"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types";

interface SectionWrapperProps extends SectionProps {
  variant?: "default" | "alt" | "dark";
  noPadding?: boolean;
}

const variantStyles = {
  default: "bg-transparent",
  alt: "bg-transparent",
  dark: "bg-transparent",
};

export function Section({
  id,
  className,
  variant = "default",
  noPadding = false,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full transition-colors duration-300",
        !noPadding && "py-16 sm:py-20 lg:py-24",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </section>
  );
}
