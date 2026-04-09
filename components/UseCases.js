const cases = [
  { emoji: '👤', title: 'Delivery', desc: 'One link for all your delivery apps. Drivers follow photos to your exact door — no more calls.', tag: 'Free / $4.99' },
  { emoji: '🏠', title: 'Airbnb & Guests', desc: "Guests get photo directions + expiring gate codes. No more \"I'm lost\" texts at midnight.", tag: 'From $4.99/mo' },
  { emoji: '🏢', title: 'Property Managers', desc: 'Links for every building. Resident portal. Auto-expiring codes for maintenance & visitors.', tag: 'From $49/mo' },
  { emoji: '🎓', title: 'Campuses & Events', desc: 'Move-in day, tours, conferences. Guided wayfinding for hundreds — zero lost visitors.', tag: 'Custom' },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-primary mb-4 block">Use cases</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built for <span className="text-primary">everyone</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Whether you&apos;re getting a pizza delivered or managing 200 units — one link solves it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {cases.map((c) => (
            <div key={c.title} className="group rounded-2xl bg-card border border-border p-8 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-300">
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl group-hover:scale-110 transition-transform inline-block">{c.emoji}</span>
                <span className="font-mono text-xs text-muted-foreground tracking-wider bg-secondary px-3 py-1 rounded-full">{c.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
