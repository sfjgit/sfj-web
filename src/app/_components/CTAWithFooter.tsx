"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import { FaX } from "react-icons/fa6";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/sfjbs_bangalore/",
    icon: <FaInstagram className="w-6 h-6" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
    icon: <FaLinkedin className="w-6 h-6" />,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/channel/UC-Ol7VzrG_xsL6iyhhAIRzw",
    icon: <FaYoutube className="w-6 h-6" />,
  },
];

const products = [
  {
    name: "CASPA",
    desc: "AI Sales & Outreach Platform",
    path: "/products/caspa",
  },
  { name: "LMS", desc: "Learning Management System", path: "/products/lms" },
  {
    name: "Talent OS",
    desc: "Talent Acquisition Platform",
    path: "/products/talent-os",
  },
];

const solutions = [
  {
    name: "Corporate IT Training (KaaS)",
    desc: "Upskilling, Reskilling & Certification",
    path: "/services/corporate-it-training-programs",
  },
  {
    name: "CSR Skilling Partner",
    desc: "High-Impact Employability Programs",
    path: "/services/corporate-social-responsibility",
  },
  {
    name: "Talent as a Service (TaaS)",
    desc: "Hire | Deploy | Managed Talent",
    path: "/services/it-staffing-company",
  },
  {
    name: "Government-Led Skilling Missions",
    desc: "Central & State Skill Programs",
    path: "/services/government-initiatives",
  },
  {
    name: "Institutional Training (B2I)",
    desc: "Universities, Colleges & ITIs",
    path: "/services/institutional-training",
  },
  {
    name: "Internship Programs",
    desc: "Industry-Integrated Learning",
    path: "/internships",
  },
];

