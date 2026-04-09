/**
 * Split deploy: marketing (Loveable) on apex/www, Next.js app on app subdomain.
 * Set in .env: NEXT_PUBLIC_APP_ORIGIN, NEXT_PUBLIC_MARKETING_ORIGIN (optional).
 */

function stripTrailingSlash(s) {
  return s.replace(/\/$/, '')
}

export function getAppOrigin() {
  return stripTrailingSlash(process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://app.findfoundfast.com')
}

export function getMarketingOrigin() {
  return stripTrailingSlash(
    process.env.NEXT_PUBLIC_MARKETING_ORIGIN ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://findfoundfast.com'
  )
}

/** Full URL on the app host (e.g. get-started, auth). */
export function appUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${getAppOrigin()}${p}`
}

/** Full URL on the marketing site (Loveable), e.g. /pricing. */
export function marketingUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${getMarketingOrigin()}${p}`
}
