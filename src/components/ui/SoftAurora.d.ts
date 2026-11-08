import React from 'react';

export interface SoftAuroraProps {
  speed?: number;
  scale?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  bandHeight?: number;
  bandSpread?: number;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
  spectrum?: number;
  colorSpeed?: number;
  noiseFrequency?: number;
  noiseAmplitude?: number;
  tilt?: number;
  octaveDecay?: number;
  layerOffset?: number;
  clickPulse?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const SoftAurora: React.FC<SoftAuroraProps>;
export default SoftAurora;
