import ClientsSection from "./_components/Clients";
import FootprintSection from "./_components/FootprintSection";
import PartnersSection from "./_components/PartnersSection";
import CTASection from "./_components/CTASection";
import FloatingActionButton from "./_components/FloatingActionButton";
import HeroCarousel from "./_components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Corporate Training | 14+ Years Experience | SFJBS",
  description:
    "SFJBS is a trusted leader in IT corporate training and professional services. With over 14 years of experience, we empower organizations by delivering cutting-edge training solutions tailored to upskill teams, boost productivity, and drive innovation across industries.",
  keywords:
    "IT Services, Corporate Training, Technology Solutions, IT Consulting, Tech Recruitment, IT Skill Development, Professional Services, Enterprise Training, IT Talent Solutions, Bengaluru IT Company",
  openGraph: {
    title: "IT Corporate Training | 14+ Years Experience | SFJBS",
    description:
      "SFJBS is a trusted leader in IT corporate training and professional services. With over 14 years of experience, we empower organizations by delivering cutting-edge training solutions tailored to upskill teams, boost productivity, and drive innovation across industries.",
    url: "https://www.sfjbs.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Corporate Training | 14+ Years Experience | SFJBS",
    description:
      "SFJBS is a trusted leader in IT corporate training and professional services. With over 14 years of experience, we empower organizations by delivering cutting-edge training solutions tailored to upskill teams, boost productivity, and drive innovation across industries.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com",
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
