/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Settings,
  Building,
  GraduationCap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = usePathname();
  const router = useRouter();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Single navigation array with children and without children
  const navigationItems = [
    { path: "/", label: "Home", hasChildren: false },

    {
      path: "/services",
      label: "Services",
      hasChildren: true,
      children: [
        {
          path: "/services/corporate-social-responsibility",
          label: "CSR Skilling Partner",
          icon: Heart,
          description:
            "CSR initiatives focused on education and skill development",
        },
        {
          path: "/services/government-initiatives",
          label: "Government-Led Skilling Missions",
          icon: Building,
          description:
            "KSDC, Naan Mudhalavan and other state skill development initiatives",
        },
        {
          path: "/services/institutional-training",
          label: "Institutional Training (B2I)",
          icon: GraduationCap,
          description:
            "Training for engineering, MBA, and arts & science students",
        },

        {
          path: "/services/corporate-it-training-programs",
          label: "Corporate IT Training Programs",
          icon: BookOpen,
          description:
            "640+ specialized courses to boost your career and skills",
        },
        {
          path: "/services/it-staffing-company",
          label: "Talent as a Service",
          icon: Users,
          description:
            "15,000+ successful placements with top-tier IT professionals",
        },
      ],
    },
    {
      path: "/industries",
      label: "Industries",
      hasChildren: false,
    },
    {
      path: "/impact",
      label: "Impact",
      hasChildren: false,
    },
    { path: "/careers", label: "Careers", hasChildren: false },
    // { path: "/partners", label: "Partners", hasChildren: false },

    { path: "/about", label: "About Us", hasChildren: false },
  ];

  // Check if current path matches any service item
  const isActiveService =
    navigationItems
      .find((item) => item.path === "/services")
      ?.children?.some((child) => location === child.path) ||
    location === "/services";

  const isActiveItem = (item: any) => {
    if (item.hasChildren) {
      return (
        item.children?.some((child: any) => location === child.path) ||
        location === item.path
      );
    }
    return location === item.path;
  };
  console.log(location, "location");

  const isLocationBlack = () => {
    if (
      location === "/services/institutional-training" ||
      location === "/" ||
      location === "/services/government-initiatives" ||
      location === "/services/corporate-it-training-programs" ||
      location === "/life-at-sfjbs" ||
      location.split("/").includes("careers") ||
      location === "/contact"
    ) {
      return true;
    }
    return false;
  };

  return (
    <nav
      className={`fixed   top-0 w-full backdrop-blur-md border-gray-200/50 z-50 transition-all duration-300 ${
        isScrolled || isLocationBlack()
          ? "bg-white/95 border-b"
          : "bg-transparent "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}

          <Link
            href="/"
            className="flex flex-col items-center group transition-transform hover:scale-105"
          >
            <div className="relative">
              {isScrolled || isLocationBlack() ? (
                <Image
                  src="/app/sfjlogo.png"
                  alt="SFJ Logo"
                  className="w-16 h-16 object-cover"
                  quality={100}
                  width={64}
                  height={64}
                />
              ) : (
                <Image
                  src="/app/SFJ.png"
                  alt="SFJ Logo"
                  className="w-16 h-16 object-cover"
                  quality={100}
                  width={64}
                  height={64}
                />
              )}

              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* <p className="text-xs font-semibold text-gray-700 mt-1 group-hover:text-blue-600 transition-colors">
              Let&apos;s <span className="text-blue-600">Transform</span>
            </p> */}
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                {item.hasChildren ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 group ${
                          isActiveItem(item)
                            ? "text-blue-600 bg-blue-50 shadow-sm"
                            : isScrolled || isLocationBlack()
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-80 p-2 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-xl"
                    >
                      {item.children?.map((child) => (
                        <DropdownMenuItem
                          key={child.path}
                          asChild
                          className="p-0 hover:cursor-pointer"
                        >
                          <Link
                            href={child.path}
                            className="flex items-start p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                          >
                            {/* <div className="flex-shrink-0 mr-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                <child.icon className="w-5 h-5 text-white" />
                              </div>
                            </div> */}
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                                {child.label}
                              </div>
                              {/* <div className="text-xs text-gray-500 leading-relaxed">
                                {child.description}
                              </div> */}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                      isActiveItem(item)
                        ? "text-blue-600 bg-blue-50 shadow-sm"
                        : isScrolled || isLocationBlack()
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Contact Button */}
            <Button
              onClick={() => router.push("/contact")}
              className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  } ${
                    isScrolled || isLocationBlack()
                      ? "text-black"
                      : "text-white"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  } ${
                    isScrolled || isLocationBlack()
                      ? "text-black"
                      : "text-white"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md rounded-b-xl shadow-lg">
            {navigationItems.map((item) => (
              <div key={item.path}>
                {item.hasChildren ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 rounded-lg">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            location === child.path
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <child.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location === item.path
                        ? "text-blue-600 bg-blue-50 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Contact Button */}
            <div className="pt-2">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 rounded-lg shadow-md"
                onClick={() => {
                  router.push("/contact");
                  setIsMenuOpen(false);
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
