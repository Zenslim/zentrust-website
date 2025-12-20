"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HeroRitual } from "./createHero";

type Props = {
  active: boolean;
  used: boolean;
  ritual?: HeroRitual;
  onStart: () => void;
  onEnd: () => void;
};

export function RitualPause({ active, used, ritual, onStart, onEnd }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showPoster, setShowPoster] = useState(false);

  const ritualDetails = useMemo(
    () => ({
      label: ritual?.label ?? "Pause here ▷ tap",
      timeoutMs: Math.min(ritual?.timeoutMs ?? 15000, 15000),
      videoSrc: ritual?.videoSrc,
      poster: ritual?.poster,
    }),
    [ritual]
  );

  const available = Boolean(ritualDetails.videoSrc) && !used;

  const beginRitual = () => {
    if (!available || active) return;
    onStart();
  };

  useEffect(() => {
    if (!active || !ritualDetails.videoSrc) return;

    setShowPoster(Boolean(ritualDetails.poster));

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onEnd();
      }
    };

    const handlePointer = () => onEnd();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handlePointer, { capture: true });
    window.addEventListener("touchstart", handlePointer, { capture: true });

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(onEnd, ritualDetails.timeoutMs);

    const posterTimer = window.setTimeout(() => setShowPoster(false), 1000);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handlePointer, { capture: true } as any);
      window.removeEventListener("touchstart", handlePointer, { capture: true } as any);
      window.clearTimeout(posterTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [active, onEnd, ritualDetails.poster, ritualDetails.timeoutMs, ritualDetails.videoSrc]);

  useEffect(() => {
    if (!active) {
      setShowPoster(false);
    }
  }, [active]);

  return (
    <>
      <button
        type="button"
        onClick={beginRitual}
        disabled={used || !available}
        className="text-sm font-medium text-foreground/70 disabled:text-foreground/30"
        aria-pressed={active}
      >
        {ritualDetails.label}
      </button>

      {active && ritualDetails.videoSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black"
          role="button"
          aria-label="Pause active. Tap to exit."
          tabIndex={-1}
          onClick={onEnd}
        >
          <div className="relative h-screen w-screen">
            {showPoster && ritualDetails.poster && (
              <img
                src={ritualDetails.poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={undefined}
              className="absolute inset-0 h-screen w-screen object-cover"
              style={{ aspectRatio: "9 / 16" }}
              onPlaying={() => setShowPoster(false)}
              onLoadedData={() => setShowPoster(false)}
            >
              <source src={ritualDetails.videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}
