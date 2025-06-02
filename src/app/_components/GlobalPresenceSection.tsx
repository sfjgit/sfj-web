"use client";
import React from 'react';
import { motion } from 'framer-motion';

const GlobalPresenceSection = () => {
  const globalOffices = [
    { 
      flag: "🇮🇳", 
      country: "India", 
      role: "Global Headquarters", 
      desc: "Primary delivery center", 
      color: "from-orange-400 to-green-500" 
    },
    { 
      flag: "🇸🇬", 
      country: "Singapore", 
      role: "Asia-Pacific Hub", 
      desc: "Regional training center", 
      color: "from-red-400 to-red-600" 
    },
    { 
      flag: "🇦🇪", 
      country: "UAE", 
      role: "Middle East Operations", 
      desc: "MENA market focus", 
      color: "from-green-400 to-red-500" 
    },
    { 
      flag: "🇺🇸", 
      country: "USA", 
      role: "North America", 
      desc: "Market development", 
      color: "from-blue-400 to-red-500" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mx-6">Global Presence, Local Impact</h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With offices strategically located across multiple continents, SFJ delivers consistent, high-quality training experiences.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {globalOffices.map((office, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {office.flag}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{office.country}</h3>
              <p className={`font-semibold text-sm mb-3 bg-gradient-to-r ${office.color} bg-clip-text text-transparent`}>
                {office.role}
              </p>
              <p className="text-gray-600">{office.desc}</p>
              <motion.div
                className={`w-8 h-1 bg-gradient-to-r ${office.color} rounded-full mx-auto mt-4`}
                initial={{ width: 32 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;