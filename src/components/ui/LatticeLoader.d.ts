import React from 'react';

export interface LatticeLoaderProps {
  status?: 'working' | 'done' | 'error' | 'idle';
  label?: string;
  doneLabel?: string;
  errorLabel?: string;
  pattern?: string;
  grid?: number;
  shape?: 'square' | 'round';
  doneColor?: string;
  errorColor?: string;
  cellSize?: number;
  gap?: number;
  fontSize?: number;
  step?: number;
  idleOpacity?: number;
  glow?: boolean;
  glowColor?: string;
  showTimer?: boolean;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const LatticeLoader: React.FC<LatticeLoaderProps>;
export default LatticeLoader;
