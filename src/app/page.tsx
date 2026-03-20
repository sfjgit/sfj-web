import ClientsSection from "./_components/Clients";
import FootprintSection from "./_components/FootprintSection";
import PartnersSection from "./_components/PartnersSection";
import CTASection from "./_components/CTASection";
// import FloatingActionButton from "./_components/FloatingActionButton";
import HeroCarousel from "./_components/Hero";
import { Metadata } from "next";
import Script from "next/script";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title:
    "Enterprise Upskilling Partner in Bangalore, India | Enterprise Training Programs & Tech Solutions",
  description:
    "SFJBS is an enterprise upskilling partner in Bangalore, India, offering enterprise training programs, IT consulting services, and tech solutions for future-ready teams.",
  keywords:
    "IT Services, Corporate Training, Technology Solutions, IT Consulting, Tech Recruitment, IT Skill Development, Professional Services, Enterprise Training Programs, IT Talent Solutions, Bengaluru IT Company",
  openGraph: {
    title:
      "Enterprise Upskilling Partner in Bangalore, India | Enterprise Training & Tech Solutions",
    description:
      "SFJBS is an enterprise upskilling partner in Bangalore, India, offering enterprise training, IT consulting services, and tech solutions for future-ready teams.",
    url: "https://www.sfjbs.com",
    type: "website",
    images: [
      {
        url: "https://www.sfjbs.com/ind.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "SFJBS - Enterprise Upskilling Partner in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Enterprise Upskilling Partner in Bangalore, India | Enterprise Training Programs & Tech Solutions",
    description:
      "SFJBS is an enterprise upskilling partner in Bangalore, India, offering enterprise training, IT consulting services, and tech solutions for future-ready teams.",
    images: ["https://www.sfjbs.com/ind.png"], // Replace with your actual image URL
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
            name: "SFJ Business Solutions",
            url: "https://www.sfjbs.com",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "3.8",
              reviewCount: "150",
            },
          }),
        }}
      />

      {/* <div className=" bg-g00">
        <button className="p-2 bg-blue-500 text-white rounded">
          Test Button
        </button>
      </div> */}

      <HeroCarousel />

      <ClientsSection />

      <PartnersSection />

      <FootprintSection />

      <PricingSection />

      <CTASection />
      {/* <FloatingActionButton /> */}
    </div>
  );
}

// export default HomePage;
