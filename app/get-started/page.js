'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fff-green/55 focus-visible:ring-offset-2 focus-visible:ring-offset-fff-bg';

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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-fff-bg">
      <div
        className="pointer-events-none fixed inset-0 opacity-100"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,135,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div
        className="pointer-events-none fixed top-[8%] left-1/2 h-[min(70vh,520px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full opacity-100"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,255,135,0.07) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <header className="relative z-10 border-b border-white/[0.08] bg-fff-bg/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-6 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-tight text-fff-white transition-colors hover:text-fff-white/90 ${focusRing} rounded-sm`}
        >
          Find<span className="text-fff-green">Found</span>Fast
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
          <Link
            href="/"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            Pricing
          </Link>
          <Link
            href="/how-it-works?tab=manager"
            className={`font-mono text-xs font-bold uppercase tracking-wide text-fff-white/90 transition-colors hover:text-fff-green sm:text-sm ${focusRing} rounded-sm`}
          >
            How it works
          </Link>
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-fff-green sm:text-sm">
            Get started
          </span>
        </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="w-full max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-fff-green/25 bg-fff-green/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-fff-green sm:mb-5 sm:text-xs sm:tracking-[0.2em]">
            Get started
          </p>

          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-fff-white sm:text-4xl">
            Tell us about your property
          </h1>
          <p className="mb-2 max-w-2xl text-[15px] leading-relaxed text-fff-white/75 sm:mb-3 sm:text-base">
            We’ll reach out by email. Fill in the basics below and we’ll take it from there.
          </p>
          <p className="mb-6 max-w-2xl text-sm text-fff-white/55 sm:mb-8 sm:text-[15px]">
            Typical reply: <span className="text-fff-white/75">within one business day</span> with next steps
            and billing (monthly or annual—your call).
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-6 py-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
              <h2 className="mb-2 text-xl font-extrabold text-fff-green">
                Thanks — we got it.
              </h2>
              <p className="text-[15px] leading-relaxed text-fff-white/75">
                Next step: we’ll email you soon with a couple quick questions and
                how to set up your building guide.
              </p>
              <div className="mt-6">
                <Link
                  href="/how-it-works?tab=manager"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg transition-colors hover:bg-fff-yellow ${focusRing}`}
                >
                  See how it works →
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:px-6 sm:py-8"
            >
              {error ? (
                <div className="mb-5 rounded-xl border border-fff-rose/35 bg-fff-rose/[0.08] px-4 py-3 text-[14px] text-fff-white">
                  {error}
                </div>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green">
                    Property name*
                  </span>
                  <input
                    required
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className={`rounded-xl border border-white/[0.12] bg-[#111] px-4 py-3 font-sans text-[15px] text-fff-white outline-none transition-colors ${focusRing}`}
                    placeholder="e.g. Sunny Apartments"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green">
                    Property type*
                  </span>
                  <select
                    required
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className={`rounded-xl border border-white/[0.12] bg-[#111] px-4 py-3 font-sans text-[15px] text-fff-white outline-none transition-colors ${focusRing}`}
                  >
                    {propertyTypeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green">
                    Contact name*
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`rounded-xl border border-white/[0.12] bg-[#111] px-4 py-3 font-sans text-[15px] text-fff-white outline-none transition-colors ${focusRing}`}
                    placeholder="Your name"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green">
                    Email*
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`rounded-xl border border-white/[0.12] bg-[#111] px-4 py-3 font-sans text-[15px] text-fff-white outline-none transition-colors ${focusRing}`}
                    placeholder="you@company.com"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green">
                    Phone / contact number
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`rounded-xl border border-white/[0.12] bg-[#111] px-4 py-3 font-sans text-[15px] text-fff-white outline-none transition-colors ${focusRing}`}
                    placeholder="e.g. (555) 123-4567"
                  />
                </label>

                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-fff-green">
                    Approx. # of units*
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className={`rounded-xl border border-white/[0.12] bg-[#111] px-4 py-3 font-sans text-[15px] text-fff-white outline-none transition-colors ${focusRing}`}
                    placeholder="e.g. 120"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-lg bg-fff-green px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wide text-fff-bg transition-colors hover:bg-fff-yellow disabled:opacity-60 disabled:hover:bg-fff-green ${focusRing}`}
                >
                  {submitting ? 'Sending…' : 'Submit →'}
                </button>

                <p className="text-[13px] leading-relaxed text-fff-white/60 sm:text-sm">
                  By submitting, you’re asking us to contact you about FindFoundFast.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[13px] text-fff-muted sm:py-8 sm:text-sm">
        <span className="text-fff-white/70">FindFoundFast</span>
        <span className="mx-1.5 text-fff-muted/80">·</span>
        <a
          href="https://findfoundfast.com"
          rel="noopener noreferrer"
          className={`text-fff-muted transition-colors hover:text-fff-green ${focusRing} rounded-sm`}
        >
          findfoundfast.com
        </a>
      </footer>
    </div>
  );
}

