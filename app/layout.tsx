export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrackPageView } from "@/components/analytics/TrackPageView";

// 🌿 GLOBAL AMBIENT BACKGROUND (mobile only)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ZenTrust - Regenerative Agriculture & Environmental Stewardship",
    template: "%s | ZenTrust",
  },
  description:
    "ZenTrust promotes sustainable agriculture, environmental restoration, and community empowerment through research, education, and direct action programs.",
  keywords: [
    "sustainable agriculture",
    "regenerative farming",
    "environmental restoration",
    "community education",
    "sustainability",
    "nonprofit",
  ],
  authors: [{ name: "ZenTrust" }],
  creator: "ZenTrust",
  publisher: "ZenTrust",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://zentrust.world"),
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zentrust.world",
    siteName: "ZenTrust",
    title: "ZenTrust - Regenerative Agriculture & Environmental Stewardship",
    description:
      "Promoting sustainable agriculture and environmental restoration through research, education, and community programs.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZenTrust - Sustainable Agriculture",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ZenTrust - Regenerative Agriculture & Environmental Stewardship",
    description:
      "Promoting sustainable agriculture and environmental restoration through research, education, and community programs.",
    images: ["/images/twitter-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon + Manifest */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />

        {/* ------------------------------ */}
        {/* CONSENT MODE (MUST LOAD FIRST) */}
        {/* ------------------------------ */}
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

        {/* GA4 SCRIPT */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2G4CVKHFZR"
          strategy="afterInteractive"
        />

        {/* GA4 INIT */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2G4CVKHFZR', { anonymize_ip: true });
          `}
        </Script>

        {/* ------------------------------ */}
        {/* SERVICE WORKER REGISTRATION */}
        {/* ------------------------------ */}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(reg) { console.log('SW registered:', reg); })
                      .catch(function(err) { console.log('SW failed:', err); });
                  });
                }
              `,
            }}
          />
        )}
      </head>

      <body className={inter.className} suppressHydrationWarning>
        {/* PAGE VIEW TRACKING */}
        <Suspense fallback={null}>
          <TrackPageView />
        </Suspense>

        {/* ------------------------------ */}
        {/* MAIN APP STRUCTURE */}
        {/* ------------------------------ */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen text-foreground">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
