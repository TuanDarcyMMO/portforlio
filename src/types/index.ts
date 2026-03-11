/**
 * Global TypeScript Types and Interfaces
 */

export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface AnimationProps {
  duration?: number;
  delay?: number;
  ease?: string;
}

export type ColorVariant = "primary" | "secondary" | "accent" | "default";

export type SizeVariant = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
  size?: SizeVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
}
