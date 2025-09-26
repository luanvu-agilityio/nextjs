export const COLOR_PALETTE: Record<string, { label: string; hex: string }> = {
  black: { label: 'Black', hex: '#0F172A' },
  white: { label: 'White', hex: '#FFFFFF' },
  gray: { label: 'Gray', hex: '#9CA3AF' },
  blue: { label: 'Blue', hex: '#3B82F6' },
  green: { label: 'Green', hex: '#10B981' },
  purple: { label: 'Purple', hex: '#7C3AED' },
  red: { label: 'Red', hex: '#EF4444' },
};

export const DEFAULT_COLOR_KEYS = Object.keys(COLOR_PALETTE);

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
