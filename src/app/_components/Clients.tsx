"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Building2, Globe } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ClientsSection = () => {
  const clientLogos = [
    {
      src: "/clients/dodsal.png",
      name: "Dodsal",
      industry: "Engineering",
      description: "Global engineering & construction",
    },
    {
      src: "/clients/Accenture.png",
      name: "Accenture",
      industry: "Consulting",
      description: "Leading technology consulting",
    },
    {
      src: "/clients/Capgemini.png",
      name: "Capgemini",
      industry: "Technology",
      description: "Digital transformation leader",
    },
    {
      src: "/clients/HCl.png",
      name: "HCL Technologies",
      industry: "IT Services",
      description: "Next-generation IT services",
    },
    {
      src: "/clients/wipro.png",
      name: "Wipro",
      industry: "Technology",
      description: "Global IT consulting services",
    },
    {
      src: "/clients/sap.png",
      name: "SAP",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/clients/Atos.png",
      name: "Atos",
      industry: "Digital Services",
      description: "Digital transformation partner",
    },
  ];

  const testimonials = [
    {
      quote:
        "SFJ's expertise in SAP implementation helped us streamline our operations across 15+ countries.",
      author: "CTO, Fortune 500 Manufacturing Company",
      rating: 5,
    },
    {
      quote:
        "Outstanding talent placement services. They understand our technical requirements perfectly.",
      author: "HR Director, Leading Technology Firm",
      rating: 5,
    },
    {
      quote:
        "Their training programs have upskilled over 300 of our professionals in cloud technologies.",
      author: "VP Engineering, Global Consulting Firm",
      rating: 5,
    },
  ];

  const stats = [
    {
      icon: <Building2 className="w-6 h-6" />,
      number: "500+",
      label: "Enterprise Clients",
    },
    {
      icon: <Star className="w-6 h-6" />,
      number: "98%",
      label: "Client Satisfaction",
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: "15+",
      label: "Years Partnership",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      number: "25+",
      label: "Countries Served",
    },
  ];

  // Duplicate client logos for seamless loop
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="clients"
      className="py-5 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden 2xl:-mt-5"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-30 translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30 -translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          {/* Top Badge Section */}
          {/* <div className="mb-8">
            <Badge
              variant="outline"
              className="text-indigo-700 border-indigo-300 bg-indigo-50 px-6 py-2 text-sm font-semibold rounded-full shadow-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Trusted Partnerships  
            </Badge>
          </div> */}

          {/* Main Heading */}
          <div className="mb-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900  tracking-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Clients
              </span>
            </h2>
            {/* <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-500 mx-auto rounded-full mb-8"></div> */}
            {/* <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Trusted by industry leaders worldwide to deliver exceptional
              results and drive digital transformation
            </p> */}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="-mt-4"
          >
            <div>
              <Swiper
                modules={[Autoplay]}
                slidesPerView={2}
                spaceBetween={30}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                  reverseDirection: false,
                }}
                speed={3000}
                loop={true}
                allowTouchMove={false}
                breakpoints={{
                  640: { slidesPerView: 3, spaceBetween: 40 },
                  768: { slidesPerView: 4, spaceBetween: 50 },
                  1024: { slidesPerView: 5, spaceBetween: 60 },
                  1280: { slidesPerView: 6, spaceBetween: 70 },
                }}
                className="client-flow-swiper"
              >
                {duplicatedLogos.map((client, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -8 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="group cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center p-6 group">
                        <div className="w-32 h-32 mb-4">
                          <Image
                            src={client.src}
                            alt={client.name}
                            width={128}
                            height={128}
                            className="object-contain transition-all duration-500 group-hover:scale-110 w-full h-full"
                            style={{
                              filter:
                                "contrast(1.2) saturate(1.3) brightness(1.2)",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* Stats Cards Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Client Logos Carousel - Enhanced with larger images and better colors */}

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className=""
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the leaders who trust us with their most critical
              business transformations
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active",
              bulletClass: "swiper-pagination-bullet",
            }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                      {testimonial.quote}
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Enhanced Custom Swiper Styles */}
      <style jsx global>{`
        .client-flow-swiper {
          overflow: visible !important;
        }

        .client-flow-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .client-flow-swiper .swiper-slide {
          transition: transform 0.3s ease !important;
        }

        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(59, 130, 246, 0.3);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          transform: scale(1.2);
        }

        /* Enhanced client logo hover effects */
        .client-flow-swiper .swiper-slide:hover {
          z-index: 10;
        }

        /* Continuous animation keyframes */
        @keyframes flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
