/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import "swiper/css";

export default function Scroller() {
  // Same certification-partner logos as the "Certified Learning Partners"
  // strip on the home page (PartnersSection.tsx).
  const companyLogos = [
    "micro.png",
    "AWS.png",
    "6.png",
    "Comptia.png",
    "Peoplecert DevOps.png",
    "Prince2.png",
    "Peoplecert-Scrum.png",
  ];

  const logoPath = "/certifications/";

  return (
    <div className="w-full">
      <h1 className="hidden">
        Corporate IT Training Programs for Employees | Boost Your Team's Skills
      </h1>
      {/* Label pinned left, logos scrolling in the remaining space — same
          layout as the "Trusted by Our Global Partners" strip on the home page. */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-3 sm:py-4 lg:py-5">
        <h2 className="flex-shrink-0 text-base sm:text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
          Certified Learning Partners
        </h2>

        {/* Same edge fade as the home page strip — logos dissolve in on the
            right and out on the left instead of being cut off hard. */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex animate-scroll w-max">
            {/* First set */}
            {companyLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-24 h-10 sm:h-11 lg:h-12 mx-6 sm:mx-12 flex items-center justify-center"
              >
                <img
                  src={`${logoPath}${logo}`}
                  alt={`Certified Learning Partner ${index + 1}`}
                  className="h-full max-w-full object-contain"
                  // Monochrome, tuned to #3a3a3b like the partner logos.
                  style={{ filter: "grayscale(1) brightness(0.23)" }}
                />
              </div>
            ))}
            {/* Second set for seamless loop */}
            {companyLogos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-24 h-10 sm:h-11 lg:h-12 mx-6 sm:mx-12 flex items-center justify-center"
              >
                <img
                  src={`${logoPath}${logo}`}
                  alt={`Certified Learning Partner ${index + 1}`}
                  className="h-full max-w-full object-contain"
                  // Monochrome, tuned to #3a3a3b like the partner logos.
                  style={{ filter: "grayscale(1) brightness(0.23)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
