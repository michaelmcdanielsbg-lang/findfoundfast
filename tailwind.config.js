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
        // Marketing type scale — DM Sans body + Space Mono UI
        // Body: 16px min (mobile accessibility baseline) → ~17px on large viewports (fluid)
        'fff-body': [
          'clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)',
          { lineHeight: '1.65' },
        ],
        'fff-body-sm': ['1rem', { lineHeight: '1.55' }], // 16px — cards / tight blocks
        'fff-secondary': ['1rem', { lineHeight: '1.55' }], // 16px — subcopy
        'fff-caption': ['0.9375rem', { lineHeight: '1.55' }], // 15px — quotes / notes
        // Footer / legal — keep ≥14px (avoid “tiny print” as default body-adjacent UI)
        'fff-micro': ['0.875rem', { lineHeight: '1.5' }], // 14px
        // Mono caps: 13px + moderate tracking (wide tracking + small size hurts legibility)
        'fff-eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }], // 13px uppercase labels
      },
    },
  },
  plugins: [],
}
