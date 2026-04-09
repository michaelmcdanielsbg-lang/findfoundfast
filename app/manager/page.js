'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { getAppOrigin } from '@/lib/site'

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ManagerDashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [org, setOrg] = useState(null)
  const [buildings, setBuildings] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [orgForm, setOrgForm] = useState({ name: '', email: '' })
  const [nb, setNb] = useState({
    name: '',
    address: '',
    slug: '',
    gate_code: '',
    lobby_code: '',
    notes: '',
  })
  const [showNewBuilding, setShowNewBuilding] = useState(false)
  const [pf, setPf] = useState({ label: '', caption: '', step_number: 1 })
  const [uploading, setUploading] = useState(false)
  const [savingOrg, setSavingOrg] = useState(false)
  const [codes, setCodes] = useState({ gate: '', lobby: '', notes: '' })

  const fileRef = useRef()
  const router = useRouter()
  const supabase = createClient()

  const selected = buildings.find((b) => b.id === selectedId) || null
  const appOrigin = typeof window !== 'undefined' ? getAppOrigin() : ''

  async function loadAll(uid) {
    const { data: prof, error: pe } = await supabase
      .from('profiles')
      .select('*, organizations(*)')
      .eq('id', uid)
      .single()
    if (pe) {
      setError(pe.message)
      return
    }
    setProfile(prof)
    if (prof?.organizations) setOrg(Array.isArray(prof.organizations) ? prof.organizations[0] : prof.organizations)

    if (prof?.org_id) {
      const { data: blds } = await supabase
        .from('buildings')
        .select('*')
        .eq('org_id', prof.org_id)
        .order('created_at')
      setBuildings(blds || [])
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data: { user: u } } = await supabase.auth.getUser()
      if (!u) {
        router.push('/auth/login')
        return
      }
      setUser(u)
      await loadAll(u.id)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!selectedId) {
      setPhotos([])
      return
    }
    ;(async () => {
      const { data } = await supabase
        .from('building_photos')
        .select('*')
        .eq('building_id', selectedId)
        .order('step_number')
      setPhotos(data || [])
    })()
  }, [selectedId, supabase])

  useEffect(() => {
    if (!selected) return
    setCodes({
      gate: selected.gate_code || '',
      lobby: selected.lobby_code || '',
      notes: selected.notes || '',
    })
  }, [selected])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function createOrg(e) {
    e.preventDefault()
    setSavingOrg(true)
    setError('')
    const { data, error: err } = await supabase.rpc('create_organization_for_manager', {
      org_name: orgForm.name.trim(),
      org_email: orgForm.email.trim(),
    })
    setSavingOrg(false)
    if (err) {
      setError(err.message)
      return
    }
    if (user) await loadAll(user.id)
  }

  async function createBuilding(e) {
    e.preventDefault()
    setError('')
    const slug = slugify(nb.slug || nb.name)
    if (!slug) {
      setError('Add a building name or slug.')
      return
    }
    if (!profile?.org_id) return
    const { error: err } = await supabase.from('buildings').insert({
      org_id: profile.org_id,
      name: nb.name.trim(),
      address: nb.address.trim() || null,
      slug,
      gate_code: nb.gate_code.trim() || null,
      lobby_code: nb.lobby_code.trim() || null,
      notes: nb.notes.trim() || null,
    })
    if (err) {
      setError(err.message)
      return
    }
    setNb({ name: '', address: '', slug: '', gate_code: '', lobby_code: '', notes: '' })
    setShowNewBuilding(false)
    if (user) await loadAll(user.id)
  }

  async function updateBuildingPatch(patch) {
    if (!selected) return
    setError('')
    const { error: err } = await supabase.from('buildings').update(patch).eq('id', selected.id)
    if (err) setError(err.message)
    else if (user) await loadAll(user.id)
  }

  async function onPickFile(e) {
    const file = e.target.files?.[0]
    if (!file || !selected) return
    setUploading(true)
    setError('')
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
    const path = `${selected.id}/${crypto.randomUUID()}.${ext}`
    const { error: upErr } = await supabase.storage.from('building-photos').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (upErr) {
      setError(upErr.message)
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
      return
    }
    const { data: pub } = supabase.storage.from('building-photos').getPublicUrl(path)
    const nextStep =
      photos.length > 0 ? Math.max(...photos.map((p) => p.step_number)) + 1 : 1
    const label = pf.label.trim() || `Step ${nextStep}`
    const { error: insErr } = await supabase.from('building_photos').insert({
      building_id: selected.id,
      step_number: pf.step_number || nextStep,
      label,
      caption: pf.caption.trim() || null,
      storage_path: path,
      public_url: pub.publicUrl,
    })
    if (insErr) setError(insErr.message)
    else {
      setPf({ label: '', caption: '', step_number: nextStep + 1 })
      const { data } = await supabase
        .from('building_photos')
        .select('*')
        .eq('building_id', selected.id)
        .order('step_number')
      setPhotos(data || [])
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function deletePhoto(photo) {
    if (!confirm('Remove this photo from the guide?')) return
    setError('')
    await supabase.storage.from('building-photos').remove([photo.storage_path])
    const { error: delErr } = await supabase.from('building_photos').delete().eq('id', photo.id)
    if (delErr) setError(delErr.message)
    else setPhotos((p) => p.filter((x) => x.id !== photo.id))
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading…
      </div>
    )
  }

  if (!profile || profile.role !== 'manager') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Property manager area</h1>
          <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: 20 }}>
            This account is set up as a resident. To manage buildings and photos, sign up as a property manager
            (use the link from your marketing site with <code style={{ fontSize: 12 }}>?as=manager</code>) or ask
            support to update your role.
          </p>
          <button
            type="button"
            onClick={() => router.push('/auth/login?as=manager')}
            style={{
              background: '#14532d',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '12px 20px',
              fontWeight: 700,
              cursor: 'pointer',
              marginRight: 12,
            }}
          >
            Create manager account
          </button>
          <button type="button" onClick={signOut} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  if (!profile.org_id) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0fdf4', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #bbf7d0' }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, fontWeight: 700, color: '#14532d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Step 1
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Create your property</h1>
          <p style={{ color: '#64748b', marginBottom: 20 }}>
            One organization per manager account. You can add many buildings after this.
          </p>
          {error && <p style={{ color: '#b91c1c', fontSize: 14, marginBottom: 12 }}>{error}</p>}
          <form onSubmit={createOrg} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              required
              placeholder="Property / company name"
              value={orgForm.name}
              onChange={(e) => setOrgForm((o) => ({ ...o, name: e.target.value }))}
              style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 15 }}
            />
            <input
              type="email"
              placeholder="Billing / contact email"
              value={orgForm.email}
              onChange={(e) => setOrgForm((o) => ({ ...o, email: e.target.value }))}
              style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 15 }}
            />
            <button
              type="submit"
              disabled={savingOrg}
              style={{
                background: '#00FF87',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: 10,
                padding: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {savingOrg ? 'Saving…' : 'Continue'}
            </button>
          </form>
          <button type="button" onClick={signOut} style={{ marginTop: 16, background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  const shareUrl = selected ? `${appOrigin}/link/${selected.slug}` : ''

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif', paddingBottom: 48 }}>
      <header style={{ background: '#14532d', color: '#fff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, opacity: 0.85, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>FindFoundFast</p>
          <h1 style={{ fontSize: 18, fontWeight: 800 }}>Manager</h1>
        </div>
        <button
          onClick={signOut}
          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600 }}
        >
          Sign out
        </button>
      </header>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px' }}>
        {org && (
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>
            <strong style={{ color: '#0f172a' }}>{org.name}</strong> — add buildings, then upload your guide photos (parking → door).
          </p>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Buildings</h2>
          <button
            type="button"
            onClick={() => setShowNewBuilding((v) => !v)}
            style={{ background: '#14532d', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer' }}
          >
            {showNewBuilding ? 'Close' : '+ Add building'}
          </button>
        </div>

        {showNewBuilding && (
          <form onSubmit={createBuilding} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>Slug becomes the URL: <code>/link/your-slug</code> (letters, numbers, dashes).</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                required
                placeholder="Building name"
                value={nb.name}
                onChange={(e) => {
                  const name = e.target.value
                  setNb((s) => ({ ...s, name, slug: s.slug || slugify(name) }))
                }}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <input
                placeholder="URL slug (optional)"
                value={nb.slug}
                onChange={(e) => setNb((s) => ({ ...s, slug: e.target.value }))}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}
              />
              <input
                placeholder="Address (optional)"
                value={nb.address}
                onChange={(e) => setNb((s) => ({ ...s, address: e.target.value }))}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input
                  placeholder="Gate code (optional)"
                  value={nb.gate_code}
                  onChange={(e) => setNb((s) => ({ ...s, gate_code: e.target.value }))}
                  style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
                />
                <input
                  placeholder="Lobby code (optional)"
                  value={nb.lobby_code}
                  onChange={(e) => setNb((s) => ({ ...s, lobby_code: e.target.value }))}
                  style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
                />
              </div>
              <textarea
                placeholder="Notes for drivers (optional)"
                value={nb.notes}
                onChange={(e) => setNb((s) => ({ ...s, notes: e.target.value }))}
                rows={2}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', resize: 'vertical' }}
              />
              <button
                type="submit"
                style={{ background: '#00FF87', color: '#0a0a0a', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 800, cursor: 'pointer' }}
              >
                Save building
              </button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {buildings.length === 0 && <p style={{ color: '#94a3b8' }}>No buildings yet. Add one above.</p>}
          {buildings.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedId(b.id)}
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                borderRadius: 10,
                border: selectedId === b.id ? '2px solid #00FF87' : '1px solid #e2e8f0',
                background: selectedId === b.id ? '#f0fdf4' : '#fff',
                cursor: 'pointer',
                fontWeight: selectedId === b.id ? 700 : 500,
              }}
            >
              {b.name}
              <span style={{ display: 'block', fontSize: 12, color: '#64748b', fontWeight: 400, fontFamily: 'ui-monospace, monospace', marginTop: 4 }}>
                /link/{b.slug}
              </span>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ marginTop: 28, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{selected.name}</h3>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Public link (share with residents & print on signs):</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 20 }}>
              <code style={{ fontSize: 13, background: '#f1f5f9', padding: '8px 10px', borderRadius: 8, wordBreak: 'break-all' }}>{shareUrl}</code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                style={{ background: '#14532d', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
              >
                Copy link
              </button>
            </div>

            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Codes & notes</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <input
                value={codes.gate}
                onChange={(e) => setCodes((c) => ({ ...c, gate: e.target.value }))}
                placeholder="Gate code"
                onBlur={() => {
                  if (codes.gate !== (selected.gate_code || '')) updateBuildingPatch({ gate_code: codes.gate || null })
                }}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <input
                value={codes.lobby}
                onChange={(e) => setCodes((c) => ({ ...c, lobby: e.target.value }))}
                placeholder="Lobby code"
                onBlur={() => {
                  if (codes.lobby !== (selected.lobby_code || '')) updateBuildingPatch({ lobby_code: codes.lobby || null })
                }}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
            </div>
            <textarea
              value={codes.notes}
              onChange={(e) => setCodes((c) => ({ ...c, notes: e.target.value }))}
              placeholder="Driver notes"
              rows={2}
              onBlur={() => {
                if (codes.notes !== (selected.notes || '')) updateBuildingPatch({ notes: codes.notes || null })
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 20 }}
            />

            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Photos (step-by-step)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              <input
                placeholder="Label (e.g. Parking entrance)"
                value={pf.label}
                onChange={(e) => setPf((p) => ({ ...p, label: e.target.value }))}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <input
                placeholder="Caption (optional)"
                value={pf.caption}
                onChange={(e) => setPf((p) => ({ ...p, caption: e.target.value }))}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <input type="number" min={1} max={20} placeholder="Step #"
                value={pf.step_number}
                onChange={(e) => setPf((p) => ({ ...p, step_number: parseInt(e.target.value, 10) || 1 }))}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', maxWidth: 120 }}
              />
              <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} disabled={uploading} />
              {uploading && <span style={{ fontSize: 13, color: '#64748b' }}>Uploading…</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {photos.map((ph) => (
                <div key={ph.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid #e2e8f0', borderRadius: 10, padding: 10 }}>
                  <img src={ph.public_url} alt="" style={{ width: 96, height: 72, objectFit: 'cover', borderRadius: 6, background: '#f1f5f9' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>Step {ph.step_number} — {ph.label}</p>
                    {ph.caption && <p style={{ fontSize: 13, color: '#64748b' }}>{ph.caption}</p>}
                    <button type="button" onClick={() => deletePhoto(ph)} style={{ marginTop: 6, fontSize: 12, color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
