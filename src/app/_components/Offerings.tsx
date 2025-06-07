"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Settings,
  Building,
  GraduationCap,
  Heart,
} from "lucide-react";
const OfferingsSection = () => {
  const offerings = [
    {
      id: 1,
      icon: BookOpen,
      title: "Knowledge as a Service",
      subtitle: "Professional Training Programs",
      description: "640+ specialized courses to boost your career and skills",
      cta: "Start Learning",
      image: "/app/home/knowledge-as-service.png",
      color: "from-blue-500 to-blue-600",
      link: "/solutions/corporate-training",
    },
    {
      id: 2,
      icon: Users,
      title: "Talent as a Service",
      subtitle: "Find the Right Talent",
      description:
        "15,000+ successful placements with top-tier IT professionals",
      image: "/app/home/talent-as-service.png",
      cta: "Find Talent",
      color: "from-purple-500 to-purple-600",
      link: "/solutions/recruitment",
    },
    {
      id: 3,
      icon: Settings,
      title: "IT Services",
      subtitle: "Complete IT Solutions",
      image: "/app/home/talent-as-service.png",
      description:
        "Enterprise solutions across SAP, Oracle, and cloud platforms",
      cta: "Get Solutions",
      color: "from-green-500 to-green-600",
      link: "/solutions/it-services",
    },
    {
      id: 4,
      icon: Building,
      title: "Government Initiatives",
      subtitle: "Public Sector Training Programs",
      image: "/app/home/talent-as-service.png",
      description:
        "KSDC, Naan Mudhalavan and other state skill development initiatives",
      cta: "Explore Programs",
      color: "from-orange-500 to-red-600",
      link: "/solutions/government-initiatives",
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Institutional Training (B2I)",
      subtitle: "Academic Partnership Programs",
      description: "Training for engineering, MBA, and arts & science students",
      cta: "Join Program",
      image: "/app/home/talent-as-service.png",
      color: "from-teal-500 to-cyan-600",
      link: "/solutions/institutional-training",
    },
    {
      id: 6,
      icon: Heart,
      title: "Corporate Social Responsibility",
      subtitle: "Community Development Programs",
      description: "CSR initiatives focused on education and skill development",
      cta: "Learn More",
      image: "/app/home/talent-as-service.png",
      color: "from-pink-500 to-rose-600",
      link: "/solutions/corporate-social-responsibility",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="py-5 bg-white z-[500] absolute -mt-24">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mx-6">
              Our Offerings
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to transform your workforce and
            accelerate business growth
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {offerings.map((offering) => (
            <motion.div
              key={offering.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link href={offering.link}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 cursor-pointer">
                  <Image
                    src={offering.image}
                    alt={`${offering.title} ${offering.subtitle}`}
                    width={400}
                    height={384}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className=" inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className=" bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-lg font-bold mb-4 text-blue-500">
                      {offering.title}
                      <br />
                      {/* {offering.subtitle} */}
                    </h3>
                    <p className="text-gray-500 mb-6">{offering.description}</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      Learn More
                      <motion.svg
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OfferingsSection;
