/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lbc: {
          red: '#C8102E',
          redDark: '#9F1230',
          blue: '#3F5275',
          blueDark: '#27324D',
          navy: '#141A2D',
          blueLight: '#52668B',
          green: '#10B72A',
          gray: '#F6F7F9',
          ink: '#2F3C5D',
        },
      },
      boxShadow: {
        soft: '0 16px 42px rgba(47, 60, 93, 0.12)',
        pill: '0 14px 32px rgba(47, 60, 93, 0.16)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
