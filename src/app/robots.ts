import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL } from "@/config/site";
import { isIndexableHost } from "@/middleware";

export const dynamic = "force-dynamic";

/**
 * Host-aware robots.txt.
 *
 * The old static `public/robots.txt` shipped `Disallow:` (allow everything)
 * plus a `Sitemap:` pointing at the production domain — served identically
 * from the Vercel preview host, which meant the preview build was fully
 * crawlable and cross-referencing production's sitemap (P0-07, CR-05).
 *
 * Now: production advertises the sitemap and allows crawling; every other
 * host disallows everything and advertises nothing.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");

  if (!isIndexableHost(host)) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Transactional and authenticated surfaces have no search value and
        // burn crawl budget.
        disallow: [
          "/api/",
          "/signin",
          "/signup",
          "/new-sso",
          "/lms/",
          "/jobs/applied",
          "/payment/",
          "/nm/",
          "/test/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
