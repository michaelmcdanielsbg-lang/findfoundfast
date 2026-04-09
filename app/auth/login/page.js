'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

const inputClass =
  'w-full rounded-xl border border-fff-border bg-fff-surface-subtle px-4 py-3 font-sans text-sm text-fff-text-primary outline-none transition placeholder:text-fff-text-muted focus-visible:border-fff-green/50 focus-visible:ring-2 focus-visible:ring-fff-green/25'

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.17 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.65 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthBusy, setOauthBusy] = useState(null)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const asManager = searchParams.get('as') === 'manager'

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  useEffect(() => {
    if (searchParams.get('error') === 'oauth') {
      setError('Sign-in with Google or Apple did not finish. Try again, or use email and password.')
    }
  }, [searchParams])

  async function signInWithProvider(provider) {
    setError('')
    setOauthBusy(provider)
    const origin = window.location.origin
    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback`,
        skipBrowserRedirect: false,
      },
    })
    if (oAuthError) {
      setError(oAuthError.message)
      setOauthBusy(null)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (mode === 'login') {
      const { data, error: signErr } = await supabase.auth.signInWithPassword({ email, password })
      if (signErr) {
        setError(signErr.message)
        setLoading(false)
        return
      }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      if (profile?.role === 'manager') router.push('/manager')
      else router.push('/resident')
    } else {
      const meta = { full_name: name }
      if (asManager) meta.role = 'manager'
      const { error: signErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: meta },
      })
      if (signErr) {
        setError(signErr.message)
        setLoading(false)
        return
      }
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-fff-bg px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-fff-border bg-fff-card px-8 py-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="mb-4 text-4xl" aria-hidden>
            📬
          </div>
          <h2 className="font-sans text-xl font-extrabold tracking-tight text-fff-text-primary">Check your email</h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-fff-text-secondary">
            We sent a confirmation link to <strong className="text-fff-text-primary">{email}</strong>.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block font-mono text-xs font-bold uppercase tracking-wider text-fff-green hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const oauthDisabled = !!oauthBusy || loading

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-fff-bg px-4 py-12">
      {/* subtle top glow */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,135,0.12),transparent)]"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-fff-border bg-fff-card p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
          <Link
            href="/"
            className="mb-8 block text-center font-sans text-xl font-extrabold tracking-tight text-fff-text-primary no-underline"
          >
            Find<span className="text-fff-green">Found</span>Fast
          </Link>

          {asManager && (
            <p className="mb-6 text-center font-sans text-sm leading-relaxed text-fff-text-secondary">
              Property manager sign up — you&apos;ll set up buildings and photo guides after email confirmation.
            </p>
          )}

          {/* Sign in / Create account */}
          <div className="mb-6 flex rounded-xl border border-fff-border bg-fff-surface-subtle p-1">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-lg py-2.5 font-sans text-sm font-semibold transition-colors ${
                  mode === m
                    ? 'bg-fff-green text-[#0A0A0A] shadow-sm'
                    : 'text-fff-text-muted hover:text-fff-text-secondary'
                }`}
              >
                {m === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {/* OAuth */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              disabled={oauthDisabled}
              onClick={() => signInWithProvider('google')}
              className="flex h-12 items-center justify-center gap-3 rounded-xl border border-fff-border bg-white font-sans text-sm font-semibold text-[#1f1f1f] shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <GoogleIcon className="h-5 w-5 shrink-0" />
              {oauthBusy === 'google' ? 'Opening Google…' : 'Continue with Google'}
            </button>
            <button
              type="button"
              disabled={oauthDisabled}
              onClick={() => signInWithProvider('apple')}
              className="flex h-12 items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-[#000] font-sans text-sm font-semibold text-white transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <AppleIcon className="h-5 w-5 shrink-0" />
              {oauthBusy === 'apple' ? 'Opening Apple…' : 'Continue with Apple'}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-fff-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-fff-card px-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-fff-text-muted">
                or email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {mode === 'signup' && (
              <input
                className={inputClass}
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            )}
            <input
              className={inputClass}
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              className={inputClass}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {error && <p className="font-sans text-sm text-fff-rose">{error}</p>}
            <button
              type="submit"
              disabled={loading || !!oauthBusy}
              className="mt-1 flex h-12 items-center justify-center rounded-xl bg-fff-green font-sans text-sm font-extrabold text-[#0A0A0A] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {asManager && (
            <p className="mt-4 font-sans text-xs leading-relaxed text-fff-text-muted">
              For a <strong className="text-fff-text-secondary">property manager</strong> account, use{' '}
              <strong className="text-fff-text-secondary">Create account</strong> with email (not Google/Apple yet), or
              we can switch your role after you sign in.
            </p>
          )}

          <p className="mt-8 text-center font-mono text-xs">
            <Link href="/" className="font-bold uppercase tracking-wider text-fff-green hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-fff-bg font-sans text-fff-text-muted">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}

export const dynamic = 'force-dynamic'
