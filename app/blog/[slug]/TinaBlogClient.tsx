"use client";

import Image from "next/image";
import { FC } from "react";
import ReadingProgress from "@/components/ReadingProgress";
import { calculateReadTime } from "@/lib/readTime";
import { renderRichText, renderStaticMarkdown } from "@/lib/richTextRenderer";

interface TinaBlogClientProps {
  data: any;
  relatedPosts?: any[];
  prevPost?: any | null;
  nextPost?: any | null;
}

/** ----------------------------------------------------
 *  FIX: DARK-MODE READING CONTRAST
 *  Replace all text-gray-* with theme-aware foreground colors.
 ------------------------------------------------------ */

const richTextClasses = {
  h1: "text-4xl font-bold mt-10 mb-6 leading-tight text-foreground",
  h2: "text-3xl font-semibold mt-10 mb-4 text-foreground",
  h3: "text-2xl font-semibold mt-8 mb-3 text-foreground",
  h4: "text-xl font-semibold mt-6 mb-2 text-foreground",
  // BODY PARAGRAPHS — MOST IMPORTANT FIX
  p: "leading-relaxed my-4 text-foreground/90 dark:text-foreground/85",
  link: "text-primary underline hover:text-primary/80 transition",
  ul: "list-disc pl-6 my-4 space-y-2 text-foreground/90 dark:text-foreground/85",
  ol: "list-decimal pl-6 my-4 space-y-2 text-foreground/90 dark:text-foreground/85",
  li: "leading-relaxed text-foreground/90 dark:text-foreground/85",
  blockquote: "border-l-4 border-primary/40 pl-4 italic text-foreground/80 dark:text-foreground/70 my-6",
  code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary",
  img: "rounded-lg my-6 mx-auto shadow-md max-w-full",
};

/** Normalize Tina heroImage value (string OR {src}) */
const getHero = (img: any) =>
  typeof img === "string" ? img : img?.src || "/images/default.jpg";

const TinaBlogClient: FC<TinaBlogClientProps> = ({
  data,
  relatedPosts = [],
  prevPost,
  nextPost,
}) => {
  const post = data?.post;

  if (!post) {
    return <div className="text-center py-20 text-foreground">Post not found.</div>;
  }

  const heroSrc = getHero(post?.heroImage);

  const bodyContent =
    typeof post?.body === "string"
      ? post.body
      : JSON.stringify(post?.body ?? "");

  const readTime = calculateReadTime(bodyContent || "");

  const formattedDate = post?.date
    ? new Date(post.date).toLocaleDateString()
    : "";

  const metaParts = [post?.author, formattedDate, `${readTime} min read`].filter(Boolean);

  return (
    <>
      <ReadingProgress />

      {/* FIX: More padding under navbar */}
      <article className="max-w-4xl mx-auto px-6 pb-20 pt-[110px] md:pt-[130px]">

        {/* HERO IMAGE */}
        {heroSrc && (
          <div className="mb-10">
            <Image
              src={heroSrc}
              alt={post.title}
              width={1600}
              height={900}
              sizes="100vw"
              className="object-cover w-full h-auto rounded-xl shadow-md"
              priority
            />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-5xl font-bold leading-tight mb-6 text-foreground">
          {post.title}
        </h1>

        {/* META */}
        <p className="text-sm text-foreground/70 mb-8">
          {metaParts.join(" • ")}
        </p>

        {/* AUDIO PLAYER */}
        {post.audio && (
          <audio controls className="w-full my-6">
            <source src={post.audio} type="audio/mpeg" />
          </audio>
        )}

        {/* CATEGORY / TAG CHIPS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {post.primaryCategory && (
            <a
              href={`/blog/category/${encodeURIComponent(post.primaryCategory)}`}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold"
            >
              {post.primaryCategory}
            </a>
          )}

          {post.categories?.map((cat: string) => (
            <a
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="bg-accent text-foreground/80 dark:text-foreground/70 px-3 py-1 rounded-full text-sm"
            >
              {cat}
            </a>
          ))}

          {post.tags?.map((tag: string, i: number) => (
            <span
              key={i}
              className="bg-muted text-foreground/80 dark:text-foreground/70 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* FIX: FULL PROSE OVERRIDE FOR DARK-MODE READABILITY */}
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:text-foreground
            prose-p:text-foreground/90
            prose-li:text-foreground/90
            prose-strong:text-foreground
            prose-a:text-primary
            prose-blockquote:text-foreground/80

            dark:prose-invert
            dark:prose-headings:text-foreground
            dark:prose-p:text-foreground/85
            dark:prose-li:text-foreground/85
            dark:prose-strong:text-foreground
            dark:prose-blockquote:text-foreground/75
          "
        >
          {typeof post.body === "string"
            ? renderStaticMarkdown(post.body, richTextClasses)
            : renderRichText(post.body, richTextClasses)}
        </div>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Related Posts</h3>
            <div className="space-y-4">
              {relatedPosts.map((rel: any) => {
                const relHero = getHero(rel?.heroImage);

                return (
                  <a
                    key={rel?._sys?.filename}
                    href={`/blog/${rel?._sys?.filename}`}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:bg-accent transition"
                  >
                    {relHero ? (
                      <img
                        src={relHero}
                        alt={rel?.title || "Related image"}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-muted" aria-hidden />
                    )}
                    <div className="min-w-0">
                      <h4 className="text-lg font-semibold line-clamp-2 text-foreground">
                        {rel?.title}
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {rel?.date ? new Date(rel.date).toLocaleDateString() : ""}
                        {rel?.primaryCategory ? ` • ${rel.primaryCategory}` : ""}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* NEXT / PREVIOUS */}
        {(prevPost || nextPost) && (
          <div className="flex justify-between mt-12 text-sm font-medium">
            {prevPost ? (
              <a
                href={`/blog/${prevPost?._sys?.filename}`}
                className="text-primary hover:underline"
              >
                ← {prevPost?.title}
              </a>
            ) : (
              <span />
            )}
            {nextPost && (
              <a
                href={`/blog/${nextPost?._sys?.filename}`}
                className="text-primary hover:underline"
              >
                {nextPost?.title} →
              </a>
            )}
          </div>
        )}
      </article>
    </>
  );
};

export default TinaBlogClient;
