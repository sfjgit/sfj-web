"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  website: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Oracle",
    logo: "/logo/Oracle.png",
    description:
      "Global technology leader in database software, cloud computing, and enterprise solutions",
    industry: "Technology",
    website: "https://www.oracle.com/careers/students-grads/internships/",
  },
  {
    id: 2,
    name: "Qualcomm",
    logo: "/logo/Qualcomm.png",
    description:
      "Leading semiconductor and telecommunications equipment company driving 5G innovation",
    industry: "Semiconductor",
    website:
      "https://www.qualcomm.com/company/careers/internships-and-early-in-career-opportunities/india",
  },
  {
    id: 3,
    name: "Tata Consultancy Services",
    logo: "/logo/TCS.webp",
    description:
      "India's largest IT services company with global presence in consulting and digital transformation",
    industry: "IT Services",
    website: "https://www.tcs.com/careers/india/internship",
  },
  {
    id: 4,
    name: "Infosys",
    logo: "/logo/Infosys.png",
    description:
      "Global leader in next-generation digital services and consulting solutions",
    industry: "IT Consulting",
    website: "https://www.infosys.com/careers/internships.html",
  },
  {
    id: 5,
    name: "Bosch",
    logo: "/logo/Bosch.png",
    description:
      "German multinational engineering and technology company with automotive and industrial solutions",
    industry: "Automotive & Industrial",
    website: "https://www.bosch.in/careers/students-and-graduates/internships/",
  },
  {
    id: 6,
    name: "Wipro",
    logo: "/logo/Wipro.png",
    description:
      "Leading global information technology, consulting and business process services company",
    industry: "IT Services",
    website: "https://careers.wipro.com/content/Early-Careers/?locale=en_US",
  },
  {
    id: 7,
    name: "IBM",
    logo: "/logo/IBM.png",
    description:
      "Global technology and innovation company focusing on hybrid cloud, AI, and consulting services",
    industry: "Technology",
    website: "https://www.ibm.com/in-en/careers/internships",
  },
  {
    id: 8,
    name: "Tata Group",
    logo: "/logo/TATA.png",
    description:
      "India's largest conglomerate with businesses spanning automotive, steel, IT, and consumer goods",
    industry: "Conglomerate",
    website: "https://www.tata.com/careers/programs/tata-global-internships",
  },
  {
    id: 9,
    name: "Skill India Digital",
    logo: "/logo/Skill India.png",
    description:
      "Government of India initiative for digital skill development and employment generation",
    industry: "Government/Education",
    website: "https://www.skillindiadigital.gov.in/internship",
  },
  {
    id: 10,
    name: "Accenture",
    logo: "/logo/Accenture.svg.webp",
    description:
      "Global professional services company with leading capabilities in digital, cloud and security",
    industry: "Consulting",
    website:
      "https://www.accenture.com/ch-en/careers/life-at-accenture/internships-students",
  },
  {
    id: 11,
    name: "Microsoft",
    logo: "/logo/Microsoft.png",
    description:
      "Technology giant focused on productivity software, cloud services, and artificial intelligence",
    industry: "Technology",
    website: "https://careers.microsoft.com/v2/global/en/students",
  },
];

const InternshipLanding = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const industries = [
    "All",
    ...Array.from(new Set(companies.map((c) => c.industry))),
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-slate-800/20"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Launch Your Career
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover amazing internship opportunities with India's top companies
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Internship
            </h2>
            <p className="text-xl text-gray-600">
              Filter through top companies and find the opportunity that matches
              your career goals
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search companies or industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>

            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="pl-12 pr-8 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex rounded-xl border border-gray-300 overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-6 py-4 font-medium transition-colors ${
                  viewMode === "cards"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-6 py-4 font-medium transition-colors ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Display */}
      <section className="py-16 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          {viewMode === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                  <div className="p-6 text-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">
                        {company.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {company.description}
                    </p>

                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>Apply Now</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCompanies.map((company, index) => (
                      <tr
                        key={company.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-12 h-12 object-contain"
                            />
                            <div className="font-semibold text-gray-900">
                              {company.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                          {company.description}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit"
                          >
                            <span>Apply</span>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InternshipLanding;
