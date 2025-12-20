"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

type Props = {
  pauseVideoSrc?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  children?: ReactNode;
  pauseDurationMs?: number;
};

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

export default function QuietMirrorHeroMedia({
  pauseVideoSrc,
  heroImageSrc,
  heroImageAlt = "",
  children,
  pauseDurationMs = 15000,
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [ritualActive, setRitualActive] = useState(false);
  const [ritualUsed, setRitualUsed] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const ritualEnabled =
    Boolean(pauseVideoSrc) && !prefersReducedMotion && !ritualUsed;

  /* Show invite once, intentionally delayed */
  useEffect(() => {
    if (!ritualEnabled) return;
    const t = window.setTimeout(() => setShowInvite(true), 1400);
    return () => window.clearTimeout(t);
  }, [ritualEnabled]);

  const enterRitual = () => {
    if (!ritualEnabled) return;
    setRitualActive(true);
    setRitualUsed(true);
    setShowInvite(false);
  };

  const exitRitual = () => {
    setRitualActive(false);
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
    }
  };

  useEffect(() => {
    if (!ritualActive) return;

    timeoutRef.current = window.setTimeout(
      exitRitual,
      Math.min(pauseDurationMs, 15000)
    );

    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.play().catch(exitRitual);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [ritualActive, pauseDurationMs]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      {/* HERO MEDIA */}
      {heroImageSrc && (
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* HERO CONTENT */}
      {!ritualActive && (
        <div className="relative z-20">
          {children}
        </div>
      )}

      {/* RITUAL INVITATION — GUARANTEED VISIBLE */}
      {ritualEnabled && showInvite && !ritualActive && (
        <div className="absolute left-0 right-0 bottom-10 z-30 flex justify-center px-4">
          <button
            type="button"
            onClick={enterRitual}
            aria-label="Pause here"
            className="
              text-base sm:text-sm
              tracking-wide
              text-black/70 dark:text-white/70
              select-none
            "
          >
            Pause here ▷ tap
          </button>
        </div>
      )}

      {/* RITUAL OVERLAY */}
      {ritualActive && (
        <div
          className="fixed inset-0 z-[9999]"
          role="button"
          tabIndex={0}
          aria-label="Exit ritual"
          onClick={exitRitual}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              exitRitual();
            }
          }}
        >
          <div className="relative mx-auto h-full aspect-[9/16] max-w-[56vh]">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={pauseVideoSrc}
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      )}
    </div>
  );
}
