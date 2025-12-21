// app/page.tsx

import { GlobalHero } from "@/components/hero/GlobalHero";
import MissionSection from "@/components/mission/MissionSection";
import { ImpactCounters } from "@/components/impact/ImpactCounters";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default function HomePage() {
  const contentId = "content";

  return (
    <div className="min-h-screen">
      <GlobalHero
        headline="ZenTrust heals land and people together through open science and long-term stewardship."
        dek="Evidence-led regeneration across watersheds, Bio-Psycho-Social-Spiritual research, and quiet participation pathways for those who want to help."
        primaryCta={{ label: "Enter the Stewardship Portal", href: "/stewardship" }}
        belowAnchorId={contentId}
        mode="confirm"
      />

      <div id={contentId}>
        <MissionSection />
        <ImpactCounters />
        <NewsletterSignup />
      </div>
    </div>
  );
}
