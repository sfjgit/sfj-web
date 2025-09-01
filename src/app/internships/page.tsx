/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Filter,
  Search,
  Star,
  Building2,
  Globe,
  Award,
} from "lucide-react";

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  locations: string[];
  programs: string[];
  duration: string;
  eligibility: string;
  applicationDeadline: string;
  benefits: string[];
  website: string;
  rating: number;
  employees: string;
  founded: string;
}
const companies: Company[] = [
  {
    id: 1,
    name: "Oracle",
    logo: "/logo/Oracle.png",
    description:
      "Global technology leader in database software, cloud computing, and enterprise solutions",
    industry: "Technology",
    locations: ["Bangalore", "Hyderabad", "Mumbai", "Pune"],
    programs: [
      "Software Engineering",
      "Cloud Infrastructure",
      "Database Management",
      "AI/ML",
    ],
    duration: "3-6 months",
    eligibility: "Engineering students (2024-2026 batch)",
    applicationDeadline: "March 2025",
    benefits: [
      "Competitive stipend",
      "Mentorship",
      "Full-time offer potential",
      "Training programs",
    ],
    website: "https://www.oracle.com/careers/students-grads/internships/",
    rating: 4.2,
    employees: "143K+",
    founded: "1977",
  },
  {
    id: 2,
    name: "Qualcomm",
    logo: "/logo/Qualcomm.png",
    description:
      "Leading semiconductor and telecommunications equipment company driving 5G innovation",
    industry: "Semiconductor",
    locations: ["Bangalore", "Chennai", "Hyderabad"],
    programs: [
      "Hardware Engineering",
      "RF Engineering",
      "Software Development",
      "AI Research",
    ],
    duration: "2-6 months",
    eligibility: "ECE, CSE students (Pre-final & Final year)",
    applicationDeadline: "February 2025",
    benefits: [
      "Industry exposure",
      "Patent filing opportunities",
      "Research projects",
      "Global collaboration",
    ],
    website:
      "https://www.qualcomm.com/company/careers/internships-and-early-in-career-opportunities/india",
    rating: 4.4,
    employees: "51K+",
    founded: "1985",
  },
  {
    id: 3,
    name: "Tata Consultancy Services",
    logo: "/logo/TCS.webp",
    description:
      "India's largest IT services company with global presence in consulting and digital transformation",
    industry: "IT Services",
    locations: [
      "Mumbai",
      "Pune",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
    ],
    programs: [
      "Digital Technologies",
      "Cloud Computing",
      "Data Analytics",
      "Cybersecurity",
    ],
    duration: "2-3 months",
    eligibility: "All engineering streams (Final year)",
    applicationDeadline: "January 2025",
    benefits: [
      "TCS certification",
      "Project experience",
      "Pre-placement offers",
      "Global exposure",
    ],
    website: "https://www.tcs.com/careers/india/internship",
    rating: 3.9,
    employees: "614K+",
    founded: "1968",
  },
  {
    id: 4,
    name: "Infosys",
    logo: "/logo/Infosys.png",
    description:
      "Global leader in next-generation digital services and consulting solutions",
    industry: "IT Consulting",
    locations: ["Bangalore", "Mysore", "Chennai", "Hyderabad", "Pune"],
    programs: [
      "InStep Program",
      "Software Engineering",
      "Data Science",
      "Automation",
    ],
    duration: "2-6 months",
    eligibility: "Engineering & MCA students (Pre-final year)",
    applicationDeadline: "December 2024",
    benefits: [
      "InStep certification",
      "Mentorship program",
      "Innovation projects",
      "Campus placement priority",
    ],
    website: "https://www.infosys.com/careers/internships.html",
    rating: 4.0,
    employees: "346K+",
    founded: "1981",
  },
  {
    id: 5,
    name: "Bosch",
    logo: "/logo/Bosch.png",
    description:
      "German multinational engineering and technology company with automotive and industrial solutions",
    industry: "Automotive & Industrial",
    locations: ["Bangalore", "Chennai", "Coimbatore", "Pune"],
    programs: [
      "Automotive Engineering",
      "IoT Solutions",
      "Industry 4.0",
      "Mobility Solutions",
    ],
    duration: "3-6 months",
    eligibility: "Mechanical, ECE, CSE students",
    applicationDeadline: "April 2025",
    benefits: [
      "German work culture",
      "Innovation labs access",
      "International exposure",
      "Research opportunities",
    ],
    website: "https://www.bosch.in/careers/students-and-graduates/internships/",
    rating: 4.3,
    employees: "421K+",
    founded: "1886",
  },
  {
    id: 6,
    name: "Wipro",
    logo: "/logo/Wipro.png",
    description:
      "Leading global information technology, consulting and business process services company",
    industry: "IT Services",
    locations: ["Bangalore", "Hyderabad", "Chennai", "Pune", "Noida"],
    programs: [
      "Digital Technology",
      "Cloud & Infrastructure",
      "Analytics",
      "Cybersecurity",
    ],
    duration: "8-12 weeks",
    eligibility: "Engineering students (Pre-final year)",
    applicationDeadline: "February 2025",
    benefits: [
      "Real project work",
      "Skill development",
      "Networking opportunities",
      "Certificate programs",
    ],
    website: "https://careers.wipro.com/content/Early-Careers/?locale=en_US",
    rating: 3.8,
    employees: "250K+",
    founded: "1945",
  },
  {
    id: 7,
    name: "IBM",
    logo: "/logo/IBM.png",
    description:
      "Global technology and innovation company focusing on hybrid cloud, AI, and consulting services",
    industry: "Technology",
    locations: ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad"],
    programs: [
      "AI & Data Science",
      "Cloud Computing",
      "Blockchain",
      "Quantum Computing",
    ],
    duration: "2-3 months",
    eligibility: "CSE, IT, ECE students (All years)",
    applicationDeadline: "March 2025",
    benefits: [
      "IBM badges",
      "Mentorship",
      "Open source contributions",
      "Research collaboration",
    ],
    website: "https://www.ibm.com/in-en/careers/internships",
    rating: 4.1,
    employees: "282K+",
    founded: "1911",
  },
  {
    id: 8,
    name: "Tata Group",
    logo: "/logo/TATA.png",
    description:
      "India's largest conglomerate with businesses spanning automotive, steel, IT, and consumer goods",
    industry: "Conglomerate",
    locations: ["Mumbai", "Pune", "Jamshedpur", "Bangalore", "Chennai"],
    programs: [
      "Global Internship Program",
      "Engineering",
      "Management",
      "Research & Development",
    ],
    duration: "6-8 weeks",
    eligibility: "All streams (Pre-final & Final year)",
    applicationDeadline: "January 2025",
    benefits: [
      "Cross-industry exposure",
      "Leadership development",
      "Global assignments",
      "Fast-track hiring",
    ],
    website: "https://www.tata.com/careers/programs/tata-global-internships",
    rating: 4.2,
    employees: "935K+",
    founded: "1868",
  },
  {
    id: 9,
    name: "Skill India Digital",
    logo: "/logo/Skill India.png",
    description:
      "Government of India initiative for digital skill development and employment generation",
    industry: "Government/Education",
    locations: ["Pan India - Remote & On-site"],
    programs: [
      "Digital Marketing",
      "Web Development",
      "Data Analytics",
      "Fintech",
    ],
    duration: "1-3 months",
    eligibility: "All students and graduates",
    applicationDeadline: "Rolling basis",
    benefits: [
      "Government certification",
      "Skill development",
      "Job placement assistance",
      "Free training",
    ],
    website: "https://www.skillindiadigital.gov.in/internship",
    rating: 3.7,
    employees: "Government Initiative",
    founded: "2015",
  },
  {
    id: 10,
    name: "Accenture",
    logo: "/logo/Accenture.svg.webp",
    description:
      "Global professional services company with leading capabilities in digital, cloud and security",
    industry: "Consulting",
    locations: ["Bangalore", "Mumbai", "Chennai", "Hyderabad", "Pune"],
    programs: [
      "Technology Consulting",
      "Digital Solutions",
      "Strategy & Consulting",
      "Operations",
    ],
    duration: "8-10 weeks",
    eligibility: "All engineering streams (Pre-final year)",
    applicationDeadline: "February 2025",
    benefits: [
      "Global projects",
      "Client interaction",
      "Professional development",
      "Fast-track offers",
    ],
    website:
      "https://www.accenture.com/ch-en/careers/life-at-accenture/internships-students",
    rating: 4.0,
    employees: "738K+",
    founded: "1989",
  },
  {
    id: 11,
    name: "Microsoft",
    logo: "/logo/Microsoft.png",
    description:
      "Technology giant focused on productivity software, cloud services, and artificial intelligence",
    industry: "Technology",
    locations: ["Bangalore", "Hyderabad", "Noida"],
    programs: [
      "Software Engineering",
      "Data Science",
      "Product Management",
      "Research",
    ],
    duration: "3-4 months",
    eligibility: "CSE, IT students (All years)",
    applicationDeadline: "April 2025",
    benefits: [
      "Top-tier compensation",
      "Mentorship",
      "Open source projects",
      "Full-time conversion",
    ],
    website: "https://careers.microsoft.com/v2/global/en/students",
    rating: 4.5,
    employees: "221K+",
    founded: "1975",
  },
];
const InternshipLanding = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const industries = [
    "All",
    ...Array.from(new Set(companies.map((c) => c.industry))),
  ];
  const featuredCompanies = companies.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCompanies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                ? "fill-yellow-200 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-slate-800/10"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
            Launch Your Career
          </h1>
          <p className="text-lg md:text-xl mb-6 text-slate-600 max-w-2xl mx-auto">
            Discover amazing internship opportunities with India's top companies
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Explore Internships
            </button>
            <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16  bg-white/80 backdrop-blur-sm">
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies or industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  {/* bg-gradient-to-br from-blue-600 to-indigo-600 */}
                  <div className=" p-6 text-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-16"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {company.name}
                      </h3>
                      <p className="text-blue-600 text-sm">
                        {company.industry}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {company.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="truncate">
                          {company.locations.slice(0, 2).join(", ")}
                          {company.locations.length > 2
                            ? ` +${company.locations.length - 2}`
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{company.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{company.employees} employees</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <StarRating rating={company.rating} />
                      <span className="text-sm text-gray-500">
                        Est. {company.founded}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {company.programs.slice(0, 3).map((program, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {program}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2">
                      <span>Apply Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
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
                        Industry
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Locations
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Deadline
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Rating
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
                          <div className="flex items-center">
                            <div className="text-xs">
                              <img
                                src={company.logo}
                                alt={company.name}
                                className="w-24"
                              />
                              {/* <div className="font-semibold text-gray-900">
                                {company.name}
                              </div> */}
                              {/* <div className=" text-gray-500">
                                {company.employees} employees
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {company.industry}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {company.locations.slice(0, 2).join(", ")}
                          {company.locations.length > 2 && (
                            <span className="text-blue-600">
                              {" "}
                              +{company.locations.length - 2}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {company.duration}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {company.applicationDeadline}
                        </td>
                        <td className="px-6 py-4">
                          <StarRating rating={company.rating} />
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <span>Apply</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Building2 className="w-12 h-12 mx-auto text-blue-300" />
              <div className="text-3xl font-bold">11+</div>
              <div className="text-blue-200">Top Companies</div>
            </div>
            <div className="space-y-2">
              <Users className="w-12 h-12 mx-auto text-blue-300" />
              <div className="text-3xl font-bold">3M+</div>
              <div className="text-blue-200">Total Employees</div>
            </div>
            <div className="space-y-2">
              <Globe className="w-12 h-12 mx-auto text-blue-300" />
              <div className="text-3xl font-bold">25+</div>
              <div className="text-blue-200">Cities</div>
            </div>
            <div className="space-y-2">
              <Award className="w-12 h-12 mx-auto text-blue-300" />
              <div className="text-3xl font-bold">4.1</div>
              <div className="text-blue-200">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-400 mb-8">
              Join thousands of students who have launched their careers with
              these amazing companies.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300">
              Get Started Today
            </button>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; 2025 Internship Opportunities Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InternshipLanding;
