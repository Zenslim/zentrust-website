"use client"

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
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        {/* SECTION CAPTION */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12">
          These five pillars guide ZenTrust’s work in restoring ecosystems, uplifting communities,
          protecting cultural wisdom, and advancing holistic human and planetary wellbeing.
        </p>

        {/* FIVE-CARD ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full mx-auto max-w-[1800px]">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card shadow-sm border border-border/40 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              {/* ICON */}
              <div className="text-4xl mb-4">{pillar.icon}</div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold mb-3">{pillar.title}</h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        {/* UNIFYING STATEMENT */}
        <div className="mt-16 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
            Modern life has divided us from ourselves, each other, and the Earth.
            <br />
            <span className="text-primary font-semibold">
              ZenTrust exists to weave these three back into wholeness.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
