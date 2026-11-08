import React from 'react';

export interface GooeyNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  initialActiveIndex?: number;
  activeIndex?: number;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  frame?: boolean;
  particleCount?: number;
  spread?: number;
  animationTime?: number;
  timeVariance?: number;
  gooeyness?: number;
  wobble?: number;
  hoverEffect?: boolean;
  pillColor?: string;
  textColor?: string;
  onChange?: (index: number, item: GooeyNavItem) => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const GooeyNav: React.FC<GooeyNavProps>;
export default GooeyNav;
