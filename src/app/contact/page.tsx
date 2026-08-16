import React from "react";
import ContactWrapper from "./_components/ContactWrapper";
import { Metadata } from "next";
import Script from "next/script";
import { CONTACT, ORGANIZATION_ID, SITE_URL, canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact SFJBS | Submit Your Inquiry & Get Support",
  description:
    "Talk to SFJ Business Solutions about training, staffing or skilling programmes. Bengaluru head office, +91 98453 48601, growth@sfjbs.com.",
  openGraph: {
    title: "Contact SFJBS | Submit Your Inquiry & Get Support",
    description:
      "Talk to SFJ Business Solutions about training, staffing or skilling programmes. Bengaluru head office, +91 98453 48601, growth@sfjbs.com.",
    url: canonical("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SFJBS | Submit Your Inquiry & Get Support",
    description:
      "Talk to SFJ Business Solutions about training, staffing or skilling programmes. Bengaluru head office, +91 98453 48601, growth@sfjbs.com.",
  },
  alternates: {
    canonical: canonical("/contact"),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: canonical("/contact"),
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: canonical("/contact"),
  mainEntity: { "@id": ORGANIZATION_ID },
  about: { "@id": ORGANIZATION_ID },
  potentialAction: {
    "@type": "CommunicateAction",
    telephone: `+${CONTACT.phoneHref.replace(/^\+/, "")}`,
    email: CONTACT.email,
  },
};

/**
 * Server component. Reading `type` here rather than with `useSearchParams()`
 * inside the form is what lets the form markup server-render at all — see the
 * note in ContactWrapper (P0-08).
 */
export default async function ContactRoute({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawType = Array.isArray(params.type) ? params.type[0] : params.type;

  return (
    <>
      <Script
        id="contact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactWrapper defaultType={rawType} />
    </>
  );
}
