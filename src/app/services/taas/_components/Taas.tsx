/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function TaasScroller() {
  const taasCompanies = [
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

  const taasPath = "/app/b2b/Taas/";

  // Per-logo height tweaks: files with little internal padding otherwise render
  // visually larger than the rest at the shared max height.
  const logoScale: Record<string, string> = {
    "TCS_2.webp": "max-h-10",
    "SAMSUNG.webp": "max-h-12",
    "PwC.webp": "max-h-20",
  };

  // Very wide marks hit the box's width limit long before its height limit, so
  // they get a wider box to reach the same visual weight.
  const logoWidth: Record<string, string> = {
    "LTIMindtree.webp": "w-52",
    "NTT_DATA.webp": "w-48",
    "PwC.webp": "w-40",
    "sap.png": "w-32",
  };

  return (
    <div className="w-full">
      {/* Label pinned left with the logos scrolling in the remaining space —
          the same strip used on the home page and the KaaS page. Stacks the
          label above the marquee on phones. */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-2 sm:py-3">
        <h2 className="flex-shrink-0 text-base sm:text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
          Our Clients:
        </h2>

        {/* Edge fade so logos dissolve in and out rather than being cut off. */}
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
            {/* Two identical sets, travelling exactly -50%, so the loop point
                is invisible. */}
            {["a", "b"].map((half) =>
              taasCompanies.map((company, index) => (
                <div
                  key={`${half}-${index}`}
                  className={`flex-shrink-0 ${logoWidth[company] ?? "w-36"} h-20 sm:h-24 mx-6 sm:mx-12 flex items-center justify-center`}
                >
                  <img
                    src={`${taasPath}${company}`}
                    alt={half === "b" ? "" : `Client logo ${index + 1}`}
                    aria-hidden={half === "b"}
                    className={`${logoScale[company] ?? "max-h-20"} max-w-full object-contain`}
                    // Monochrome, tuned to #3a3a3b like the other logo strips.
                    style={{ filter: "grayscale(1) brightness(0.23)" }}
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
