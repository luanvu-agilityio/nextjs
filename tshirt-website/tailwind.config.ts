import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  theme: {
    extend: {
      fontFamily: {
        tertiary: ['var(--font-tertiary)'],
        secondary: ['var(--font-secondary)'],
        primary: ['var(--font-primary)'],
      },
      fontSize: {
        sm: '14px',
        lg: '18px',
        xl: '24px',
        '2xl': '36px',
        '3xl': '40px',
        '4xl': '48px',
      },
    },
  },
  plugins: [],
} satisfies Config;
