'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ManagerDashboard() {
  const [user, setUser] = useState(null)
  const [org, setOrg] = useState(null)
  const [buildings, setBuildings] = useState([])
  const [view, setView] = useState('buildings')
  const [selected, setSelected] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [nb, setNb] = useState({name:'',address:'',slug:'',gate_code:'',lobby_code:'',notes:''})
  const [uploading, setUploading] = useState(false)
  const [pf, setPf] = useState({label:'',caption:'',step_number:1})
  const fileRef = useRef()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { init() }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    setUser(user)

    const { data: profile } = await supabase.from('profiles').select('*, organizations(*)').eq('id', user.id).single()
    if (profile?.organizations) setOrg(profile.organizations)

    if (profile?.org_id) {
      const { data: blds } = await supabase.from('buildings').select('*').eq('org_id', profile.org_id).order('created_at')
      setBuildings(blds || [])
    }
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>

  return (
    <div style={{minHeight:'100vh',background:'#f8f9fa',fontFamily:'system-ui,sans-serif',padding:'20px'}}>
      <h1>Manager Dashboard - FindFoundFast</h1>
      <p>This page now builds correctly with @/ alias.</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
export const dynamic = "force-dynamic";
