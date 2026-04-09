import { appUrl } from '@/lib/site'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-0 md:pt-32 overflow-hidden min-h-screen flex flex-col">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px] animate-glow-pulse pointer-events-none" />

      <div className="container max-w-6xl flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        <div className="flex-1 text-center lg:text-left z-10 pt-8 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary tracking-wider">Free to start · No app needed</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Maps stop at
            <br />
            the address.
            <br />
            <span className="text-primary">We go to</span>
            <br className="hidden lg:block" />
            <span className="text-primary"> the door.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8">
            Photo-guided directions. Expiring gate codes.
            One link — works forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a
              href={appUrl('/get-started')}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-mono text-sm font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Start for free →
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full border border-border text-muted-foreground font-mono text-sm tracking-wider hover:border-primary/50 hover:text-foreground transition-all"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative animate-float">
            <div className="absolute -inset-20 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative w-72 md:w-80 lg:w-96 aspect-[9/19] rounded-[2.5rem] border-2 border-border bg-card shadow-2xl shadow-primary/5 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-lg">📍</span>
              </div>
              <p className="text-sm font-semibold">Step-by-step guide</p>
              <p className="text-xs text-muted-foreground">Photos + directions to your exact door</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  )
}
