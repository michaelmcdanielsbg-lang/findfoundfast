import { appUrl } from '@/lib/site'

export default function CtaFooter() {
  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="container max-w-3xl text-center relative">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
            Stop giving
            <br />
            <span className="text-primary">crappy directions.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Create your guide in 15 minutes. Share one link. Never explain directions again.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={appUrl('/get-started')}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-primary-foreground font-mono text-sm font-bold tracking-wider uppercase hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Start for free →
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full border border-border text-muted-foreground font-mono text-sm tracking-wider hover:border-primary/50 hover:text-foreground transition-all"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="container max-w-5xl mt-28 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm font-bold">Find<span className="text-primary">Found</span>Fast</span>
            <div className="flex items-center gap-6">
              <a href="#how-it-works" className="text-xs text-muted-foreground hover:text-foreground transition-colors">How it works</a>
              <a href="#use-cases" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Use cases</a>
              <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 FindFoundFast. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  )
}
