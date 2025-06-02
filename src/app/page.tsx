"use client";
import React from "react";
import HeroSection from "./_components/HeroSection";
import OfferingsSection from "./_components/Offerings";
import ClientsSection from "./_components/Clients";
import TimelineSection from "./_components/TimelineSection";
import WhyWorkWithUsSection from "./_components/WhyWorkWithUsSection";
import FootprintSection from "./_components/FootprintSection";
import TalentServicesSection from "./_components/TalentServicesSection";
import PartnersSection from "./_components/PartnersSection";
import GlobalPresenceSection from "./_components/GlobalPresenceSection";
// import BlogSection from "./_components/BlogSection";
import CTASection from "./_components/CTASection";
import FloatingActionButton from "./_components/FloatingActionButton";
import SEOHead from "./_components/SeoHead";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}
      <SEOHead />
      <HeroSection />
      <OfferingsSection />
      <ClientsSection />
      <WhyWorkWithUsSection />
      <FootprintSection />
      <TimelineSection />
      <TalentServicesSection />
      <PartnersSection />
      <GlobalPresenceSection />
      {/* <BlogSection /> */}
      <CTASection />
      <FloatingActionButton />
    </div>
  );
};

export default HomePage;
