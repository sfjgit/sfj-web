"use client";
import Link from "next/link";
import {
  Heart,
  Building,
  GraduationCap,
  BookOpen,
  Users,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke, FaX } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";

const Footer = () => {
  const [selectedOffice, setSelectedOffice] = useState("india");

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
  ];

  // Google Reviews Component
  const GoogleReviews = () => {
    const rating = 3.8;

    return (
      <div className="bg-transparent rounded-xl pt-0 mt-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <FcGoogle size={22} />
          <h2 className="text-sm font-medium text-white">Google Reviews</h2>
        </div>

        {/* Rating Overview */}
        <div className="flex items-center text-base font-medium text-white mb-3">
          <span className="mr-3">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" size={16} />
            <FaStar className="text-yellow-400" size={16} />
            <FaStar className="text-yellow-400" size={16} />
            <FaRegStarHalfStroke className="text-yellow-400" size={16} />
          </div>
        </div>

        {/* Review Link */}
        <div>
          <a
            href={`https://g.page/r/CS0LPoJm0AKbEBM/review`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            Rate Us on Google
          </a>
        </div>
      </div>
    );
  };

  // Office Address Component
  const OfficeAddress = () => {
    const currentOffice = offices[selectedOffice];

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-4">Our Offices</h3>

        {/* Office Selector Dropdown */}
        <select
          value={selectedOffice}
          onChange={(e) => setSelectedOffice(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.keys(offices).map((officeKey) => (
            <option key={officeKey} value={officeKey} className="bg-gray-800">
              {offices[officeKey].flag} {offices[officeKey].name}
            </option>
          ))}
        </select>

        {/* Selected Office Details */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{currentOffice.flag}</span>
            <h4 className="font-medium text-white text-sm">
              {currentOffice.name}
            </h4>
          </div>

          <p className="text-xs text-blue-400 font-medium">
            {currentOffice.company}
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-300 leading-relaxed">
                {currentOffice.address.map((line: string, index: number) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>

            {currentOffice.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-400" />
                <a
                  href={`tel:${currentOffice.phone}`}
                  className="text-xs text-gray-300 hover:text-white transition-colors"
                >
                  {currentOffice.phone}
                </a>
              </div>
            )}

            {currentOffice.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <a
                  href={`mailto:${currentOffice.email}`}
                  className="text-xs text-gray-300 hover:text-white transition-colors"
                >
                  {currentOffice.email}
                </a>
              </div>
            )}

            {currentOffice.fax && (
              <div className="flex items-center gap-2">
                <FaX className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-300">
                  {currentOffice.fax}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Logo, Description & Google Reviews */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
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

            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering global talent for the AI-driven future through
              comprehensive workforce development and professional training
              solutions.
            </p>

            <GoogleReviews />
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {navigationItems
                .find((item) => item.path === "/services")
                ?.children?.map((service) => (
                  <li key={service.path}>
                    <Link
                      href={service.path}
                      className="text-gray-300 hover:text-white transition-colors text-sm block leading-relaxed"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
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

          {/* Office Address & Social Media */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
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
            </div>

            <OfficeAddress />
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
