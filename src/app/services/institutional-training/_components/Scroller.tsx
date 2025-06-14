/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import {
  Settings,
  BookOpen,
  Briefcase,
  GraduationCap,
  School,
  Building,
} from "lucide-react";

const HorizontalScrollNavbar = () => {
  const [activeSection, setActiveSection] = useState("schools");

  const sections = [
    {
      id: "schools",
      label: "Schools",
      icon: <School className="h-5 w-5" />,
      href: "#schools",
    },
    {
      id: "polytechnic",
      label: "Polytechnic",
      icon: <Building className="h-5 w-5" />,
      href: "#polytechnic",
    },

    {
      id: "bcom",
      label: "B.Com",
      icon: <Briefcase className="h-5 w-5" />,
      href: "#bcom",
    },
    {
      id: "engineering",
      label: "Engineering",
      icon: <Settings className="h-5 w-5" />,
      href: "#engineering",
    },
    {
      id: "arts",
      label: "Arts",
      icon: <BookOpen className="h-5 w-5" />,
      href: "#arts",
    },
    {
      id: "mba",
      label: "MBA",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "#mba",
    },
    {
      id: "medical",
      label: "Medical",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "#medical",
    },
    {
      id: "paramedical",
      label: "Paramedical",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "#paramedical",
    },
    {
      id: "faculty",
      label: "Faculty on Demand",
      icon: <Briefcase className="h-5 w-5" />,
      href: "#faculty",
    },
  ];

  const handleSectionClick = (
    sectionId: React.SetStateAction<string>,
    href: string
  ) => {
    setActiveSection(sectionId);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Listen for scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.querySelector(section.href);
        if (element) {
          // @ts-expect-error error
          const offsetTop = element.offsetTop;
          // @ts-expect-error error

          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto  pl-8 py-3">
        {/* Horizontal Scroll Container */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id, section.href)}
              className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[100px] h-16 px-3 py-2 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              <div className="mb-1">{section.icon}</div>
              <span className="text-xs font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export default HorizontalScrollNavbar;
