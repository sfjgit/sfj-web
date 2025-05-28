import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-100 rounded-full text-sm font-medium border border-blue-400/30">
              Bridging the gap between talent potential and industry demands since 2011
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Global Talent for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
              AI-Driven Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-4 font-medium">
            SFJ Business Solutions Pvt. Ltd
          </p>
          
          <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in transforming workforce capabilities through cutting-edge technology training and strategic skill development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
              Explore Our Solutions
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-blue-800 hover:bg-white hover:text-blue-900 px-8 py-3 text-lg font-semibold"
            >
              View Impact Report
            </Button>   
          </div>
          
          <div className="mt-16 animate-bounce">
            <ArrowDown className="mx-auto h-6 w-6 text-blue-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
