import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ImpactMetrics from "@/components/ImpactMetrics";
import PartnersShowcase from "@/components/PartnersShowcase";
import ServicesOverview from "@/components/ServicesOverview";
import TechnologyExpertise from "@/components/TechnologyExpertise";


const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <HeroSection />
      <ImpactMetrics />
      <ServicesOverview />
      <TechnologyExpertise />
      <PartnersShowcase />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
