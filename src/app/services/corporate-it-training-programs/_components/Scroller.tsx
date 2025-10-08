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

  return (
    <div className="w-full py-8">
      <h1 className="hidden">
        Corporate IT Training Programs for Employees | Boost Your Team's Skills
      </h1>
      <h2 className="text-center py-5 pb-8">
        <span className="font-bold text-4xl">Our Clients</span>
      </h2>
      <div className="overflow-hidden">
        <div className="flex animate-scroll">
          {/* First set */}
          {companyLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 mx-12 flex items-center justify-center"
            >
              <img
                src={`${logoPath}${logo}`}
                alt={`Company logo ${index + 1}`}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {companyLogos.map((logo, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex-shrink-0 w-32 h-20 mx-12 flex items-center justify-center"
            >
              <img
                src={`${logoPath}${logo}`}
                alt={`Company logo ${index + 1}`}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
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
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
