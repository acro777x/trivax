import React from 'react';

export interface ParticlesProps {
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  glow?: number;
  twinkle?: number;
  moveParticlesOnHover?: boolean;
  hoverEffect?: 'parallax' | 'repel' | 'attract';
  sizeRandomness?: number;
  shape?: 'circle' | 'square' | 'ring' | 'sparkle';
  depthOfField?: number;
  connections?: boolean;
  connectionDistance?: number;
  particleHoverFactor?: number;
  hoverRadius?: number;
  drift?: 'none' | 'up' | 'down' | 'forward';
  driftSpeed?: number;
  alphaParticles?: boolean;
  disableRotation?: boolean;
  cameraDistance?: number;
  variation?: number;
  opacity?: number;
  clickBurst?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const Particles: React.FC<ParticlesProps>;
export default Particles;
