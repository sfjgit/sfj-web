"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    industry: "Corporate Internships",
    website: "https://www.oracle.com/careers/students-grads/internships/",
  },
  {
    id: 2,
    name: "Tata Consultancy Services",
    logo: "/logo/TCS.webp",
    description:
      "India's largest IT services company with global presence in consulting and digital transformation",
    industry: "Corporate Internships",
    website: "https://www.tcs.com/careers/india/internship",
  },
  {
    id: 3,
    name: "Infosys",
    logo: "/logo/Infosys.png",
    description:
      "Global leader in next-generation digital services and consulting solutions",
    industry: "Corporate Internships",
    website: "https://www.infosys.com/careers/internships.html",
  },
  {
    id: 4,
    name: "Bosch",
    logo: "/logo/Bosch.png",
    description:
      "German multinational engineering and technology company with automotive and industrial solutions",
    industry: "Corporate Internships",
    website: "https://www.bosch.in/careers/students-and-graduates/internships/",
  },
  {
    id: 5,
    name: "Wipro",
    logo: "/logo/Wipro.png",
    description:
      "Leading global information technology, consulting and business process services company",
    industry: "Corporate Internships",
    website: "https://careers.wipro.com/content/Early-Careers/?locale=en_US",
  },
  {
    id: 6,
    name: "IBM",
    logo: "/logo/IBM.png",
    description:
      "Global technology and innovation company focusing on hybrid cloud, AI, and consulting services",
    industry: "Corporate Internships",
    website: "https://www.ibm.com/in-en/careers/internships",
  },
  {
    id: 7,
    name: "Tata Group",
    logo: "/logo/TATA.png",
    description:
      "India's largest conglomerate with businesses spanning automotive, steel, IT, and consumer goods",
    industry: "Corporate Internships",
    website: "https://www.tata.com/careers/programs/tata-global-internships",
  },
  {
    id: 8,
    name: "Accenture",
    logo: "/logo/Accenture.svg.webp",
    description:
      "Global professional services company with leading capabilities in digital, cloud and security",
    industry: "Corporate Internships",
    website:
      "https://www.accenture.com/ch-en/careers/life-at-accenture/internships-students",
  },
  {
    id: 9,
    name: "Microsoft",
    logo: "/logo/Microsoft.png",
    description:
      "Technology giant focused on productivity software, cloud services, and artificial intelligence",
    industry: "Corporate Internships",
    website: "https://careers.microsoft.com/v2/global/en/students",
  },
  {
    id: 10,
    name: "Skill India Digital",
    logo: "/logo/Skill India.png",
    description:
      "Government of India initiative for digital skill development and employment generation",
    industry: "Government Internships",
    website: "https://www.skillindiadigital.gov.in/internship",
  },
  {
    id: 11,
    name: "NeGD’s Summer Internship Programme - 2025",
    logo: "/logo/Digital India.png",
    description:
      "An opportunity for students to gain hands-on experience in Digital India initiatives.",
    industry: "Government Internships",
    website:
      "https://dic.gov.in/jobs/announcement-of-negds-summer-internship-programme-2025",
  },
  {
    id: 12,
    name: "DPIIT Internship Scheme",
    logo: "/logo/dpiit.png",
    description:
      "A scheme by the Department for Promotion of Industry and Internal Trade offering students exposure to government policy-making, startup ecosystem, and industrial development.",
    industry: "Government Internships",
    website: "https://www.myscheme.gov.in/schemes/dpiit-is",
  },
  {
    id: 13,
    name: "PM Internship Scheme",
    logo: "/logo/pminternshipscheme.png",
    description:
      "A government initiative providing students with practical exposure to governance, policy implementation, and public administration under the Prime Minister’s Office.",
    industry: "Government Internships",
    website: "https://pminternshipscheme.com/",
  },
  {
    id: 14,
    name: "NITI Aayog",
    logo: "/logo/NITI_Aayog.png",
    description: "The National Institute of Technology, India",
    industry: "Government Internships",
    website:
      "https://workforindia.niti.gov.in/intern/InternshipEntry/PCInternshipEntry.aspx",
  },
  {
    id: 15,
    name: "NIT Sikkim",
    logo: "/logo/National_Institute_of_Technology_Sikkim.png",
    description:
      "National Institute of Technology (NIT) Sikkim is a public university located in Gangtok, Sikkim, India",
    industry: "Government Internships",
    website:
      "https://docs.google.com/forms/d/e/1FAIpQLSeZGRRlnar9Q2e7oUW7-bnPKxkBDgLEWidyI3U9XiIM9z-D-w/viewform",
  },
  {
    id: 16,
    name: "SBIF Asha Scholarship Program",
    logo: "/logo/SBI.webp",
    description:
      "A scholarship program by the State Bank of India Foundation to provides financial aid to meritorious students from low-income families (from school through postgraduate level), including overseas studies, across India",
    industry: "Scholarships",
    website: "https://www.sbifashascholarship.org/",
  },
  {
    id: 17,
    name: "LIC Golden Jubilee Scholarship Scheme",
    logo: "/logo/LIC_Webp.webp",
    description:
      "It provides financial assistance to meritorious students from economically weaker families to pursue higher education in medicine, engineering, graduation, diploma, and vocational courses.",
    industry: "Scholarships",
    website: "https://licindia.in/golden-jubilee-foundation",
  },
  {
    id: 18,
    name: "National Scholarships Portal",
    logo: "/logo/NIC.png",
    description:
      "A government initiative providing students with practical exposure to governance, policy implementation, and public administration under the Prime Minister’s Office.",
    industry: "Scholarships",
    website: "https://www.nic.gov.in/project/national-scholarships-portal/",
  },
];

