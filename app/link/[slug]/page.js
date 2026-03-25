import { createBrowserClient } from '@supabase/ssr'

export default async function DriverLinkPage({ params, searchParams }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const resolvedParams = await params
  const resolvedSearch = await searchParams
  const slug = resolvedParams.slug
  const unit = resolvedSearch?.u || null

  const { data: building } = await supabase
    .from('buildings')
    .select('*, building_photos(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!building) return (
    <div style={{minHeight:'100vh',background:'#f8f9fa',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',fontFamily:'system-ui,sans-serif'}}>
      <div style={{textAlign:'center',maxWidth:'320px'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
        <h1 style={{fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Link not found</h1>
        <p style={{color:'#666',fontSize:'14px'}}>This link may have expired. Ask your customer to send a new one.</p>
      </div>
    </div>
  )

  const photos = (building.building_photos||[]).sort((a,b)=>a.step_number-b.step_number)
  let sessionActive = false
  if (unit) {
    const { data:session } = await supabase.from('sessions').select('*').eq('building_id',building.id).eq('unit_number',unit).eq('is_active',true).gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(1).single()
    sessionActive = !!session
  }
  const showCodes = !unit || sessionActive

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:'system-ui,sans-serif'}}>
      <div style={{background:'#2E8FF0',padding:'20px'}}>
        <p style={{color:'rgba(255,255,255,0.7)',fontSize:'11px',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>FindFoundFast</p>
        <h1 style={{color:'#fff',fontWeight:'700',fontSize:'18px',marginBottom:'2px'}}>{building.name}</h1>
        {building.address&&<p style={{color:'rgba(255,255,255,0.7)',fontSize:'12px'}}>{building.address}</p>}
        {unit&&sessionActive&&<div style={{marginTop:'8px',display:'inline-block',background:'rgba(255,255,255,0.2)',borderRadius:'20px',padding:'4px 12px'}}><span style={{color:'#fff',fontSize:'12px',fontWeight:'600'}}>Delivering to Unit {unit}</span></div>}
      </div>
      {building.notes&&<div style={{background:'#fffbeb',borderBottom:'1px solid #fde68a',padding:'12px 20px'}}><p style={{fontSize:'14px',color:'#92400e'}}>📝 {building.notes}</p></div>}
      {showCodes&&(building.gate_code||building.lobby_code)&&(
        <div style={{background:'#EBF4FE',borderBottom:'1px solid #bfdbfe',padding:'16px 20px'}}>
          <p style={{fontSize:'11px',fontWeight:'700',color:'#1A5FA8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'10px'}}>Access codes</p>
          <div style={{display:'flex',gap:'32px',flexWrap:'wrap'}}>
            {building.gate_code&&<div><p style={{fontSize:'12px',color:'#666',marginBottom:'2px'}}>Gate code</p><p style={{fontFamily:'monospace',fontSize:'24px',fontWeight:'700',color:'#1A5FA8',letterSpacing:'3px'}}>{building.gate_code}</p></div>}
            {building.lobby_code&&<div><p style={{fontSize:'12px',color:'#666',marginBottom:'2px'}}>Lobby code</p><p style={{fontFamily:'monospace',fontSize:'24px',fontWeight:'700',color:'#1A5FA8',letterSpacing:'3px'}}>{building.lobby_code}</p></div>}
          </div>
        </div>
      )}
      <div style={{maxWidth:'500px',margin:'0 auto',padding:'24px 16px'}}>
        {photos.length===0 ? (
          <div style={{textAlign:'center',padding:'48px',color:'#999'}}><p style={{fontSize:'32px',marginBottom:'8px'}}>📸</p><p>No photos uploaded yet.</p></div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
            {photos.map(photo=>(
              <div key={photo.id} style={{borderRadius:'16px',overflow:'hidden',border:'1px solid #eee'}}>
                <div style={{position:'relative'}}>
                  <img src={photo.public_url} alt={photo.label} style={{width:'100%',objectFit:'cover',maxHeight:'280px',display:'block'}}/>
                  <div style={{position:'absolute',top:'12px',left:'12px',background:'#2E8FF0',color:'#fff',fontSize:'11px',fontWeight:'700',padding:'4px 10px',borderRadius:'20px'}}>Step {photo.step_number}</div>
                </div>
                <div style={{padding:'14px 16px',background:'#fff'}}>
                  <p style={{fontWeight:'600',fontSize:'14px',marginBottom:'2px'}}>{photo.label}</p>
                  {photo.caption&&<p style={{color:'#666',fontSize:'13px'}}>{photo.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{marginTop:'32px',paddingTop:'24px',borderTop:'1px solid #eee',textAlign:'center'}}>
          <p style={{fontWeight:'800',color:'#666'}}>Find<span style={{color:'#2E8FF0'}}>Found</span>Fast</p>
        </div>
      </div>
    </div>
  )
}
