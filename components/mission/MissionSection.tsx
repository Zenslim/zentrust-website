"use client"

import { motion } from "framer-motion"

export default function MissionSection() {
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

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* SUBTLE TOP GRADIENT — ties visually to Hero */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      {/* INTRO */}
      <motion.div
        className="max-w-5xl mx-auto px-6 pt-14 md:pt-18 pb-8 md:pb-10 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-[18px] md:text-[20px] leading-snug text-muted-foreground">
          These five pillars guide ZenTrust’s work in restoring ecosystems,
          uplifting communities, protecting cultural wisdom, and advancing
          holistic human and planetary wellbeing.
        </p>
      </motion.div>

      {/* PILLARS GRID */}
      <motion.div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
          gap-5 md:gap-6
          max-w-[1600px] mx-auto px-6
        "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            className="
              relative rounded-2xl
              bg-card/90 backdrop-blur
              border border-border/40
              px-6 py-6
              flex flex-col items-center text-center
            "
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{
              y: -4,
              boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            {/* ICON WITH AURA */}
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-full blur-xl bg-emerald-400/20" />
              <div className="relative text-3xl">
                {pillar.icon}
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-base md:text-lg font-semibold tracking-tight mb-2">
              {pillar.title}
            </h3>

            {/* TEXT */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pillar.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* UNIFYING STATEMENT — tighter, calmer */}
      <motion.div
        className="max-w-5xl mx-auto px-6 pt-10 md:pt-12 pb-14 md:pb-16 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-lg md:text-xl font-medium text-foreground leading-snug">
          Modern life has divided us from ourselves, each other, and the Earth.
        </p>
        <p className="mt-2 text-[19px] md:text-[21px] font-semibold text-primary">
          ZenTrust exists to gently weave these back into wholeness.
        </p>
      </motion.div>
    </section>
  )
}
