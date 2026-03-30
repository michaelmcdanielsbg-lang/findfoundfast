import { NextResponse } from 'next/server'
import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_INBOX = 'Michaelmcdnaiel.sbg@gmail.com'

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

  if (body.type) {
    const attempts = [
      { ...base, property_type: body.type },
      { ...base, type: body.type },
      base,
    ]
    for (const row of attempts) {
      const { error } = await supabase.from('demo_requests').insert(row)
      if (!error) return
    }
    throw new Error('Failed to save demo request')
  }

  const { error } = await supabase.from('demo_requests').insert(base)
  if (error) throw new Error(error.message)
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