const initiatives = [
  {
    name: "Faculty Development",
    desc: "Train-the-Trainer & FDP",
    path: "/initiatives/faculty-development",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const offices: any = {
  india: {
    flag: "IN",
    name: "India - Head Office",
    company: "SFJ Business Solutions Pvt. Ltd.",
    address: [
      "Uma Sree Dream World, Unit -2,",
      "B-Block, 4th Floor, Kudlu Gate,",
      "Hosur Main Road,",
      "Bangalore – 560068. Karnataka, INDIA",
    ],
    phone: "+91 9845348601 ",
    email: "growth@sfjbs.com",
  },
  uae: {
    flag: "AE",
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
    flag: "SG",
    name: "Singapore Office",
    company: "SFJ Business Solutions Pte. Ltd.",
    address: ["2 KALLANG AVENUE,", "#08-16, CT HUB,", "Singapore – 339 407"],
    phone: "+65 62935695",
    fax: "+65 62935657",
  },
  usa: {
    flag: "US",
    name: "United States Office",
    company: "SFJ Business Solutions LLC",
    address: ["2055, limestone RD STE 200-C,", "Wilmington,", "DE 19808, USA"],
  },
};

const CTAWithFooter = () => {
  const [selectedOffice, setSelectedOffice] = useState("india");
  const [officeMenuOpen, setOfficeMenuOpen] = useState(false);
  const currentOffice = offices[selectedOffice];

  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      {/* CTA content */}
      <section className="relative py-14">
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden mb-6">
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-gray-900"
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Ready to Transform Your Workforce?
              </motion.h2>
            </div>

            <div className="overflow-hidden mb-8 max-w-2xl mx-auto">
              <motion.p
                className="text-base text-gray-600"
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Join 300,000+ professionals who have advanced their careers with
                SFJ Business Solutions
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Link href={"/contact"}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    Contact Our Team
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer content, full-width flat */}
      <footer className="relative text-gray-900 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              {/* Company Logo, Description & Google Reviews */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo/SFJ (9).png"
                    alt="SFJ Logo"
                    className="w-12 h-12 object-cover"
                    quality={100}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-sm font-bold leading-tight">
                      SFJ Business Solutions
                    </h3>
                    <p className="text-[10px] text-gray-600">Pvt. Ltd.</p>
                  </div>
                </div>

                <p className="text-gray-700 text-[10px] leading-relaxed">
                  Empowering global talent for the AI-driven future through
                  comprehensive workforce development and professional training
                  solutions.
                </p>

                <div>
                  <h3 className="font-semibold text-xs mb-3">Follow Us</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:scale-105 transition-transform text-gray-900 [&>svg]:w-4 [&>svg]:h-4"
                        title={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-xs mb-3 text-black-700 uppercase tracking-wide">
                  Products
                </h3>
                <div className="border-b border-gray-300 mb-4" />
                <ul className="space-y-3">
                  {products.map((product) => (
                    <li key={product.path}>
                      <Link
                        href={product.path}
                        className="block text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <div className="text-xs font-semibold">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {product.desc}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-xs mb-3 text-black-700 uppercase tracking-wide">
                  Services
                </h3>
                <div className="border-b border-gray-300 mb-4" />
                <ul className="space-y-2.5">
                  {solutions.map((solution) => (
                    <li key={solution.path}>
                      <Link
                        href={solution.path}
                        className="block text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <div className="text-xs font-semibold leading-tight">
                          {solution.name}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {solution.desc}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Initiatives */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-xs mb-3 text-black-700 uppercase tracking-wide">
                  Initiatives
                </h3>
                <div className="border-b border-gray-300 mb-4" />
                <ul className="space-y-3">
                  {initiatives.map((initiative) => (
                    <li key={initiative.path}>
                      <Link
                        href={initiative.path}
                        className="block text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <div className="text-xs font-semibold">
                          {initiative.name}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {initiative.desc}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links — regrouped into Company / Resources / Legal */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-xs mb-3 text-gray-900">
                  Company
                </h3>
                <div className="border-b border-gray-300 mb-4" />
                <div className="mb-5">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/life-at-sfjbs"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                      >
                        Life@SFJ
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h3 className="font-semibold text-xs mb-3 text-gray-900">
                    Resources
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/blog"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                      >
                        Industries
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Office Address */}
              <div className="lg:col-span-1 space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-xs mb-3 text-gray-900">
                    Our Offices
                  </h3>
                  <div className="border-b border-gray-300 mb-4" />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOfficeMenuOpen((v) => !v)}
                      className="w-full flex items-center justify-between gap-2 bg-white text-gray-900 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <span className="flex items-center gap-2">
                        {(() => {
                          const FlagIcon =
                            Flags[currentOffice.flag as keyof typeof Flags];
                          return FlagIcon ? (
                            <FlagIcon className="w-4 h-3 flex-shrink-0 rounded-[2px]" />
                          ) : null;
                        })()}
                        {currentOffice.name}
                      </span>
                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                    </button>

                    {officeMenuOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        {Object.keys(offices).map((officeKey) => {
                          const FlagIcon =
                            Flags[
                              offices[officeKey].flag as keyof typeof Flags
                            ];
                          return (
                            <button
                              key={officeKey}
                              type="button"
                              onClick={() => {
                                setSelectedOffice(officeKey);
                                setOfficeMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-left hover:bg-gray-100 transition-colors"
                            >
                              {FlagIcon ? (
                                <FlagIcon className="w-4 h-3 flex-shrink-0 rounded-[2px]" />
                              ) : null}
                              {offices[officeKey].name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      {(() => {
                        const FlagIcon =
                          Flags[currentOffice.flag as keyof typeof Flags];
                        return FlagIcon ? (
                          <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
                        ) : null;
                      })()}
                      <h4 className="font-medium text-gray-900 text-xs">
                        {currentOffice.name}
                      </h4>
                    </div>

                    <p className="text-[10px] text-blue-700 font-medium">
                      {currentOffice.company}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="text-[10px] text-gray-700 leading-relaxed">
                          {currentOffice.address.join(" ")}
                        </div>
                      </div>

                      {currentOffice.phone && (
                        <div className="flex items-start gap-1.5">
                          <Phone className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <a
                            href={`tel:${currentOffice.phone}`}
                            className="text-[10px] text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            {currentOffice.phone}
                          </a>
                        </div>
                      )}

                      {currentOffice.email && (
                        <div className="flex items-start gap-1.5">
                          <Mail className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <a
                            href={`mailto:${currentOffice.email}`}
                            className="text-[10px] text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            {currentOffice.email}
                          </a>
                        </div>
                      )}

                      {currentOffice.fax && (
                        <div className="flex items-start gap-1.5">
                          <FaX className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-[10px] text-gray-700">
                            {currentOffice.fax}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-10 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Link
                    href="/privacy-policy"
                    className="text-xs text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/refund-policy"
                    className="text-xs text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Refund Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="text-xs text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/extension-privacy-policy"
                    className="text-xs text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Extension Privacy Policy
                  </Link>
                </div>
                <p className="text-xs text-gray-500 text-center sm:text-right">
                  © 2026 SFJ Business Solutions Pvt. Ltd. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CTAWithFooter;
