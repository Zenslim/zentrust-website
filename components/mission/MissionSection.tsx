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
      text: "We support communities with regenerative livelihoods, shared leadership, and accessible knowledge, enabling families to build long-term resilience and collective wellbeing.",
    },
    {
      title: "Cultural Preservation",
      icon: "🌀",
      text: "We help protect cultural memory, traditional ecological wisdom, and ancestral practices, ensuring identity, continuity, and belonging remain strong across generations.",
    },
    {
      title: "Global Partnerships",
      icon: "🌍",
      text: "We collaborate with nonprofits, researchers, and regenerative networks worldwide to scale ecological restoration, scientific learning, and community resilience across borders.",
    },
  ]

  return (
    <section className="w-full py-24 bg-background overflow-hidden">
      
      {/* INTRO CAPTION */}
      <motion.div
        className="w-full px-6 text-center max-w-[1500px] mx-auto mb-20"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          These five pillars guide ZenTrust’s work in restoring ecosystems, uplifting communities,
          protecting cultural wisdom, and advancing holistic human and planetary wellbeing.
        </p>
      </motion.div>

      {/* CARD GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full mx-auto max-w-[1700px] px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            className="relative p-8 rounded-2xl bg-card shadow-sm border border-border/40 flex flex-col items-center text-center cursor-default"
            variants={{
              hidden: { opacity: 0, y: 35, filter: "brightness(0.6)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "brightness(1)",
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.18)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            {/* ICON */}
            <motion.div
              className="text-4xl mb-4"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {pillar.icon}
            </motion.div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold mb-4">
              {pillar.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pillar.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* UNIFYING STATEMENT */}
      <motion.div
        className="mt-24 mb-10 w-full text-center max-w-[1500px] mx-auto px-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
          Modern life has divided us from ourselves, each other, and the Earth.
          <br />
          <span className="text-primary font-semibold">
            ZenTrust exists to weave these three back into wholeness.
          </span>
        </p>
      </motion.div>

    </section>
  )
}
