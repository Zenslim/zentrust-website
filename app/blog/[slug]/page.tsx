// /app/blog/[slug]/page.tsx

import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import client from "../../../tina/__generated__/client";
import TinaBlogClient from "./TinaBlogClient";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  if (!slug) return notFound();

  // Fetch single post
  let data;
  try {
    data = await client.queries.blog({
      relativePath: `${slug}.mdx`,
    });
  } catch (e) {
    return notFound();
  }

  const post = data?.data?.blog;
  if (!post) return notFound();

  // Fetch all posts for related posts + next/prev
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

  // NEXT / PREVIOUS POSTS
  const currentIndex = allPosts.findIndex((p) => p?._sys?.filename === slug);
  const prevPost = currentIndex >= 0 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // ⭐ FIX: Add padding so hero image does not go under navbar
  return (
    <div className="pt-[110px] md:pt-[130px]">
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
  );
}

// Generate static params for prerendering blog posts
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content", "blog");
  const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : [];

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}
