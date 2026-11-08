/**
 * Kavirox Design Tokens (Source of Truth)
 * Matches docs/redesign/02-design-system.md & docs/redesign-v2/07-logo-and-preloader.md
 */

export const TOKENS = {
  bg: '#060913',
  surface: '#0a1122',
  surface2: '#0f1a30',
  line: 'rgba(255, 255, 255, 0.10)',
  text: '#f6f8ff',
  textMuted: '#94a3b8',
  primary: '#38bdf8',
  primaryInk: '#030712',
  primaryMid: '#1e3fd8',
  primaryDeep: '#0f172a',
  brandGradient: 'linear-gradient(135deg, #38bdf8 0%, #1e3fd8 100%)',
} as const;

export const ASCII_RAMP = [
  '#1e3fd8',
  '#f6f8ff',
  '#a5d8ff',
  '#38bdf8',
] as const;

export const AURORA_COLORS = {
  color1: TOKENS.primaryMid,
  color2: TOKENS.primary,
} as const;

export const FONT_FAMILIES = {
  display: '"Bricolage Grotesque Variable", system-ui, -apple-system, sans-serif',
  body: '"Geist Variable", system-ui, -apple-system, sans-serif',
  mono: '"Geist Mono Variable", ui-monospace, monospace',
} as const;
