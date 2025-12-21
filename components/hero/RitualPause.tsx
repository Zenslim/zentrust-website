"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type RitualVideo = {
  src: string;
  poster?: string;
};

const MOBILE_RITUALS: RitualVideo[] = [
  {
    src: "/video/mobile-syntropy-v1-quiet-mirror.mp4",
    poster: "/images/hero-mobile.jpeg",
  },
  {
    src: "/video/mobile-bpss-v1-quiet-mirror.mp4",
    poster: "/images/zentrust-hero-image.jpeg",
  },
];

const DESKTOP_RITUALS: RitualVideo[] = [
  {
    src: "/video/syntropic-food-forest.mp4",
    poster: "/images/desktop-syntropy-v1-quiet-mirror.jpg",
  },
  {
    src: "/video/syntropic-food-forest.mp4",
    poster: "/images/desktop-bpss-v1-quiet-mirror.jpg",
  },
];

type RitualPauseProps = {
  enabled?: boolean;
  timeoutMs?: number;
  onActiveChange?: (active: boolean) => void;
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export function RitualPause({
  enabled = true,
  timeoutMs = 15000,
  onActiveChange,
}: RitualPauseProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const cappedTimeout = Math.min(timeoutMs ?? 15000, 15000);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const seed = hashString(`${pathname ?? ""}-${Date.now()}`);
    if (MOBILE_RITUALS.length > 0) {
      setMobileIndex(seed % MOBILE_RITUALS.length);
    }
    if (DESKTOP_RITUALS.length > 0) {
      setDesktopIndex((seed >> 1) % DESKTOP_RITUALS.length);
    }
  }, [pathname]);

  const source = useMemo(() => {
    const list = isMobile ? MOBILE_RITUALS : DESKTOP_RITUALS;
    if (list.length === 0) return null;
    const index = isMobile ? mobileIndex : desktopIndex;
    return list[index % list.length];
  }, [desktopIndex, isMobile, mobileIndex]);

  const exitRitual = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setActive(false);
    onActiveChange?.(false);
  };

  const enterRitual = () => {
    if (!enabled || !source) return;
    setActive(true);
    onActiveChange?.(true);

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore — iOS needs explicit flag
      video.playsInline = true;
      video.play().catch(() => {});
    }

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(exitRitual, cappedTimeout);
  };

  useEffect(() => {
    if (!active) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    const ensurePlay = () => video.play().catch(() => {});
    requestAnimationFrame(ensurePlay);

    const handleEnded = () => exitRitual();
    const handleKey = (event: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        exitRitual();
      }
    };

    video.addEventListener("ended", handleEnded);
    window.addEventListener("keydown", handleKey);

    return () => {
      video.removeEventListener("ended", handleEnded);
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, cappedTimeout, source]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={enterRitual}
          disabled={!enabled || !source}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-3 py-2 text-sm tracking-wide text-foreground/80 transition hover:border-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:cursor-not-allowed disabled:opacity-50"
          aria-pressed={active}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-foreground/30 text-[10px] font-semibold text-foreground/70">
            ▶
          </span>
          <span>Pause here ▷ tap</span>
        </button>
        <p className="text-xs text-foreground/55">15-second silent video. Closes on its own.</p>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[90] transition duration-200",
          active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!active}
      >
        <div className="absolute inset-0 bg-black/90" onClick={exitRitual} />

        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl",
              isMobile ? "mx-auto max-w-[440px] aspect-[9/16]" : "max-w-5xl aspect-video"
            )}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
              poster={source?.poster}
            >
              {source ? <source src={source.src} type="video/mp4" /> : null}
            </video>

            <button
              type="button"
              onClick={exitRitual}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-white/40 hover:bg-black/80"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
