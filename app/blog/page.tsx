import client from "../../tina/__generated__/client"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const formatDate = (value?: string | null) => {
  if (!value) return ""
  const d = new Date(value)
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
}

export default async function BlogPage() {
  let blogRes
  try {
    blogRes = await client.queries.blogConnection()
  } catch (e) {
    blogRes = null
  }

  const posts =
    blogRes?.data?.blogConnection?.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b?.date || "").getTime() -
          new Date(a?.date || "").getTime()
      ) ?? []

  if (posts.length === 0) {
    return (
      <main className="max-w-5xl mx-auto pt-28 px-4">
        <h1 className="text-4xl font-bold">ZenTrust Journal</h1>
        <p className="text-foreground/80 dark:text-foreground/70 mt-2">
          No articles published yet.
        </p>
      </main>
    )
  }

  const [featuredPost, ...recentPosts] = posts
  const categoriesSet = new Set<string>()
  posts.forEach((p) => {
    if (p?.primaryCategory) categoriesSet.add(p.primaryCategory)
    p?.categories?.forEach((cat) => cat && categoriesSet.add(cat))
  })

  const categories = Array.from(categoriesSet)

  // Normalize hero images (Tina returns object sometimes)
  const getHero = (img: any) =>
    typeof img === "string" ? img : img?.src || "/images/default.jpg"

  return (
    <main className="min-h-screen pt-24 bg-background">

      {/* HEADER */}
      <section className="border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/80">
            ZenTrust Journal
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Insights from the regenerative frontier
          </h1>

          <p className="text-foreground/80 dark:text-foreground/70 max-w-xl text-sm">
            Research, field notes, and stories shaping ecological restoration
            and holistic human wellbeing.
          </p>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`/blog/category/${encodeURIComponent(cat)}`}
                  className="px-4 py-2 text-sm bg-accent text-foreground/80 dark:text-foreground/70 rounded-full hover:bg-accent/70"
                >
                  {cat}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="max-w-5xl mx-auto px-4 pt-10">
        <article className="grid md:grid-cols-2 gap-6 border rounded-xl bg-card shadow-sm p-4 md:p-6">

          {/* HERO IMAGE */}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={getHero(featuredPost.heroImage)}
              alt={featuredPost.title || ""}
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* TEXT */}
          <div className="space-y-4 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/70 dark:text-foreground/60">
              {featuredPost.primaryCategory && (
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                  {featuredPost.primaryCategory}
                </span>
              )}

              {featuredPost.date && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(featuredPost.date)}
                </span>
              )}

              {featuredPost.author && (
                <span className="inline-flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {featuredPost.author}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-semibold leading-snug">
              <Link
                href={`/blog/${featuredPost?._sys?.filename}`}
                className="hover:text-primary transition-colors"
              >
                {featuredPost.title}
              </Link>
            </h2>

            {featuredPost.excerpt && (
              <p className="text-foreground/80 dark:text-foreground/70 text-sm">
                {featuredPost.excerpt}
              </p>
            )}

            <div className="pt-2">
              <Button asChild>
                <Link href={`/blog/${featuredPost?._sys?.filename}`}>
                  Read article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

          </div>
        </article>
      </section>

      {/* LATEST ARTICLES */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-20 space-y-6">
        <h3 className="text-lg font-semibold tracking-tight">Latest articles</h3>

        <div className="grid gap-8 md:grid-cols-2">
          {recentPosts.map((post) => (
            <article
              key={post?._sys?.filename}
              className="border rounded-xl bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <Link href={`/blog/${post?._sys?.filename}`}>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={getHero(post.heroImage)}
                    alt={post?.title || ""}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </Link>

              <div className="p-5 space-y-3 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/70 dark:text-foreground/60">
                  {post.primaryCategory && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {post.primaryCategory}
                    </span>
                  )}

                  {post.date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold leading-snug">
                  <Link
                    href={`/blog/${post?._sys?.filename}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                {post.excerpt && (
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="pt-2 flex justify-between items-center text-xs text-foreground/70 dark:text-foreground/60 mt-auto">
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author || "ZenTrust"}
                  </span>

                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs"
                  >
                    <Link href={`/blog/${post?._sys?.filename}`}>
                      Read more <ArrowRight className="ml-1.5 h-3 w-3" />
                    </Link>
                  </Button>
                </div>

              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
