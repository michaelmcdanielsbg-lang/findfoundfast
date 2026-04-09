function Bubble({ children, muted, destructive, primary }) {
  const style = destructive
    ? 'bg-[hsl(0_72%_51%/0.1)] text-[hsl(0_72%_51%)]'
    : primary
    ? 'bg-[hsl(155_100%_45%/0.05)] text-foreground border border-[hsl(155_100%_45%/0.1)]'
    : muted
    ? 'bg-[hsl(150_5%_15%/0.5)] text-muted-foreground italic'
    : 'bg-secondary text-secondary-foreground'

  return <div className={`px-4 py-2.5 rounded-2xl text-sm ${style}`}>{children}</div>
}

export default function Comparison() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The difference is <span className="text-primary">one link</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden hover:border-destructive/30 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-destructive/60" />
            <span className="font-mono text-xs tracking-widest uppercase text-destructive mb-6 block">Without</span>
            <div className="space-y-3 mb-6">
              <Bubble>&quot;I&apos;m outside — how do I get in?&quot;</Bubble>
              <Bubble>&quot;Which entrance? There are 4 doors&quot;</Bubble>
              <Bubble muted>You type the same directions again…</Bubble>
              <Bubble destructive>&quot;Gave up. Left it at the gate. 😞&quot;</Bubble>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Wrong door. Lost guest. Cold food. Stale gate code in a group chat.
            </p>
          </div>

          <div className="rounded-3xl bg-card border-2 border-primary/50 p-8 relative overflow-hidden hover:border-primary/70 transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs tracking-widest uppercase text-primary">With FindFoundFast</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">✓ Delivered</span>
            </div>
            <div className="space-y-3 mb-6">
              <Bubble primary>&quot;On my way! 👋&quot;</Bubble>
              <Bubble primary>They open your link…</Bubble>
              <Bubble primary>Follow photos → park → enter → arrive ✅</Bubble>
            </div>
            <p className="text-xs text-primary font-mono font-medium">
              First try. Code vanished. Zero calls.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
