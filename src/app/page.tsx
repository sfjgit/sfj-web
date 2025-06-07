"use client";
import React from "react";
import ClientsSection from "./_components/Clients";
import FootprintSection from "./_components/FootprintSection";
import PartnersSection from "./_components/PartnersSection";
import CTASection from "./_components/CTASection";
import FloatingActionButton from "./_components/FloatingActionButton";
import SEOHead from "./_components/SeoHead";
import HeroServicesSection from "./_components/HeroServicesSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <HeroServicesSection />

      <ClientsSection />
      <PartnersSection />

      <FootprintSection />

      <CTASection />
      <FloatingActionButton />
    </div>
  );
};

export default HomePage;
