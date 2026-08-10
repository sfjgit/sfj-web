/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import {
  Settings,
  BookOpen,
  Briefcase,
  GraduationCap,
  Building,
  Stethoscope,
  Syringe,
} from "lucide-react";

const HorizontalScrollNavbar = () => {
  // "schools" was the default active tab; removed below, so the default
  // moves to the new first tab instead of pointing at a section that's no
  // longer in the list.
  const [activeSection, setActiveSection] = useState("polytechnic");

  const sections = [
    {
      id: "polytechnic",
      label: "Polytechnic",
      icon: <Building className="h-5 w-5" />,
      href: "#polytechnic",
    },

    // {
    //   id: "bcom",
    //   label: "B.Com",
    //   icon: <Briefcase className="h-5 w-5" />,
    //   href: "#bcom",
    // },
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
      icon: <Stethoscope className="h-5 w-5" />,
      href: "#medical",
    },
    {
      id: "paramedical",
      label: "Paramedical",
      icon: <Syringe className="h-5 w-5" />,
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

  // Split into two clusters pinned to opposite edges with the gap between
  // them, rather than one packed, scrollable row. Grouped by id rather than
  // sections.slice(0, 4) — a positional slice would have silently reshuffled
  // which tabs land in which cluster the next time an item is added or
  // removed from `sections`.
  const leftIds = new Set(["polytechnic", "engineering", "arts"]);
  const leftSections = sections.filter((s) => leftIds.has(s.id));
  const rightSections = sections.filter((s) => !leftIds.has(s.id));

  const renderTab = (section: (typeof sections)[number]) => (
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
  );

  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Full width, not max-w-7xl: that cap was leaving a large dead strip
          between the right cluster and the true edge of the screen on wide
          viewports, since justify-between only pushes clusters to the edges
          of whatever container they're given. Small edge padding instead of
          a width cap — the middle gap should come from justify-between, not
          from unused space stranded past the right cluster. */}
      <div className="w-full px-4 sm:px-6 py-3">
        {/* justify-between pushes the two clusters to the row's opposite
            edges, leaving the gap in the middle rather than packing every
            tab into one scrollable strip. Each cluster still scrolls on its
            own if it ever runs out of room on a narrow screen. */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {leftSections.map(renderTab)}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {rightSections.map(renderTab)}
          </div>
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
