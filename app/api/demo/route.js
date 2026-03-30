import { NextResponse } from 'next/server'
import { createBrowserClient } from '@supabase/ssr'

export async function POST(request) {
  try {
    const body = await request.json()
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const base = {
      name: body.name,
      email: body.email,
      property_name: body.property,
      unit_count: body.units,
    }

    // If your Supabase schema already has a column for the property type,
    // insert it. If not, fall back so the lead is still captured.
    if (body.type) {
      const withPropertyType = { ...base, property_type: body.type }
      const withType = { ...base, type: body.type }
      try {
        await supabase.from('demo_requests').insert(withPropertyType)
        return NextResponse.json({ ok: true })
      } catch (err) {
        // Retry with alternate column name; if that fails too, insert without type.
        try {
          await supabase.from('demo_requests').insert(withType)
          return NextResponse.json({ ok: true })
        } catch (err2) {
          await supabase.from('demo_requests').insert(base)
          return NextResponse.json({ ok: true })
        }
      }
    }

    await supabase.from('demo_requests').insert(base)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
