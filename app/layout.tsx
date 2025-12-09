"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GA4 } from '@/components/analytics/GA4'
import { TrackPageView } from '@/components/analytics/TrackPageView'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ZenTrust - Regenerative Agriculture & Environmental Stewardship',
    template: '%s | ZenTrust',
  },
  description: 'ZenTrust promotes sustainable agriculture, environmental restoration, and community empowerment through research, education, and direct action programs.',
  keywords: ['sustainable agriculture', 'regenerative farming', 'environmental restoration', 'community education', 'sustainability', 'nonprofit'],
  authors: [{ name: 'ZenTrust' }],
  creator: 'ZenTrust',
  publisher: 'ZenTrust',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zentrust.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zentrust.org',
    siteName: 'ZenTrust',
    title: 'ZenTrust - Regenerative Agriculture & Environmental Stewardship',
    description: 'Promoting sustainable agriculture and environmental restoration through research, education, and community programs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZenTrust - Sustainable Agriculture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZenTrust - Regenerative Agriculture & Environmental Stewardship',
    description: 'Promoting sustainable agriculture and environmental restoration through research, education, and community programs.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GA4 />
        <Suspense fallback={null}>
          <TrackPageView />
        </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
