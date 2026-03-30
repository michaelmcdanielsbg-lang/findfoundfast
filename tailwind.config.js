/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // FindFoundFast brand (matches findfoundfast.com marketing)
        fff: {
          bg: '#0A0A0A',
          card: '#111111',
          gray: '#141414',
          green: '#00FF87',
          yellow: '#FFE135',
          white: '#F5F5F5',
          // Secondary text on #0A0A0A — was #555 (too low-contrast for small UI copy)
          muted: '#A3A3A3',
          rose: '#FF3D3D',
        },
        sky: { DEFAULT: '#2E8FF0', dark: '#1A5FA8', light: '#EBF4FE' },
        ink: '#0D1B2A',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
