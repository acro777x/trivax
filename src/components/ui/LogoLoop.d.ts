import React from 'react';

export interface LogoLoopItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
  hoverColor?: string;
}

export interface LogoLoopProps {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  layout?: string;
  bend?: number;
  magnify?: number;
  labels?: string;
  muted?: number;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scrollBoost?: number;
  step?: boolean;
  draggable?: boolean;
  intro?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const LogoLoop: React.FC<LogoLoopProps>;
export default LogoLoop;
