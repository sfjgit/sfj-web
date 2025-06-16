/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function TaasScroller() {
  const taasCompanies = [
    "Ey.png",
    "Hexaware.png",
    "ITC-infotech.png",
    "KPMG.png",
    "LTIMindtree.png",
    "Tech-Mahindra.png",
    "Wipro.png",
    "WNS.png",
  ];

  const taasPath = "/app/b2b/Taas/";

  return (
    <div className="w-full py-8">
      <h1 className="text-center py-5 pb-8">
        <span className="font-bold text-4xl">Our Clients</span>
      </h1>
      <div className="overflow-hidden">
        <div className="flex animate-scroll">
          {/* First set */}
          {taasCompanies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 mx-12 flex items-center justify-center"
            >
              <img
                src={`${taasPath}${company}`}
                alt={`TaaS company logo ${index + 1}`}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {taasCompanies.map((company, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex-shrink-0 w-32 h-20 mx-12 flex items-center justify-center"
            >
              <img
                src={`${taasPath}${company}`}
                alt={`TaaS company logo ${index + 1}`}
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
