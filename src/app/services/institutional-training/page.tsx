import Script from "next/script";
import HeroSection from "./_components/HeroSection";
import InstitutionalStats from "./_components/InstitutionalStats";
import CategoryChooser from "./_components/CategoryChooser";
import AIToolsBar from "./_components/Scroller";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Institutional Training Programs | Skill Development for Students | SFJBS",
  description:
    "SFJBS partners with educational institutions in Bengaluru and beyond to deliver cutting-edge IT training programs, equipping students with industry-relevant skills and enhancing their career readiness.",
  keywords:
    "institutional training programs, student skill development, IT training for students, educational institution training, college IT training, university IT programs, student career readiness, industry-relevant skills",
  openGraph: {
    title:
      "Institutional Training Programs | Skill Development for Students | SFJBS",
    description:
      "SFJBS partners with educational institutions in Bengaluru and beyond to deliver cutting-edge IT training programs, equipping students with industry-relevant skills and enhancing their career readiness.",
    url: "https://www.sfjbs.com/services/institutional-training",
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
    title:
      "Institutional Training Programs | Skill Development for Students | SFJBS",
    description:
      "SFJBS partners with educational institutions in Bengaluru and beyond to deliver cutting-edge IT training programs, equipping students with industry-relevant skills and enhancing their career readiness.",
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
    canonical: "https://www.sfjbs.com/services/institutional-training",
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
                item: "https://www.sfjbs.com/services/institutional-training",
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
