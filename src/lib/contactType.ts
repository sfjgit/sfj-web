/**
 * Which inquiry type the /contact form should pre-select, based on the page
 * the visitor clicked "Contact Us" from. Values match `typeOptions` in
 * src/app/contact/_components/ContactPage.tsx. Matched by path prefix, so
 * sub-pages (e.g. /services/corporate-social-responsibility/aws-restart)
 * inherit their section's type.
 */
const CONTACT_TYPE_BY_ROUTE: Record<string, string> = {
  "/services/kaas": "b2b",
  "/services/taas": "b2b",
  "/services/government-ssc-skilling": "b2g",
  "/services/institutional-skilling": "b2i",
  "/services/corporate-social-responsibility": "csr",
  "/initiatives/faculty-development": "faculty-development",
};

export function getContactType(pathname: string | null): string {
  if (!pathname) return "general";
  const route = Object.keys(CONTACT_TYPE_BY_ROUTE)
    .filter((r) => pathname.startsWith(r))
    .sort((a, b) => b.length - a.length)[0];
  return route ? CONTACT_TYPE_BY_ROUTE[route] : "general";
}

export function getContactHref(pathname: string | null): string {
  return `/contact?type=${getContactType(pathname)}`;
}
