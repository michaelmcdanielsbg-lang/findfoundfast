import './globals.css'

export const metadata = {
  title: 'FindFoundFast — Deliveries. Simplified.',
  description: 'Property managers set up once. Every driver finds every unit instantly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
