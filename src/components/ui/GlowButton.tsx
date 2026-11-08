// Source: kavirox_ui_elemnts.txt lines 16125-16369 (Glow button)
import React from 'react';
import './GlowButton.css';

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: any;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  href,
  target,
  rel,
  children,
  icon,
  onClick,
  className = '',
  ...rest
}) => {
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        icon
      ) : (
        <svg
          className="sparkle-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as any}
        className={`kavirox-glow-button cursor-target ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`kavirox-glow-button cursor-target ${className}`}
      {...rest}
    >
      {content}
    </button>
  );
};

export default GlowButton;
