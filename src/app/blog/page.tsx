import React from "react";
import BlogLandingPage from "./_components/Page";
import BlogArchiveIndex from "./_components/BlogArchiveIndex";
import { Metadata } from "next";
import Script from "next/script";

// The archive list below the interactive grid fetches on the server, so the
// route revalidates hourly rather than caching a snapshot of the post list
// forever.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "SFJBS Blog | IT Staffing, Training & EdTech Insights",
  description:
    "Practical writing on enterprise upskilling, cloud, AI, ERP and IT hiring — from the teams who deliver the programmes.",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    url: "https://www.sfjbs.com/blog",
    title: "SFJBS Blog | IT Staffing, Training & EdTech Insights",
    description:
      "Practical writing on enterprise upskilling, cloud, AI, ERP and IT hiring — from the teams who deliver the programmes.",
    siteName: "SFJBS",
    locale: "en_US",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "SFJBS Blog | IT Staffing, Training & EdTech Insights",
    description:
      "Practical writing on enterprise upskilling, cloud, AI, ERP and IT hiring — from the teams who deliver the programmes.",
    creator: "@sfjbs",
    site: "@sfjbs",
  },

  // Additional SEO
  alternates: {
    canonical: "https://www.sfjbs.com/blog",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Additional meta tags
  other: {
    // Replace with your actual verification code or remove if not needed
    // "google-site-verification": "your-actual-verification-code-here",
  },
};

export default function page() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.sfjbs.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.sfjbs.com/blog",
              },
            ],
          }),
        }}
      />
      <BlogLandingPage />
      {/* P0-04: server-rendered links to every post, so the articles are not
          orphan pages reachable only through sitemap.xml. */}
      <BlogArchiveIndex />
    </>
  );
}
