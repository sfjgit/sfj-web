// app/sitemap.ts
import type { MetadataRoute } from "next";

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
        }
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
  const baseUrl = "https://www.sfjbs.com";

  const staticRoutes = [
    "",
    "/industries",
    "/careers",
    "/about",
    "/contact",
    "/life-at-sfjbs",
  ];

  const serviceRoutes = [
    "/services/corporate-social-responsibility",
    "/services/government-initiatives",
    "/services/institutional-training",
    "/services/corporate-it-training-programs",
    "/services/it-staffing-company",
  ];

  const blogs = await fetchAllBlogs();

  // STATIC ROUTES
  const staticEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...serviceRoutes,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  // BLOG ROUTES
  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticEntries, ...blogEntries];
}
