import type { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  href: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function GlassButton({
  children,
  className = "",
  href,
  icon,
  variant = "primary",
}: GlassButtonProps) {
  return (
    <span className={`glass-button-wrap glass-button-${variant} ${className}`}>
      <a className="glass-button" href={href}>
        <span className="glass-button-content">
          {children}
          {icon}
        </span>
      </a>
      <span className="glass-button-shadow" aria-hidden="true" />
    </span>
  );
}
