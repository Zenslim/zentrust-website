// 🚨 IMPORTANT: Disable static caching for blog posts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { GlobalHero } from "@/components/hero/GlobalHero";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  if (!slug) return notFound();

  const post = getBlogPostBySlug(slug);
  if (!post) return notFound();

  const allPosts = getAllBlogPosts();

  // RELATED POSTS
  const relatedPosts =
    allPosts
      ?.filter((p) => p?._sys?.filename !== slug)
      ?.filter((p) => {
        if (!p) return false;

        const matchPrimary =
          p.primaryCategory && p.primaryCategory === post.primaryCategory;

        const matchCategories =
          Array.isArray(p.categories) &&
          Array.isArray(post.categories) &&
          p.categories.some((cat) => cat && post.categories?.includes(cat));

        const matchTags =
          Array.isArray(p.tags) &&
          Array.isArray(post.tags) &&
          p.tags.some((tag) => tag && post.tags?.includes(tag));

        return matchPrimary || matchCategories || matchTags;
      })
      .slice(0, 3) ?? [];

  // NEXT / PREVIOUS
  const currentIndex = allPosts.findIndex(
    (p) => p?._sys?.filename === slug
  );
  const prevPost = currentIndex >= 0 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const contentId = "content";

  return (
    <>
      <GlobalHero
        kicker="ZenTrust Journal"
        headline={post.title ?? "ZenTrust Journal"}
        dek={
          post.excerpt ||
          "Research, field notes, and stories shaping ecological restoration and holistic human wellbeing."
        }
        belowAnchorId={contentId}
        mode="confirm"
      />

      <div id={contentId} className="pt-[110px] md:pt-[130px]">
        <BlogPostClient
          post={{
            ...post,
            date: post?.date ?? "",
          }}
          relatedPosts={relatedPosts}
          prevPost={prevPost}
          nextPost={nextPost}
        />
      </div>
    </>
  );
}

// ⚠️ KEEP THIS — still needed for routing, but no longer cached
export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}
