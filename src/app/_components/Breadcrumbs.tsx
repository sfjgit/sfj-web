import { SITE_URL } from "@/config/site";

/**
 * BreadcrumbList for inner pages. The homepage is the root of the hierarchy,
 * so it gets none — a one-item trail conveys nothing.
 *
 * Usage in any page.tsx (server component):
 *   <BreadcrumbSchema items={[
 *     { name: "Home", path: "/" },
 *     { name: "Blog", path: "/blog" },
 *     { name: post.title, path: `/blog/${post.slug}` },
 *   ]} />
 *
 * Pair it with a visible breadcrumb nav using the same labels.
 */
type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema(items)),
      }}
    />
  );
}
