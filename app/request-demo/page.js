'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { appUrl, marketingUrl } from '@/lib/site';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50';

const inputClass = `rounded-xl border border-stone-200 bg-white px-4 py-3 font-sans text-fff-secondary text-stone-900 outline-none transition-colors placeholder:text-stone-400 ${focusRing}`;

export default function GetStartedPage() {
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('Apartments');
  const [units, setUnits] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const propertyTypeOptions = useMemo(
    () => [
      'Apartments',
      'Offices',
      'Nursing homes',
      'Hospitals',
      'Schools',
      'Homes',
      'Other',
    ],
    []
  );

  const canSubmit =
    propertyName.trim().length > 0 &&
    units.trim().length > 0 &&
    name.trim().length > 0 &&
    email.trim().length > 0;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!canSubmit) {
      setError('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property: propertyName,
          type: propertyType,
          units: Number(units),
          name,
          email,
          phone,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Request failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[min(55vh,480px)] opacity-100"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,255,135,0.07), transparent 55%)',
        }}
      />

      <header className="relative z-10 border-b border-stone-200 bg-white/90 backdrop-blur-xl">
        <div className="flex flex-col gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <a
            href={marketingUrl('/')}
            className={`text-lg font-extrabold tracking-tight text-stone-900 transition-colors hover:text-stone-800 ${focusRing} rounded-sm`}
          >
            Find<span className="text-[#00c46f]">Found</span>Fast
          </a>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <a
              href={marketingUrl('/')}
              className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
            >
              Home
            </a>
            <a
              href={marketingUrl('/pricing')}
              className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
            >
              Pricing
            </a>
            <a
              href={marketingUrl('/how-it-works')}
              className={`font-mono text-sm font-bold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-900 ${focusRing} rounded-sm`}
            >
              How it works
            </a>
            <Link
              href={appUrl('/auth/login')}
              className={`font-mono text-sm font-bold uppercase tracking-wide text-emerald-700 transition-colors hover:text-emerald-900 ${focusRing} rounded-sm`}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="w-full max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-mono text-fff-eyebrow font-bold uppercase text-emerald-800 sm:mb-5">
            Request a demo
          </p>

          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Tell us about your property
          </h1>
          <p className="mb-4 text-sm text-stone-600">
            Want to sign up yourself?{' '}
            <Link href={appUrl('/auth/login')} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900">
              Create an account or sign in
            </Link>
            .
          </p>
          <p className="mb-2 max-w-2xl text-fff-body-sm leading-relaxed text-stone-600 sm:mb-3 sm:text-fff-body">
            We’ll reach out by email. Fill in the basics below and we’ll take it from there.
          </p>
          <p className="mb-6 max-w-2xl text-fff-caption text-stone-500 sm:mb-8 sm:text-fff-secondary">
            Typical reply: <span className="text-stone-700">within one business day</span> with next steps
            and billing (monthly or annual—your call).
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-sm">
              <h2 className="mb-2 text-xl font-extrabold text-emerald-700">Thanks — we got it.</h2>
              <p className="text-fff-secondary leading-relaxed text-stone-600">
                Next step: we’ll email you soon with a couple quick questions and
                how to set up your building guide.
              </p>
              <div className="mt-6">
                <Link
                  href="/how-it-works?audience=property"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] ${focusRing}`}
                >
                  See how it works →
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-stone-200 bg-white px-5 py-7 shadow-sm sm:px-6 sm:py-8"
            >
              {error ? (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-fff-caption text-rose-900">
                  {error}
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Property name*
                  </span>
                  <input
                    required
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Sunny Apartments"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Property type*
                  </span>
                  <select
                    required
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className={inputClass}
                  >
                    {propertyTypeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Contact name*
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Email*
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Phone / contact number
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. (555) 123-4567"
                  />
                </label>

                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-mono text-fff-eyebrow font-bold uppercase text-emerald-700">
                    Approx. # of units*
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 120"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wide text-fff-bg shadow-sm shadow-emerald-900/10 transition-colors hover:bg-[#00e67a] disabled:opacity-60 disabled:hover:bg-fff-green ${focusRing}`}
                >
                  {submitting ? 'Sending…' : 'Submit →'}
                </button>

                <p className="text-fff-micro leading-relaxed text-stone-500 sm:text-fff-caption">
                  By submitting, you’re asking us to contact you about FindFoundFast.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="relative z-10 border-t border-stone-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-fff-micro text-stone-500 sm:py-8">
        <span className="text-stone-700">FindFoundFast</span>
        <span className="mx-1.5 text-stone-400">·</span>
        <a
          href="https://findfoundfast.com"
          rel="noopener noreferrer"
          className={`text-stone-500 transition-colors hover:text-emerald-700 ${focusRing} rounded-sm`}
        >
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}
