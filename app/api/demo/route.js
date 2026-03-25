import { NextResponse } from 'next/server'
import { createBrowserClient } from '@supabase/ssr'

export async function POST(request) {
  try {
    const body = await request.json()
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    await supabase.from('demo_requests').insert({
      name: body.name,
      email: body.email,
      property_name: body.property,
      unit_count: body.units,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
