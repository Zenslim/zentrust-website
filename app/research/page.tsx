export const metadata = {
  title: "Research | ZenTrust",
  description: "Status update for ZenTrust research resources.",
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Research</p>
          <h1 className="text-4xl font-semibold text-foreground">Section status</h1>
          <p className="text-lg text-muted-foreground">
            This section is under development. Research briefs, methods, and findings will be added
            once the materials are ready for open access.
          </p>
        </header>

        <section className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We are organizing field notes, data summaries, and methodology guides so they can be
            published without requiring accounts or marketing opt-ins. Updates will be posted as
            soon as they meet our quality and clarity standards.
          </p>
        </section>
      </div>
    </main>
  )
}
