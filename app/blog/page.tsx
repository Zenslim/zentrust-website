import Link from "next/link";
import { UniversalHero } from "@/components/hero/UniversalHero";
import { defaultHero, type HeroDefinition } from "@/components/hero/createHero";
import client from "@/tina/__generated__/client";

/**
 * Blog index page.
 */
export default async function BlogPage() {
  const hero: HeroDefinition = {
    identity: "ZenTrust Journal",
    icon: "sprout",
    headlineLines: ["Insights from the regenerative frontier"],
    orientation: [
      "Research, field notes, and stories shaping ecological restoration and holistic human wellbeing.",
    ],
    ritual: defaultHero.ritual,
  };

  const postsRes = await client.queries.blogConnection();
  const posts =
    postsRes?.data?.blogConnection?.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b?.date || "").getTime() -
          new Date(a?.date || "").getTime()
      ) ?? [];

  return (
    <main className="min-h-screen">
      <UniversalHero hero={hero} />

      <section className="mx-auto max-w-5xl px-4 py-12 space-y-6">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/80">
          ZenTrust Journal
        </p>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Insights from the regenerative frontier
        </h1>

        <p className="max-w-xl text-sm text-foreground/80 dark:text-foreground/70">
          Research, field notes, and stories shaping ecological restoration
          and holistic human wellbeing.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.length === 0 && (
            <div className="rounded-2xl border p-5 text-sm text-foreground/70 dark:text-foreground/60">
              Articles will appear here as they are published.
            </div>
          )}

          {posts.map((post) => {
            const heroImage =
              typeof post?.heroImage === "string"
                ? post.heroImage
                : post?.heroImage?.src || null;

            return (
              <Link
                key={post?._sys?.filename}
                href={`/blog/${post?._sys?.filename}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:hover:border-primary/40"
              >
                {heroImage && (
                  <img
                    src={heroImage}
                    alt={post?.title || "Blog hero image"}
                    className="h-48 w-full rounded-xl object-cover"
                  />
                )}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                    {post?.primaryCategory || "ZenTrust Journal"}
                  </p>
                  <h2 className="text-xl font-semibold leading-tight text-foreground group-hover:text-primary">
                    {post?.title}
                  </h2>
                  {post?.excerpt && (
                    <p className="text-sm text-foreground/70 dark:text-foreground/60">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-foreground/60">
                    {post?.date
                      ? new Date(post.date).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
