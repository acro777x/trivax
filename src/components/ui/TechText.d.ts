import React from 'react';

export interface TechTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  fontWeight?: number | string;
  fontSize?: number;
  reveal?: string;
  dashLength?: number;
  dashGap?: number;
  specks?: number;
  intro?: string;
  introDuration?: number;
  clickKick?: boolean;
  guides?: boolean;
  fontFamily?: string;
  letterSpacing?: number;
  accentColor?: string;
  reach?: number;
  softness?: number;
  lineStyle?: string;
  strokeWidth?: number;
  speed?: number;
  bounce?: number;
  selection?: boolean;
  labels?: boolean;
  color?: string;
  align?: string;
  draggable?: boolean;
  sweep?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const TechText: React.FC<TechTextProps>;
export default TechText;
