import React from 'react';

export interface FoldTextProps {
  text?: string;
  foldStyle?: 'paper' | 'origami' | 'blinds';
  splitBy?: 'char' | 'word' | 'line';
  hinge?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'mount' | 'scroll';
  foldAngle?: number;
  duration?: number;
  stagger?: number;
  staggerFrom?: 'start' | 'end' | 'center' | 'edges' | 'random';
  ease?: string;
  loopDelay?: number;
  hoverRefold?: boolean;
  refoldRadius?: number;
  refoldAngle?: number;
  perspective?: number;
  creaseShading?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare const FoldText: React.FC<FoldTextProps>;
export default FoldText;
