/* eslint-disable @typescript-eslint/no-explicit-any */
import RSS from "rss";

// Helper function to detect MIME type from URL
const getMimeType = (url: string): string => {
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "webp":
      return "image/webp";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
};

// Helper function to remove duplicate categories
const removeDuplicates = (arr: string[]): string[] => {
  return [...new Set(arr)];
};

export async function GET() {
  try {
    // Fetch blogs using the same API endpoint as your blog page
    const queryParams = new URLSearchParams({
      page: "1",
      limit: "50", // Get more posts for RSS
      status: "published",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs?${queryParams}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const data = await response.json();
    // Use the same data structure as your blog page
    const blogs = data.data || data;

    // Create RSS feed with proper namespaces for custom elements
    const feed = new RSS({
      title: "SFJBS Blog",
      description:
        "Latest updates and articles from SFJBS - Expert insights on AI, technology, and corporate training",
      feed_url: "https://www.sfjbs.com/rss.xml",
      site_url: "https://www.sfjbs.com",
      image_url: "https://www.sfjbs.com/favicon.ico",
      managingEditor: "contact@sfjbs.com (SFJBS Team)",
      webMaster: "contact@sfjbs.com (SFJBS Team)",
      copyright: `${new Date().getFullYear()} SFJBS`,
      language: "en-US",
      pubDate: new Date(),
      ttl: 60,
      // Add custom namespace for our custom elements
      custom_namespaces: {
        sfjbs: "https://www.sfjbs.com/ns/",
        content: "http://purl.org/rss/1.0/modules/content/",
        atom: "http://www.w3.org/2005/Atom",
      },
    });

    // Add each blog to RSS feed using your exact blog structure
    blogs.forEach((blog: any) => {
      // Build categories from your blog structure and remove duplicates
      const categories: string[] = removeDuplicates([
        ...(blog.categories?.map((cat: any) => cat.name) || []),
        ...(blog.tags?.map((tag: any) => tag.name) || []),
      ]);

      // Use publishedAt or createdAt like your blog page does
      const publishDate = new Date(blog.publishedAt || blog.createdAt);

      // Get the image URL and determine proper MIME type
      const imageUrl = blog.featuredImage || blog.banner;
      const mimeType = imageUrl ? getMimeType(imageUrl) : null;

      feed.item({
        title: blog.title,
        description: blog.summary,
        url: `https://www.sfjbs.com/blog/${blog.slug}`,
        guid: blog._id,
        categories: categories,
        date: publishDate,
        author: "SFJBS Team",
        // Add featured image with correct MIME type
        ...(imageUrl
          ? {
              enclosure: {
                url: imageUrl,
                type: mimeType!,
                size: 0, // RSS allows 0 for unknown size
              },
            }
          : {}),
        // Add custom elements with proper namespace
        custom_elements: [
          // Use proper namespace for custom elements
          { "sfjbs:readTime": `${blog.readTime}m` },
          { "sfjbs:viewCount": blog.viewCount.toString() },
          { "sfjbs:likeCount": blog.likeCount.toString() },
          ...(blog.difficulty ? [{ "sfjbs:difficulty": blog.difficulty }] : []),
          ...(blog.series ? [{ "sfjbs:series": blog.series.name }] : []),
          ...(blog.isFeatured ? [{ "sfjbs:featured": "true" }] : []),
          ...(blog.isTopPick ? [{ "sfjbs:topPick": "true" }] : []),
          ...(blog.isPinned ? [{ "sfjbs:pinned": "true" }] : []),
          // Add content:encoded for full HTML content (better for feed readers)
          { "content:encoded": `<![CDATA[${blog.summary}]]>` },
        ],
      });
    });

    // Generate RSS XML
    let xml = feed.xml({ indent: true });

    // Add self-referencing atom:link for better SEO and feed discovery
    xml = xml.replace(
      "<channel>",
      `<channel>
  <atom:link href="https://www.sfjbs.com/rss.xml" rel="self" type="application/rss+xml" />`
    );

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("RSS Feed Error:", error);

    // Return proper error RSS with valid structure
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SFJBS Blog</title>
    <description>Error loading RSS feed - Please try again later</description>
    <link>https://www.sfjbs.com</link>
    <atom:link href="https://www.sfjbs.com/rss.xml" rel="self" type="application/rss+xml" />
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <item>
      <title>RSS Feed Temporarily Unavailable</title>
      <description>We're experiencing technical difficulties. Please try again later.</description>
      <link>https://www.sfjbs.com</link>
      <guid>error-${Date.now()}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;

    return new Response(errorXml, {
      status: 500,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    });
  }
}
