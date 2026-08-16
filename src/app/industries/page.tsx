import React from "react";
import IndustriesPage from "./_components/Page";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Industries We Serve | SFJBS IT Solutions & Expertise",
  description:
    "How SFJBS builds skills and supplies talent across BFSI, manufacturing, healthcare, GCCs, public sector and technology services.",
  openGraph: {
    title: "Industries We Serve | SFJBS IT Solutions & Expertise",
    description:
      "How SFJBS builds skills and supplies talent across BFSI, manufacturing, healthcare, GCCs, public sector and technology services.",
    url: "https://www.sfjbs.com/industries",
    type: "website",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754913197471_Industries%20We%20Serve.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "SFJ Business Solutions serving 29+ industries with tailored digital transformation and workforce solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | SFJBS IT Solutions & Expertise",
    description:
      "How SFJBS builds skills and supplies talent across BFSI, manufacturing, healthcare, GCCs, public sector and technology services.",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754913197471_Industries%20We%20Serve.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "SFJ Business Solutions serving 29+ industries with tailored digital transformation and workforce solutions",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sfjbs.com/industries",
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
                name: "Industries",
                item: "https://www.sfjbs.com/industries",
              },
            ],
          }),
        }}
      />
      <IndustriesPage />
    </>
  );
}
