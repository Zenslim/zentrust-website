"use client";

import { useEffect, useState } from "react";

type Props = {
  label?: string;
  description?: string;
  timeoutMs?: number;
};

export function RitualPause({
  label = "Pause here",
  description = "Take a brief pause.",
  timeoutMs = 15000,
}: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setActive(false), timeoutMs);
    const onKey = () => setActive(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [active, timeoutMs]);

  return (
    <>
      <button
        onClick={() => setActive(true)}
        className="mt-6 text-sm text-foreground/70"
      >
        {label}
      </button>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setActive(false)}
        >
          <div className="text-center space-y-3">
            <p className="text-lg font-semibold">{label}</p>
            <p className="text-sm text-foreground/70">{description}</p>
          </div>
        </div>
      )}
    </>
  );
}
