// app/page.tsx

import { Hero } from '@/components/hero/Hero'
import { ImpactCounters } from '@/components/impact/ImpactCounters'
import { DonationCalculator } from '@/components/impact/DonationCalculator'
import { ProgramsSection } from '@/components/programs/ProgramsSection'
import { StoriesSection } from '@/components/testimonials/StoriesSection'
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ImpactCounters />
        {/* Temporarily Hidden */}
      {/* <ProgramsSection /> */}
      {/* <StoriesSection /> */}
      <DonationCalculator />
      <NewsletterSignup />
    </div>
  )
}
