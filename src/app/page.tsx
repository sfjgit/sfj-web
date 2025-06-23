import ClientsSection from "./_components/Clients";
import FootprintSection from "./_components/FootprintSection";
import PartnersSection from "./_components/PartnersSection";
import CTASection from "./_components/CTASection";
import FloatingActionButton from "./_components/FloatingActionButton";
import HeroCarousel from "./_components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "IT Staffing, Services & Corporate Training | 14+ Years Experience | SFJBS",
  description:
    "SFJBS is a trusted leader in IT staffing, professional services, and corporate training, leveraging over 14 years of expertise to connect businesses with top tech talent and enhance team capabilities across industries.",
  keywords:
    "IT staffing, IT services, corporate training, technology solutions, IT consulting, tech recruitment, IT skill development, professional services, enterprise training, IT talent solutions, Bengaluru IT company",
  openGraph: {
    title:
      "IT Staffing, Services & Corporate Training | 14+ Years Experience | SFJBS",
    description:
      "SFJBS is a trusted leader in IT staffing, professional services, and corporate training, leveraging over 14 years of expertise to connect businesses with top tech talent and enhance team capabilities across industries.",
    url: "https://www.sfjbs.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "IT Staffing, Services & Corporate Training | 14+ Years Experience | SFJBS",
    description:
      "SFJBS is a trusted leader in IT staffing, professional services, and corporate training, leveraging over 14 years of expertise to connect businesses with top tech talent and enhance team capabilities across industries.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
