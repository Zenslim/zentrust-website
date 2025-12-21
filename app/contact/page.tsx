"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageCircle, Newspaper, Users } from "lucide-react"
import Link from "next/link"
import { GlobalHero } from "@/components/hero/GlobalHero"

const inquiryTypes = [
  {
    icon: MessageCircle,
    title: "General",
    description: "Questions about ZenTrust or our work",
    email: "hello@zentrust.org",
  },
  {
    icon: Newspaper,
    title: "Media & Press",
    description: "Press, interviews, and communications",
    email: "press@zentrust.org",
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "Research, academic, and community partnerships",
    email: "partnerships@zentrust.org",
  }
]

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@zentrust.org",
    description: "Best for most inquiries",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (508) 317-7517",
    description: "For time-sensitive communication",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Duxbury, Massachusetts",
    description: "Administrative office (by appointment)",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "General",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you — your message has been sent.")
  }

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="Contact"
        headline="Reach ZenTrust without urgency—every inquiry is handled calmly and directly."
        dek="Choose the path that matches your question; we respond with clarity and no pressure."
        belowAnchorId="content"
        mode="confirm"
        secondaryCta={{ label: "See contact options", href: "#content" }}
      />

      <div id="content" className="pt-12">
      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((m, i) => {
              const Icon = m.icon
              return (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex mx-auto items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{m.title}</h3>
                  <p className="text-primary font-medium mt-1">{m.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{m.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Inquiry Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {inquiryTypes.map((t, i) => {
              const Icon = t.icon
              return (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t.description}</p>
                  <p className="text-primary text-sm font-medium">{t.email}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Minimal Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Send a Message
          </h2>

          <div className="glass-card rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background resize-none"
                />
              </div>

              <Button type="submit" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Our Location
          </h2>
          <p className="text-muted-foreground mb-8">
            ZenTrust is based in Duxbury, Massachusetts, with partnerships extending internationally.
          </p>

          <div className="glass-card rounded-2xl p-8">
            <MapPin className="h-6 w-6 text-primary mx-auto mb-4" />
            <p className="text-lg leading-relaxed">
              2 Reserve Way<br />
              Duxbury, MA 02332<br />
              United States
            </p>
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}
