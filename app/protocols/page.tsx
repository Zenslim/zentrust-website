import Link from "next/link";
import { GlobalHero } from "@/components/hero/GlobalHero";

export default function ProtocolsPage() {
  const contentId = "content";

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="Protocols"
        headline="Open protocols for education and research."
        dek="Each protocol is published calmly and in full—no gates, no persuasion. The current set is below."
        belowAnchorId={contentId}
        mode="confirm"
        secondaryCta={{ label: "View protocols", href: `#${contentId}` }}
      />

      <main id={contentId} className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">ZenTrust Protocols</h1>
        <p className="mb-10 text-neutral-600">
          Public education and research protocols.
        </p>
        <ul className="space-y-4">
          {[
            { href: "/protocols/syntropic-ecology", label: "Syntropic Ecology" },
            { href: "/protocols/bpss-health", label: "BPSS Health" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline text-blue-600">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
