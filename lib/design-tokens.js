/**
 * Shared branding constants — keep in sync with tailwind.config.js semantic colors
 * and with the Lovable marketing site (accent, dark theme).
 *
 * Lovable reference: dark theme, accent hsl(155, 100%, 45%) green.
 * Next app fonts: DM Sans + Space Mono (layout.js). Loveable may use Space Grotesk + JetBrains Mono — switch via next/font when aligning.
 */

/** Primary / brand green — matches Tailwind `primary` / `accent` */
export const ACCENT_HSL = '155 100% 45%'
export const ACCENT_HEX = '#00FF87' // legacy `fff.green`; close to hsl(155 100% 45%)

/** Tailwind-aligned semantic roles (string form for arbitrary CSS) */
export const tokens = {
  background: 'hsl(150 10% 3%)',
  foreground: 'hsl(150 5% 95%)',
  primary: 'hsl(155 100% 45%)',
  primaryForeground: 'hsl(150 10% 3%)',
  border: 'hsl(150 5% 15%)',
  card: 'hsl(150 8% 7%)',
  mutedForeground: 'hsl(150 5% 55%)',
}
