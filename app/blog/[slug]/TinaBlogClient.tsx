"use client";

import { TinaMarkdown, Components } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  Share2,
  Bookmark,
  MessageCircle,
  Minus,
  Plus,
} from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import { calculateReadTime } from "@/lib/readTime";

interface TinaBlogClientProps {
  data: any;
  query: string;
  variables: any;
  relatedPosts?: any[];
  prevPost?: any | null;
  nextPost?: any | null;
}

//
// RICH TEXT COMPONENTS – Newspaper-like typography
//
const richTextComponents: Components<{}> = {
  h1: (props) => (
    <h1 className="text-[2rem] md:text-4xl font-bold mt-10 mb-6 leading-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="leading-[1.9] text-[1.06rem] text-gray-700 my-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-blue-600 underline hover:text-blue-800 transition"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
  ol: (props) => (
    <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
  ),
  li: (props) => <li className="leading-relaxed text-gray-700" {...props} />,
  img: (props) => (
    <img
      className="rounded-lg my-6 mx-auto shadow-md max-w-full"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6"
      {...props}
    />
  ),
};

//
// MAIN COMPONENT
//
const TinaBlogClient: FC<TinaBlogClientProps> = ({
  data,
  query,
  variables,
  relatedPosts = [],
  prevPost,
  nextPost,
}) => {
  const { data: tinaData } = useTina({ data, query, variables });
  const post = tinaData?.post;

  const [shareUrl, setShareUrl] = useState("");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "small">(
    "normal"
  );
  const [bookmarked, setBookmarked] = useState(false);

  const isQuote = post?.isQuote === true;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);

      // Bookmark sync
      const saved = localStorage.getItem(`bookmark-${post?._sys?.filename}`);
      setBookmarked(Boolean(saved));
    }
  }, [post?._sys?.filename]);

  const toggleBookmark = () => {
    const key = `bookmark-${post?._sys?.filename}`;
    if (bookmarked) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, "true");
    }
    setBookmarked(!bookmarked);
  };

  if (!post) {
    return <div className="text-center py-20">Post not found.</div>;
  }

  const heroSrc =
    post?.heroImage?.startsWith("/")
      ? post.heroImage
      : post?.heroImage
      ? `/${post.heroImage}`
      : "/images/default.jpg";

  const formattedDate = post?.date
    ? new Date(post.date).toLocaleString()
    : "";

  const bodyContent =
    typeof post?.body === "string"
      ? post.body
      : JSON.stringify(post?.body ?? "");

  const readTime = calculateReadTime(bodyContent);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title || "");

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  // Split related posts
  const [nextReadPost, ...otherRelated] = relatedPosts;

  //
  // FONT SIZE CLASSES
  //
  const proseClass =
    fontSize === "small"
      ? "prose prose-sm"
      : fontSize === "large"
      ? "prose prose-lg"
      : "prose";

  //
  // RENDER
  //
  return (
    <>
      <ReadingProgress />

      <article className="max-w-4xl mx-auto px-6 pb-20 pt-10">

        {/* QUOTE LAYOUT — Minimalist */}
        {isQuote && (
          <div className="mb-12 mt-4 text-center">
            <h1 className="text-[2.1rem] leading-[1.25] md:text-5xl font-semibold text-gray-900 max-w-3xl mx-auto">
              {post.title}
            </h1>

            <p className="text-sm text-gray-500 mt-4">
              {post.author || "ZenTrust"} • {formattedDate} • {readTime} min read
            </p>
          </div>
        )}

        {/* NORMAL LAYOUT */}
        {!isQuote && (
          <>
            {/* Hero */}
            <div className="mb-8 md:mb-10">
              <Image
                src={heroSrc}
                alt={post.title}
                width={1600}
                height={900}
                className="object-cover w-full h-auto rounded-xl shadow-md"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-[1.9rem] md:text-5xl font-bold leading-tight mb-2">
              {post.title}
            </h1>

            {/* Meta Author + Date */}
            <p className="text-gray-600 text-[0.85rem] tracking-wide mb-4">
              {post.author || "ZenTrust"} • {formattedDate} • {readTime} min read
            </p>
          </>
        )}

        {/* ET-Style Meta Action Row */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-gray-200">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1.5 text-xs border rounded-full bg-white shadow-sm hover:bg-green-50 transition"
          >
            <span className="mr-1">Follow us</span>
            <img src="/icons/whatsapp.svg" alt="whatsapp" className="w-4 h-4" />
          </a>

          <div className="flex items-center gap-4 text-gray-600">
            {/* SHARE */}
            <button
              onClick={() => window.open(shareLinks.x, "_blank")}
              className="hover:text-black transition"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* FONT SIZE */}
            <div className="flex items-center gap-1">
              <Minus
                className="w-4 h-4 cursor-pointer hover:text-black"
                onClick={() => setFontSize("small")}
              />
              <span className="text-sm">Aa</span>
              <Plus
                className="w-4 h-4 cursor-pointer hover:text-black"
                onClick={() => setFontSize("large")}
              />
            </div>

            {/* BOOKMARK */}
            <button onClick={toggleBookmark}>
              <Bookmark
                className={`w-5 h-5 ${
                  bookmarked ? "fill-black text-black" : "text-gray-600"
                }`}
              />
            </button>

            {/* COMMENTS (future anchor) */}
            <a href="#comments">
              <MessageCircle className="w-5 h-5 hover:text-black" />
            </a>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {post.primaryCategory && (
            <a
              href={`/blog/category/${encodeURIComponent(post.primaryCategory)}`}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200"
            >
              {post.primaryCategory}
            </a>
          )}

          {post.categories?.map((cat: string) => (
            <a
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* ARTICLE BODY */}
        <div className={`${proseClass} prose-gray max-w-none`}>
          <TinaMarkdown content={post.body} components={richTextComponents} />
        </div>

        {/* Editorial Promo */}
        <div className="mt-12 bg-gray-50 border border-dashed border-gray-200 p-5 rounded-xl text-sm">
          Explore more regenerative science and holistic wellness insights in the{" "}
          <a href="/blog" className="font-semibold text-blue-600 hover:underline">
            ZenTrust Journal →
          </a>
        </div>

        {/* NEXT READ */}
        {nextReadPost && (
          <section className="mt-12">
            <h3 className="text-lg font-semibold mb-3">Next Read</h3>
            <a
              href={`/blog/${nextReadPost?._sys?.filename}`}
              className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              <Image
                src={
                  nextReadPost.heroImage?.startsWith("/")
                    ? nextReadPost.heroImage
                    : `/${nextReadPost.heroImage}`
                }
                alt="next"
                width={96}
                height={96}
                className="rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-[1rem] leading-snug">
                  {nextReadPost.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(nextReadPost.date).toLocaleDateString()}
                </p>
              </div>
            </a>
          </section>
        )}

        {/* RELATED POSTS */}
        {otherRelated.length > 0 && (
          <section className="mt-14">
            <h3 className="text-lg font-semibold mb-3">Related Posts</h3>
            <div className="space-y-4">
              {otherRelated.map((rel) => (
                <a
                  href={`/blog/${rel?._sys?.filename}`}
                  key={rel?._sys?.filename}
                  className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition"
                >
                  <Image
                    src={
                      rel.heroImage?.startsWith("/")
                        ? rel.heroImage
                        : `/${rel.heroImage}`
                    }
                    alt="related"
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{rel.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(rel.date).toLocaleDateString()}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* PREV / NEXT NAV */}
        {(prevPost || nextPost) && (
          <div className="flex justify-between mt-14 border-t pt-6 text-sm font-medium">
            {prevPost ? (
              <a
                href={`/blog/${prevPost?._sys?.filename}`}
                className="text-blue-600 hover:underline max-w-xs"
              >
                ← {prevPost.title}
              </a>
            ) : (
              <span />
            )}
            {nextPost && (
              <a
                href={`/blog/${nextPost?._sys?.filename}`}
                className="text-blue-600 hover:underline max-w-xs text-right"
              >
                {nextPost.title} →
              </a>
            )}
          </div>
        )}
      </article>

      {/* FUTURE COMMENTS SECTION */}
      <div id="comments" className="max-w-4xl mx-auto px-6 mt-20">
        {/* Placeholder for future comment system */}
      </div>
    </>
  );
};

export default TinaBlogClient;
