// app/page.tsx

import { Hero } from '@/components/hero/Hero'
import { ImpactCounters } from '@/components/impact/ImpactCounters'
import { DonationCalculator } from '@/components/impact/DonationCalculator'
import { ProgramsSection } from '@/components/programs/ProgramsSection'
import { StoriesSection } from '@/components/testimonials/StoriesSection'
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup'

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <Hero />

      {/* Impact Counters - Full Width */}
      <section className="py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactCounters />
        </div>
      </section>

      {/* Donation Calculator - Full Width */}
      <section className="py-24 w-full bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DonationCalculator />
        </div>
      </section>

      {/* OPTIONAL - Uncomment when needed */}

      {/* <section className="py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProgramsSection />
        </div>
      </section>

      <section className="py-24 w-full bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StoriesSection />
        </div>
      </section> */}

      {/* Newsletter - Keep existing design */}
      <section className="py-24 w-full bg-gradient-to-r from-primary/10 to-emerald-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </main>
  )
}
