"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

type Props = {
  /** Micro-pause visual (silent ritual). Required to enable micro-pause. */
  pauseVideoSrc?: string;

  /** Default hero image (fallback + first frame). Optional but recommended. */
  heroImageSrc?: string;
  heroImageAlt?: string;

  /** Foreground hero content (text/CTAs). Always visible by default. */
  children?: ReactNode;

  /**
   * Max micro-pause duration in ms (doctrine: ≤ 15s).
   * Defaults to 15000.
   */
  pauseDurationMs?: number;

  /**
   * Show a subtle trigger. If false, micro-pause can still be entered by clicking hero media.
   * Defaults to true.
   */
  showTrigger?: boolean;

  /**
   * Optional trigger label. Keep text-light.
   */
  triggerLabel?: string;
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
  showTrigger = true,
  triggerLabel = "Pause (15s)",
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Micro-pause state (never persisted)
  const [pauseActive, setPauseActive] = useState(false);

  // Once used in this visit, never re-invite again (until page reload/navigation)
  const [pauseUsed, setPauseUsed] = useState(false);

  const pauseVideoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const microPauseEnabled =
    Boolean(pauseVideoSrc) && !prefersReducedMotion && !pauseUsed;

  const enterPause = () => {
    if (!microPauseEnabled) return;
    setPauseActive(true);
    setPauseUsed(true);
  };

  const exitPause = () => {
    setPauseActive(false);

    // Stop playback immediately; return hero exactly as it was.
    const v = pauseVideoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {
        // ignore
      }
    }
  };

  // When pause becomes active, play and arm a hard timeout (≤ 15s).
  useEffect(() => {
    if (!pauseActive) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // Hard timeout exit (doctrine: exit when duration completes)
    timeoutRef.current = window.setTimeout(() => {
      exitPause();
    }, Math.min(Math.max(pauseDurationMs, 0), 15000));

    const v = pauseVideoRef.current;
    if (v) {
      // Silent, inline. Never autoplay on load — only after explicit user entry.
      v.muted = true;
      v.playsInline = true;
      v.loop = true; // allowed; we still hard-exit at ≤15s
      v.play().catch(() => {
        // If it cannot play, exit immediately (no trap, no message)
        exitPause();
      });
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseActive]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      {/* DEFAULT HERO MEDIA (non-authoritative; no forced bg/text) */}
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

      {/* Click-to-enter micro-pause by clicking hero media area (NOT the text) */}
      {microPauseEnabled && !pauseActive && (
        <button
          type="button"
          aria-label="Enter micro-pause"
          onClick={enterPause}
          className="absolute inset-0 z-10"
          // Important: doesn't style anything; it just captures clicks on media.
          style={{ background: "transparent" }}
        />
      )}

      {/* Foreground hero content — ALWAYS visible by default */}
      {children && (
        <div className="relative z-20 text-inherit pointer-events-auto">
          {children}
        </div>
      )}

      {/* Optional subtle trigger (appears at most once; never reappears after use) */}
      {microPauseEnabled && showTrigger && !pauseActive && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center pointer-events-none">
          <button
            type="button"
            onClick={enterPause}
            className="pointer-events-auto rounded-full bg-black/40 px-4 py-2 text-xs tracking-wide text-white backdrop-blur"
            aria-label="Pause for a moment"
          >
            {triggerLabel}
          </button>
        </div>
      )}

      {/* MICRO-PAUSE OVERLAY — no text, no logos, no overlays, no UI chrome */}
      {pauseActive && (
        <div
          className="fixed inset-0 z-[9999]"
          onClick={exitPause}
          role="button"
          tabIndex={0}
          aria-label="Exit micro-pause"
          // No forced background color; video fills. If it doesn't, underlying page shows.
          onKeyDown={(e) => {
            // allow immediate exit by keyboard (accessibility)
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              exitPause();
            }
          }}
        >
          <video
            ref={pauseVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={pauseVideoSrc}
            muted
            playsInline
            preload="metadata"
          />
          {/* Intentionally nothing else here (no captions, no exit text, no gradient). */}
        </div>
      )}
    </div>
  );
}
