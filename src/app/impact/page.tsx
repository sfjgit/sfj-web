import React from "react";
import Impact from "./_components/impact";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Our Impact & Success Stories | SFJBS Achievements",
  description:
    "Discover the measurable impact SFJBS has created for clients, professionals, and communities through our transformative IT staffing, training programs, and strategic solutions.",
  keywords:
    "company impact, success stories, client achievements, results, case studies, societal impact, skill development impact, business transformation, positive outcomes",
  openGraph: {
    title: "Our Impact & Success Stories | SFJBS Achievements",
    description:
      "Discover the measurable impact SFJBS has created for clients, professionals, and communities through our transformative IT staffing, training programs, and strategic solutions.",
    url: "https://www.sfjbs.com/impact",
    type: "website",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754914096306_Impact.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Impact: over 300,000 professionals trained globally with 50,000 through strategic partnerships worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Impact & Success Stories | SFJBS Achievements",
    description:
      "Discover the measurable impact SFJBS has created for clients, professionals, and communities through our transformative IT staffing, training programs, and strategic solutions.",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754914096306_Impact.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Impact: over 300,000 professionals trained globally with 50,000 through strategic partnerships worldwide",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sfjbs.com/impact",
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
                name: "Impact",
                item: "https://www.sfjbs.com/impact",
              },
            ],
          }),
        }}
      />
      <Impact />
    </>
  );
}
