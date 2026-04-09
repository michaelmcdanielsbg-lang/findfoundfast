import { appUrl } from '@/lib/site'

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever', desc: 'Try it out — no credit card.',
    features: ['1 location', 'Timed links (24 hr)', '3 photos per step', 'Basic gate codes'],
    href: appUrl('/get-started'), cta: 'Start free', featured: false,
  },
  {
    name: 'Personal', price: '$4.99', period: '/mo', desc: 'Perfect for your home or Airbnb.',
    features: ['5 locations', 'Permanent links', 'Unlimited photos', 'Expiring gate codes', 'Custom branding'],
    href: appUrl('/get-started'), cta: 'Get started', featured: true,
  },
  {
    name: 'Property', price: '$49', period: '/mo', desc: 'For managers with multiple buildings.',
    features: ['Unlimited buildings', 'Resident portal', 'Auto-expiring codes', 'Analytics dashboard', 'Priority support'],
    href: appUrl('/get-started'), cta: 'Get started', featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

      <div className="container max-w-5xl relative">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-primary mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Simple. Transparent.</h2>
          <p className="text-muted-foreground mt-4">No hidden fees. Upgrade or cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-3xl p-8 relative flex flex-col ${
              p.featured ? 'bg-card border-2 border-primary shadow-2xl shadow-primary/10 scale-[1.02]' : 'bg-card border border-border'
            }`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold">
                  Most Popular
                </div>
              )}

              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-muted-foreground text-sm">{p.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-secondary-foreground">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={p.href} className={`block text-center px-6 py-3.5 rounded-full font-mono text-sm font-bold tracking-wide transition-all ${
                p.featured
                  ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary border border-border'
              }`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
