import React from 'react';

export interface ScrollFloatProps {
  children?: React.ReactNode;
  as?: any;
  effect?: 'float' | 'wave' | 'scatter';
  splitBy?: 'chars' | 'words';
  direction?: 'up' | 'down';
  order?: 'start' | 'end' | 'center' | 'random';
  fromColor?: string;
  toColor?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  distance?: number;
  stretch?: number;
  smoothing?: number;
  containerClassName?: string;
  textClassName?: string;
  style?: React.CSSProperties;
}

declare const ScrollFloat: React.FC<ScrollFloatProps>;
export default ScrollFloat;
