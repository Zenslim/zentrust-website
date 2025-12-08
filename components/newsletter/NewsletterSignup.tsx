// components/newsletter/NewsletterSignup.tsx

import { Button } from '@/components/ui/button'

export function NewsletterSignup() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 to-emerald-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Stay Connected
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
             Receive reflections on regenerative initiatives, ecological research, 
  and community-led transformations as they emerge across our network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background 
              text-foreground placeholder:text-muted-foreground 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button>Subscribe</Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
