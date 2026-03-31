import { NextResponse } from 'next/server'
import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_INBOX = 'michaelmcdaniel.sbg@gmail.com'

async function sendLeadNotificationEmail(body) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_INBOX_EMAIL || DEFAULT_INBOX
  if (!apiKey) {
    console.warn('[demo] RESEND_API_KEY not set; skipping email notification')
    return { skipped: true }
  }

  const from =
    process.env.RESEND_FROM || 'FindFoundFast <onboarding@resend.dev>'

  const lines = [
    'New FindFoundFast lead (get started / demo)',
    '',
    `Contact name: ${body.name ?? ''}`,
    `Email: ${body.email ?? ''}`,
    `Phone: ${body.phone ?? '(not provided)'}`,
    `Property: ${body.property ?? ''}`,
    `Property type: ${body.type ?? '(not provided)'}`,
    `Approx. units: ${body.units ?? ''}`,
  ]

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email,
      subject: `FindFoundFast lead: ${body.property || 'Unknown property'}`,
      text: lines.join('\n'),
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('[demo] Resend error', res.status, errText)
    throw new Error('Email notification failed')
  }

  return { skipped: false }
}

async function insertDemoRequest(supabase, body) {
  const base = {
    name: body.name,
    email: body.email,
    property_name: body.property,
    unit_count: body.units,
  }
  const withPhoneAttempts = [
    { ...base, phone: body.phone || null },
    { ...base, contact_number: body.phone || null },
    { ...base, phone_number: body.phone || null },
    base,
  ]

  if (body.type) {
    const attempts = withPhoneAttempts.flatMap((row) => [
      { ...row, property_type: body.type },
      { ...row, type: body.type },
      row,
    ])
    for (const row of attempts) {
      const { error } = await supabase.from('demo_requests').insert(row)
      if (!error) return
    }
    throw new Error('Failed to save demo request')
  }

  for (const row of withPhoneAttempts) {
    const { error } = await supabase.from('demo_requests').insert(row)
    if (!error) return
  }
  throw new Error('Failed to save demo request')
}

export async function POST(request) {
  try {
    const body = await request.json()
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    await insertDemoRequest(supabase, body)

    try {
      await sendLeadNotificationEmail(body)
    } catch (e) {
      console.error('[demo] notify error:', e)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
