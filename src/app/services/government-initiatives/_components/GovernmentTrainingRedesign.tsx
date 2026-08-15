"use client";
import React from "react";
import {
  FaGlobe,
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import GovernmentHero from "./Hero";

export default function GovernmentTrainingRedesign() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Hero Section - Redesigned */}
      <GovernmentHero />

      {/* The static stats grid that used to render here (Government Partners,
          Students Trained, Placement Rate, Training Programs) duplicated the
          animated count-up version already built into GovernmentHero, so it
          was removed. */}

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
                <FaGraduationCap className="mr-2" />
                Training Excellence
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Our{" "}
                <span className="text-blue-600">Government Training</span>{" "}
                Program
              </h2>

              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="bg-blue-50 p-8 rounded-xl mb-12 border border-blue-100">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                We are committed to empowering individuals through a wide array
                of skill development initiatives in partnership with esteemed
                government bodies. Our Government Training Program serves as a
                cornerstone for fostering innovation, enhancing employability,
                and driving economic growth through AI-driven curriculum and
                cutting-edge technology training.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: FaGlobe,
                  title: "Nationwide Impact",
                  description:
                    "Our initiatives span across the country, reaching diverse communities and demographics with cutting-edge training programs.",
                },
                {
                  icon: FaHandshake,
                  title: "Industry Partnerships",
                  description:
                    "Collaborating with industry leaders to align training with market demands and emerging technology opportunities.",
                },
                {
                  icon: FaCertificate,
                  title: "Certified Curriculum",
                  description:
                    "Government-approved curriculum designed to meet national standards of excellence and industry requirements.",
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                      <IconComponent className="text-2xl text-blue-600" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FaShieldAlt,
                  title: "100% Certified",
                  subtitle: "Government recognized",
                },
                {
                  icon: FaUsers,
                  title: "Expert Faculty",
                  subtitle: "Industry professionals",
                },
                {
                  icon: FaGraduationCap,
                  title: "Quality Training",
                  subtitle: "Advanced learning materials",
                },
                {
                  icon: FaRocket,
                  title: "Job Placement",
                  subtitle: "Career support services",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;

                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-gray-200 flex items-center hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <IconComponent className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
