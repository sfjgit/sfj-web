// app/sitemap.ts
import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL, canonical } from "@/config/site";

// regenerate sitemap every hour
export const revalidate = 3600;

interface BlogPost {
  slug: string;
  updatedAt: string;
}

interface BlogResponse {
  success: boolean;
  data: BlogPost[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

async function fetchAllBlogs(): Promise<BlogPost[]> {
  let blogs: BlogPost[] = [];
  let page = 1;

  try {
    while (true) {
      const response = await fetch(
        `https://sfj-admin.vercel.app/api/admin/blogs?page=${page}&limit=50&status=published`,
        {
          next: { revalidate: 3600 },
        },
      );

      if (!response.ok) break;

      const data: BlogResponse = await response.json();

      if (!data.success || data.data.length === 0) break;

      blogs = blogs.concat(data.data);

      if (!data.meta.hasNext) break;

      page++;
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return blogs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchAllBlogs();

  // STATIC ROUTES — generated from the PUBLIC_ROUTES manifest in
  // config/site.ts, not a second hand-maintained array. That duplication is
  // what dropped /initiatives/faculty-development and every legal page out of
  // the sitemap (CR-01).
  //
  // No `lastModified` on static entries: every route previously carried the
  // build timestamp, so each deploy told Google "all 11 pages changed" and
  // devalued lastmod as a crawl hint (CR-06). An absent lastmod is a more
  // honest signal than a false one. `changeFrequency`/`priority` are omitted
  // too — Google has stated it ignores both.
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: canonical(route),
  }));

  // BLOG ROUTES — these have a genuine per-post updatedAt, so they keep a
  // real lastModified.
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
  }));

  return [...staticEntries, ...blogEntries];
}
