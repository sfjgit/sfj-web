/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const AnimatedHeader1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Agentic AI";
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  return (
    <div className="rounded-2xl overflow-hidden h-full pt-10 max-w-7xl mx-auto">
      <div className="container mx-auto px-6 pt-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Header Section */}
            <div className="space-y-4 pt-6">
              {/* Big Agentic AI Title */}
              <motion.div
                className="relative inline-block"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="relative text-4xl lg:text-5xl font-bold text-blue-400"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <span>
                    Agentic AI
                    {currentIndex < fullText.length && (
                      <motion.span
                        className="text-blue-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        |
                      </motion.span>
                    )}
                  </span>
                </motion.div>
              </motion.div>
              {/* Main Description */}
              {/* <motion.h1
                className="text-2xl lg:text-2xl text-black font-bold leading-tight"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {splitText(
                  "Empowering organizations and individuals through Agentic AI innovation and autonomy."
                )}
              </motion.h1> */}
              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Unleash AI that can think, learn, and take action on its
                own—changing the way work gets done.
              </p>
              {/* Feature Points */}
              <motion.div
                className="space-y-2 grid grid-cols-2 gap-2 mt-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  "Enterprise Transformation",
                  "Education Reinvented",
                  "Future-Ready Workforce",
                  "Autonomous Intelligence",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    variants={itemVariants}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className=" text-black ">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="pt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={() => {
                  router.push("/contact");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
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
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Video */}
          <div className="pt-10">
            <video
              src="/gen-ai.webm"
              className="w-full"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              controls={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader1;
