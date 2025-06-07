/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Settings,
  Building,
  GraduationCap,
  Heart,
  ChevronRight,
} from "lucide-react";

const HeroWithOfferings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offerings = [
    {
      id: 1,
      icon: BookOpen,
      title: "Knowledge as a Service",
      subtitle: "Professional Training Programs",
      description: "640+ specialized courses to boost your career and skills",
      cta: "Start Learning",
      img: "/app/home/knowledge-as-service.png",
    },
    {
      id: 2,
      icon: Users,
      title: "Talent as a Service",
      subtitle: "Find the Right Talent",
      description:
        "15,000+ successful placements with top-tier IT professionals",
      cta: "Find Talent",
      img: "/app/home/talent-as-service.png",
    },
    {
      id: 3,
      icon: Settings,
      title: "IT Services",
      subtitle: "Complete IT Solutions",
      description:
        "Enterprise solutions across SAP, Oracle, and cloud platforms",
      cta: "Get Solutions",
      img: "/app/home/it-service.jpeg",
    },
    {
      id: 4,
      icon: Building,
      title: "Government Initiatives",
      subtitle: "Public Sector Training Programs",
      description:
        "KSDC, Naan Mudhalavan and other state skill development initiatives",
      cta: "Explore Programs",
      img: "/app/home/talent-as-service.png",
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Institutional Training (B2I)",
      subtitle: "Academic Partnership Programs",
      description: "Training for engineering, MBA, and arts & science students",
      cta: "Join Program",
      img: "/app/home/talent-as-service.png",
    },
    {
      id: 6,
      icon: Heart,
      title: "Corporate Social Responsibility",
      subtitle: "Community Development Programs",
      description: "CSR initiatives focused on education and skill development",
      cta: "Learn More",
      img: "/app/home/talent-as-service.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offerings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [offerings.length]);

  const currentOffering = offerings[currentSlide];
  const IconComponent = currentOffering.icon;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full mt-20">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {currentOffering.title}
                </h1>

                <p className="text-xl md:text-2xl text-blue-100 mb-6 font-medium">
                  {currentOffering.subtitle}
                </p>

                <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
                  {currentOffering.description}
                </p>

                {/* <button className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  {currentOffering.cta}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button> */}
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            {/* <div className="flex justify-center mt-12 space-x-2">
              {offerings.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Overlapping Offerings Section */}
      <section className="relative -mt-52 z-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 bg-white rounded-xl shadow-lg p-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Our Offerings
            </h2>
            <p className="text-sm text-gray-600">
              Transform your workforce and accelerate growth
            </p>
          </motion.div>

          {/* Offerings Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {offerings.map((offering, index) => {
              const IconComponent = offering.icon;
              return (
                <motion.div
                  key={offering.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={offering.img}
                      alt={offering.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-b-xl shadow-md transition-shadow duration-300 p-5 border border-gray-100">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {offering.title}
                    </h3>

                    <p className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wide">
                      {offering.subtitle}
                    </p>

                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {offering.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-semibold text-xs group-hover:text-blue-700 transition-colors">
                      <span className="mr-1">{offering.cta}</span>
                      <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroWithOfferings;
