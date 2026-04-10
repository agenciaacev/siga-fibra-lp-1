/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00C9A7',
          dark: '#00A88C',
          darker: '#007A65',
          light: '#E0FAF5',
          lighter: '#F0FDFB',
        },
        dark: '#1A1F2E',
        muted: '#6B7280',
        bg: '#EEF2F5',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        DM: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'pulse-slow': 'pulse 2.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
