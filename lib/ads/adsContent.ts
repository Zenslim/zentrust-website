// lib/ads/adsContent.ts
import { AdsPageContent } from "./types";

export const TRUST = {
  legalName: "ZenTrust, Inc.",
  ein: "33-4318487",
  statusLine: "IRS-recognized 501(c)(3) public charity",
  publicCharity: "170(b)(1)(A)(vi)",
  determinationHref: "/docs/irs-determination-letter",
  privacyHref: "/privacy",
  financialsHref: "/financials",
  contactHref: "/contact",
};

export const ADS_PAGES: Record<string, AdsPageContent> = {
  "regenerative-ecology": {
    slug: "regenerative-ecology",
    topicLabel: "Regenerative Ecology & Systems Design",
    formatLabel: "3-minute overview of integrated restoration patterns.",
    orientationTldr:
      "You are exploring Regenerative Ecology. This page provides a systems-level overview of how land, health, and community restoration function as a single unit.",
    authorityLine:
      "ZenTrust is an IRS-recognized 501(c)(3) public charity dedicated to open scientific research and public education in these fields.",

    video: {
      src: "/video/ads/ecology-60s.mp4",
      poster: "/images/ads/ecology-poster.jpg",
      label: "60-second orientation",
      note: "Plays inline · muted by default · subtitles recommended",
    },

    whyTitle: "Why so many efforts feel exhausting",
    whyParagraphs: [
      "Across land restoration, human health, and community development, a similar fatigue keeps appearing.",
      "Soil programs struggle despite better techniques. Health systems work harder while wellbeing declines. Community initiatives launch with energy, then quietly stall.",
      "These failures are usually treated as separate problems. But they are not. They are expressions of the same structural pattern.",
      "When land is treated as an isolated resource, degradation shows up as food insecurity, stress, and economic fragility. When health is treated as clinical repair disconnected from environment and belonging, treatment increases while resilience declines. When communities are treated as delivery endpoints rather than living systems, participation fades—even when intentions are good.",
      "Each domain compensates for what the others are missing. And that compensation is exhausting.",
      "Effort increases. Outcomes thin. Not because people don’t care—but because the system is fragmented.",
    ],
    integrationClosing:
      "This page is an exploration of that pattern — and a study of what emerges when restoration is designed as a single, living whole.",

    whatWeDoTitle: "Research, education, and transparent support",
    whatWeDoSubtitle:
      "ZenTrust advances regenerative ecology, BPSS-integrative wellness research, and open-access scientific education—without ideological framing or commercial extraction.",
    whatWeDoCards: [
      {
        title: "Regenerative ecology",
        body: "Research and learning around soil, biodiversity, and climate-resilient land systems that improve over time.",
      },
      {
        title: "Integrative wellbeing (BPSS)",
        body: "Study and education that treats wellbeing as biological, psychological, social, and environmental—without reducing it to one lever.",
      },
      {
        title: "Open scientific education",
        body: "Publish methods and learning resources so knowledge compounds publicly—not behind paywalls.",
      },
    ],

    triggersTitle: "Core exploration",
    triggersSubtitle:
      "Short, calm blocks for pattern recognition. Expand only if you want depth.",
    triggers: [
      {
        heading: "Soil is a memory",
        body: "Soil holds history: water, roots, microbes, disturbance, time. Restoration begins when we stop treating it like an inert medium.",
        disclosure: {
          title: "See our reasoning",
          body: "Regeneration is less about adding inputs and more about restoring relationships—cover, structure, diversity, and continuous living roots. When those relationships return, fertility becomes a property of the system rather than a purchased product.",
        },
      },
      {
        heading: "Health is ecological",
        body: "Wellbeing isn’t only internal biology. It reflects food, stress, belonging, environment, and meaning—interacting over time.",
        disclosure: {
          title: "How this connects to BPSS",
          body: "BPSS frameworks help prevent reductionism. They keep inquiry honest: a person’s physiology, psychology, social conditions, and environment are coupled—so interventions must be designed with feedback in mind.",
        },
      },
      {
        heading: "Communities need capacity",
        body: "Programs don’t scale if communities remain dependent. Capacity grows when knowledge, tools, and stewardship remain local.",
        disclosure: {
          title: "What we avoid",
          body: "We avoid models that create short-term compliance but long-term dependence. Durable restoration requires local agency and long-horizon incentives.",
        },
      },
      {
        heading: "Trade-offs are real",
        body: "Honest work names constraints: time, labor, funding, uncertainty. Clarity builds trust more than promises do.",
        disclosure: {
          title: "Radical transparency",
          body: "ZenTrust pages prefer legibility over inspiration. Where uncertainty exists, we state it. Where data is incomplete, we say so. This protects institutions and beneficiaries.",
        },
      },
    ],

    observationEyebrow: "A short observation",
    observationLines: [
      "A forest doesn’t grow by urgency.",
      "It grows by relationship.",
      "Water doesn’t rush to convince the soil.",
      "It arrives—consistently—until roots respond.",
      "Most systems fail when they forget this.",
    ],

    choiceTitle: "If you’d like to continue",
    choiceSubtitle:
      "Three equal paths. No hierarchy. No pressure—only what fits your season.",
    choicePaths: [
      {
        title: "Learn quietly",
        description:
          "Explore research, writing, and open resources—without accounts, without obligation.",
        href: "/research",
        ctaLabel: "Explore research",
      },
      {
        title: "Participate",
        description:
          "Attend a session, follow a field project, or observe methods in practice.",
        href: "/programs",
        ctaLabel: "View programs",
      },
      {
        title: "Long-term stewardship",
        description:
          "Some people support this work over time so it can remain open, independent, and slow enough to be done well.",
        href: "/donate",
        ctaLabel: "Support (optional)",
      },
    ],

    pageTitle: "Regenerative Ecology — Systems-Level Overview | ZenTrust",
    pageDescription:
      "A calm, systems-level exploration of how land, health, and community restoration function as a single unit. ZenTrust is an IRS-recognized 501(c)(3) public charity.",
  },

  "integrative-wellbeing": {
    slug: "integrative-wellbeing",
    topicLabel: "Integrative Wellbeing & BPSS Systems",
    formatLabel: "3-minute overview of integrated restoration patterns.",
    orientationTldr:
      "You are exploring Integrative Wellbeing. This page offers a systems-level view of how land, health, and community conditions co-produce resilience over time.",
    authorityLine:
      "ZenTrust is an IRS-recognized 501(c)(3) public charity dedicated to open scientific research and public education in these fields.",

    video: {
      src: "/video/ads/wellbeing-60s.mp4",
      poster: "/images/ads/wellbeing-poster.jpg",
      label: "60-second orientation",
      note: "Plays inline · muted by default · subtitles recommended",
    },

    whyTitle: "Why wellbeing often fragments",
    whyParagraphs: [
      "Many people feel they’re doing everything “right” and still feel depleted.",
      "It’s easy to interpret that as personal failure. But the pattern is structural.",
      "Health is shaped by biology, psychology, social conditions, and environment—interacting continuously.",
      "When we treat wellbeing as isolated symptoms, other layers compensate: the body carries social stress, the mind carries environmental instability, communities carry institutional gaps.",
      "Effort increases. Outcomes thin. Not because people don’t care—but because the system is fragmented.",
    ],
    integrationClosing:
      "This page is an exploration of that pattern — and a study of what emerges when restoration is designed as a single, living whole.",

    whatWeDoTitle: "Research, education, and transparent support",
    whatWeDoSubtitle:
      "ZenTrust supports inquiry and learning that keeps complexity humane—without shaming, ideology, or commercial extraction.",
    whatWeDoCards: [
      {
        title: "BPSS frameworks",
        body: "Education that treats wellbeing as bio-psycho-social-spiritual and environmental—interacting in feedback loops.",
      },
      {
        title: "Regenerative environments",
        body: "Study of how land, food, and habitat conditions influence health outcomes across time horizons.",
      },
      {
        title: "Open education",
        body: "Publish learning resources so insights remain accessible and compounding.",
      },
    ],

    triggersTitle: "Core exploration",
    triggersSubtitle:
      "Short, calm blocks for recognition. Expand only if it feels relevant.",
    triggers: [
      {
        heading: "Symptoms are signals",
        body: "Often the body is expressing what the environment and incentives quietly impose.",
        disclosure: {
          title: "See our reasoning",
          body: "Symptoms can be informative without being moral. A systems lens asks: what pressures are persistent, and what feedback loops keep them in place?",
        },
      },
      {
        heading: "Belonging is medicine",
        body: "Not sentiment—structure. Stable relationships reduce load and increase resilience.",
      },
      {
        heading: "Food is a system",
        body: "Food quality reflects soil, logistics, labor, economics, and time—then becomes biology.",
      },
      {
        heading: "Care needs ecology",
        body: "Treatments improve when environments stop re-injuring people faster than care can repair.",
      },
    ],

    observationEyebrow: "A short observation",
    observationLines: [
      "Most healing isn’t a breakthrough.",
      "It’s the slow removal of constant pressure.",
      "When pressure drops, the system reorganizes.",
      "It becomes itself again.",
    ],

    choiceTitle: "If you’d like to continue",
    choiceSubtitle:
      "Three equal paths. No hierarchy. No pressure—only what fits your season.",
    choicePaths: [
      {
        title: "Learn quietly",
        description: "Explore research and education resources at your pace.",
        href: "/research",
        ctaLabel: "Explore resources",
      },
      {
        title: "Participate",
        description: "Attend sessions or follow wellbeing research initiatives.",
        href: "/programs",
        ctaLabel: "View initiatives",
      },
      {
        title: "Long-term stewardship",
        description: "Support open research and education so it stays independent.",
        href: "/donate",
        ctaLabel: "Support (optional)",
      },
    ],

    pageTitle: "Integrative Wellbeing — BPSS Systems | ZenTrust",
    pageDescription:
      "A calm, systems-level exploration of integrative wellbeing across land, health, and community. ZenTrust is an IRS-recognized 501(c)(3) public charity.",
  },

  "community-restoration": {
    slug: "community-restoration",
    topicLabel: "Community Restoration & Living Systems",
    formatLabel: "3-minute overview of integrated restoration patterns.",
    orientationTldr:
      "You are exploring Community Restoration. This page provides a systems-level overview of how land, health, and community capacity reinforce each other over time.",
    authorityLine:
      "ZenTrust is an IRS-recognized 501(c)(3) public charity dedicated to open scientific research and public education in these fields.",

    video: {
      src: "/video/ads/community-60s.mp4",
      poster: "/images/ads/community-poster.jpg",
      label: "60-second orientation",
      note: "Plays inline · muted by default · subtitles recommended",
    },

    whyTitle: "Why projects stall over time",
    whyParagraphs: [
      "Many initiatives start strong and then fade—not from bad intent, but from missing structure.",
      "When communities are treated as recipients, participation becomes brittle. When they’re treated as living systems, capacity grows.",
      "Land conditions affect livelihoods. Livelihoods affect stress and health. Health affects participation and stewardship. These loops are real.",
      "When designed in silos, each layer compensates for the others. That compensation is exhausting.",
      "Effort increases. Outcomes thin. Not because people don’t care—but because the system is fragmented.",
    ],
    integrationClosing:
      "This page is an exploration of that pattern — and a study of what emerges when restoration is designed as a single, living whole.",

    whatWeDoTitle: "Research, education, and transparent support",
    whatWeDoSubtitle:
      "ZenTrust supports systems that restore capacity—so communities aren’t forced to compensate for fragmented institutions.",
    whatWeDoCards: [
      {
        title: "Local capacity",
        body: "Education that builds durable skills, stewardship, and the ability to maintain systems without constant external pressure.",
      },
      {
        title: "Land-health loops",
        body: "Study of how ecology, food, stress, and livelihoods interact, shaping wellbeing and participation.",
      },
      {
        title: "Open learning",
        body: "Publish tools and findings so communities and practitioners can adapt them locally.",
      },
    ],

    triggersTitle: "Core exploration",
    triggersSubtitle:
      "Short blocks for clarity. Expand only if you want depth.",
    triggers: [
      {
        heading: "Participation is fragile",
        body: "When daily load is high, even good programs feel like another demand.",
      },
      {
        heading: "Stewardship needs time",
        body: "Long-horizon care requires incentives, trust, and stable governance structures.",
      },
      {
        heading: "Skills compound locally",
        body: "Training and shared tools create resilience faster than repeated external interventions.",
      },
      {
        heading: "Transparency builds trust",
        body: "Legibility about funding and constraints prevents disappointment and cynicism.",
      },
    ],

    observationEyebrow: "A short observation",
    observationLines: [
      "A village doesn’t become resilient by being inspired.",
      "It becomes resilient when load decreases",
      "and capacity quietly increases.",
    ],

    choiceTitle: "If you’d like to continue",
    choiceSubtitle:
      "Three equal paths. No hierarchy. No pressure—only what fits your season.",
    choicePaths: [
      {
        title: "Learn quietly",
        description: "Read and explore systems thinking for restoration.",
        href: "/research",
        ctaLabel: "Explore learning",
      },
      {
        title: "Participate",
        description: "Follow projects and education pathways in practice.",
        href: "/programs",
        ctaLabel: "View pathways",
      },
      {
        title: "Long-term stewardship",
        description: "Support open education and transparent research.",
        href: "/donate",
        ctaLabel: "Support (optional)",
      },
    ],

    pageTitle: "Community Restoration — Living Systems | ZenTrust",
    pageDescription:
      "A calm, systems-level exploration of community restoration across land, health, and governance. ZenTrust is an IRS-recognized 501(c)(3) public charity.",
  },
};

export const ADS_SLUGS = Object.keys(ADS_PAGES);

export function getAdsPage(slug: string) {
  return ADS_PAGES[slug] ?? null;
}
