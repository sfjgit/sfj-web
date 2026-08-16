"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  video: string;
  tag: string;
  tab: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
};

const slides: Slide[] = [
  {
    video: "/app/home/Bule Mesh.webm",
    tag: "Bridging the gap between talent potential and industry demands since 2011",
    tab: "Workforce Training",
    titlePrefix: "Empowering Global Talent for the ",
    titleHighlight: "AI-Driven Future",
    description:
      "Your trusted partner in transforming workforce capabilities through cutting-edge technology training and strategic skill development.",
  },
  {
    video: "/app/home/Green Mesh.webm",
    tag: "Driving inclusive growth through CSR-led skilling programs",
    tab: "CSR Initiatives",
    titlePrefix: "Sustainable Skilling for Every ",
    titleHighlight: "Community",
    description:
      "Bringing future-ready skills to underserved communities across India through responsible, CSR-driven training initiatives.",
  },
  {
    video: "/app/home/Orange Mesh.webm",
    tag: "Hands-on, industry-relevant certification programs",
    tab: "Career Paths",
    titlePrefix: "Accelerating Careers, One ",
    titleHighlight: "Certification",
    description:
      "Taking learners from zero experience to job-ready professionals through structured, practical training pathways.",
  },
  {
    video: "/app/home/Red Mesh.webm",
    tag: "Large-scale talent development for growing organizations",
    tab: "Enterprise",
    titlePrefix: "Enterprise-Grade Workforce ",
    titleHighlight: "Transformation",
    description:
      "Tailored corporate training solutions designed for organizational growth and long-term workforce readiness.",
  },
  {
    video: "/app/home/Voilet Mesh.webm",
    tag: "Adaptive curricula powered by generative AI",
    tab: "AI Training",
    titlePrefix: "Next-Generation, ",
    titleHighlight: "AI-Powered Learning",
    description:
      "Personalized training that adapts to every learner's pace and goals using the latest generative AI tools.",
  },
  {
    video: "/app/home/Yellow Mesh.webm",
    tag: "Partnering with government bodies on nationwide skilling",
    tab: "Government",
    titlePrefix: "Powering National ",
    titleHighlight: "Skilling Missions",
    description:
      "Collaborating with government bodies to deliver large-scale, nationwide upskilling initiatives across India.",
  },
];

const SLIDE_DURATION = 5000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  const slide = slides[current];

  return (
    <section className="relative pt-16 pb-20 text-white overflow-hidden">
      {/* Video background, crossfades between slides */}
      <AnimatePresence mode="wait">
        <motion.video
          key={slide.video}
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={slide.video} type="video/webm" />
        </motion.video>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/20"></div>

      {/* Original decorative blur circles, kept as-is */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${current}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="inline-block px-4 py-2 bg-blue-500/20 text-blue-100 rounded-full text-sm font-medium border border-blue-400/30"
              >
                {slide.tag}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                {slide.titlePrefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  {slide.titleHighlight}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 mb-4 font-medium">
            SFJ Business Solutions Pvt. Ltd
          </p>

          <div className="overflow-hidden mb-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${current}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
            >
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

      {/* Bottom tab bar */}
      <div className="relative z-10 flex mt-8 mx-4 sm:mx-6 lg:mx-8 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm">
        {slides.map((s, i) => (
          <button
            key={s.tab}
            onClick={() => handleTabClick(i)}
            className={`flex-1 text-center px-4 py-3 text-sm font-medium transition-all duration-300 ${
              i === current
                ? "bg-white text-gray-900"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
