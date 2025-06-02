"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Enterprise Project",
      image: "/blog/1.jpg",
      description: "Many organizations are struggling with the digital transformation efforts that they have begun...",
      author: "Gorden Haff",
      source: "enterprisersproject.com",
      link: "https://enterprisersproject.com/article/2022/7/it-talent-upskilling-boost-digital-transformation"
    },
    {
      id: 2,
      title: "Hiring Trend in IT Industry",
      image: "/blog/2.jpg",
      description: "The hiring landscape is constantly changing. At the same time, a range of external factors are impacting...",
      author: "Augusta Henning",
      source: "smartrecruiters.com",
      link: "https://www.smartrecruiters.com/blog/4-hiring-trends-you-need-to-know-about/"
    },
    {
      id: 3,
      title: "Recruiters Using Automation Fill",
      image: "/blog/3.jpg",
      description: "Staffing and recruitment firms that embrace automation have a 64% higher fill rate, submit 33% more candidates...",
      author: "Ait News desk",
      source: "aithority.com",
      link: "https://aithority.com/robots/automation/recruiters-using-automation-fill-64-more-job-vacancies/"
    },
    {
      id: 4,
      title: "Learning Trends in IT Skills",
      image: "/blog/4.jpg",
      description: "As businesses and organizations look towards the future with optimism, hoping for normalcy to return soon...",
      author: "Manav Seth",
      source: "peoplematters.in",
      link: "https://www.peoplematters.in/blog/hr-technology/learning-trends-in-india-skilling-digital-learning-and-the-future-28784"
    }
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
    <section className="py-20 bg-white">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mx-6">Latest Insights</h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in technology, workforce development, and industry insights
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">Source: {post.source}</p>
                <p className="text-sm text-gray-500 mb-3">Author: {post.author}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                <motion.a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <motion.svg
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </motion.svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;