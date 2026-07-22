import type { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function GlassButton({
  children,
  className = "",
  href,
  onClick,
  icon,
  variant = "primary",
}: GlassButtonProps) {
  return (
    <span className={`glass-button-wrap glass-button-${variant} ${className}`}>
      {href ? <a className="glass-button" href={href}>
        <span className="glass-button-content">
          {children}
          {icon}
        </span>
      </a> : <button className="glass-button" type="button" onClick={onClick}>
        <span className="glass-button-content">{children}{icon}</span>
      </button>}
      <span className="glass-button-shadow" aria-hidden="true" />
    </span>
  );
}
