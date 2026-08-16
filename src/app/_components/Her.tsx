/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/navigation";
const AnimatedHeader = () => {
  const router = useRouter();

  const services = [
    {
      path: "/services/kaas",
      label: "Corporate Training",
      description: "640+ specialized courses to boost your career and skills",
    },
    {
      path: "/services/corporate-social-responsibility",
      label: "CSR Skilling Partner",
      description: "CSR initiatives focused on education and skill development",
    },
    {
      path: "/services/government-ssc-skilling",
      label: "Government-Led Skilling Missions",
      description:
        "KSDC, Naan Mudhalavan and other state skill development initiatives",
    },
    {
      path: "/services/institutional-skilling",
      label: "Institutional Training",
      description: "Training for engineering, MBA, and arts & science students",
    },
  ];

  return (
    <div className="relative w-full -mt-8 rounded-none overflow-hidden h-full pt-10">
      <div className="container mx-auto px-6 pt-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 h-full grid-rows-1">
          {/* Left Content */}
          <div className="space-y-4 h-full flex flex-col justify-center">
            {/* Header Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {/* Icon and client info commented out as in original */}
              </div>

              <div
                className="space-y-3"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
              >
                <h1 className="text-3xl lg:text-5xl text-white font-bold leading-tight">
                  Gen AI Upskilling
                  <br />
                  India for the AI Era
                </h1>

                <p className="text-sm lg:text-base text-white leading-relaxed max-w-md">
                  India&apos;s largest Gen AI upskilling partner – training
                  300,000+ professionals across enterprises, government
                  programs, and institutions to work with AI, not against it.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-white/10 p-3 rounded-none cursor-pointer hover:bg-white/20 border border-white/20"
                  onClick={() => router.push(service.path)}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {service.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  router.push("/contact");
                }}
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-sm"
              >
                Join Us
              </button>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/heros-bg.png"
              alt="Gen AI upskilling for India's workforce"
              className=" h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader;
