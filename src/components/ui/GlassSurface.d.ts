import React from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  distortionScale?: number;
  displace?: number;
  backgroundOpacity?: number;
  shape?: string;
  backdrop?: React.RefObject<HTMLImageElement | null>;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  saturation?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  refraction?: boolean;
  renderer?: 'auto' | 'svg' | 'webgl';
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const GlassSurface: React.FC<GlassSurfaceProps>;
export default GlassSurface;
