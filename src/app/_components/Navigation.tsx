"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="SFJ Business Solutions" 
              width={40} 
              height={40} 
              className="h-10 w-auto" 
            />
            <span className="ml-3 text-xl font-bold text-gray-900">
              SFJ Business Solutions
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="#about" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="#services" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              href="#clients" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Clients
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="#contact" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200"
              >
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;