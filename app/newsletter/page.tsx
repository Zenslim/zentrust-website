"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Leaf } from "lucide-react"
import { GlobalHero } from "@/components/hero/GlobalHero"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center glass-card rounded-2xl p-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">You're on the list.</h1>
          <p className="text-muted-foreground mb-8">
            Quiet updates will arrive soon—notes from the field, science in motion,
            and small signals of what’s growing beneath the surface.
          </p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="Newsletter"
        headline="The Quiet Newsletter: slow, precise updates from the field."
        dek="A calm stream of research notes, watershed signals, and program milestones—never persuasion or urgency."
        belowAnchorId="content"
        mode="confirm"
      />

      <div id="content" className="pt-10 scroll-mt-24">
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Subscribe quietly
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Research taking shape, landscapes listening, partnerships unfolding. No campaigns. No noise.
            </p>

            {/* Minimal Form */}
            <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" /> Subscribe
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Unsubscribe anytime. We write rarely and never send noise.
                </p>
              </form>
            </div>
          </div>
        </section>
      {/* What to Expect */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What You’ll Receive
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Not marketing. Not campaigns.  
            Just a quiet stream of what is genuinely unfolding within ZenTrust:
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Field Notes</h3>
              <p className="text-sm text-muted-foreground">
                Observations from watershed mapping, soil studies,
                and emerging ecological patterns.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Research Signals</h3>
              <p className="text-sm text-muted-foreground">
                Early insights from BPSS-integrative work and open scientific explorations.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Program Formation</h3>
              <p className="text-sm text-muted-foreground">
                Small milestones as 2026 programs germinate—quiet, steady, emergent.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Closing */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              A Gentle Stream of Updates
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We write only when there is something real to say—
              reflections from the land, the lab, or the communities we walk with.
              No urgency. No noise. Just movement.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
