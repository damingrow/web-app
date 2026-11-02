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
          gold: {
            50: 'var(--brand-gold-50)',
            100: 'var(--brand-gold-100)',
            200: 'var(--brand-gold-200)',
            300: 'var(--brand-gold-300)',
            400: 'var(--brand-gold-400)',
            500: 'var(--brand-gold-500)',
            600: 'var(--brand-gold-600)',
            700: 'var(--brand-gold-700)',
          },
          dark: 'var(--brand-dark)',
          'dark-card': 'var(--brand-dark-card)',
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
        'green': '0 20px 40px -12px rgb(0 191 98 / 0.35)',
        'green-sm': '0 4px 14px -2px rgb(0 191 98 / 0.25)',
        'glow': '0 0 20px rgba(0, 191, 98, 0.4), 0 4px 14px rgba(0, 191, 98, 0.25)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,191,98,0.15) 0%, transparent 60%)',
        'green-glow': 'radial-gradient(ellipse at center, rgba(0,191,98,0.2) 0%, transparent 70%)',
        'grid-pattern': "linear-gradient(rgba(0,191,98,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,98,0.05) 1px, transparent 1px)",
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-green': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0, 191, 98, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 0 8px rgba(0, 191, 98, 0)' },
        },
        'shimmer': {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
    },
  },
  plugins: [],
};

export default config;
