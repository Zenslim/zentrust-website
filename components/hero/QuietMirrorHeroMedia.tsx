"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  mobileVideoSrc: string;
  heroImageSrc: string;
  heroImageAlt: string;
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
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoDone, setVideoDone] = useState(false);

  const shouldUseVideo = useMemo(
    () => isMobile && !prefersReducedMotion,
    [isMobile, prefersReducedMotion]
  );

  useEffect(() => {
    if (!shouldUseVideo) return;
    const v = videoRef.current;
    if (!v) return;

    const onEnded = () => setVideoDone(true);
    v.addEventListener("ended", onEnded);

    v.play().catch(() => setVideoDone(true));

    return () => v.removeEventListener("ended", onEnded);
  }, [shouldUseVideo]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Always-present static image */}
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Mobile: run-once muted video */}
      {shouldUseVideo && !videoDone && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={mobileVideoSrc}
          muted
          playsInline
          preload="auto"
          autoPlay
          loop={false}
        />
      )}

      {/* GLOBAL contrast plane */}
      <div className="hero-contrast-plane" />
    </div>
  );
}
