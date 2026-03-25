/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: { DEFAULT: '#2E8FF0', dark: '#1A5FA8', light: '#EBF4FE' },
        ink: '#0D1B2A',
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
