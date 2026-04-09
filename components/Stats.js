const features = [
  { emoji: '📍', label: 'Where to park' },
  { emoji: '🚪', label: 'How to get in' },
  { emoji: '🧭', label: 'Where to go' },
]

const stats = [
  { value: '1', unit: 'link', sub: 'per building' },
  { value: '0', unit: 'apps', sub: 'for visitors' },
  { value: '∞', unit: 'auto', sub: 'codes expire' },
]

export default function StatsStrip() {
  return (
    <section className="py-24 relative">
      <div className="container max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-card border border-border hover:border-primary/30 transition-colors">
              <span>{f.emoji}</span>
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.unit} className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-7xl font-bold font-mono text-primary">{s.value}</span>
                <span className="text-lg md:text-xl text-muted-foreground font-mono">{s.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
