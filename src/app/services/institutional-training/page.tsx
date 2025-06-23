"use client";
import React from "react";
import HeroSection from "./_components/HeroSection";
import BFSIPrograms from "./_components/BFSIPrograms";
import EngineeringPathways from "./_components/EngineeringPathways";
import LeadershipTraining from "./_components/LeadershipTraining";
import ArtsAndScienceCourses from "./_components/ArtsAndScienceCourses";
import HorizontalScrollNavbar from "./_components/Scroller";
import MBACourses from "./_components/MBA";
import SkillgenAISummary from "./_components/School";
import PolytechnicSummary from "./_components/Polytechic";

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
