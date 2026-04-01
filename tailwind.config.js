/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // FindFoundFast brand (matches findfoundfast.com marketing)
        fff: {
          // Legacy aliases
          bg: '#0A0A0A',
          card: '#111111',
          gray: '#141414',
          green: '#00FF87',
          yellow: '#FFE135',
          white: '#F5F5F5',
          muted: '#A3A3A3',
          rose: '#FF3D3D',
          // Semantic roles
          surface: '#0A0A0A',
          'surface-elevated': '#111111',
          'surface-subtle': '#141414',
          border: '#2A2A2A',
          'text-primary': '#F5F5F5',
          'text-secondary': '#C9C9C9',
          'text-muted': '#A3A3A3',
          accent: '#00FF87',
          'accent-warm': '#FFE135',
          danger: '#FF3D3D',
        },
        sky: { DEFAULT: '#2E8FF0', dark: '#1A5FA8', light: '#EBF4FE' },
        ink: '#0D1B2A',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Marketing type scale — DM Sans body + Space Mono UI (see layout + globals)
        'fff-body': ['1.0625rem', { lineHeight: '1.625' }], // 17px — default reading
        'fff-body-sm': ['1rem', { lineHeight: '1.5' }], // 16px — cards / tight blocks
        'fff-secondary': ['0.9375rem', { lineHeight: '1.55' }], // 15px — subcopy
        'fff-caption': ['0.875rem', { lineHeight: '1.5' }], // 14px — quotes / notes
        'fff-micro': ['0.8125rem', { lineHeight: '1.45' }], // 13px — footer
        'fff-eyebrow': ['0.6875rem', { lineHeight: '1.25', letterSpacing: '0.2em' }], // 11px uppercase labels
      },
    },
  },
  plugins: [],
}
