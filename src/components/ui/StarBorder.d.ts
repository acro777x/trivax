import React from 'react';

export interface StarBorderProps {
  as?: React.ElementType;
  color?: string;
  trailColor?: string;
  duration?: number;
  direction?: 'clockwise' | 'counter-clockwise';
  stars?: number;
  trailLength?: number;
  thickness?: number;
  radius?: number;
  glow?: number;
  hover?: string;
  sparkle?: boolean;
  clickPulse?: boolean;
  theme?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const StarBorder: React.FC<StarBorderProps>;
export default StarBorder;
