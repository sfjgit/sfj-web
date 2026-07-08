/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import {
  FaGlobe,
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import PartnershipsCarousel from "./Hero";
import CourseCatalog from "./CourseCatalog";

const ties = [
  {
    id: 1,
    name: "Karnataka Skill Development Corporation",
    description:
      "In partnership with bSkilling, we drive impactful programs focused on innovation and skill development.",
    img: "/app/b2g/ksdc.png",
    details: {
      programs: [
        "Digital Skills Training",
        "Industry 4.0 Certification",
        "Entrepreneurship Development",
      ],
      participants: "15K+ Students",
      duration: "Ongoing Partnership",
      certification: "State Government Certified",
    },
  },
  {
    id: 2,
    name: "Naan Mudhalvan",
    description:
      "A transformative initiative aimed at empowering youth with industry-relevant skills, career guidance, and opportunities.",
    img: "/app/b2g/naan-logo.png",
    details: {
      programs: [
        "Career Guidance",
        "Skill Enhancement",
        "Leadership Development",
      ],
      participants: "25K+ Youth",
      duration: "2+ Years Partnership",
      certification: "Tamil Nadu Government Certified",
    },
  },
  {
    id: 3,
    name: "Future Skills",
    description:
      "A premier trade body driving innovation, policy advocacy, and skill development to foster India's digital transformation.",
    img: "/app/b2g/future-skills.png",
    details: {
      programs: ["AI/ML Training", "Cloud Computing", "Data Science Bootcamps"],
      participants: "30K+ Professionals",
      duration: "3+ Years Partnership",
      certification: "NASSCOM Certified",
    },
  },
  {
    id: 4,
    name: "NSDC",
    description:
      "The National Skill Development Corporation focuses on empowering India's workforce through skill development initiatives.",
    img: "/app/b2g/nsdc.png",
    details: {
      programs: [
        "National Skill Certification",
        "Industry Training",
        "Employment Generation",
      ],
      participants: "50K+ Workforce",
      duration: "5+ Years Partnership",
      certification: "National Government Certified",
    },
  },
];

const stats = [
  { id: 1, number: "5+", label: "Government Partners", icon: FaHandshake },
  { id: 2, number: "120K+", label: "Students Trained", icon: FaGraduationCap },
  { id: 3, number: "95%", label: "Placement Rate", icon: FaChartLine },
  { id: 4, number: "10+", label: "Training Programs", icon: FaCertificate },
];

export default function GovernmentTrainingRedesign() {
  const [activePartner, setActivePartner] = useState(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Hero Section - Redesigned */}
      <PartnershipsCarousel />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CourseCatalog />

      {/* Government Partnerships Section */}
      <section id="partnerships" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Trusted Government Affiliations
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Government <span className="text-blue-600">Partnerships</span>
            </h2>

            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>

            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Collaborate with prestigious government bodies to drive innovation
              and empower the workforce of tomorrow through cutting-edge
              training programs.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {ties.map((tie) => (
              <div
                key={tie.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                onMouseEnter={() =>
                  // @ts-ignore
                  setActivePartner(tie.id)
                }
                onMouseLeave={() => setActivePartner(null)}
              >
                {/* Partner Logo */}
                <div className="h-24 flex items-center justify-center mb-6 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={tie.img}
                    alt={tie.name}
                    className="max-h-16 object-contain"
                  />
                </div>

                {/* Partner Info */}
                <div className="space-y-4">
                  <div className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                    Government Partner
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tie.name}
                  </h3>

                  <p className="text-gray-600 leading-relaxed flex items-start gap-3">
                    <BsCircleFill className="text-blue-600 w-2 h-2 flex-shrink-0 mt-2" />
                    <span>{tie.description}</span>
                  </p>

                  {/* Expandable Details */}
                  {activePartner === tie.id && (
                    <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="text-blue-600 font-semibold mb-2">
                            Programs
                          </h4>
                          <ul className="text-gray-700 space-y-1">
                            {tie.details.programs.map((program, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                                {program}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-700 font-medium">
                              Participants:
                            </span>
                            <span className="text-gray-900 ml-2">
                              {tie.details.participants}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium">
                              Duration:
                            </span>
                            <span className="text-gray-900 ml-2">
                              {tie.details.duration}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium">
                              Certification:
                            </span>
                            <span className="text-blue-600 ml-2">
                              {tie.details.certification}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => scrollToSection("about")}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-4"
                  >
                    <span>Learn more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { icon: FaShieldAlt, text: "Government Certified Courses" },
              { icon: FaHandshake, text: "Official Partnerships" },
              { icon: FaCertificate, text: "Recognized Qualifications" },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm"
                >
                  <IconComponent className="text-blue-600 mr-3" />
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
