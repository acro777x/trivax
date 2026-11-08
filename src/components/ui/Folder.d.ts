import React from 'react';

export interface FolderItem {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export interface FolderProps {
  label?: string;
  items?: FolderItem[];
  mode?: 'book' | 'flap';
  variant?: 'solid' | 'glass';
  layout?: 'spread' | 'pile';
  color?: string;
  paperColor?: string;
  tabPosition?: 'left' | 'center' | 'right';
  openOn?: 'click' | 'hover';
  size?: number;
  frost?: number;
  tilt?: number;
  speed?: number;
  bounce?: number;
  peek?: boolean;
  intro?: boolean;
  draggable?: boolean;
  zoomOnClick?: boolean;
  theme?: 'dark' | 'light';
  onItemClick?: (item: FolderItem, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

declare const Folder: React.FC<FolderProps>;
export default Folder;
