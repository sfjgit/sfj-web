import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    // PF-03: next/image was requesting card-sized slots at w=3840 — a 4K
    // asset (166 KB WebP) served into a ~400 px card. 3840 and 3072 are
    // dropped because no slot on the site is genuinely full-bleed 4K; the
    // remaining widths still cover every real breakpoint including 2× DPR.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
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
      {
        source: "/caspa/:path*",
        destination: "https://caspa-internal.sfjbs.com/caspa/:path*",
      },
      {
        // Faculty registration OTP + confirm — proxied same-origin so the
        // browser never has to CORS against the notification service directly.
        source: "/api/faculty/:path*",
        destination:
          process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL + "/api/faculty/:path*",
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
      // The KaaS page moved from /services/corporate-it-training-programs to
      // /services/kaas. The old URL was indexed and is linked from outside, so
      // it 301s rather than 404s. Legacy sources point straight at the new
      // path — a redirect that lands on another redirect loses more of the
      // signal than a single hop, and Google stops following a chain quickly.
      {
        source: "/services/corporate-it-training-programs",
        destination: "/services/kaas",
        permanent: true,
      },
      {
        source: "/solutions/knowledge",
        destination: "/services/kaas",
        permanent: true,
      },
      // Same move as KaaS above: /services/it-staffing-company is indexed and
      // externally linked, so it 301s to /services/taas rather than 404ing,
      // and the legacy /solutions/talent source skips the old path entirely
      // instead of chaining through it.
      {
        source: "/services/it-staffing-company",
        destination: "/services/taas",
        permanent: true,
      },
      {
        source: "/solutions/talent",
        destination: "/services/taas",
        permanent: true,
      },
      // Third rename in the same series: /services/government-initiatives →
      // /services/government-ssc-skilling.
      {
        source: "/services/government-initiatives",
        destination: "/services/government-ssc-skilling",
        permanent: true,
      },
      {
        source: "/services/institutional-training",
        destination: "/services/institutional-skilling",
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
        // Apply cache control headers to all routes in development — but not
        // to _next/image or _next/static. Without this exclusion, dev's
        // no-store override was also landing on Next's own image-
        // optimization endpoint, forcing every optimized image (including
        // the 5 process-accordion photos) to be re-fetched and re-processed
        // on every request instead of being cached after the first load —
        // the actual cause of the interaction lag. The other header block
        // below already carves out this same exclusion for a different
        // reason; this mirrors it.
        source: "/((?!_next/static|_next/image).*)",
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
        // PF-02: static artwork under /public was inheriting the catch-all
        // `max-age=3600` above, so logos and the multi-hundred-KB hero videos
        // were revalidated hourly for every returning visitor — wasted
        // round-trips on the heaviest files on the site, while hashed build
        // assets under /_next/static correctly got a year.
        //
        // These files are content-stable: when the art changes, the filename
        // changes. This rule sits after the catch-all so it wins.
        source:
          "/:path*.:ext(svg|png|jpg|jpeg|gif|webp|avif|ico|webm|mp4|woff|woff2|pdf)",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "development"
                ? "no-cache, no-store, must-revalidate"
                : "public, max-age=31536000, immutable",
          },
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
