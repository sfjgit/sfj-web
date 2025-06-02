"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const heroSlides = [
    {
      text: "Bringing agility and scale with the right strategy",
      id: "slide1",
      cta: "Get Started",
    },
    {
      text: "Nurturing and empowering a future-ready workforce",
      id: "slide2",
      cta: "Learn More",
    },
    {
      text: "Mobilizing the right talent for your business needs",
      id: "slide3",
      cta: "Find Talent",
    },
    {
      text: "A thought leader and trusted partner for over a decade",
      id: "slide4",
      cta: "Our Story",
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoLoaded(true)}
        onError={(e) => console.log("Video error:", e)}
        style={{ zIndex: 1 }}
      >
        <source src="/app/home/hero-section.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div
        className="absolute inset-0 flex items-center justify-center text-center"
        style={{ zIndex: 10 }}
      >
        <motion.div
          key={currentSlide}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {heroSlides[currentSlide].text}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white mb-8 drop-shadow-lg"
          >
            Transforming businesses through innovative technology solutions
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300"
          >
            {heroSlides[currentSlide].cta}
          </motion.button>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3"
        style={{ zIndex: 20 }}
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Debug info - remove this in production */}
      {!videoLoaded && (
        <div
          className="absolute top-4 left-4 text-white text-sm"
          style={{ zIndex: 30 }}
        >
          Video loading... Check console for errors
        </div>
      )}
    </section>
  );
};

export default HeroSection;
