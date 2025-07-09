import ClientsSection from "./_components/Clients";
import FootprintSection from "./_components/FootprintSection";
import PartnersSection from "./_components/PartnersSection";
import CTASection from "./_components/CTASection";
import FloatingActionButton from "./_components/FloatingActionButton";
import HeroCarousel from "./_components/Hero";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Upskilling India for the AI Era | Enterprise Training & Tech Solutions | SFJBS",
  description:
    "SFJBS is committed to upskilling India for the AI era through enterprise training and cutting-edge technology solutions. With over 14 years of expertise, we empower organizations with tailored learning programs, IT consulting, and tech-driven strategies to build future-ready teams and accelerate innovation across industries.",
  keywords:
    "IT Services, Corporate Training, Technology Solutions, IT Consulting, Tech Recruitment, IT Skill Development, Professional Services, Enterprise Training, IT Talent Solutions, Bengaluru IT Company",
  openGraph: {
    title:
      "Upskilling India for the AI Era | Enterprise Training & Tech Solutions | SFJBS",
    description:
      "SFJBS is committed to upskilling India for the AI era through enterprise training and cutting-edge technology solutions. With over 14 years of expertise, we empower organizations with tailored learning programs, IT consulting, and tech-driven strategies to build future-ready teams and accelerate innovation across industries.",
    url: "https://www.sfjbs.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Upskilling India for the AI Era | Enterprise Training & Tech Solutions | SFJBS",
    description:
      "SFJBS is committed to upskilling India for the AI era through enterprise training and cutting-edge technology solutions. With over 14 years of expertise, we empower organizations with tailored learning programs, IT consulting, and tech-driven strategies to build future-ready teams and accelerate innovation across industries.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="aggregate-rating"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SFJ Technologies",
            url: "https://www.sfjbs.com",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "3.8",
              reviewCount: "150",
            },
          }),
        }}
      />

      <h1 className="hidden">
        Upskilling India for the AI Era | Enterprise Training & Tech Solutions
      </h1>
      <HeroCarousel />

      <ClientsSection />
      <PartnersSection />

      <FootprintSection />

      <CTASection />
      <FloatingActionButton />
    </div>
  );
}

// export default HomePage;
