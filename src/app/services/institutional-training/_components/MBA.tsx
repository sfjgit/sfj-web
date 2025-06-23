"use client";
import React, { useState } from "react";
import {
  TrendingUp,
  Clock,
  Award,
  Target,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const MBACourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const mbaData = [
    {
      category: "Marketing Management",
      course: "Digital Marketing or SAP SD",
      duration: "60",
      certification: "Google Digital Marketing Certificate",
      targetJob: "Digital Marketing Executive",
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      category: "Financial Management",
      course: "Financial Modeling or SAP FICO",
      duration: "60/160",
      certification: "Corporate Finance Institute (CFI)",
      targetJob: "Financial Analyst",
      color: "bg-orange-100 border-orange-300",
    },
    {
      category: "Human Resource Management",
      course: "People Analytics or SAP HCM",
      duration: "60",
      certification: "SAP, Tableau, Microsoft",
      targetJob: "HR Analyst",
      color: "bg-red-100 border-red-300",
    },
    {
      category: "Systems Management",
      course: "Business Analyst Professional, PMP, PMI",
      duration: "45",
      certification: "IIBA ECBA, PMP, PMI",
      targetJob: "Business Analyst",
      color: "bg-pink-100 border-pink-300",
    },
    {
      category: "Hospital Management",
      course: "Healthcare IT Management",
      duration: "60",
      certification: "HIMSS Certified Associate",
      targetJob: "Hospital IT Manager",
      color: "bg-purple-100 border-purple-300",
    },
    {
      category: "Logistics & Supply Chain Management",
      course: "Supply Chain Analytics or SAP SD",
      duration: "60/160",
      certification: "APICS CPIM & SAP",
      targetJob: "Supply Chain Analyst",
      color: "bg-indigo-100 border-indigo-300",
    },
    {
      category: "Business Data Analytics",
      course: "Data Analysis with Python, Power BI",
      duration: "60",
      certification: "IBM Data Analyst Certificate",
      targetJob: "Data Analyst",
      color: "bg-blue-100 border-blue-300",
    },
    {
      category: "Cross-Specialization (All Streams)",
      course: "SAP Courses",
      duration: "160",
      certification: "SAP Global Certifications",
      targetJob: "SAP Functional Consultant",
      color: "bg-green-100 border-green-300",
    },
    {
      category: "Cross-Specialization (All Streams)",
      course: "Generative AI (GenAI) Tools",
      duration: "120",
      certification: "AWS, Google AI Certifications",
      targetJob: "AI Content Strategist, Visual Designer, GenAI",
      color: "bg-teal-100 border-teal-300",
    },
  ];

  const categories = ["all", ...new Set(mbaData.map((item) => item.category))];

  const filteredData = mbaData.filter((item) => {
    const matchesSearch =
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetJob.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              MBA Courses with Global Certification
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advance your management career with industry-recognized
            certifications and specialized training programs
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses, specializations, or job roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Specializations</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* MBA Courses Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Specialization
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Recommended Course
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Duration (Hours)
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Certification
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Target Job
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div
                        className={`inline-block px-3 py-1 rounded-lg border-2 ${item.color}`}
                      >
                        <span className="font-semibold text-gray-800 text-sm">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">
                        {item.course}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {item.duration}h
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-700 text-sm">
                          {item.certification}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                        {item.targetJob}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
            <div className="text-gray-600">Specializations</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              45-160h
            </div>
            <div className="text-gray-600">Training Hours</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Global Certified</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              ₹8-15L
            </div>
            <div className="text-gray-600">Avg. Salary</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Advance Your Management Career?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Choose from our globally certified MBA programs and accelerate your
            path to leadership roles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <ExternalLink className="h-5 w-5 mr-2" />
              View Detailed Curriculum
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download MBA Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MBACourses;
