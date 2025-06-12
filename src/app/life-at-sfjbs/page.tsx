/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Coffee, Trophy, Camera, X } from "lucide-react";

export default function Life() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  // Images for header gallery (first 6)
  const headerImages = [
    { image: "/fac/f1.jpeg", text: "Team Celebrations" },
    { image: "/fac/f2.jpeg", text: "Office Culture" },
    { image: "/fac/f3.jpeg", text: "Team Building" },
    { image: "/fac/f4.jpeg", text: "Work Environment" },
    { image: "/fac/f5.jpeg", text: "Achievement Awards" },
    { image: "/fac/f6.jpeg", text: "Collaborative Spirit" },
  ];

  // Remaining images for main gallery
  const galleryImages = [
    { image: "/fac/f7.jpeg", text: "Innovation Hub", category: "workspace" },
    { image: "/fac/f8.jpeg", text: "Team Bonding", category: "culture" },
    {
      image: "/fac/f9.jpeg",
      text: "Success Stories",
      category: "celebrations",
    },
    {
      image: "/fac/f10.jpeg",
      text: "Creative Workspace",
      category: "workspace",
    },
    { image: "/fac/f11.jpeg", text: "Team Unity", category: "teamwork" },
    { image: "/fac/f12.jpeg", text: "Fun Activities", category: "culture" },
    {
      image: "/fac/f13.jpeg",
      text: "Recognition Events",
      category: "celebrations",
    },
    { image: "/fac/f14.jpeg", text: "Learning Together", category: "teamwork" },
    { image: "/fac/f15.jpeg", text: "Modern Office", category: "workspace" },
    { image: "/fac/f16.jpeg", text: "Team Spirit", category: "culture" },
  ];

  const categories = [
    { id: "all", label: "All Moments", icon: Camera },
    { id: "celebrations", label: "Celebrations", icon: Trophy },
    { id: "teamwork", label: "Teamwork", icon: Users },
    { id: "culture", label: "Culture", icon: Heart },
    { id: "workspace", label: "Workspace", icon: Coffee },
  ];

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((item) => item.category === filter);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <Head>
        <title>Life@SFJBS | Our Workplace Culture</title>
        <meta
          name="description"
          content="Discover the vibrant culture and passionate community at SFJBS."
        />
      </Head>

      {/* Header Section with Gallery */}
      <section className="bg-white pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Life@<span className="text-blue-600">SFJBS</span>
            </h1> */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Where celebrations are a way of life and our people are the
              foundation of our success
            </p>
          </motion.div>

          {/* Header Image Gallery */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headerImages.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3 w-full">
                    <p className="text-white text-sm font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Simple Philosophy Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" {...fadeInUp}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Philosophy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in building a stress-free, people-friendly workplace
              where work and fun are unified. Our skilled teams create an
              environment filled with camaraderie and success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More <span className="text-blue-600">Moments</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore more glimpses of our vibrant workplace culture
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            {...fadeInUp}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredImages.map((item, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <Image
                    src={item.image}
                    alt={item.text}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-medium text-sm">
                        {item.text}
                      </h3>
                      <span className="text-blue-200 text-xs capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={selectedImage.image}
                alt={selectedImage.text}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-white text-lg font-medium">
                {selectedImage.text}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Simple CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div className="max-w-2xl mx-auto" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Team
            </h2>
            <p className="text-blue-100 mb-6">
              Be part of a workplace where growth meets success and celebrations
              become a way of life.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Explore Careers
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
