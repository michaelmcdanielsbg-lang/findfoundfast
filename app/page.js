import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/Stats'
import Comparison from '@/components/Comparison'
import HowItWorks from '@/components/HowItWorks'
import UseCases from '@/components/UseCases'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CtaFooter from '@/components/CtaFooter'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden pt-16">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Comparison />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <Pricing />
      <CtaFooter />
    </main>
  )
}
