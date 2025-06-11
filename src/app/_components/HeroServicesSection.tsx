/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  Settings,
  Building,
  GraduationCap,
  Heart,
  Building2,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const HeroServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      text1: "AI-Powered Skills Training for Tomorrow's Jobs",
      description:
        "Smart learning platforms that teach in-demand skills and match you with real job opportunities",
      id: "slide1",
    },
    {
      text1: "Skill-Based Solutions Powered by AI Technology",
      description:
        "Custom training programs that identify skill gaps and build the exact capabilities your business needs",
      id: "slide2",
    },
    {
      text1: "Job-Ready Skills Through AI-Driven Learning",
      description:
        "Personalized training paths that prepare professionals for high-demand careers in today's market",
      id: "slide3",
    },
    {
      text1: "AI-Powered Talent Matching for Skill-Based Hiring",
      description:
        "Smart recruitment that connects companies with candidates based on proven skills, not just resumes",
      id: "slide4",
    },
    {
      text1: "Decade of AI Innovation in Skills Development",
      description:
        "Leading the future of work with AI-driven training and skill-based career transformation",
      id: "slide5",
    },
  ];

  const offerings = [
    {
      id: 1,
      icon: BookOpen,
      title: "Knowledge as a Service",
      subtitle: "Professional Training Programs",
      description: "640+ specialized courses to boost your career and skills",
      cta: "Start Learning",
      img: "/app/home/knowledge-as-service.png",
      link: "/services/knowledge-as-service",
      clients: "200+",
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
      link: "/services/talent-as-service",
      clients: "50+",
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
      link: "/services/it-services",
      clients: "100+",
    },
    {
      id: 4,
      icon: Building,
      title: "Government Initiatives",
      subtitle: "Public Sector Training Programs",
      description:
        "KSDC, Naan Mudhalavan and other state skill development initiatives",
      cta: "Explore Programs",
      img: "/app/home/govt.png",
      link: "/services/government-initiatives",
      clients: "3+",
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Institutional Training (B2I)",
      subtitle: "Academic Partnership Programs",
      description: "Training for engineering, MBA, and arts & science students",
      cta: "Join Program",
      img: "/app/home/B2I.png",
      link: "/services/institutional-training",
      clients: "10+",
    },
    {
      id: 6,
      icon: Heart,
      title: "Corporate Social Responsibility",
      subtitle: "Community Development Programs",
      description: "CSR initiatives focused on education and skill development",
      cta: "Learn More",
      img: "/app/home/CSR.png",
      link: "/services/corporate-social-responsibility",
      clients: "5+",
    },
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logos = [
    "/clients/dodsal.png",
    "/clients/Accenture.png",
    "/clients/Capgemini.png",
    "/clients/HCl.png",
    "/clients/wipro.png",
    "/clients/futt.png",
    "/clients/DIFCL.png",
    "/clients/arqaam.png",
    "/clients/zafco.png",
    "/clients/cremica.png",
    "/clients/perfect.png",
    "/clients/mandiesel.png",
    "/clients/Atos.png",
    "/clients/laxmi1.png",
    "/clients/alseer.png",
    "/clients/sap.png",
  ];

  return (
    <>
      <div className="relative">
        <section className="relative h-[100vh] overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => console.log("Video error:", e)}
          >
            <source src="/app/home/hero-section.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-0 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 pt-28 pb-16 relative z-10 mt-28">
            {/* Rotating Main Headings with currentSlide state */}
            <div className="text-center mb-16 min-h-[300px] flex flex-col items-center justify-center max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="text-center space-y-6"
                >
                  <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {slides[currentSlide].text1}
                  </h1>
                  <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-4xl mx-auto px-4">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="pt-4 mt-5 ">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r hover:cursor-pointer from-blue-500 to-green-300 hover:from-yellow-400 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    Get Started Today
                  </motion.button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center space-x-3 mt-80 ">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white shadow-lg scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            {/* Slide Indicators */}
          </div>
        </section>

        {/* Offerings Section */}
        <section className="relative z-20 pb-20 mt-10">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header - Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 bg-white rounded-xl shadow-xl p-5 max-w-xl mx-auto"
            >
              <div className="inline-block mb-2">
                <Badge
                  variant="outline"
                  className="text-blue-700 border-blue-300 bg-blue-50 px-5 py-1.5 text-sm font-semibold rounded-full shadow-sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Our Offerings asas
                </Badge>
              </div>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
                    <Link href={offering.link} className="block">
                      <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                        {/* Image */}
                        <div className="h-48 overflow-hidden">
                          <img
                            src={offering.img}
                            alt={offering.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Content */}
                        <div className="bg-white py-4 px-5">
                          <div className="flex items-center">
                            <IconComponent className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {offering.title}
                            </h3>
                          </div>
                          <div className="flex items-center mt-3">
                            <Building2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {offering.clients} Clients
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroServicesSection;
