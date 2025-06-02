"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  TrendingDown,
  UserCheck,
  Zap,
  Award,
  Globe,
  Target,
} from "lucide-react";

const WhyWorkWithUsSection = () => {
  const whyWorkWithUs = [
    {
      id: 1,
      icon: <TrendingDown className="w-12 h-12" />,
      title: "Cost-Effective Staffing",
      text: "Cost-effective and just-in-time staffing through a strong network of technology professionals.",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      id: 2,
      icon: <UserCheck className="w-12 h-12" />,
      title: "Right-Sized Partner",
      text: "Right-sized partner for all your talent transformation needs. Build your future-ready workforce.",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      id: 3,
      icon: <Zap className="w-12 h-12" />,
      title: "Digital Transformation",
      text: "Deep expertise in digital transformations that can add disproportionate value for your business.",
      gradient: "from-purple-400 to-violet-600",
    },
    {
      id: 4,
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise Specialists",
      text: "Specialists in Enterprise IT Strategy, Consulting, and Managed services via SAP and Oracle.",
      gradient: "from-orange-400 to-red-600",
    },
    {
      id: 5,
      icon: <Globe className="w-12 h-12" />,
      title: "Industry Portfolio",
      text: "A strong portfolio of capabilities and a proven track record across 8 industries across the globe.",
      gradient: "from-indigo-400 to-blue-600",
    },
    {
      id: 6,
      icon: <Heart className="w-12 h-12" />,
      title: "Value-Driven",
      text: "An organization driven by empathy, integrity, expertise and focused on delivering consistent value.",
      gradient: "from-pink-400 to-rose-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother animation
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.2),transparent_50%)] opacity-60"></div>
      </div>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/whywork.jpg"
          alt="Background"
          fill
          className="object-cover"
          quality={75}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
            <div className="mx-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 mb-2"
              >
                <Target className="w-8 h-8 text-cyan-400" />
                <span className="text-cyan-400 font-semibold text-lg tracking-wider uppercase">
                  Why Choose Us
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Why Work{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  With Us
                </span>
              </h2>
            </div>
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-l from-transparent to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the advantages of partnering with SFJ Business Solutions
            for your digital transformation journey
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {whyWorkWithUs.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card Background with Gradient Border */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              ></div>

              <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${item.gradient} mb-6 shadow-2xl`}
                >
                  <div className="text-white">{item.icon}</div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                    {item.text}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-500 w-0 group-hover:w-full`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <Award className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-semibold">
              Trusted by 500+ companies worldwide
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                ></motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-50 delay-2000"></div>
    </section>
  );
};

export default WhyWorkWithUsSection;
