import HeroSection from "./_components/HeroSection";
import BFSIPrograms from "./_components/BFSIPrograms";
import EngineeringPathways from "./_components/EngineeringPathways";
import LeadershipTraining from "./_components/LeadershipTraining";
import ArtsAndScienceCourses from "./_components/ArtsAndScienceCourses";
import HorizontalScrollNavbar from "./_components/Scroller";
import MBACourses from "./_components/MBA";
import SkillgenAISummary from "./_components/School";
import PolytechnicSummary from "./_components/Polytechic";
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
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Institutional Training Programs | Skill Development for Students | SFJBS",
    description:
      "SFJBS partners with educational institutions in Bengaluru and beyond to deliver cutting-edge IT training programs, equipping students with industry-relevant skills and enhancing their career readiness.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/institutional-training",
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
          name: "Institutional Training",
          item: "https://www.sfjbs.com/services/institutional-training",
        },
      ],
    }),
  },
};

// Import all the modular components
// Note: In a real Next.js project, these would be separate files
// For this demo, I'll reference the components we built

const InstitutionalTrainingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation Component */}
      {/* <Navigation /> */}

      {/* Hero Section Component */}
      <HeroSection />
      <HorizontalScrollNavbar />
      {/* BFSI Programs Component */}
      <section id="schools">
        <SkillgenAISummary />
      </section>
      <section id="polytechnic">
        <PolytechnicSummary />
      </section>

      {/* Engineering Pathways Component */}

      <section id="engineering">
        <EngineeringPathways />
      </section>

      <section id="arts">
        <ArtsAndScienceCourses />
        <BFSIPrograms />
      </section>
      <section id="mba">
        <MBACourses />
      </section>

      {/* Impact & Stats Component */}
      {/* <ImpactStats /> */}

      {/* Leadership Training Component */}
      <LeadershipTraining />

      {/* Contact & Footer Component */}
      {/* <ContactFooter /> */}
    </div>
  );
};

export default InstitutionalTrainingPage;
