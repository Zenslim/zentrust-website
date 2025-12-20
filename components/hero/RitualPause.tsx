"use client";

import { useEffect, useRef } from "react";
import { ritualSpec } from "./createHero";

type Props = {
  active: boolean;
  used: boolean;
  onStart: () => void;
  onEnd: () => void;
};

export function RitualPause({ active, used, onStart, onEnd }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!active) return;

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

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(onEnd, ritualSpec.timeoutMs);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handlePointer, { capture: true } as any);
      window.removeEventListener("touchstart", handlePointer, { capture: true } as any);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [active, onEnd]);

  return (
    <>
      <button
        type="button"
        onClick={onStart}
        disabled={used}
        className="text-sm font-medium text-foreground/70 disabled:text-foreground/30"
        aria-pressed={active}
      >
        {ritualSpec.label}
      </button>

      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-background"
          role="button"
          aria-label="Pause active. Tap to exit."
          tabIndex={-1}
        />
      )}
    </>
  );
}
