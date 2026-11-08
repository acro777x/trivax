import React from 'react';

export interface PixelSwapProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  pattern?: string;
  pixelSize?: number;
  pixelRadius?: number;
  duration?: number;
  pixelDuration?: number;
  randomness?: number;
  bounce?: number;
  trigger?: 'hover' | 'click';
  gap?: number;
  pixelScale?: number;
  pixelSpin?: number;
  intro?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const PixelSwap: React.FC<PixelSwapProps>;
export default PixelSwap;
