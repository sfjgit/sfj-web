"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TalentServicesSection = () => {
  const talentServices = [
    { name: "Java Stack", icon: "/tal/java.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "Hadoop", icon: "/tal/hadoop.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "React JS", icon: "/tal/react.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "Snowflake", icon: "/tal/snowflake.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "Teradata", icon: "/tal/teradata.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "Azure Data Bricks/ADF", icon: "/tal/azurew.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "SAP BODS", icon: "/tal/sapw.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "Salesforce", icon: "/tal/sfw.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "Oracle/OIS/Finance", icon: "/tal/Oracle.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" },
    { name: "SAP SuccessFactors", icon: "/tal/sapw.png", type: "Full-time/Contract", role: "Developer/Consultant/Architect" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-0.5 bg-white rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mx-6">Talent as a Service</h2>
            <div className="w-20 h-0.5 bg-white rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {talentServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={service.icon}
                  alt={service.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 mx-auto mb-4 object-contain"
                />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
              <p className="text-gray-300 text-sm mb-2">{service.type}</p>
              <p className="text-gray-400 text-xs">{service.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TalentServicesSection;