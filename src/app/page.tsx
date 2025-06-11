"use client";
import React from "react";
import ClientsSection from "./_components/Clients";
import FootprintSection from "./_components/FootprintSection";
import PartnersSection from "./_components/PartnersSection";
import CTASection from "./_components/CTASection";
import FloatingActionButton from "./_components/FloatingActionButton";
import SEOHead from "./_components/SeoHead";
// import HeroServicesSection from "./_components/HeroServicesSection";
import HeroCarousel from "./_components/Hero";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <HeroCarousel />
      {/* <HeroServicesSection /> */}

      <ClientsSection />
      <PartnersSection />

      <FootprintSection />

      <CTASection />
      <FloatingActionButton />
    </div>
  );
};

export default HomePage;
