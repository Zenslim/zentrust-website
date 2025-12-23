import { GlobalHero } from "@/components/hero/GlobalHero";
import { RitualPause } from "@/components/hero/RitualPause";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { fetchQuestions } from "@/lib/questions";
import { notFound } from "next/navigation";

type HeroMode = "full_answer" | "answer_below";

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/")[1] || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }

      const segments = parsed.pathname.split("/").filter(Boolean);
      if (segments[0] === "embed" || segments[0] === "shorts") {
        return segments[1] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function YouTubeThumbnail({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const videoId = extractYouTubeId(url);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section className="bg-white/80 dark:bg-neutral-900/60 border-b border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm dark:border-neutral-800">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative block"
          >
            <img
              src={thumbnailUrl}
              alt={`${title} — YouTube explainer`}
              className="w-full object-cover transition duration-200 group-hover:brightness-[0.9]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition duration-200 group-hover:bg-black/30">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg backdrop-blur">
                <span className="pl-1 text-lg font-semibold">▶</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function QuestionPage({
  params,
}: {
  params: { slug: string };
}) {
  const questions = await fetchQuestions();

  const question = questions.find(
    (item): item is NonNullable<typeof item> =>
      !!item &&
      item.status === "published" &&
      item._sys?.filename === params.slug,
  );

  if (!question) {
    notFound();
  }

  const answerAnchor = "answer";
  const heroMode: HeroMode = question.heroMode as HeroMode;
  const heroDisplayMode = heroMode === "answer_below" ? "confirm" : "answer";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <GlobalHero
        kicker="ZenTrust Questions"
        headline={question.question}
        dek={question.heroText}
        belowAnchorId={answerAnchor}
        mode={heroDisplayMode}
        ritual={{ enabled: false }}
      />

      {question.youtubeUrl && question.youtubeUrl.trim().length > 0 && (
        <YouTubeThumbnail
          url={question.youtubeUrl}
          title={question.question}
        />
      )}

      <section
        id={answerAnchor}
        className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-10"
      >
        <article className="prose prose-neutral dark:prose-invert prose-lg">
          <TinaMarkdown content={question.body} />
        </article>
      </section>

      <div className="pb-16 flex justify-center">
        <RitualPause />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const questions = await fetchQuestions();

  return questions
    .filter(
      (item): item is NonNullable<typeof item> =>
        !!item && item.status === "published" && !!item._sys?.filename,
    )
    .map((item) => ({
      slug: item._sys.filename,
    }));
}
