import { Metadata } from "next";
import Script from "next/script";
import CorporateTrainingClient from "./_components/CorporateTrainingClient";

export const metadata: Metadata = {
  title:
    "Corporate IT Training Programs for Employees | Boost Your Team's Skills | SFJBS",
  description:
    "SFJBS provides comprehensive corporate IT training programs, trusted by 350+ enterprise clients. Empower your employees, close skill gaps, and elevate your team's expertise with our tailored IT training solutions in Bengaluru and beyond.",
  keywords:
    "corporate IT training programs, employee training, IT skill development, enterprise IT training, corporate tech training, customized IT training, IT upskilling, Bengaluru IT training",
  openGraph: {
    title:
      "Corporate IT Training Programs for Employees | Boost Your Team's Skills | SFJBS",
    description:
      "SFJBS provides comprehensive corporate IT training programs, trusted by 350+ enterprise clients. Empower your employees, close skill gaps, and elevate your team's expertise with our tailored IT training solutions in Bengaluru and beyond.",
    url: "https://www.sfjbs.com/services/corporate-it-training-programs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Corporate IT Training Programs for Employees | Boost Your Team's Skills | SFJBS",
    description:
      "SFJBS provides comprehensive corporate IT training programs, trusted by 350+ enterprise clients. Empower your employees, close skill gaps, and elevate your team's expertise with our tailored IT training solutions in Bengaluru and beyond.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/corporate-it-training-programs",
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
                item: "https://www.sfjbs.com/services/corporate-it-training-programs",
              },
            ],
          }),
        }}
      />
      <CorporateTrainingClient />
    </>
  );
}
