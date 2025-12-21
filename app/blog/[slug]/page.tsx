// 🚨 IMPORTANT: Disable static caching for blog posts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import client from "../../../tina/__generated__/client";
import TinaBlogClient from "./TinaBlogClient";
import { GlobalHero } from "@/components/hero/GlobalHero";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  if (!slug) return notFound();

  // Fetch single post
  let data;
  try {
    data = await client.queries.blog({
      relativePath: `${slug}.mdx`,
    });
  } catch {
    return notFound();
  }

  const post = data?.data?.blog;
  if (!post) return notFound();

  // Fetch all posts
  let allPostsRes;
  try {
    allPostsRes = await client.queries.blogConnection();
  } catch {
    allPostsRes = null;
  }

  const allPosts =
    allPostsRes?.data?.blogConnection?.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b?.date || "").getTime() -
          new Date(a?.date || "").getTime()
      ) ?? [];

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
  const currentIndex = allPosts.findIndex((p) => p?._sys?.filename === slug);
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
        <TinaBlogClient
          data={{
            post: {
              ...post,
              date: post?.date ?? "",
            },
          }}
          query={data?.query}
          variables={data?.variables}
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
  const blogDir = path.join(process.cwd(), "content", "blog");
  const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : [];

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}
