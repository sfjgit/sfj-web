/**
 * Single source of truth for the corporate facts that appear in copy, schema
 * and metadata.
 *
 * The pre-release audit (TR-01 / RE-06) found the same claim stated three
 * different ways on one page — "15 years" in the hero, "14+ years" in the
 * section below it, "over 14 years" in the JSON-LD — plus 300,000+ vs 350+ vs
 * 500+ for client and learner counts. Every component that states a number
 * now reads it from here, so the numbers can only ever disagree if this file
 * disagrees with itself.
 *
 * Rule: never hard-code one of these values in a component. Import it.
 */

/** Canonical production origin. No trailing slash. */
export const SITE_URL = "https://www.sfjbs.com";

/** Absolute canonical URL for a route path (`/about` → `https://…/about`). */
export function canonical(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const COMPANY = {
  legalName: "SFJ Business Solutions Pvt. Ltd.",
  name: "SFJ Business Solutions",
  shortName: "SFJBS",
  /** Served from our own domain — a Knowledge-Panel-critical asset must not
   *  depend on a third-party S3 bucket policy (SD-04). */
  logo: `${SITE_URL}/logo/sfj-logo.png`,
  description:
    "SFJBS is an enterprise upskilling and workforce transformation partner. We deliver AI, cloud and emerging-tech training, institutional and government skilling programmes, and IT talent services.",
} as const;

/**
 * Corporate metrics. Change a number here and it changes everywhere.
 * `yearsOfExperience` settles the 14-vs-15 conflict at 15.
 */
export const METRICS = {
  yearsOfExperience: 15,
  professionalsTrained: 300_000,
  professionalsTrainedLabel: "300,000+",
  enterpriseClients: 500,
  enterpriseClientsLabel: "500+",
  countriesServed: 25,
  clientSatisfactionPct: 98,
  placements: 15_000,
  placementsLabel: "15,000+",
  coursesOffered: 640,
} as const;

/**
 * Contact details.
 *
 * `phoneHref` is the dial-safe form: no spaces, no trailing whitespace. The
 * malformed `tel:+91 9845348601 ` in the footer failed to dial on some
 * Android handsets (SEC-04) — always build `tel:` links from `phoneHref`,
 * never from the display string.
 */
export const CONTACT = {
  phoneDisplay: "+91 98453 48601",
  phoneHref: "+919845348601",
  email: "growth@sfjbs.com",
  address: {
    street:
      "Uma Sree Dream World, Unit -2, B-Block, 4th Floor, Kudlu Gate, Hosur Main Road",
    locality: "Bangalore",
    region: "Karnataka",
    postalCode: "560068",
    country: "IN",
  },
  geo: { latitude: 12.891054, longitude: 77.647187 },
} as const;

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
  "https://www.facebook.com/SFJBusinessSolutions",
  "https://www.facebook.com/sfjbsofficial",
  "https://www.youtube.com/channel/UC-Ol7VzrG_xsL6iyhhAIRzw",
  "https://www.instagram.com/sfjbs_bangalore/",
] as const;

/** Stable @id for the one Organization node every other schema block links to. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Every indexable public route, in one place.
 *
 * The sitemap is generated from this list rather than a hand-maintained copy,
 * which is what let /initiatives/faculty-development and the legal pages fall
 * out of sitemap.xml (CR-01). Add a route here when you add
 * a page — `npm run check:routes` fails the build if a route directory exists
 * with no entry.
 */
export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/careers",
  "/industries",
  "/life-at-sfjbs",
  "/partners",
  "/blog",
  "/products/caspa",
  "/products/lms",
  "/products/talent-os",
  "/services/kaas",
  "/services/corporate-social-responsibility",
  "/services/corporate-social-responsibility/aws-restart",
  "/services/government-ssc-skilling",
  "/services/institutional-training",
  "/services/taas",
  "/initiatives/faculty-development",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
  "/extension-privacy-policy",
] as const;
