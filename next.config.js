/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─────────────────────────────
  // Build stability
  // ─────────────────────────────
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ─────────────────────────────
  // Images
  // ─────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // ─────────────────────────────
  // Security headers
  // ─────────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:3000 http://localhost:4001;",
          },
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
