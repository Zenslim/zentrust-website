import { UniversalHero } from "@/components/hero/UniversalHero";
import type { ReactNode } from "react";

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <UniversalHero />
      {children}
    </>
  );
}
