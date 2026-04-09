'use client'
import { useState } from 'react'
import { appUrl } from '@/lib/site'

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="text-xl font-bold tracking-tight">
          Find<span className="text-primary">Found</span>Fast
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href={appUrl('/get-started')}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold tracking-wider uppercase hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get Started
          </a>
        </div>

        <button type="button" onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              {l.label}
            </a>
          ))}
          <a href={appUrl('/get-started')} onClick={() => setOpen(false)} className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold text-center tracking-wider uppercase mt-2">
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}
