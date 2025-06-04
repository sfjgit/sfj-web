"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const OfferingsSection = () => {
  const offerings = [
    {
      id: 1,
      name1: "Knowledge",
      name2: "As A Service",
      image: "/app/home/knowledge-as-service.png",
      link: "/solutions/corporate-training",
      description:
        "Comprehensive training programs across 640+ specialized courses",
    },
    {
      id: 2,
      name1: "Talent",
      name2: "As A Service",
      image: "/app/home/talent-as-service.png",
      link: "/solutions/talent",
      description: "15,000+ IT placements with top-tier professionals",
    },
    {
      id: 3,
      name1: "IT",
      name2: "Services",
      image: "/app/home/it-service.jpeg",
      link: "/solutions/itservices",
      description:
        "Enterprise solutions across SAP, Oracle, and cloud platforms",
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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mx-6">
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
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
                    alt={`${offering.name1} ${offering.name2}`}
                    width={400}
                    height={384}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-4">
                      {offering.name1}
                      <br />
                      {offering.name2}
                    </h3>
                    <p className="text-gray-200 mb-6">{offering.description}</p>
                    <div className="flex items-center text-blue-300 font-semibold">
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
