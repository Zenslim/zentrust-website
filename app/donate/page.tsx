"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Heart, TreePine, Microscope, Users } from "lucide-react"

export default function StewardshipPortalPage() {
  return (
    <div className="min-h-screen pt-16 bg-background">

      {/* HERO — Minimal, poetic, calm */}
      <section className="py-28 text-center bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-3xl mx-auto px-4">

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            A Quiet Portal for  
            <span className="gradient-text"> Regenerative Stewardship</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Participation is not asked for.  
            It arises naturally — like water finding its way downhill,  
            or roots reaching for deeper soil.  
            <span className="italic block mt-2">
              Nature does not hurry, yet everything is accomplished.
            </span>
          </p>

          <Button asChild size="lg" className="group mt-6">
            <Link href="/donate/checkout">
              <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Enter the Stewardship Portal
            </Link>
          </Button>

          <p className="text-xs text-muted-foreground mt-6">
            ZenTrust is a 501(c)(3) public charity. EIN: 33-4318487.  
            Participation is voluntary and never solicited.
          </p>

        </div>
      </section>


      {/* THREE SYMBOLIC PATHWAYS — Soft, minimal, optional */}

      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Pathways of Quiet Participation
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            These are not tiers or transactions —  
            only metaphors for how one might choose to participate  
            in the great work of regeneration.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="glass-card p-8 rounded-2xl">
              <Leaf className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Root</h3>
              <p className="text-sm text-muted-foreground">
                Foundations. Soil. Beginnings.  
                The subtle intelligence of life taking hold.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <TreePine className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Rise</h3>
              <p className="text-sm text-muted-foreground">
                Canopy building. Hydrology shaping.  
                Early regenerative architectures emerging.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <Microscope className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Observe</h3>
              <p className="text-sm text-muted-foreground">
                Inquiry. Science. Listening to ecosystems  
                as they teach us how to heal.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* CLOSING — Minimal, philosophical */}

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stewardship is a Relationship
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            We do not rush.  
            We do not ask.  
            We simply cultivate conditions —  
            and whatever emerges, emerges.
          </p>

          <Button asChild size="lg">
            <Link href="/donate/checkout">
              Enter the Portal
            </Link>
          </Button>

        </div>
      </section>

    </div>
  )
}
