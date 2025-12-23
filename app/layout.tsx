export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrackPageView } from "@/components/analytics/TrackPageView";
import { DarkSky } from "@/components/background/DarkSky";

export const metadata: Metadata = {
  title: {
    default: "ZenTrust - Regenerative Agriculture & Environmental Stewardship",
    template: "%s | ZenTrust",
  },
  description:
    "ZenTrust promotes sustainable agriculture, environmental restoration, and community empowerment through research, education, and direct action programs.",
  metadataBase: new URL("https://zentrust.world"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />

        {/* CONSENT MODE */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'analytics_storage': 'granted'
            });
          `}
        </Script>

        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2G4CVKHFZR"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2G4CVKHFZR', { anonymize_ip: true });
          `}
        </Script>

        {/* ✅ SW moved out of critical path */}
        {process.env.NODE_ENV === "production" && (
          <Script id="sw-register" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                  .catch(() => {});
              }
            `}
          </Script>
        )}
      </head>

      <body className="font-sans" suppressHydrationWarning>
        <Suspense fallback={null}>
          <TrackPageView />
        </Suspense>

        <Suspense fallback={null}>
          <DarkSky />
        </Suspense>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
