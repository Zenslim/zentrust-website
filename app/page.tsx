// app/page.tsx

import { UniversalHero } from "@/components/hero/UniversalHero";
import MissionSection from "@/components/mission/MissionSection";
import { ImpactCounters } from "@/components/impact/ImpactCounters";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <UniversalHero />
      <MissionSection />
      <ImpactCounters />
      <NewsletterSignup />
    </div>
  );
}
