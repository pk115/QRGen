import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f1f5f3',
          100: '#e2ebe6',
          200: '#c6d8cd',
          300: '#a0bcab',
          400: '#729780',
          500: '#2d4535',
          600: '#24382b',
          700: '#1b2a20',
          800: '#121c16',
          900: '#090e0b',
        },
        accent: {
          DEFAULT: '#f19c2b',
          hover: '#d98a21',
        },
        cream: {
          DEFAULT: '#e6dab0',
          dark: '#d6ca9a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0,0,0,0.08)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
