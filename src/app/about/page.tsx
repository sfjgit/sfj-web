import React from "react";
import AboutPage from "./_components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SFJBS | Leading IT Staffing & Training Company",
  description:
    "SFJBS is a premier IT staffing, services, and training company with over 14 years of industry expertise. Discover our mission, values, and commitment to driving tech talent and business success.",
  keywords:
    "about SFJBS, IT staffing company, IT services company, IT training provider, company profile, our mission, corporate values, technology solutions provider, Bengaluru IT company",
  openGraph: {
    title: "About SFJBS | Leading IT Staffing & Training Company",
    description:
      "SFJBS is a premier IT staffing, services, and training company with over 14 years of industry expertise. Discover our mission, values, and commitment to driving tech talent and business success.",
    url: "https://www.sfjbs.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SFJBS | Leading IT Staffing & Training Company",
    description:
      "SFJBS is a premier IT staffing, services, and training company with over 14 years of industry expertise. Discover our mission, values, and commitment to driving tech talent and business success.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/about",
  },
  other: {
    "script:ld+json": JSON.stringify({
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
          name: "About",
          item: "https://www.sfjbs.com/about",
        },
      ],
    }),
  },
};
export default function page() {
  return <AboutPage />;
}
