import type { Metadata } from "next";
import Script from "next/script";
import FacultyDevelopmentPage from "./_components/FacultyDevelopmentPage";
import { ORGANIZATION_ID, SITE_URL, canonical } from "@/config/site";

// This page carried a well-optimised 63-char title but canonicalised to the
// homepage, so it could never rank for "faculty development programme" no
// matter how good the copy was (P0-03).
export const metadata: Metadata = {
  title: "Faculty Development Programs in IT & AI | SFJBS",
  description:
    "Industry-aligned Faculty Development Programs for college educators in AI, cloud, cybersecurity and data science — delivered around teaching calendars.",
  alternates: { canonical: canonical("/initiatives/faculty-development") },
  openGraph: {
    type: "website",
    url: canonical("/initiatives/faculty-development"),
    title: "Faculty Development Programs in IT & AI | SFJBS",
    description:
      "Industry-aligned FDPs for college educators in AI, cloud, cybersecurity and data science — delivered around teaching calendars.",
  },
};

// CR-04: breadcrumb markup was present on service pages but missing here and
// on the blog templates.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Initiatives",
      item: `${SITE_URL}/initiatives/faculty-development`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Faculty Development",
      item: canonical("/initiatives/faculty-development"),
    },
  ],
};

// SD-03: no Service markup existed anywhere on the site, forfeiting the rich
// result types available to a skilling company.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Faculty Development Program",
  serviceType: "Faculty Development Program",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: "IN",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "faculty",
  },
  description:
    "Industry-aligned faculty development programmes in AI, cloud, cybersecurity and data science for college and university educators.",
  url: canonical("/initiatives/faculty-development"),
};

export default function Page() {
  return (
    <>
      <Script
        id="fdp-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="fdp-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FacultyDevelopmentPage />
    </>
  );
}
