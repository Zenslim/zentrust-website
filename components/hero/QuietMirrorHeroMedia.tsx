"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

type Props = {
  pauseVideoSrc?: string; // optional ritual micro-pause video
  heroImageSrc: string;
  heroImageAlt: string;
  pauseDurationMs?: number; // default 15000
  children?: ReactNode;
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
  heroImageAlt,
  pauseDurationMs = 15000,
  children,
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [hasPausedOnce, setHasPausedOnce] = useState(false);

  const canPause = useMemo(
    () => !!pauseVideoSrc && !prefersReducedMotion && !hasPausedOnce,
    [pauseVideoSrc, prefersReducedMotion, hasPausedOnce]
  );

  const enterPause = () => {
    if (!canPause) return;
    setIsPaused(true);
    setHasPausedOnce(true);
  };

  const exitPause = () => {
    setIsPaused(false);
  };

  // Auto-exit after duration
  useEffect(() => {
    if (!isPaused) return;

    timerRef.current = window.setTimeout(exitPause, pauseDurationMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, pauseDurationMs]);

  // Play video only when pause is active
  useEffect(() => {
    if (!isPaused) return;
    const v = videoRef.current;
    if (!v) return;

    v.currentTime = 0;
    v.play().catch(() => {
      exitPause();
    });
  }, [isPaused]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Default hero state — always visible */}
      {!isPaused && (
        <>
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Optional, subtle micro-pause trigger */}
          {canPause && (
            <button
              type="button"
              onClick={enterPause}
              className="absolute bottom-4 right-4 z-10 text-xs text-white/70 hover:text-white/90"
              aria-label="Tap to continue"
            >
              Tap to continue
            </button>
          )}

          {children && (
            <div className="relative z-10 hero-foreground">
              {children}
            </div>
          )}
        </>
      )}

      {/* Micro-pause state */}
      {isPaused && pauseVideoSrc && (
        <div
          className="absolute inset-0 z-20"
          onClick={exitPause}
          role="presentation"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={pauseVideoSrc}
            muted
            playsInline
            preload="metadata"
          />
        </div>
      )}
    </div>
  );
}
