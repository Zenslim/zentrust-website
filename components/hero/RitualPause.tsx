"use client";

import { useState } from "react";

export function RitualPause() {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div
        className="fixed inset-0 z-50 bg-neutral-100 dark:bg-neutral-950"
        onClick={() => setActive(false)}
      />
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="text-sm opacity-60 hover:opacity-100"
    >
      Pause here ▷ tap
    </button>
  );
}
