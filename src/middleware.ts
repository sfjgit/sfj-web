import { NextResponse, type NextRequest } from "next/server";

/**
 * Hosts that are allowed to be indexed. Everything else — Vercel preview
 * deployments (`*.vercel.app`), branch URLs, localhost — gets a hard
 * `X-Robots-Tag: noindex, nofollow`.
 *
 * The audit (P0-07 / RE-04) found the preview deployment fully crawlable and
 * serving a *different* build from production: two indexable copies of the
 * same site with divergent titles. A header is the belt; `app/robots.ts`
 * serving a disallow-all robots.txt off-production is the braces. Vercel
 * deployment protection is still worth turning on in project settings — this
 * only stops crawlers, not humans with the URL.
 */
const INDEXABLE_HOSTS = new Set(["www.sfjbs.com", "sfjbs.com"]);

export function isIndexableHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return INDEXABLE_HOSTS.has(host.split(":")[0].toLowerCase());
}

/**
 * Content-Security-Policy.
 *
 * Shipped in Report-Only first, deliberately. The site loads GTM, Microsoft
 * Clarity, Leadfeeder, RB2B, Google Maps and Google Fonts, and an enforcing
 * policy that gets one of those hosts wrong takes analytics (or the page)
 * down silently. Watch the violation reports, then flip
 * CSP_ENFORCE=true in the environment to move to enforcing mode.
 */
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // 'unsafe-inline'/'unsafe-eval' are required by GTM and Next's inline
  // bootstrap. Move to a nonce-based policy once the tag manager container is
  // audited for inline tags.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://sc.lfeeder.com https://ddwl4m2hdecbv.cloudfront.net https://translate.google.com https://translate.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://sc.lfeeder.com https://*.amazonaws.com https://*.vercel.app https://sfj-admin.vercel.app",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host");

  // ── Indexation control ────────────────────────────────────────────────────
  if (!isIndexableHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  // ── Security headers ──────────────────────────────────────────────────────
  response.headers.set(
    process.env.CSP_ENFORCE === "true"
      ? "Content-Security-Policy"
      : "Content-Security-Policy-Report-Only",
    CSP_DIRECTIVES,
  );

  // Camera/mic/geolocation left unrestricted for embedded third parties was
  // SEC-05. Nothing on the site needs them.
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  // SEC-02: `access-control-allow-origin: *` was being returned on HTML
  // documents, letting any origin read page responses via fetch. CORS belongs
  // on API routes only, so strip the wildcard from document responses.
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.delete("Access-Control-Allow-Origin");
  }

  return response;
}

export const config = {
  // Everything except Next's own static output, the image optimizer and
  // static asset requests — those don't need (and shouldn't pay for) this.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|webm|mp4|pdf|woff|woff2|txt|xml)$).*)",
  ],
};
