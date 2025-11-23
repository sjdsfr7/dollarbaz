import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // DOLLARBAZ PALETTE
        brand: {
          teal: '#278664', // Primary Brand
          olive: {
            dark: '#4e594a', // Dark Text / Secondary
            med: '#676e5d', // Subtext
          },
          sage: '#79a471', // Accents
          cream: '#fefeea', // Light Mode BG
          offwhite: '#f9fafb', // Alt Light Mode BG
        },

        // DARK MODE NEON PALETTE
        neon: {
          blue: '#4de3ff',
          flame: '#ff5e3a',
          purple: '#ab72ff',
        },
        carbon: {
          grey: '#12181f',
          black: '#0a0e12',
        },
        titanium: '#e3e8f1',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-light':
          'radial-gradient(circle at 50% 50%, #fefeea 0%, #f9fafb 100%)',
        'hero-dark':
          'radial-gradient(circle at 50% 0%, #1a232e 0%, #12181f 100%)',
        'ai-gradient':
          'linear-gradient(to bottom, var(--bg-top), var(--bg-mid) 15%, var(--bg-mid) 85%, var(--bg-bottom) 100%)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s infinite',
        ticker: 'ticker 40s linear infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(77, 227, 255, 0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(77, 227, 255, 0.8)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
