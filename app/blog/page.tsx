export default async function BlogPage() {
  const posts = await getBlogPosts();

  if (!posts.length) {
    return (
      <main className="min-h-screen">
        <h1 className="text-4xl font-bold">ZenTrust Journal</h1>
        <p className="mt-2 text-foreground/70">
          No articles available.
        </p>
      </main>
    );
  }

  const [featuredPost, ...recentPosts] = posts;

  return (
    <main className="min-h-screen">
      {/* blog body only — hero comes from layout */}
      {/* existing blog listing code here */}
    </main>
  );
}
