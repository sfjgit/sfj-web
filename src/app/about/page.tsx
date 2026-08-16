import React from "react";
import AboutPage from "./_components/About";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About SFJBS | Leading IT Staffing & Training Company",
  description:
    "15 years building workforce capability across enterprises, campuses and government missions. Our mission, how we work, and where we operate.",
  openGraph: {
    title: "About SFJBS | Leading IT Staffing & Training Company",
    description:
      "15 years building workforce capability across enterprises, campuses and government missions. Our mission, how we work, and where we operate.",
    url: "https://www.sfjbs.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SFJBS | Leading IT Staffing & Training Company",
    description:
      "15 years building workforce capability across enterprises, campuses and government missions. Our mission, how we work, and where we operate.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/about",
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
                name: "About",
                item: "https://www.sfjbs.com/about",
              },
            ],
          }),
        }}
      />
      <AboutPage />
    </>
  );
}
