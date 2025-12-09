"use client"

import { useState } from "react"
import { ProgramCard, FeaturedProgram } from "@/components/programs/ProgramCard"
import { BookOpen, Users, TreePine, Microscope, Filter } from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "All Programs", value: "all", icon: Filter },
  { name: "Education", value: "Education", icon: BookOpen },
  { name: "Research", value: "Research", icon: Microscope },
  { name: "Community", value: "Community", icon: Users },
  { name: "Conservation", value: "Conservation", icon: TreePine },
]

const programs = [
  {
    title: "Regenerative Agriculture Training",
    short_description: "Hands-on regenerative training rooted in soil, community, and resilience.",
    icon: "education",
    category: "Education",
    slug: "regenerative-agriculture-training",
    impact: { metric_name: "Farmers Reached", metric_value: "—", metric_unit: "" },
    development_status: "Rooting for 2026 launch",
    description:
      "A living curriculum designed to restore land by restoring relationship. Practical, field-based instruction that centers soil health, biodiversity, and community-led stewardship.",
  },
  {
    title: "Watershed Restoration Initiative",
    short_description: "Reviving the circulatory systems of land through slow, attentive design.",
    icon: "conservation",
    category: "Conservation",
    slug: "watershed-restoration",
    impact: { metric_name: "Reforestation Sites", metric_value: "—", metric_unit: "" },
    development_status: "Ecosystem mapping underway",
    description:
      "A long-arc initiative to protect water, restore flow, and regenerate the living networks that hold landscapes together. Beginning with careful listening to place.",
  },
  {
    title: "Community Education & Storytelling",
    short_description: "Learning that spreads like mycelium—quiet, connective, transformative.",
    icon: "community",
    category: "Community",
    slug: "community-education",
    impact: { metric_name: "Learning Hours", metric_value: "—", metric_unit: "" },
    development_status: "Curriculum weaving in progress",
    description:
      "Workshops and shared learning journeys that build ecological literacy and empower communities to regenerate from within.",
  },
  {
    title: "Youth Ecological Leadership",
    short_description: "Awakening the next generation of ecological guardians.",
    icon: "education",
    category: "Education",
    slug: "youth-leadership",
    impact: { metric_name: "Youth Participants", metric_value: "—", metric_unit: "" },
    development_status: "Formation phase",
    description:
      "Hands-on experiences that cultivate observation, patience, and responsibility—qualities essential for ecological leadership.",
  },
  {
    title: "Open Scientific Research Initiative",
    short_description: "Scientific inquiry guided by humility, openness, and ecological truth.",
    icon: "research",
    category: "Research",
    slug: "research-initiative",
    impact: { metric_name: "Studies Planned", metric_value: "—", metric_unit: "" },
    development_status: "Research partnerships forming",
    description:
      "Open-access research exploring soil health, biodiversity, carbon cycles, and BPSS-integrative models of human–ecosystem wellness.",
  },
]

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPrograms =
    selectedCategory === "all"
      ? programs
      : programs.filter((p) => p.category === selectedCategory)

  const featured = programs[0]

  return (
    <div className="min-h-screen pt-16 bg-background">

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Programs Arriving in <span className="gradient-text">2026</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            These programs are not being rushed.  
            They are germinating—quietly, patiently—like forests preparing to rise.  
            <span className="italic block mt-2">
              Nature does not hurry, yet everything is accomplished.
            </span>
          </p>
        </div>
      </section>

      {/* Featured Program */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            A First Glimpse of What’s Growing
          </h2>
          <FeaturedProgram {...featured} />
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h3 className="text-xl font-semibold mb-6">Browse by Focus Area</h3>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/40"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPrograms.map((program, idx) => (
              <ProgramCard key={idx} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-emerald-500/10 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Growing Slowly, Growing Strong
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            These programs are seeds—alive, quiet, gathering strength beneath the surface.  
            When the time is right, they will rise with clarity and purpose.  
            Until then, we listen. We learn. We prepare the soil.
          </p>
        </div>
      </section>
    </div>
  )
}
