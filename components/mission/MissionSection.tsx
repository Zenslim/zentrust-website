"use client"

import { motion } from "framer-motion"

const pillars = [
  {
    title: "Regenerative Ecology",
    icon: "🌱",
    text: "We restore forests, soils, and watersheds using regenerative science, supporting biodiversity and helping landscapes recover their natural resilience and self-healing capacity.",
  },
  {
    title: "Holistic BPSS Wellness",
    icon: "🧬",
    text: "We strengthen human wellbeing through the Bio-Psycho-Social-Spiritual model, integrating body, emotion, community, and meaning into a unified healing framework.",
  },
  {
    title: "Community Upliftment",
    icon: "🤝",
    text: "We support communities with regenerative livelihoods, shared leadership, and accessible knowledge, enabling long-term resilience and collective wellbeing.",
  },
  {
    title: "Cultural Preservation",
    icon: "🌀",
    text: "We protect cultural memory and traditional ecological wisdom, ensuring identity, continuity, and belonging remain strong across generations.",
  },
  {
    title: "Global Partnerships",
    icon: "🌍",
    text: "We collaborate with aligned nonprofits, researchers, and networks worldwide to scale ecological restoration and shared learning.",
  },
]

export default function MissionSection() {
  return (
    <section
      className="w-full pt-10 md:pt-12"
      aria-labelledby="mission-pillars-heading"
    >
      {/* ✅ SEMANTIC ANCHOR — fixes Lighthouse heading order */}
      <h2 id="mission-pillars-heading" className="sr-only">
        ZenTrust Mission Pillars
      </h2>

      {/* INTRO — rhythm only, no section framing */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mb-6"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-[18px] md:text-[20px] font-medium text-muted-foreground leading-snug">
          These five pillars guide ZenTrust’s work in restoring ecosystems,
          uplifting communities, protecting cultural wisdom, and advancing
          holistic human and planetary wellbeing.
        </p>
      </motion.div>

      {/* PILLARS GRID */}
      <motion.div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
          gap-5
          max-w-[1600px] mx-auto px-6
        "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {pillars.map((pillar, i) => (
          <motion.div
            key={i}
            className="
              rounded-2xl
              bg-card
              border border-border/40
              px-6 py-6
              text-center
            "
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* ICON */}
            <div className="text-3xl mb-3" aria-hidden="true">
              {pillar.icon}
            </div>

            {/* ✅ h3 is now VALID (nested under h2) */}
            <h3 className="text-base md:text-lg font-semibold tracking-tight mb-2">
              {pillar.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pillar.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CLOSING LINE */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mt-8"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-lg md:text-xl font-medium text-foreground leading-snug">
          Modern life has divided us from ourselves, each other, and the Earth.
        </p>
        <p className="mt-1 text-[18px] md:text-[20px] font-semibold text-primary">
          ZenTrust exists to gently weave these back into wholeness.
        </p>
      </motion.div>
    </section>
  )
}
