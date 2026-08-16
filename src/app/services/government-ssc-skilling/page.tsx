import React from "react";
import Script from "next/script";
import Naan from "./_components/Naan";
import Ksdc from "./_components/Ksdc";
import GovernmentTrainingRedesign from "./_components/GovernmentTrainingRedesign";
import ImageCarousel from "./_components/ImageCarousel";
import SubscribeSection from "./_components/SubscribeSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Programs & Skill Development | SFJBS Initiatives",
  description:
    "Delivery partner for central and state skilling missions — mobilisation, training, certification and outcome reporting at district and state scale.",
  openGraph: {
    title: "Government Programs & Skill Development | SFJBS Initiatives",
    description:
      "Delivery partner for central and state skilling missions — mobilisation, training, certification and outcome reporting at district and state scale.",
    url: "https://www.sfjbs.com/services/government-ssc-skilling",
    type: "website",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754907878280_Government%20%282%29%20%28Medium%29.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Government Skill Development & Training Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Programs & Skill Development | SFJBS Initiatives",
    description:
      "Delivery partner for central and state skilling missions — mobilisation, training, certification and outcome reporting at district and state scale.",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754907878280_Government%20%282%29%20%28Medium%29.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Government Skill Development & Training Programs",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/government-ssc-skilling",
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
                name: "Government Initiatives",
                item: "https://www.sfjbs.com/services/government-ssc-skilling",
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen">
        {/* <div className="h-28"></div> */}
        <GovernmentTrainingRedesign />

        <Naan />
        <Ksdc />
        <ImageCarousel />
        <div className="text-center -mt-10 mb-10">
          <SubscribeSection />
        </div>
      </div>
    </>
  );
}
