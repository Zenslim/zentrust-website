// app/page.tsx

import { GlobalHero } from "@/components/hero/GlobalHero";
import MissionSection from "@/components/mission/MissionSection";
import { ImpactCounters } from "@/components/impact/ImpactCounters";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default function HomePage() {
  const contentId = "content";

  return (
    <div className="relative">
      <GlobalHero
        headlineLines={[
          "Healing land.",
          "Elevating humanity.",
          "Science for regeneration.",
        ]}
        dek="ZenTrust is a public charity helping nature and communities heal together through research, learning, and long-term stewardship."
        determination={{
          text: "Recognized as a 170(b)(1)(A)(vi) public charity.",
          label: "View official determination letter",
          href: "https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf",
        }}
        primaryCta={{ label: "Enter the Stewardship Portal", href: "/stewardship" }}
        belowAnchorId={contentId}
        mode="answer"
        showIcon
        ritualHelperText="15-second silent video. Closes on its own."
        fullScreen
      />

      <div id={contentId} className="relative z-0">
        <MissionSection />
        <ImpactCounters />
        <NewsletterSignup />
      </div>
    </div>
  );
}
