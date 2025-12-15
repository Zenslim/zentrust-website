import type { Metadata } from "next";
import "@/app/globals.css";

import { DarkSky } from "@/components/background/DarkSky";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

export const metadata: Metadata = {
  title: "ZenTrust",
  description:
    "ZenTrust is a 501(c)(3) public charity advancing regenerative ecology, integrative wellbeing research, and open scientific education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen text-foreground">
        {/* 🌌 Global dark-mode sky (dark only via CSS) */}
        <DarkSky />

        {/* App content ABOVE background */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
