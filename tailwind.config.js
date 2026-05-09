/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FDF8EE',
          100: '#F6E8C4',
          200: '#EDD28A',
          400: '#C8963E',
          600: '#9B6E22',
          800: '#6B4A12',
        },
        navy: {
          900: '#08131E',
          800: '#0D1B2A',
          700: '#1A2E44',
        },
        cream: '#FAF6EF',
        parchment: '#F0E8D8',
      },
      fontFamily: {
        serif: ['"Frank Ruhl Libre"', 'Georgia', 'serif'],
        sans:  ['"Heebo"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
