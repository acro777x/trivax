import React from 'react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  items?: StaggeredMenuItem[];
  productItems?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  logoComponent?: React.ReactNode;
  accentColor?: string;
  isFixed?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

declare const StaggeredMenu: React.FC<StaggeredMenuProps>;
export default StaggeredMenu;
