"use client";

export function Atmosphere() {
  return (
    <>
      {/* Light mode: intentionally empty */}
      {/* Dark mode: subtle stars */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed inset-0 z-0
          hidden dark:block
          overflow-hidden
        "
      >
        <div className="absolute inset-0 starfield" />
      </div>
    </>
  );
}
