const testimonials = [
  { quote: 'My delivery driver calls me every. single. time.', who: 'Apartment dweller' },
  { quote: "I set it up once — Airbnb guests never get lost.", who: 'Airbnb host' },
  { quote: 'Gate codes get lost in chat. This makes it easy.', who: 'Gated community' },
  { quote: 'Move-in day used to take three staff members.', who: 'Property manager' },
  { quote: 'My friends can never find my apartment.', who: 'Condo owner' },
  { quote: 'I want one link that does the directions for me.', who: 'Busy parent' },
  { quote: 'Stop reposting screenshots — make it timed.', who: 'HOA board member' },
]

export default function Testimonials() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container max-w-5xl text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Sound familiar<span className="text-primary">?</span>
        </h2>
        <p className="text-muted-foreground mt-3">Real problems. One simple fix.</p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll gap-5 w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="shrink-0 w-80 rounded-2xl bg-card border border-border p-6 flex flex-col gap-3 hover:border-primary/20 transition-colors">
              <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <span className="text-xs text-muted-foreground font-mono">— {t.who}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
