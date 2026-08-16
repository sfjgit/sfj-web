import Link from "next/link";

/**
 * Server-rendered index of every published post.
 *
 * The interactive listing above this (filters, search, pagination) is a client
 * component that fetches on mount, so the delivered HTML for /blog contained
 * exactly zero links to any post — 23 articles with no crawlable internal path
 * and no PageRank flowing to them, discoverable only via sitemap.xml (P0-04).
 * Crawlers that do not execute JavaScript — Bing, LinkedIn, Slack, and the
 * LLM crawlers that increasingly drive referral traffic — saw an empty blog.
 *
 * This component renders on the server, so the links are in the HTML on first
 * byte. It is deliberately a plain, dense archive list rather than a second
 * card grid: its job is link equity and crawlability, not merchandising.
 */

interface ArchivePost {
  slug: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  createdAt?: string;
  categories?: Array<{ name: string; slug: string }>;
}

interface BlogListResponse {
  success?: boolean;
  data?: ArchivePost[];
  meta?: { hasNext?: boolean; totalPages?: number; page?: number };
}

const ADMIN_API =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "https://sfj-admin.vercel.app";

async function fetchAllPublishedPosts(): Promise<ArchivePost[]> {
  const posts: ArchivePost[] = [];

  try {
    // Walk every page — the archive is only useful if it is complete. The
    // guard stops a malformed `hasNext` from looping forever.
    for (let page = 1; page <= 40; page++) {
      const res = await fetch(
        `${ADMIN_API}/api/admin/blogs?page=${page}&limit=50&status=published`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) break;

      const json: BlogListResponse = await res.json();
      const rows = json.data ?? [];
      if (rows.length === 0) break;

      posts.push(...rows);

      const totalPages = json.meta?.totalPages ?? 1;
      if (json.meta?.hasNext === false || page >= totalPages) break;
    }
  } catch (error) {
    // A failed fetch must degrade to "no archive section", never to a broken
    // page — the client listing above still works.
    console.error("blog archive: failed to load posts", error);
  }

  return posts;
}

function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogArchiveIndex() {
  const posts = await fetchAllPublishedPosts();

  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-archive-heading"
      className="border-t border-gray-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <h2
          id="blog-archive-heading"
          className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
        >
          All articles
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Every published article, newest first — {posts.length} in total.
        </p>

        <ul className="mt-8 divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.slug} className="py-4">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-base font-medium text-gray-900 underline-offset-4 group-hover:text-blue-700 group-hover:underline">
                  {post.title}
                </span>
                <span className="flex-shrink-0 text-xs text-gray-500">
                  {post.categories?.[0]?.name
                    ? `${post.categories[0].name} · `
                    : ""}
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
