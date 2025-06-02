"use client";
import React, { useState, useEffect, useRef } from "react";

const About = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  // @ts-expect-error `entry.target` is of type `Element`
  const observerRef = useRef();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setVideoLoaded] = React.useState(false);

  const milestones = [
    {
      year: "2011",
      title: "Foundation Year",
      description:
        "Established with a strong focus on IT training excellence and industry-relevant curriculum development.",
      icon: "🏁",
      color: "from-blue-500 to-purple-600",
    },
    {
      year: "2015-2018",
      title: "Training Scale Achievement",
      description:
        "Reached the significant milestone of training 300,000+ IT professionals across diverse technology domains.",
      icon: "📊",
      color: "from-green-500 to-teal-600",
    },
    {
      year: "2019-2021",
      title: "Curriculum Expansion",
      description:
        "Developed and launched 640+ specialized courses covering emerging technologies and industry best practices.",
      icon: "📚",
      color: "from-orange-500 to-red-600",
    },
    {
      year: "2022",
      title: "Strategic Partnerships",
      description:
        "Formed alliances with universities, skill development missions, NSDC, and NASSCOM, training 50,000+ professionals.",
      icon: "🤝",
      color: "from-purple-500 to-pink-600",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description:
        "Established international presence with offices in Singapore, UAE, and the United States.",
      icon: "🌍",
      color: "from-cyan-500 to-blue-600",
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description:
        "Launched comprehensive digital literacy programs and CSR initiatives, training 35,000 professionals.",
      icon: "💻",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const stakeholders = [
    {
      title: "Aspirational Learners",
      description:
        "Students and job-seekers gaining future-ready skills through our comprehensive programs.",
      icon: "🎓",
    },
    {
      title: "Academic Institutions",
      description:
        "Educational partners providing micro-credentials and infrastructure support for enhanced learning outcomes.",
      icon: "🏫",
    },
    {
      title: "IT Organizations",
      description:
        "Technology companies offering infrastructure, mentoring, and real-world project opportunities.",
      icon: "💼",
    },
    {
      title: "Industry Partners",
      description:
        "Businesses sharing knowledge and providing career opportunities for our program graduates.",
      icon: "🏭",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(
              // @ts-expect-error `entry.target` is of type `Element`
              (prev) => new Set([...prev, entry.target.dataset.index])
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    // @ts-expect-error `entry.target` is of type `Element`
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      // @ts-expect-error `entry.target` is of type `Element`
      observerRef.current?.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        // @ts-expect-error `entry.target` is of type `Element`
        observerRef.current?.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] pt-16 sm:pt-24 pb-8 sm:pb-16 text-white overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          onError={(e) => console.log("Video error:", e)}
        >
          <source src="/app/home/hero-section.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80 z-10"></div> */}

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-left animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Journey
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mb-4 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed">
              From Vision to Global Impact – Founded in 2011, SFJ Business
              Solutions began with a simple yet powerful vision: to bridge the
              global skills gap through innovative technology training.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Milestones That Define Our Growth
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Over more than a decade, we have evolved from a focused IT
              training provider to a comprehensive workforce development
              partner.
            </p>
          </div>

          {/* Timeline Container - Mobile First Design */}
          <div className="relative">
            {/* Mobile Timeline Line (Left side) */}
            <div className="absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-0.5 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 rounded-full"></div>

            {milestones.map((milestone, index) => {
              const isVisible = visibleItems.has(index.toString());
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`timeline-item relative mb-8 sm:mb-16 ${
                    // Mobile: all cards on right side, Desktop: alternating
                    "sm:flex sm:items-center " +
                    (isLeft ? "sm:flex-row-reverse" : "sm:flex-row")
                  }`}
                  data-index={index}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`
                      w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${
                        milestone.color
                      } 
                      flex items-center justify-center text-xl sm:text-2xl shadow-lg
                      transition-all duration-700 ease-out
                      ${isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"}
                    `}
                    >
                      <span className="filter drop-shadow-sm">
                        {milestone.icon}
                      </span>
                    </div>

                    {/* Pulse Animation */}
                    <div
                      className={`
                      absolute inset-0 rounded-full bg-gradient-to-br ${
                        milestone.color
                      } 
                      animate-ping opacity-20 transition-opacity duration-700
                      ${isVisible ? "opacity-20" : "opacity-0"}
                    `}
                    ></div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`
                    ml-20 sm:ml-0 sm:w-5/12 transition-all duration-700 ease-out delay-200
                    ${
                      isVisible
                        ? "opacity-100 translate-x-0 translate-y-0"
                        : `opacity-0 translate-x-4 sm:${
                            isLeft ? "translate-x-8" : "-translate-x-8"
                          } translate-y-4`
                    }
                  `}
                  >
                    <div
                      className={`
                      bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative
                      hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                      border border-gray-100
                    `}
                    >
                      {/* Arrow pointing to timeline - Hidden on mobile */}
                      <div
                        className={`
                        hidden sm:block absolute top-8 w-0 h-0 
                        ${
                          isLeft
                            ? "right-0 translate-x-full border-l-[20px] border-l-white border-y-[15px] border-y-transparent"
                            : "left-0 -translate-x-full border-r-[20px] border-r-white border-y-[15px] border-y-transparent"
                        }
                      `}
                      ></div>

                      {/* Mobile Arrow (pointing left to timeline) */}
                      <div className="sm:hidden absolute left-0 top-6 -translate-x-full w-0 h-0 border-r-[15px] border-r-white border-y-[12px] border-y-transparent"></div>

                      <div className="flex items-start space-x-4">
                        <div
                          className={`
                          text-2xl sm:text-3xl font-bold bg-gradient-to-br ${milestone.color} 
                          bg-clip-text text-transparent
                        `}
                        >
                          {milestone.year}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {milestone.description}
                      </p>

                      {/* Decorative gradient line */}
                      <div
                        className={`w-12 h-1 bg-gradient-to-r ${milestone.color} rounded-full mt-4`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Collaborative Ecosystem
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Success in workforce development requires a collaborative
              ecosystem of learners, institutions, technology partners, and
              industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stakeholders.map((stakeholder, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stakeholder.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {stakeholder.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {stakeholder.description}
                </p>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4 group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Global Presence, Local Impact
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              With offices strategically located across Singapore, UAE, and the
              United States, SFJ delivers consistent, high-quality training
              experiences while adapting to local market needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                flag: "🇮🇳",
                country: "India",
                role: "Global Headquarters",
                desc: "Primary delivery center",
                color: "from-orange-400 to-green-500",
              },
              {
                flag: "🇸🇬",
                country: "Singapore",
                role: "Asia-Pacific Hub",
                desc: "Regional training center",
                color: "from-red-400 to-red-600",
              },
              {
                flag: "🇦🇪",
                country: "UAE",
                role: "Middle East Operations",
                desc: "MENA market focus",
                color: "from-green-400 to-red-500",
              },
              {
                flag: "🇺🇸",
                country: "USA",
                role: "North America",
                desc: "Market development",
                color: "from-blue-400 to-red-500",
              },
            ].map((office, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100"
              >
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {office.flag}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {office.country}
                </h3>
                <p
                  className={`font-semibold text-sm mb-3 bg-gradient-to-r ${office.color} bg-clip-text text-transparent`}
                >
                  {office.role}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  {office.desc}
                </p>
                <div
                  className={`w-8 h-1 bg-gradient-to-r ${office.color} rounded-full mx-auto mt-4 group-hover:w-12 transition-all duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm sm:text-base">
            © 2024 SFJ Business Solutions. Bridging the global skills gap
            through innovative technology training.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .group:hover .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
