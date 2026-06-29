/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lbc: {
          red: '#C8102E',
          redDark: '#9F1230',
          blue: '#102A43',
          blueLight: '#1F4E79',
          gray: '#F5F7FA',
        },
      },
      boxShadow: {
        soft: '0 12px 32px rgba(16, 42, 67, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
