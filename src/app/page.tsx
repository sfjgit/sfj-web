/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import HeroSection from "./_components/HeroSection";
import OfferingsSection from "./_components/Offerings";
import ClientsSection from "./_components/Clients";
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
      {/* <TimelineSection /> */}
      <div className="max-w-7xl mx-auto py-5 px-3">
        <img
          src="/app/about/Timeline-of-SFJ.png"
          alt=""
          className="w-full object-cover"
        />
      </div>
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
