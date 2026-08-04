import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: process.env.NEXT_PUBLIC_JOBS_URL + "/api/v1/:path*",
      },
      {
        source: "/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_LMS_BASE_URL}/user/auth/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/rss",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/solutions/knowledge",
        destination: "/services/corporate-it-training-programs",
        permanent: true,
      },
      {
        source: "/solutions/talent",
        destination: "/services/it-staffing-company",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply cache control headers to all routes in development
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "development"
                ? "no-cache, no-store, must-revalidate"
                : "public, max-age=3600, s-maxage=3600",
          },
          {
            key: "Pragma",
            value:
              process.env.NODE_ENV === "development" ? "no-cache" : "cache",
          },
          {
            key: "Expires",
            value: process.env.NODE_ENV === "development" ? "0" : "3600",
          },
        ],
      },
      {
        // Special headers for Google Translate component routes
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Clear Google Translate related headers
          // {
          //   key: "Clear-Site-Data",
          //   value: '"cache", "cookies", "storage"',
          // },
        ],
      },
      {
        // Specific headers for API routes to prevent caching
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },

  // Additional config to handle Google Translate issues
  ...(process.env.NODE_ENV !== "development" && {
    experimental: {
      // Force fresh builds (only in production to avoid Turbopack conflicts)
      forceSwcTransforms: true,
    },
  }),

  // Disable trailing slash for cleaner URLs
  trailingSlash: false,

  // Ensure clean builds
  distDir: ".next",
  cleanDistDir: true,

  /* other config options here */
};

export default nextConfig;
