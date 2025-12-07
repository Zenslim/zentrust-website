"use client"
export const dynamic = "force-dynamic"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Heart, Leaf, TreePine, Users, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { calculateDonationImpact } from "@/lib/calculator"
import { useEffect } from "react"

export default function ThankYouPage() {
  const searchParams = useSearchParams()

  // Amount & frequency passed via Stripe redirect or router.push
  const amount = Number(searchParams.get("amount") ?? 0)
  const frequency = searchParams.get("frequency") || "once"

  const impact = amount > 0 ? calculateDonationImpact(amount) : null

  // GA4 Conversion Event
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && amount > 0) {
      window.gtag("event", "donation_completed", {
        value: amount,
        currency: "USD",
        frequency,
      })
    }
  }, [amount, frequency])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-10">

        {/* HEADER */}
        <div className="space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Thank You for Regenerating with Us
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your contribution helps awaken ecosystems, strengthen communities, and support open scientific research.
            This is more than a donation — it is an act of regeneration.
          </p>
        </div>

        {/* IMPACT SUMMARY */}
        {impact && (
          <div className="rounded-2xl shadow border border-border/50 bg-muted/30 p-6 sm:p-8 space-y-5 text-left">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Your Regenerative Impact
            </h2>

            <p className="text-sm text-muted-foreground">
              Based on your contribution of{" "}
              <span className="font-semibold text-foreground">
                ${amount.toLocaleString()}
              </span>
              {frequency === "monthly" && (
                <span className="text-muted-foreground">/month</span>
              )}
              , here is what you help activate:
            </p>

            <div className="space-y-3">
              <ImpactMetric
                icon={TreePine}
                label="Ecosystem Layers Regenerated"
                value={impact.trees}
                description="Layers of life — canopy, understory, shrubs, herbs, and root networks — restored into living succession."
              />
              <ImpactMetric
                icon={Leaf}
                label="Regenerative Cells Becoming Anti-Fragile"
                value={impact.acres}
                description="Landscape units transitioning into self-renewing, drought-resilient, biodiversity-rich systems."
              />
              <ImpactMetric
                icon={Users}
                label="Families Moving Toward Self-Sufficiency"
                value={impact.households}
                description="Communities gaining ecological stability, livelihood resilience, and autonomy."
              />
              {impact.research_plots > 0 && (
                <ImpactMetric
                  icon={Microscope}
                  label="Research Initiatives Supported"
                  value={impact.research_plots}
                  description="Scientific studies advancing regenerative ecology, watershed behavior, and BPSS-integrative wellness."
                />
              )}
            </div>
          </div>
        )}

        {/* CTA BUTTONS */}
        <div className="space-y-4">
          <Link href="/programs">
            <Button className="inline-flex items-center gap-2 px-6 py-3 text-base">
              Explore Our Programs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/donate">
            <p className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Make another contribution →
            </p>
          </Link>
        </div>

        {/* FOOTNOTE */}
        <p className="text-[11px] text-muted-foreground max-w-md mx-auto leading-relaxed">
          ZenTrust, Inc. is a 501(c)(3) public charity (EIN: 33-4318487).  
          A donation receipt has been sent to your email if provided.
        </p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------- */
/* Reusable Impact Metric Component */
/* ---------------------------------------------------------------------- */

function ImpactMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
}) {
  return (
    <div className="rounded-xl bg-background/50 border border-border/50 p-4 space-y-1">
      <div className="flex items-baseline justify-between gap-2">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="h-4 w-4 text-primary" />
          <span>{label}</span>
        </div>
        <span className="text-lg font-semibold text-foreground">
          {value.toLocaleString()}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
