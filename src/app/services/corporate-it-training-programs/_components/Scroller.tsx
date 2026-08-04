/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import "swiper/css";

export default function Scroller() {
  const companyLogos = [
    "Accenture.png",
    "Capgemini.png",
    "HCl.png",
    "sap.png",
    "Cognizant.webp",
    "Wipro.png",
    "Mphasis.webp",
    "LTIMindtree.webp",
    "NTT_DATA.webp",
    "PwC.webp",
    "SAMSUNG.webp",
    "Siemens.webp",
    "TCS_2.webp",
  ];

  const logoPath = "/app/b2b/logos/";

  // Per-logo height tweaks: files with little internal padding render larger
  // than the rest at the shared max height, so they get trimmed back.
  const logoScale: Record<string, string> = {
    "TCS_2.webp": "max-h-10",
    "SAMSUNG.webp": "max-h-12",
    "PwC.webp": "max-h-20",
  };

  // Very wide logos hit the box's width limit long before its height limit,
  // which is why they looked small next to the squarer marks. A wider box lets
  // them grow to the same visual weight.
  const logoWidth: Record<string, string> = {
    "LTIMindtree.webp": "w-52",
    "NTT_DATA.webp": "w-48",
    "PwC.webp": "w-40",
    "sap.png": "w-32",
  };

  return (
    <div className="w-full">
      <h1 className="hidden">
        Corporate IT Training Programs for Employees | Boost Your Team's Skills
      </h1>
      {/* Label pinned left, logos scrolling in the remaining space — same
          layout as the "Trusted by Our Global Partners" strip on the home page. */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-3 sm:py-4 lg:py-5">
        <h2 className="flex-shrink-0 text-base sm:text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
          Our Clients:
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
              className={`flex-shrink-0 ${logoWidth[logo] ?? "w-32"} h-16 sm:h-20 mx-6 sm:mx-12 flex items-center justify-center`}
            >
              <img
                src={`${logoPath}${logo}`}
                alt={`Company logo ${index + 1}`}
                className={`${logoScale[logo] ?? "max-h-16"} max-w-full object-contain`}
                // Monochrome, tuned to #3a3a3b like the partner logos.
                style={{ filter: "grayscale(1) brightness(0.23)" }}
              />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {companyLogos.map((logo, index) => (
            <div
              key={`duplicate-${index}`}
              className={`flex-shrink-0 ${logoWidth[logo] ?? "w-32"} h-16 sm:h-20 mx-6 sm:mx-12 flex items-center justify-center`}
            >
              <img
                src={`${logoPath}${logo}`}
                alt={`Company logo ${index + 1}`}
                className={`${logoScale[logo] ?? "max-h-16"} max-w-full object-contain`}
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
