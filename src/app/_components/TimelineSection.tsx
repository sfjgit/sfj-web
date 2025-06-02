"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TimelineSection = () => {
  const milestones = [
    {
      year: "2011",
      title: "Foundation Year",
      description: "Established with a strong focus on IT training excellence and industry-relevant curriculum development.",
      icon: "🏁",
      color: "from-blue-500 to-purple-600"
    },
    {
      year: "2015-2018",
      title: "Training Scale Achievement",
      description: "Reached the significant milestone of training 300,000+ IT professionals across diverse technology domains.",
      icon: "📊",
      color: "from-green-500 to-teal-600"
    },
    {
      year: "2019-2021",
      title: "Curriculum Expansion",
      description: "Developed and launched 640+ specialized courses covering emerging technologies and industry best practices.",
      icon: "📚",
      color: "from-orange-500 to-red-600"
    },
    {
      year: "2022",
      title: "Strategic Partnerships",
      description: "Formed alliances with universities, skill development missions, NSDC, and NASSCOM, training 50,000+ professionals.",
      icon: "🤝",
      color: "from-purple-500 to-pink-600"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Established international presence with offices in Singapore, UAE, and the United States.",
      icon: "🌍",
      color: "from-cyan-500 to-blue-600"
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched comprehensive digital literacy programs and CSR initiatives, training 35,000 professionals.",
      icon: "💻",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const itemVariantsRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mx-6">Our Journey</h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From Vision to Global Impact - Founded in 2011, transforming the workforce development landscape
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 rounded-full"></div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-16 ${
                    isLeft ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center text-2xl shadow-lg`}>
                      <span className="filter drop-shadow-sm">{milestone.icon}</span>
                    </div>
                    
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.color} opacity-20`}
                    ></motion.div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    variants={isLeft ? itemVariants : itemVariantsRight}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="w-5/12"
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-8 relative border border-gray-100">
                      {/* Arrow */}
                      <div className={`
                        absolute top-8 w-0 h-0 
                        ${isLeft 
                          ? 'right-0 translate-x-full border-l-[20px] border-l-white border-y-[15px] border-y-transparent' 
                          : 'left-0 -translate-x-full border-r-[20px] border-r-white border-y-[15px] border-y-transparent'
                        }
                      `}></div>
                      
                      <div className={`text-3xl font-bold bg-gradient-to-br ${milestone.color} bg-clip-text text-transparent mb-2`}>
                        {milestone.year}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {milestone.description}
                      </p>
                      
                      <div className={`w-12 h-1 bg-gradient-to-r ${milestone.color} rounded-full`}></div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;