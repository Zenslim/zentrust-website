"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroRitual } from "./createHero";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

type Props = HeroRitual;

export function RitualPause({
  label = "Pause here ▷ tap",
  timeoutMs = 15000,
  videoSrc,
  poster,
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [used, setUsed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const ritualAvailable = !prefersReducedMotion && !used;
  const cappedTimeout = Math.min(timeoutMs ?? 15000, 15000);

  const exitRitual = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    setActive(false);
  };

  const enterRitual = () => {
    if (!ritualAvailable) return;
    setUsed(true);
    setActive(true);
  };

  useEffect(() => {
    if (!active) return;

    const vid = videoRef.current;
    vid?.play?.().catch(() => {});

    const timeoutId = window.setTimeout(exitRitual, cappedTimeout);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        exitRitual();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleKey);
      vid?.pause?.();
    };
  }, [active, cappedTimeout]);

  return (
    <>
      {/* Entry affordance (inline, minimal) */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={enterRitual}
          disabled={!ritualAvailable}
          aria-pressed={active}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm tracking-wide text-foreground/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:cursor-not-allowed disabled:text-foreground/40"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-foreground/30 text-xs font-semibold">
            ▶
          </span>
          <span>{label}</span>
        </button>
      </div>

      {/* Full-viewport ritual */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-black"
          onClick={exitRitual}
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-foreground/70">
              {label}
            </div>
          )}
        </div>
      )}
    </>
  );
}
