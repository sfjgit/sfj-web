import React from "react";
import ContactWrapper from "./_components/ContactWrapper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact SFJBS | Submit Your Inquiry & Get Support",
  description:
    "Get in touch with SFJBS for all your IT staffing, professional services, and corporate training needs. Contact our team in Bengaluru for inquiries, partnerships, and support.",
  keywords:
    "contact SFJBS, get in touch, IT staffing inquiries, corporate training contact, professional services contact, Bengaluru office, business partnerships, customer support",
  openGraph: {
    title: "Contact SFJBS | Submit Your Inquiry & Get Support",
    description:
      "Get in touch with SFJBS for all your IT staffing, professional services, and corporate training needs. Contact our team in Bengaluru for inquiries, partnerships, and support.",
    url: "https://www.sfjbs.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SFJBS | Submit Your Inquiry & Get Support",
    description:
      "Get in touch with SFJBS for all your IT staffing, professional services, and corporate training needs. Contact our team in Bengaluru for inquiries, partnerships, and support.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/contact",
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
          name: "Contact",
          item: "https://www.sfjbs.com/contact",
        },
      ],
    }),
  },
};
export default function page() {
  return <ContactWrapper />;
}
