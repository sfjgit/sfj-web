"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Phone, Mail, FileAxis3D } from "lucide-react";

const Footer = () => {
  const [selectedOffice, setSelectedOffice] = useState("india");
  const [isOfficeDropdownOpen, setIsOfficeDropdownOpen] = useState(false);

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
      url: "https://www.facebook.com/SFJBusinesssolution/",
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
      name: "Twitter",
      url: "https://twitter.com/sfjbusiness",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 384 384">
          <rect width="384" height="384" fill="#1DA1F2" rx="37" ry="37" />
          <path
            fill="#fefefe"
            d="M313 118c-9,4 -19,6 -29,8 11,-7 19,-16 22,-28 -9,6 -20,10 -31,12 -9,-9 -22,-15 -37,-15 -27,0 -49,22 -49,49 0,4 0,7 1,11 -41,-2 -78,-22 -102,-51 -5,7 -7,15 -7,24 0,17 9,32 22,41 -8,0 -16,-2 -23,-6 0,0 0,0 0,1 0,6 2,12 4,17 6,16 20,27 36,31 -4,1 -8,1 -13,1 -3,0 -6,0 -9,-1 6,20 25,34 46,34 -17,14 -38,21 -61,21 -5,0 -8,0 -12,0 22,14 48,22 76,22 78,0 125,-54 138,-110 2,-10 3,-20 3,-30 0,-2 0,-4 0,-6 10,-7 18,-15 25,-25z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/?originalSubdomain=in",
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
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UC-Ol7VzrG_xsL6iyhhAIRzw",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 5067 5067">
          <rect width="5067" height="5067" fill="#c4302b" rx="489" ry="489" />
          <path
            fill="#fefefe"
            d="M3110 2497l-933 504 0 -776 0 -236 421 229 512 279zm1116 -684c0,0 -33,-248 -137,-357 -131,-144 -278,-145 -346,-153 -483,-36 -1208,-36 -1208,-36l-2 0c0,0 -725,0 -1209,36 -67,8 -214,9 -346,153 -103,109 -137,357 -137,357 0,0 -35,292 -35,583l0 36 0 238c0,291 35,583 35,583 0,0 34,248 137,357 132,144 304,139 381,154 277,28 1175,36 1175,36 0,0 726,-1 1209,-37 68,-9 215,-9 346,-153 104,-109 137,-357 137,-357 0,0 35,-292 35,-583l0 -223 0 -51c0,-291 -35,-583 -35,-583z"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Company Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SFJ</span>
              </div>
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
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {/* <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li> */}
              <li>
                <Link
                  href="/services/knowledge-as-service"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Capabilities
                </Link>
              </li>
              {/* <li>
                <a
                  href="https://www.bskilling.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Education
                </a>
              </li> */}
              <li>
                <a
                  href="https://sfjbs.talentrecruit.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <Link
                  href="/life-at-sfjbs"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Life@SFJ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog/blogs"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Blogs
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
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Offices with Selector */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Global Offices</h3>

            {/* Office Selector */}
            <div className="relative mb-6">
              <button
                onClick={() => setIsOfficeDropdownOpen(!isOfficeDropdownOpen)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {offices[selectedOffice].flag}
                  </span>
                  <span className="text-sm">
                    {offices[selectedOffice].name}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
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
                      className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-lg">
                        {
                          // @ts-expect-error error
                          office?.flag
                        }
                      </span>
                      <span className="text-sm">
                        {
                          // @ts-expect-error error
                          office?.name
                        }
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Office Details */}
            <div className="bg-gray-800 rounded-lg p-2 w-[230px]">
              <h4 className="font-semibold text-sm mb-2">
                {offices[selectedOffice].company}
              </h4>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <div>
                    {offices[selectedOffice].address.map(
                      (line: string, index: number) => (
                        <p key={index}>{line}</p>
                      )
                    )}
                  </div>
                </div>

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

          {/* Social Media */}
          <div className="lg:col-span-1">
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

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3" />
                  <p>+91-9845348601</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3" />
                  <p>sfjbs@sfjbs.com</p>
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
