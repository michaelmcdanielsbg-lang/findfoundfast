'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ResidentPortal() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { 
    init() 
  }, [])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    setUser(user)
    setLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{minHeight:'100vh',background:'#EBF4FE',padding:'40px',fontFamily:'system-ui,sans-serif'}}>
      <h1>Resident Portal - FindFoundFast</h1>
      <p>Welcome! Your delivery link manager will be here.</p>
    </div>
  )
}
export const dynamic = "force-dynamic";
