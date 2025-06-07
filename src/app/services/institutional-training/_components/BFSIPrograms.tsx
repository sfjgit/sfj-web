"use client";
import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  Shield,
  BarChart3,
  Briefcase,
  Users,
  Globe,
  Zap,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const BComBFSIPrograms = () => {
  const [activeTab, setActiveTab] = useState("core");

  const corePrograms = [
    {
      title: "Banking Fundamentals",
      duration: "8 Weeks",
      level: "Beginner",
      roles: ["Bank Officer", "Customer Advisor"],
      color: "bg-blue-500",
    },
    {
      title: "Investment Banking",
      duration: "12 Weeks",
      level: "Intermediate",
      roles: ["Junior Analyst", "Research Associate"],
      color: "bg-purple-500",
    },
    {
      title: "Wealth Management",
      duration: "10 Weeks",
      level: "Intermediate",
      roles: ["Wealth Advisor", "Portfolio Assistant"],
      color: "bg-green-500",
    },
    {
      title: "Risk & Compliance",
      duration: "6 Weeks",
      level: "Beginner",
      roles: ["Risk Analyst", "Compliance Officer"],
      color: "bg-red-500",
    },
  ];

  const digitalPrograms = [
    {
      title: "Fintech & Digital Banking",
      duration: "8 Weeks",
      level: "Intermediate",
      roles: ["Fintech Specialist", "Digital Banking Officer"],
      color: "bg-indigo-500",
    },
    {
      title: "Financial Data Analytics",
      duration: "10 Weeks",
      level: "Advanced",
      roles: ["Data Analyst", "Business Intelligence Analyst"],
      color: "bg-teal-500",
    },
    {
      title: "Blockchain & Crypto",
      duration: "6 Weeks",
      level: "Advanced",
      roles: ["Blockchain Analyst", "Crypto Specialist"],
      color: "bg-yellow-500",
    },
  ];

  const specializedPrograms = [
    {
      title: "Insurance & Actuarial",
      duration: "12 Weeks",
      level: "Intermediate",
      roles: ["Insurance Advisor", "Actuarial Assistant"],
      color: "bg-orange-500",
    },
    {
      title: "Corporate Finance",
      duration: "10 Weeks",
      level: "Advanced",
      roles: ["Financial Analyst", "Corporate Banker"],
      color: "bg-pink-500",
    },
  ];

  const tabs = [
    { id: "core", label: "Core Banking", programs: corePrograms },
    { id: "digital", label: "Digital & Tech", programs: digitalPrograms },
    { id: "specialized", label: "Specialized", programs: specializedPrograms },
  ];

  const careerOutcomes = [
    { role: "Junior Banking Officer", salary: "₹3-5 LPA", demand: "High" },
    { role: "Financial Analyst", salary: "₹4-7 LPA", demand: "Very High" },
    { role: "Investment Advisor", salary: "₹5-8 LPA", demand: "High" },
    { role: "Risk Analyst", salary: "₹4-6 LPA", demand: "Medium" },
    { role: "Fintech Specialist", salary: "₹6-10 LPA", demand: "Very High" },
    { role: "Insurance Consultant", salary: "₹3-6 LPA", demand: "Medium" },
  ];

  const getIcon = (title: string) => {
    switch (title) {
      case "Banking Fundamentals":
        return <Building2 className="h-5 w-5" />;
      case "Investment Banking":
        return <BarChart3 className="h-5 w-5" />;
      case "Wealth Management":
        return <TrendingUp className="h-5 w-5" />;
      case "Risk & Compliance":
        return <Shield className="h-5 w-5" />;
      case "Fintech & Digital Banking":
        return <Zap className="h-5 w-5" />;
      case "Financial Data Analytics":
        return <BarChart3 className="h-5 w-5" />;
      case "Blockchain & Crypto":
        return <Globe className="h-5 w-5" />;
      case "Insurance & Actuarial":
        return <Shield className="h-5 w-5" />;
      case "Corporate Finance":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">
              BFSI Programs for BCom Students
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-aligned training programs designed for commerce graduates
            to excel in Banking, Financial Services & Insurance sector
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span>Industry Certified</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>15,000+ Graduates Placed</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>6-12 Week Programs</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tabs
              .find((tab) => tab.id === activeTab)
              ?.programs.map((program, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all hover:border-blue-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center text-white`}
                      >
                        {getIcon(program.title)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {program.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-blue-600 font-medium">
                            {program.duration}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              program.level === "Beginner"
                                ? "bg-green-100 text-green-700"
                                : program.level === "Intermediate"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {program.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">
                      Career Roles:
                    </p>
                    {program.roles.map((role, roleIndex) => (
                      <div
                        key={roleIndex}
                        className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full inline-block mr-2"
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Career Outcomes Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <h3 className="text-xl font-bold text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Career Outcomes for BCom Graduates
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Starting Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Demand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {careerOutcomes.map((outcome, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {outcome.role}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold text-green-600">
                        {outcome.salary}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          outcome.demand === "Very High"
                            ? "bg-green-100 text-green-800"
                            : outcome.demand === "High"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {outcome.demand}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Launch Your BFSI Career?
          </h3>
          <p className="text-blue-100 mb-6">
            Join thousands of BCom graduates who've successfully transitioned
            into high-paying BFSI roles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Programs
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Brochure
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BComBFSIPrograms;
