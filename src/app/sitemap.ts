// app/sitemap.ts
import type { MetadataRoute } from "next";

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
  const allBlogs: BlogPost[] = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await fetch(
        `https://sfj-admin.vercel.app/api/admin/blogs?page=${page}&limit=50&status=published`,
        {
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch blogs: ${response.statusText}`);
        break;
      }

      const data: BlogResponse = await response.json();

      if (data.success && data.data.length > 0) {
        allBlogs.push(...data.data);
        hasMore = data.meta.hasNext;
        page++;
      } else {
        hasMore = false;
      }
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return allBlogs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.sfjbs.com";

  // Static routes
  const staticRoutes = [
    "",
    "/industries",
    "/impact",
    "/careers",
    "/about",
    "/contact",
    "/life-at-sfjbs",
  ];

  // Service routes
  const serviceRoutes = [
    "/services/corporate-social-responsibility",
    "/services/government-initiatives",
    "/services/institutional-training",
    "/services/corporate-it-training-programs",
    "/services/it-staffing-company",
  ];

  // Fetch all blogs dynamically
  const blogs = await fetchAllBlogs();

  // Generate static routes
  const staticSitemapEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...serviceRoutes,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Generate blog routes dynamically
  const blogSitemapEntries: MetadataRoute.Sitemap = [
    // Blog index page
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    // Individual blog posts
    ...blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  // Combine all routes
  return [...staticSitemapEntries, ...blogSitemapEntries];
}
