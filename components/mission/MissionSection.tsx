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
    <section className="w-full py-20 bg-background overflow-hidden">
      {/* SECTION ENTIRE FADE-IN */}
      <motion.div
        className="w-full px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto">
          These five pillars guide ZenTrust’s work in restoring ecosystems, uplifting communities,
          protecting cultural wisdom, and advancing holistic human and planetary wellbeing.
        </p>

        {/* PREMIUM ANIMATED GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full mx-auto max-w-[1800px]"
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
              className="relative p-6 rounded-xl bg-card shadow-sm border border-border/40 flex flex-col items-center text-center cursor-default"
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
              {/* SOFT BACKGLOW */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                whileHover={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.14), transparent 70%)",
                }}
                transition={{ duration: 0.4 }}
              />

              {/* ICON FLOAT */}
              <motion.div
                className="text-4xl mb-4 relative z-10"
                whileHover={{
                  y: -4,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {pillar.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-3 relative z-10">
                {pillar.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* UNIFYING STATEMENT */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
            Modern life has divided us from ourselves, each other, and the Earth.
            <br />
            <span className="text-primary font-semibold">
              ZenTrust exists to weave these three back into wholeness.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
