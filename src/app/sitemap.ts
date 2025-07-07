// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Contact form routes
  const contactRoutes = [
    "/contact?type=b2b",
    "/contact?type=b2g",
    "/contact?type=b2i",
    "/contact?type=csr",
    "/contact?subject=partnership",
    "/contact?type=it-staffing",
  ];

  // Blog routes
  const blogRoutes = [
    "/blog",
    "/blog/how-ai-is-shaping-the-future-of-corporate-training-in-2025",
    "/blog/the-secret-ai-tool-hierarchy-google-doesnt-want-you-to-know-about",
    "/blog/real-secret-to-unlocking-generative-ai-for-everyone-how-sfjbs-is-empowering-millions",
  ];

  // Combine all routes
  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...contactRoutes,
    ...blogRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
