import React from 'react';

export interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  strokeStyle?: 'solid' | 'dashed';
  strokeWidth?: number;
  dashLength?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: 'mount' | 'scroll';
  fillMode?: 'wipe' | 'fade' | 'none';
  wipeFrom?: 'left' | 'right' | 'top' | 'bottom';
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  marching?: boolean;
  hoverRedraw?: boolean;
  shadow?: boolean;
  fontFamily?: string;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const StrokeText: React.FC<StrokeTextProps>;
export default StrokeText;
