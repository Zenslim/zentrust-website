"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

type Props = {
  mobileVideoSrc: string;
  heroImageSrc: string;
  heroImageAlt: string;
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

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse) and (max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mobile;
}

export default function QuietMirrorHeroMedia({
  mobileVideoSrc,
  heroImageSrc,
  heroImageAlt,
  children,
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [videoDone, setVideoDone] = useState(false);

  const shouldUseVideo = useMemo(
    () => isMobile && !prefersReducedMotion,
    [isMobile, prefersReducedMotion]
  );

  // Attempt autoplay ONLY after interaction OR where browser allows it
  useEffect(() => {
    if (!shouldUseVideo) return;
    if (!hasInteracted) return;

    const v = videoRef.current;
    if (!v) return;

    const onEnded = () => setVideoDone(true);
    v.addEventListener("ended", onEnded);

    v.play().catch(() => {
      // If playback fails, we simply keep the still frame
      setVideoDone(true);
    });

    return () => v.removeEventListener("ended", onEnded);
  }, [shouldUseVideo, hasInteracted]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Always-present static image (fallback + first frame) */}
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Mobile inline video */}
      {shouldUseVideo && !videoDone && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={mobileVideoSrc}
          muted
          playsInline
          preload="metadata"
        />
      )}

      {/* Tap-to-Continue Overlay (mobile only, before interaction) */}
      {shouldUseVideo && !hasInteracted && (
        <button
          type="button"
          onClick={() => setHasInteracted(true)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 text-white"
          aria-label="Tap to continue"
        >
          <span className="rounded-full bg-black/60 px-5 py-2 text-sm tracking-wide backdrop-blur">
            Tap to Continue
          </span>
        </button>
      )}

      {/* GLOBAL contrast plane */}
      <div className="hero-contrast-plane" aria-hidden="true" />

      {/* Canonical hero foreground */}
      {children && <div className="hero-foreground">{children}</div>}
    </div>
  );
}
