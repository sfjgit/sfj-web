import Script from "next/script";
import HeroSection from "./_components/HeroSection";
import InstitutionalStats from "./_components/InstitutionalStats";
import CategoryChooser from "./_components/CategoryChooser";
import AIToolsBar from "./_components/Scroller";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutional Training Programs for Colleges | SFJBS",
  description:
    "IT and AI training programmes for colleges and universities — industry-aligned curriculum, certifications and placement support for your students.",
  openGraph: {
    title: "Institutional Training Programs for Colleges | SFJBS",
    description:
      "IT and AI training programmes for colleges and universities — industry-aligned curriculum, certifications and placement support for your students.",
    url: "https://www.sfjbs.com/services/institutional-skilling",
    type: "website",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754907955851_B2I.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Students participating in institutional training programs for skill development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Institutional Training Programs for Colleges | SFJBS",
    description:
      "IT and AI training programmes for colleges and universities — industry-aligned curriculum, certifications and placement support for your students.",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754907955851_B2I.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Students participating in institutional training programs for skill development",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/institutional-skilling",
  },
};

// Import all the modular components
// Note: In a real Next.js project, these would be separate files
// For this demo, I'll reference the components we built

const InstitutionalTrainingPage = () => {
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
                name: "Institutional Training",
                item: "https://www.sfjbs.com/services/institutional-skilling",
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen">
        {/* Navigation Component */}
        {/* <Navigation /> */}

        {/* Hero Section Component */}
        <HeroSection />
        <AIToolsBar />
        <InstitutionalStats />
        <CategoryChooser />

        {/* Impact & Stats Component */}
        {/* <ImpactStats /> */}

        {/* Contact & Footer Component */}
        {/* <ContactFooter /> */}
      </div>
    </>
  );
};

export default InstitutionalTrainingPage;
