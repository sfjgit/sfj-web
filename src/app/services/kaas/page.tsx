import { Metadata } from "next";
import Script from "next/script";
import CorporateTrainingClient from "./_components/CorporateTrainingClient";

export const metadata: Metadata = {
  title: "Corporate AI & IT Training Programs for Enterprises | SFJBS",
  description:
    "Enterprise AI, cloud and IT training trusted by 500+ companies. OEM-certified upskilling, cross-skilling and reskilling built around how your teams work.",
  openGraph: {
    title: "Corporate AI & IT Training Programs for Enterprises | SFJBS",
    description:
      "Trusted by 500+ enterprise clients, SFJBS builds AI, cloud, data, and security training programs with OEM-certified outcomes — from skills assessment to redeployment.",
    url: "https://www.sfjbs.com/services/kaas",
    type: "website",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754911740199_Corporate%20Training%20Solution%20sfjbs.webp",
        width: 1200,
        height: 630,
        alt: "SFJBS corporate AI and IT training programs for enterprise teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate AI & IT Training Programs for Enterprises | SFJBS",
    description:
      "Trusted by 500+ enterprise clients, SFJBS builds AI, cloud, data, and security training programs with OEM-certified outcomes.",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754911740199_Corporate%20Training%20Solution%20sfjbs.webp",
        width: 1200,
        height: 630,
        alt: "SFJBS corporate AI and IT training programs for enterprise teams",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/kaas",
  },
};

export default function CorporateTrainingPage() {
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
                name: "Corporate IT Training Programs",
                item: "https://www.sfjbs.com/services/kaas",
              },
            ],
          }),
        }}
      />
      <CorporateTrainingClient />
    </>
  );
}
