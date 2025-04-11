/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backdropBlur: {
        xl: '24px',
      },
      colors: {
        'dark-bg': '#0A0A0A',
      },
      backgroundColor: {
        'dark-card': 'rgba(10, 10, 10, 0.4)',
      },
    },
  },
  plugins: [],
} 