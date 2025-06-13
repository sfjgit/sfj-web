/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Phone,
  Mail,
  FileAxis3D,
  Heart,
  Building,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const Footer = () => {
  const [selectedOffice, setSelectedOffice] = useState("india");
  const [isOfficeDropdownOpen, setIsOfficeDropdownOpen] = useState(false);

  // Navigation items from your array
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
          path: "/services/knowledge-as-service",
          label: "Knowledge as a Service",
          icon: BookOpen,
          description:
            "640+ specialized courses to boost your career and skills",
        },
        {
          path: "/services/talent-as-service",
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
      path: "/careers",
      label: "Careers",
      hasChildren: false,
    },
    {
      path: "/impact",
      label: "Impact",
      hasChildren: false,
    },
    {
      path: "/about",
      label: "About Us",
      hasChildren: false,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offices: any = {
    india: {
      flag: "🇮🇳",
      name: "India - Head Office",
      company: "SFJ Business Solutions Pvt. Ltd.",
      address: [
        "Uma Sree Dream World, Unit -2,",
        "B-Block, 4th Floor, Kudlu Gate,",
        "Hosur Main Road,",
        "Bangalore – 560068. Karnataka, INDIA",
      ],
      phone: "+91 80 4158333",
      email: "sales@sfjbs.com",
    },
    uae: {
      flag: "🇦🇪",
      name: "UAE Office",
      company: "SFJ Computers Consulting",
      address: [
        "214, Blue Tower, Sheikh Zayed Road,",
        "(Next To Crown Plaza Hotel)",
        "P.O. Box : 58575, Dubai, UAE",
      ],
      phone: "+971 43 425125",
      fax: "+971 43 425126",
    },
    singapore: {
      flag: "🇸🇬",
      name: "Singapore Office",
      company: "SFJ Business Solutions Pte. Ltd.",
      address: ["2 KALLANG AVENUE,", "#08-16, CT HUB,", "Singapore – 339 407"],
      phone: "+65 62935695",
      fax: "+65 62935657",
    },
    usa: {
      flag: "🇺🇸",
      name: "United States Office",
      company: "SFJ Business Solutions LLC",
      address: [
        "2055, limestone RD STE 200-C,",
        "Wilmington,",
        "DE 19808, USA",
      ],
    },
  };

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/sfjbsofficial",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 187 187">
          <rect width="187" height="187" fill="#3b5998" rx="18" ry="18" />
          <path
            fill="#fefefe"
            d="M131 79l0 -12c0,-6 4,-7 6,-7 3,0 18,0 18,0l0 -27 -24 0c-27,0 -33,20 -33,32l0 14 -15 0 0 19 0 12 16 0c0,35 0,77 0,77l30 0c0,0 0,-42 0,-77l23 0 1 -12 2 -19 -24 0z"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sfjbs_bangalore/",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 384 384">
          <rect width="384" height="384" fill="#E4405F" rx="67" ry="67" />
          <g fill="#fefefe">
            <path d="M192 96c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 158c-34 0-62-28-62-62s28-62 62-62 62 28 62 62-28 62-62 62z" />
            <circle cx="192" cy="192" r="40" />
            <circle cx="304" cy="112" r="18" />
            <path d="M256 64h-128c-35 0-64 29-64 64v128c0 35 29 64 64 64h128c35 0 64-29 64-64v-128c0-35-29-64-64-64zm32 192c0 18-14 32-32 32h-128c-18 0-32-14-32-32v-128c0-18 14-32 32-32h128c18 0 32 14 32 32v128z" />
          </g>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 201 201">
          <rect width="201" height="201" fill="#0072b1" rx="19" ry="19" />
          <polygon
            fill="#fefefe"
            points="39 102 39 162 68 162 68 97 68 80 39 80"
          />
          <path
            fill="#fefefe"
            d="M54 39c-8 0-15 7-15 15 0 7 7 14 15 14 7 0 14-7 14-14 0-8-7-15-14-15zM161 105c-2-15-9-25-30-25-12 0-20 5-24 11l0 0 0-11-23 0 0 16 0 66 24 0 0-41c0-10 2-21 15-21 13 0 14 13 14 22l0 40 25 0 0-45 0 0c0-4 0-8-1-12z"
          />
        </svg>
      ),
    },
    // {
    //   name: "YouTube",
    //   url: "https://www.youtube.com/channel/UC-Ol7VzrG_xsL6iyhhAIRzw",
    //   icon: (
    //     <svg className="w-6 h-6" viewBox="0 0 5067 5067">
    //       <rect width="5067" height="5067" fill="#c4302b" rx="489" ry="489" />
    //       <path
    //         fill="#fefefe"
    //         d="M3110 2497l-933 504 0 -776 0 -236 421 229 512 279zm1116 -684c0,0 -33,-248 -137,-357 -131,-144 -278,-145 -346,-153 -483,-36 -1208,-36 -1208,-36l-2 0c0,0 -725,0 -1209,36 -67,8 -214,9 -346,153 -103,109 -137,357 -137,357 0,0 -35,292 -35,583l0 36 0 238c0,291 35,583 35,583 0,0 34,248 137,357 132,144 304,139 381,154 277,28 1175,36 1175,36 0,0 726,-1 1209,-37 68,-9 215,-9 346,-153 104,-109 137,-357 137,-357 0,0 35,-292 35,-583l0 -223 0 -51c0,-291 -35,-583 -35,-583z"
    //       />
    //     </svg>
    //   ),
    // },
  ];

  // Google Reviews Component
  const GoogleReviews = () => {
    const rating = 3.8;

    return (
      <div className="max-w-md bg-transparent rounded-xl pt-0 mt-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <FcGoogle size={22} />
          <h2 className="text-sm text-white">Google Reviews</h2>
        </div>

        {/* Rating Overview */}
        <div className="flex items-center text-base font-medium text-white">
          <span className="ml-1">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1 pl-3">
            <FaStar className="text-yellow-400" size={18} />
            <FaStar className="text-yellow-400" size={18} />
            <FaStar className="text-yellow-400" size={18} />
            <FaRegStarHalfStroke className="text-yellow-400" size={18} />

            {/* <FaStar className="text-yellow-400" size={18} /> */}
          </div>
        </div>

        {/* Review Link */}
        <div className="mt-3">
          <a
            href={`https://g.page/r/CS0LPoJm0AKbEBM/review`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm"
          >
            Rate Us on Google
          </a>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Logo, Description & Google Reviews */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/app/SFJ.png"
                alt="SFJ Logo"
                className="w-16 h-16 object-cover"
                quality={100}
                width={64}
                height={64}
              />
              <div>
                <h3 className="text-xl font-bold">SFJ Business Solutions</h3>
                <p className="text-sm text-gray-400">Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering global talent for the AI-driven future through
              comprehensive workforce development and professional training
              solutions.
            </p>

            {/* Google Reviews Component */}
            <GoogleReviews />
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-4">
              {navigationItems
                .find((item) => item.path === "/services")
                ?.children?.map((service) => (
                  <li key={service.path}>
                    <Link
                      href={service.path}
                      className="text-gray-300 hover:text-white transition-colors text-sm block"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href="/impact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/life-at-sfjbs"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Life@SFJ
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Address */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>

            {/* SFJ Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-105 transition-transform"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Office Address Selector */}
            <h4 className="font-semibold text-sm mb-3">Office Locations</h4>
            <div className="relative mb-4">
              <button
                onClick={() => setIsOfficeDropdownOpen(!isOfficeDropdownOpen)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">
                    {offices[selectedOffice].flag}
                  </span>
                  <span className="text-xs">
                    {offices[selectedOffice].name}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isOfficeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOfficeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                  {Object.entries(offices).map(([key, office]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedOffice(key);
                        setIsOfficeDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-sm">
                        {
                          // @ts-ignore
                          office?.flag
                        }
                      </span>
                      <span className="text-xs">
                        {
                          // @ts-ignore
                          office.name
                        }
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Office Address - One/Two Line Format */}
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="space-y-1 text-xs text-gray-300">
                <p className="font-medium">{offices[selectedOffice].company}</p>
                <p>{offices[selectedOffice].address.join(" ")}</p>

                <div className="flex flex-col space-y-1 pt-2">
                  {offices[selectedOffice].phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
                      <p>{offices[selectedOffice].phone}</p>
                    </div>
                  )}

                  {offices[selectedOffice].email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3" />
                      <p>{offices[selectedOffice].email}</p>
                    </div>
                  )}

                  {offices[selectedOffice].fax && (
                    <div className="flex items-center space-x-2">
                      <FileAxis3D className="w-3 h-3" />
                      <p>Fax: {offices[selectedOffice].fax}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              SFJ Business Solutions Pvt Ltd | +91-9845348601 | sfjbs@sfjbs.com
            </p>
            <p className="text-sm text-gray-500">
              Copyright © 2011-2025. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
