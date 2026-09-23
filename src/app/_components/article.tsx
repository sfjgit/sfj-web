import { ORGANIZATION_ID, SITE_URL } from "@/config/site";

/**
 * BlogPosting schema for /blog/[slug] — NOT the homepage.
 *
 * Every value must match what the reader sees: the visible byline, the
 * visible published/updated dates, the H1. Link each author to a real author
 * page (/authors/<slug>) with a bio showing their expertise — that page is
 * where the E-E-A-T signal actually comes from.
 */
type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  image: string; // absolute or site-relative, ideally 1200px wide
  datePublished: string; // ISO 8601, e.g. "2026-09-01"
  dateModified?: string;
  author: { name: string; slug: string; jobTitle?: string };
};

export function articleSchema(a: ArticleInput) {
  const url = new URL(`/blog/${a.slug}`, SITE_URL).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: a.title,
    description: a.description,
    image: new URL(a.image, SITE_URL).toString(),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: {
      "@type": "Person",
      name: a.author.name,
      jobTitle: a.author.jobTitle,
      url: new URL(`/authors/${a.author.slug}`, SITE_URL).toString(),
    },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-IN",
  };
}

export function ArticleSchema(props: ArticleInput) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(props)) }}
    />
  );
}
