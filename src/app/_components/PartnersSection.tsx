"use client";
import React from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
// import "swiper/css";

const PartnersSection = () => {
  // const partnerLogos = [
  //   "/certifications/micro.png",
  //   "/certifications/AWS.png",
  //   "/certifications/6.png",
  //   "/certifications/Comptia.png",
  //   "/certifications/Peoplecert DevOps.png",
  //   "/certifications/Prince2.png",
  //   "/certifications/Peoplecert-Scrum.png",
  // ];

  // With only four logos the row would be narrower than the viewport, leaving
  // a visible gap on each pass. Repeating the set fills the strip; the track
  // then renders this sequence twice so the -50% loop stays seamless.
  // const sequence = Array.from({ length: 4 }, () => partnerLogos).flat();

  return (
    <section className="py-5 pt-10 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label sits beside the marquee instead of centered above it —
            same row layout as "Trusted by Our Global Partners" (Clients.tsx). */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-3 sm:py-4 lg:py-5 border-b border-gray-200 mb-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
        >
          {/* <div className="flex-shrink-0">
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
              Certified Learning Partners
            </h2>
          </div> */}

          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            {/* <div className="partner-marquee flex items-center w-max">
              {["a", "b"].map((half) => (
                <div
                  key={half}
                  className="flex items-center"
                  aria-hidden={half === "b"}
                >
                  {sequence.map((logo, index) => (
                    <div
                      key={`${half}-${index}`}
                      className="flex items-center justify-center h-10 sm:h-11 lg:h-12 w-24 mx-6 flex-shrink-0"
                    >
                      <Image
                        src={logo}
                        alt={half === "b" ? "" : `Partner ${index + 1}`}
                        width={96}
                        height={36}
                        className="h-full w-auto max-w-full object-contain"
                        // Monochrome, tuned to #3a3a3b (58/255 ≈ 0.23 luminance).
                        style={{ filter: "grayscale(1) brightness(0.23)" }}
                        quality={100}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        .partner-marquee {
          /* Constant-speed, never-pausing scroll. translate3d keeps the row on
             its own compositor layer so every frame is a GPU transform — no
             layout, no repaint, steady 60fps. Travelling exactly -50% lands
             the second half where the first began, so the loop is invisible. */
          animation: partnerScroll 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        @keyframes partnerScroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
