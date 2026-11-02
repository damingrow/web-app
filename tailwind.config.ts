import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: 'var(--brand-green-50)',
            100: 'var(--brand-green-100)',
            200: 'var(--brand-green-200)',
            300: 'var(--brand-green-300)',
            400: 'var(--brand-green-400)',
            500: 'var(--brand-green-500)',
            600: 'var(--brand-green-600)',
            700: 'var(--brand-green-700)',
            800: 'var(--brand-green-800)',
            900: 'var(--brand-green-900)',
          },
          lime: {
            50: 'var(--brand-lime-50)',
            100: 'var(--brand-lime-100)',
            200: 'var(--brand-lime-200)',
            300: 'var(--brand-lime-300)',
            400: 'var(--brand-lime-400)',
            500: 'var(--brand-lime-500)',
            600: 'var(--brand-lime-600)',
            700: 'var(--brand-lime-700)',
            800: 'var(--brand-lime-800)',
            900: 'var(--brand-lime-900)',
          },
          teal: {
            50: 'var(--brand-teal-50)',
            100: 'var(--brand-teal-100)',
            200: 'var(--brand-teal-200)',
            300: 'var(--brand-teal-300)',
            400: 'var(--brand-teal-400)',
            500: 'var(--brand-teal-500)',
            600: 'var(--brand-teal-600)',
            700: 'var(--brand-teal-700)',
            800: 'var(--brand-teal-800)',
            900: 'var(--brand-teal-900)',
          },
          supporting: 'var(--brand-supporting-teal)',
        },
        semantic: {
          success: {
            bg: 'var(--color-success-bg)',
            border: 'var(--color-success-border)',
            text: 'var(--color-success-text)',
            fill: 'var(--color-success-fill)',
          },
          warning: {
            bg: 'var(--color-warning-bg)',
            border: 'var(--color-warning-border)',
            text: 'var(--color-warning-text)',
            fill: 'var(--color-warning-fill)',
          },
          error: {
            bg: 'var(--color-error-bg)',
            border: 'var(--color-error-border)',
            text: 'var(--color-error-text)',
            fill: 'var(--color-error-fill)',
          },
          info: {
            bg: 'var(--color-info-bg)',
            border: 'var(--color-info-border)',
            text: 'var(--color-info-text)',
            fill: 'var(--color-info-fill)',
          },
          coldchain: {
            bg: 'var(--color-coldchain-bg)',
            border: 'var(--color-coldchain-border)',
            text: 'var(--color-coldchain-text)',
          },
          prescription: {
            bg: 'var(--color-prescription-bg)',
            border: 'var(--color-prescription-border)',
            text: 'var(--color-prescription-text)',
          },
          nafdac: {
            bg: 'var(--color-nafdac-bg)',
            border: 'var(--color-nafdac-border)',
            text: 'var(--color-nafdac-text)',
          },
        },
      },
      fontFamily: {
        heading: ['var(--font-family-heading)'],
        body: ['var(--font-family-body)'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
    },
  },
  plugins: [],
};

export default config;
