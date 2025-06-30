/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const AnimatedHeader = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Gen AI";
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        duration: 0.8,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const splitText = (text: any) => {
    return text.split("").map((char: any, index: number) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
        style={{ transformOrigin: "0 50%" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  const services = [
    {
      path: "/services/corporate-it-training-programs",
      label: "Corporate Training",
      description: "640+ specialized courses to boost your career and skills",
    },
    {
      path: "/services/corporate-social-responsibility",
      label: "CSR Skilling Partner",
      description: "CSR initiatives focused on education and skill development",
    },
    {
      path: "/services/government-initiatives",
      label: "Government-Led Skilling Missions",
      description:
        "KSDC, Naan Mudhalavan and other state skill development initiatives",
    },
    {
      path: "/services/institutional-training",
      label: "Institutional Training",
      description: "Training for engineering, MBA, and arts & science students",
    },

    // {
    //   path: "/services/talent-as-service",
    //   label: "Talent as a Service",
    //   description:
    //     "15,000+ successful placements with top-tier IT professionals",
    // },
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full pt-10 max-w-7xl mx-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Content */}
          <motion.div
            className="space-y-4 pt-10"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Header Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {/* Icon and client info commented out as in original */}
              </div>

              <div className="space-y-2">
                {/* Big Gen AI with Subtle Glow Behind */}
                <motion.div
                  className="relative inline-block"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Subtle Glow Behind - More Contained */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-15 blur-md rounded-lg"></div>

                  {/* Big Gen AI Text - Medium Weight */}
                  <motion.div
                    className="relative text-7xl lg:text-9xl font-medium bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    <span className="tracking-wider">
                      {displayedText}
                      {currentIndex < fullText.length && (
                        <motion.span
                          className="text-cyan-400"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          |
                        </motion.span>
                      )}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Subtitle - Bigger Text with Letter Animation */}
                <motion.h2
                  className="text-2xl lg:text-3xl text-gray-800 font-bold leading-tight mt-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {splitText("Upskilling India for the AI Era")}
                </motion.h2>
              </div>
            </div>

            {/* Services with Stagger Animation */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="flex items-start space-x-3 bg-white/50 p-3 rounded-lg cursor-pointer hover:bg-gray-50 border border-gray-100"
                  onClick={() => router.push(service.path)}
                >
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 flex-shrink-0"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                      {service.label}
                    </h3>
                    {/* <p className="text-xs text-gray-600 leading-relaxed">
                      {service.description}
                    </p> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons with Bounce */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={() => {
                  router.push("/contact");
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-sm"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Join Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image & Stats */}
          <motion.div
            className="relative h-full flex-col flex justify-end items-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <img src="/ind.png" alt="India Map" className="w-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader;
