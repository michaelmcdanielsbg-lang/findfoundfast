'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      if (profile?.role === 'manager') router.push('/manager')
      else router.push('/resident')
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
      if (error) { setError(error.message); setLoading(false); return }
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) return (
    <div style={{minHeight:'100vh',background:'#EBF4FE',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',maxWidth:'360px',width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'40px',marginBottom:'16px'}}>📬</div>
        <h2 style={{fontWeight:'700',marginBottom:'8px'}}>Check your email</h2>
        <p style={{color:'#666',fontSize:'14px'}}>We sent a confirmation link to <strong>{email}</strong>.</p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#EBF4FE',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',maxWidth:'360px',width:'100%'}}>
        <a href="/" style={{display:'block',textAlign:'center',fontSize:'20px',fontWeight:'800',textDecoration:'none',color:'#0D1B2A',marginBottom:'24px'}}>Find<span style={{color:'#2E8FF0'}}>Found</span>Fast</a>
        <div style={{display:'flex',borderRadius:'10px',border:'1px solid #eee',marginBottom:'24px',overflow:'hidden'}}>
          {['login','signup'].map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:'10px',fontSize:'14px',fontWeight:'500',border:'none',cursor:'pointer',background:mode===m?'#2E8FF0':'transparent',color:mode===m?'#fff':'#666'}}>
              {m==='login'?'Sign in':'Create account'}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {mode==='signup'&&<input style={{padding:'12px 16px',border:'1px solid #dce5ed',borderRadius:'10px',fontSize:'14px'}} placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required/>}
          <input style={{padding:'12px 16px',border:'1px solid #dce5ed',borderRadius:'10px',fontSize:'14px'}} placeholder="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input style={{padding:'12px 16px',border:'1px solid #dce5ed',borderRadius:'10px',fontSize:'14px'}} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error&&<p style={{color:'red',fontSize:'12px'}}>{error}</p>}
          <button type="submit" disabled={loading} style={{background:'#2E8FF0',color:'#fff',padding:'12px',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'600',cursor:'pointer'}}>
            {loading?'Please wait...':mode==='login'?'Sign in':'Create account'}
          </button>
        </form>
        <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px'}}><a href="/" style={{color:'#2E8FF0'}}>Back to home</a></p>
      </div>
    </div>
  )
}
export const dynamic = "force-dynamic";
