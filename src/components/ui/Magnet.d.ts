import React from 'react';

export interface MagnetProps {
  children?: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  tilt?: number;
  scale?: number;
  wrapperClassName?: string;
  innerClassName?: string;
  exclusive?: boolean;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const Magnet: React.FC<MagnetProps>;
export default Magnet;
