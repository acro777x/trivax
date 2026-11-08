import React from 'react';

export interface TargetCursorProps {
  targetSelector?: string;
  cursorColor?: string;
  cursorColorOnTarget?: string;
  spinDuration?: number;
  hoverDuration?: number;
  parallaxOn?: boolean;
  hideDefaultCursor?: boolean;
  size?: number;
  cornerSize?: number;
  thickness?: number;
  padding?: number;
  matchRadius?: boolean;
  showLabel?: boolean;
  clickEffect?: boolean;
  dotSize?: number;
  blendMode?: string;
  [key: string]: unknown;
}

declare const TargetCursor: React.FC<TargetCursorProps>;
export default TargetCursor;
