"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

const PartnersSection = () => {
  const partnerLogos = [
    "/edu&car/micro.png",
    "/edu&car/AWS.png",
    "/edu&car/2.jpg",
    "/edu&car/6.png",
  ];

  // Duplicate logos to ensure smooth infinite loop even with few images
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="py-5 pt-10 bg-white">
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
            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mx-6">
              Certified Learning Partners
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={40}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={5000}
            loop={true}
            // loopedSlides={duplicatedLogos.length}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 40 },
              768: { slidesPerView: 4, spaceBetween: 50 },
              1024: { slidesPerView: 5, spaceBetween: 60 },
            }}
            className="h-36 partner-swiper"
          >
            {duplicatedLogos.map((logo, index) => (
              <SwiperSlide
                key={index}
                className="!flex !justify-center !items-center !h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Image
                    src={logo}
                    alt={`Partner ${(index % partnerLogos.length) + 1}`}
                    width={150}
                    height={80}
                    className="max-h-20 max-w-full w-auto h-auto object-contain  transition-all duration-300"
                    quality={100}
                    priority={index < 5}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
