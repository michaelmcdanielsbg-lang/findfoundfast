const steps = [
  {
    num: '01',
    emoji: '🧭',
    title: 'Add your spot',
    desc: 'Name your building, apartment, or Airbnb. Takes 30 seconds.',
  },
  {
    num: '02',
    emoji: '📸',
    title: 'Snap photos',
    desc: 'Parking → entrance → lobby → door. Add arrows and notes. 15 minutes tops.',
  },
  {
    num: '03',
    emoji: '🔗',
    title: 'Share one link',
    desc: 'Paste it in your delivery apps, Airbnb listing, or group chat. Works forever.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background pointer-events-none" />

      <div className="container max-w-4xl relative">
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-widest uppercase text-primary mb-4 block">How it works</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Set up once.<br />Share forever.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden md:block" />

          <div className="space-y-14">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-6 items-start group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  {s.emoji}
                </div>
                <div className="pt-1">
                  <span className="font-mono text-xs text-primary/60 tracking-widest mb-1 block">Step {s.num}</span>
                  <h3 className="text-xl font-bold mb-1.5">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
