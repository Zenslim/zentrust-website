import Link from "next/link";
import client from "@/tina/__generated__/client";
import { GlobalHero } from "@/components/hero/GlobalHero";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);

  let posts =
    (
      await client.queries.blogConnection().catch(() => null)
    )?.data?.blogConnection?.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean) ?? [];

  posts =
    posts.filter(
      (post: any) =>
        post?.primaryCategory === category ||
        post?.categories?.includes?.(category)
    ) ?? [];

  const contentId = "content";

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="ZenTrust Journal"
        headline={`Category: ${category}`}
        dek="Articles organized by the themes we study and steward in the field."
        belowAnchorId={contentId}
        mode="confirm"
      />

      <div id={contentId} className="max-w-5xl mx-auto px-4 py-12">
        {posts.length === 0 && (
          <p className="rounded-2xl border p-4 text-sm text-foreground/70">
            No posts found in this category yet.
          </p>
        )}

        <div className="space-y-6">
          {posts.map((post: any) => (
            <Link
              key={post?._sys?.filename}
              href={`/blog/${post?._sys?.filename}`}
              className="block rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {post?.title}
              </h2>
              <p className="text-xs uppercase tracking-[0.15em] text-primary/80 mt-1">
                {post?.primaryCategory || "ZenTrust Journal"}
              </p>
              <p className="text-foreground/60 text-sm mt-1">
                {post?.date || ""}
              </p>
              {post?.excerpt && (
                <p className="text-foreground/75 text-sm mt-3 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
