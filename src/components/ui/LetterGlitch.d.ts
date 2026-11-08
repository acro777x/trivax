import React from 'react';

export interface LetterGlitchProps extends React.HTMLAttributes<HTMLDivElement> {
  glitchColors?: string[];
  baseColor?: string;
  baseOpacity?: number;
  fontSize?: number;
  spacing?: number;
  density?: number;
  glitchAmount?: number;
  speed?: number;
  flow?: number;
  clickEffect?: 'none' | 'tear' | 'burst';
  characters?: string;
  fontFamily?: string;
  cellSize?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const LetterGlitch: React.FC<LetterGlitchProps>;
export default LetterGlitch;
