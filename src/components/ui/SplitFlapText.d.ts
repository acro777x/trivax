import React from 'react';

export interface SplitFlapTextProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: 'alpha' | 'alphanumeric' | 'numeric' | string;
  flipsPerChar?: number;
  order?: 'left' | 'right' | 'random';
  align?: 'left' | 'center' | 'right';
  tileStyle?: 'board' | 'minimal';
  tileColor?: string;
  textColor?: string;
  glare?: number;
  depth?: number;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  intro?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const SplitFlapText: React.FC<SplitFlapTextProps>;
export default SplitFlapText;