const faqs = [
  {
    question: "1. What internships are available through SFJBS?",
    answer:
      "We list both corporate internships with companies like Oracle, TCS, Infosys, and government internships from official programs.",
  },
  {
    question: "2. Do you also provide scholarships?",
    answer:
      "Yes. We feature scholarships from multiple sources, including government programs like the National Scholarship Portal (NSP), and state-level opportunities. Along with these, SFJBS also offers free courses in partnership with NSDC and NASSCOM, enabling students to gain in-demand digital and technical skills at no cost.",
  },
  {
    question: "3. Are IT company internships paid?",
    answer:
      "Most internships at Oracle, TCS, and Infosys are paid, with stipends varying by role and duration.",
  },
  {
    question: "4. How can I apply for government scholarships?",
    answer:
      "Applications are made through official portals like NSP or state websites. Our page provides links for easy access.",
  },
  {
    question: "5. Can students from all fields apply?",
    answer:
      "Yes. IT internships mainly require technical skills, but government internships and scholarships also cover management, research, and social science.",
  },
];

const InternshipLanding = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-slate-800/20"></div>

        {/* Hero Content */}
      {/* <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Launch Your Career
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover amazing internship opportunities with India's top companies
          </p>
        </div>
      </section> */}

      <section id="home" className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center relative z-10 pt-38">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 pb-7">
              Explore Internships and Scholarships in India 2025/26
            </h1>
            <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
              <p className="text-white text-justify pb-10 text-md">
                Finding the right internship or scholarship in India can be
                tough—SFJ Business Solutions makes it simple. SFJBS offers a
                unique opportunity for students to access a wide range of
                scholarships and internships, including study abroad programs.
                In addition to domestic opportunities, SFJBS features abroad
                scholarships and intern abroad scholarships, providing essential
                funding options for students seeking international experience.
                We bring IT company internships, government programs like PM
                Internship Scheme & NSP, all in one place. Students can explore
                CSR scholarships like LIC Golden Jubilee & SBI Asha Scholarship
                with ease. From internships to financial aid, SFJBS connects
                every learner to opportunities for growth—helping students
                engage with the world and global opportunities. Candidates can
                easily access resources and submit their applications through
                the platform. While there are many opportunities, we recognize
                the challenges students face in finding and affording
                international internships and scholarships. SFJBS values
                diversity and encourages eligible candidates from all
                backgrounds to participate. We are committed to supporting
                students from all backgrounds. Applicants with passion and
                interest in their chosen fields can join a supportive community
                through SFJBS. Careful planning is essential when applying for
                scholarships and internships, especially those abroad, to
                maximize your chances of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Build Your Future with IT & Government Internships in India
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Corporate Programs
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our internship listings feature structured internship programs
                from companies such as Oracle, Tata Consultancy Services, and
                Infosys, each offering a valuable internship opportunity for
                undergraduate and graduate students in fields such as computer
                science.
              </p>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Oracle</strong> provides internship programs in
                  database software and enterprise solutions
                </p>
                <p>
                  <strong>TCS</strong>  focuses on consulting and digital
                  transformation through its internship program
                </p>
                <p>
                  <strong>Infosys</strong> offers next-generation technology and
                  software innovation internship programs. Applicants are
                  required to be currently enrolled or recent graduates, and
                  should submit a resume as part of their application.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Government & CSR Programs
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>
                    <strong>PM Internship Scheme</strong> – Practical exposure
                    in government departments and ministries
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>
                    <strong>National Scholarship Portal (NSP)</strong> – A
                    unified platform for central and state-level scholarships,
                    where various types of award and scholarship award are
                    determined based on financial need and academic merit. These
                    awards may include financial benefits such as tuition
                    support, living stipends, and other allowances. Some
                    scholarships are specifically available to students in their
                    first year of college.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>
                    <strong>LIC Golden Jubilee Foundation</strong> – Supporting
                    education and scholarships for underprivileged students
                    across India by providing funding and grants to cover
                    various expenses such as tuition, travel, living costs, and
                    travel insurance.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>
                    <strong>SBI Asha Scholarship</strong> – Financial aid to
                    school and college students from economically weaker
                    sections, offering funding and grants that help cover
                    expenses like tuition, travel, accommodation, and travel
                    insurance.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span>
                    <strong>AICTE Internships</strong> – Opportunities for
                    engineering and management students across India, with the
                    duration of internships and eligibility for awards varying
                    depending on the program. Some AICTE programs also offer
                    research and research internship opportunities for students
                    interested in academic or scientific projects.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            {/* <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
              <p>
                These initiatives ensure that students from all
                backgrounds—whether in{" "}
                <strong className="text-blue-600">
                  engineering, management, science, arts, or commerce
                </strong>
                —can find the right mix of{" "}
                <strong className="text-blue-600">
                  practical internships and financial support scholarships
                </strong>{" "}
                to advance their academic and professional journey.
              </p>
              <p>
                At SFJBS, we make it easier for you to discover opportunities,
                check eligibility, and apply through official portals, ensuring
                authenticity and transparency at every step.
              </p>
            </div> */}
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
              <p>
                Many of these programs offer a monthly stipend and scholarship
                awards that are renewable annually for up to four years,
                provided students maintain good standing throughout the duration
                of their studies.
              </p>
              <p>
                In addition to merit-based and need-based scholarships, students
                can also apply for internship scholarships, which provide
                specific funding opportunities for those pursuing internships in
                India or abroad.
              </p>
              <p>
                These initiatives ensure that students from all
                backgrounds—whether in{" "}
                <strong className="text-blue-600">
                  engineering, management, science, arts, or commerce
                </strong>{" "}
                —can find the right mix of{" "}
                <strong className="text-blue-600">
                  practical internships and financial support scholarships
                </strong>{" "}
                to advance their academic and professional journey.
              </p>
              <p>
                At SFJBS, we make it easier for you to discover opportunities,
                check eligibility, and apply through official portals, ensuring
                authenticity and transparency at every step.
              </p>
            </div>
          </div>
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
              Filter through top companies and find the internship opportunity
              that best matches your interests and career goals
            </p>
            <p className="text-xl text-gray-600">
              Students seeking global experience can also explore international
              internship opportunities, which offer valuable professional
              development, cultural exposure, and enhanced employability. Some
              internships may even include the chance to visit program sites or
              company locations, providing in-person engagement and a deeper
              understanding of the work environment.
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

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about internships and scholarships
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition-colors duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {openIndex === index && (
                  <p className="text-gray-700 leading-relaxed mt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternshipLanding;
