import React from "react";
import Naan from "./_components/Naan";
import Ksdc from "./_components/Ksdc";
import GovernmentTrainingRedesign from "./_components/GovernmentTrainingRedesign";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Government Programs & Skill Development | SFJBS Initiatives",
  description:
    "SFJBS actively participates in government-led initiatives, delivering comprehensive IT skill development and training programs to empower communities and support national objectives.",
  keywords:
    "government initiatives, government training programs, government skill development, IT training for government, public sector skilling, national skill development, government partnerships, government projects IT",
  openGraph: {
    title: "Government Programs & Skill Development | SFJBS Initiatives",
    description:
      "SFJBS actively participates in government-led initiatives, delivering comprehensive IT skill development and training programs to empower communities and support national objectives.",
    url: "https://www.sfjbs.com/services/government-initiatives",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Programs & Skill Development | SFJBS Initiatives",
    description:
      "SFJBS actively participates in government-led initiatives, delivering comprehensive IT skill development and training programs to empower communities and support national objectives.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/government-initiatives",
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
          name: "Government Initiatives",
          item: "https://www.sfjbs.com/services/government-initiatives",
        },
      ],
    }),
  },
};
export default function page() {
  return (
    <div className="min-h-screen">
      {/* <div className="h-28"></div> */}
      <GovernmentTrainingRedesign />

      <Naan />
      <Ksdc />
      <section
        id="initiatives"
        className="py-20 bg-gradient-to-r from-orange-50 to-red-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transforming Lives with{" "}
              <span className="text-orange-600">Skill India</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              SFJ Business Solutions is proud to be a dedicated partner in the
              Government of India&#39;s Skill India mission. Through our robust
              training programs and partnerships, we are equipping individuals
              with the knowledge and practical skills demanded by today&#39;s
              evolving industries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
