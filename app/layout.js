import { DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'FindFoundFast — Micro-location guidance for deliveries or visitors',
  description:
    'Micro-location guidance for deliveries or visitors—timed photo links and expiring gate codes so people find the door, not just the pin. No app for guests.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fafaf9',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <body
        className={`${dmSans.className} min-h-[100dvh] bg-stone-50 text-fff-body text-stone-900 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
