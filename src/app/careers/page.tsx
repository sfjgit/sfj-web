import React from "react";
import CareersWrapper from "./_components/CareersWrapper";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "IT Careers & Job Openings | Join the SFJBS Team",
  description:
    "Explore exciting IT career opportunities at SFJBS. Join our innovative team in Bengaluru and contribute to cutting-edge projects while growing your skills in a dynamic work environment.",
  keywords:
    "IT careers, IT jobs, tech jobs, job openings, career opportunities, IT recruitment, software jobs, Bengaluru IT jobs, IT vacancies, join SFJBS",
  openGraph: {
    title: "IT Careers & Job Openings | Join the SFJBS Team",
    description:
      "Explore exciting IT career opportunities at SFJBS. Join our innovative team in Bengaluru and contribute to cutting-edge projects while growing your skills in a dynamic work environment.",
    url: "https://www.sfjbs.com/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Careers & Job Openings | Join the SFJBS Team",
    description:
      "Explore exciting IT career opportunities at SFJBS. Join our innovative team in Bengaluru and contribute to cutting-edge projects while growing your skills in a dynamic work environment.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/careers",
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
                name: "Careers",
                item: "https://www.sfjbs.com/careers",
              },
            ],
          }),
        }}
      />
      <CareersWrapper />
    </>
  );
}
