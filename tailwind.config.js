/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: 'hsl(150 5% 15%)',
        background: 'hsl(150 10% 3%)',
        foreground: 'hsl(150 5% 95%)',
        primary: { DEFAULT: 'hsl(155 100% 45%)', foreground: 'hsl(150 10% 3%)' },
        secondary: { DEFAULT: 'hsl(150 6% 12%)', foreground: 'hsl(150 5% 80%)' },
        destructive: { DEFAULT: 'hsl(0 72% 51%)', foreground: 'hsl(0 0% 100%)' },
        muted: { DEFAULT: 'hsl(150 5% 15%)', foreground: 'hsl(150 5% 55%)' },
        accent: { DEFAULT: 'hsl(155 100% 45%)', foreground: 'hsl(150 10% 3%)' },
        card: { DEFAULT: 'hsl(150 8% 7%)', foreground: 'hsl(150 5% 95%)' },
        // FindFoundFast marketing / app utilities (bg-fff-*, text-fff-*, etc.)
        fff: {
          bg: '#0A0A0A',
          card: '#111111',
          gray: '#141414',
          green: '#00FF87',
          yellow: '#FFE135',
          white: '#F5F5F5',
          muted: '#A3A3A3',
          rose: '#FF3D3D',
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
      },
      fontSize: {
        'fff-body': ['clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)', { lineHeight: '1.65' }],
        'fff-body-sm': ['1rem', { lineHeight: '1.55' }],
        'fff-secondary': ['1rem', { lineHeight: '1.55' }],
        'fff-caption': ['0.9375rem', { lineHeight: '1.55' }],
        'fff-micro': ['0.875rem', { lineHeight: '1.5' }],
        'fff-eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        scroll: 'scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
}
