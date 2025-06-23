"use client";
import React, { useState } from "react";
import {
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Building,
  Zap,
  ArrowRight,
  Star,
  Target,
  Globe,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import GenerativeAIRoles from "./GenerativeAIRoles";
import { useRouter } from "next/navigation";

const CSRLandingPage = () => {
  const [activeTab, setActiveTab] = useState("awareness");
  const router = useRouter();

  const tabs = [
    {
      id: "awareness",
      label: "AI Awareness",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      id: "youth",
      label: "Youth Training",
      icon: Users,
      color: "bg-blue-400",
    },
    // {
    //   id: "finishing",
    //   label: "Rural Empowerment",
    //   icon: GraduationCap,
    //   color: "bg-blue-300",
    // },
    {
      id: "Pwd",
      label: "PWD Empowerment",
      icon: GraduationCap,
      color: "bg-blue-300",
    },
    {
      id: "LGBTQ",
      label: "LGBTQ Empowerment",
      icon: Users,
      color: "bg-blue-400",
    },
    {
      id: "women",
      label: "Women Empowerment",
      icon: Heart,
      color: "bg-blue-600",
    },
    {
      id: "csr",
      label: "CSR Partnership",
      icon: Building,
      color: "bg-blue-700",
    },
    {
      id: "careers",
      label: "Career Paths",
      icon: TrendingUp,
      color: "bg-blue-800",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const jobRoles = [
    {
      skill: "Generative AI",
      roles: ["Gen AI Content Creator", "Prompt Engineer"],
    },
    {
      skill: "AI Communication",
      roles: ["AI Marketing Assistant", "Video Script Writer"],
    },
    {
      skill: "Cloud & Automation",
      roles: ["AI App Builder", "Automation Tester"],
    },
    { skill: "Data & Analytics", roles: ["AI Data Analyst", "BI Developer"] },
    {
      skill: "Tech Support",
      roles: ["Virtual AI Assistant", "AI Tool Integrator"],
    },
  ];

  const TabContent = ({ id }: { id: string }) => {
    switch (id) {
      case "awareness":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  AI Awareness for Schools & Government
                </h3>
                <p className="text-gray-600 mt-2">
                  Interactive, age-appropriate sessions for school students,
                  teachers, and government staff covering ethical AI, digital
                  communication, and prompt engineering.
                </p>
                <div className="flex items-center mt-3 text-blue-600">
                  <Target className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    Goal: Create early-stage digital confidence and AI curiosity
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "youth":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Digital Literacy for Youth (18-30)
                </h3>
                <p className="text-gray-600 mt-2">
                  Comprehensive training in Generative AI tools, prompt
                  engineering, content generation, and career path mapping.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center text-blue-700">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      Special Focus: Women from underprivileged backgrounds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "finishing":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Industry-Ready Skilling for Rural Graduates
                </h3>
                <p className=" text-gray-600 leading-relaxed mt-3">
                  Our{" "}
                  <span className="font-medium text-blue-600">
                    Rural Empowerment
                  </span>{" "}
                  initiative delivers
                  <span className="font-semibold">
                    {" "}
                    industry-ready skilling programs
                  </span>{" "}
                  to unemployed graduates in rural and semi-urban areas. Through
                  our initiative learners gain access to
                  <span className="text-blue-600">
                    {" "}
                    global certifications, real-world projects, soft skills
                    training, and placement support
                  </span>{" "}
                  — all designed to create equitable career opportunities and
                  uplift underprivileged youth.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-3 h-3 mr-1 text-blue-500" />
                    Global Certifications
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-3 h-3 mr-1 text-blue-500" />
                    Placement Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "women":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upskilling Women for Tomorrow&#39;s Workforce
                </h3>
                <p className="text-gray-600 mt-2">
                  Bridge the gender gap in tech through Gen AI training,
                  certifications, career mentorship, and remote job
                  opportunities.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Career Mentorship
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Remote Jobs
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Self-Employment
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Pwd":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Inclusive AI Training for Persons with Disabilities
                </h3>
                <p className="text-gray-600 mt-2">
                  Specially designed accessible training programs covering AI
                  tools, assistive technology integration, and digital
                  accessibility skills. Our barrier-free approach ensures equal
                  learning opportunities through adaptive interfaces, sign
                  language support, and customized learning materials.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center text-blue-700">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      Focus Areas: Screen reader compatibility, voice-to-text
                      AI, and workplace inclusion training
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "LGBTQ":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  LGBTQ+ Inclusive Digital Empowerment
                </h3>
                <p className="text-gray-600 mt-2">
                  Creating safe, inclusive learning environments for LGBTQ+
                  individuals with comprehensive AI and digital skills training.
                  Our programs focus on building confidence, professional
                  networks, and career advancement opportunities while fostering
                  acceptance and diversity in the tech ecosystem.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center text-blue-700">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      Special Support: Mentorship programs, safe spaces, and
                      LGBTQ+-friendly workplace partnerships
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "csr":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Measurable CSR Impact
                </h3>
                <p className="text-gray-600 mt-2">
                  Strong compliance, transparent reporting, and NSDC/NASSCOM
                  integration for maximum impact.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">
                      50,000+
                    </div>
                    <div className="text-xs text-gray-600">
                      Learners Trained
                    </div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">100%</div>
                    <div className="text-xs text-gray-600">Compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "careers":
        return <GenerativeAIRoles />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-cyan-600 pt-20">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(167,243,208,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(167,243,208,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="w-4 h-4 mr-2" />
              Skilling India for the AI Future
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Empowering Through</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Gen AI Training
              </span>
            </h1>

            <p className="text-xl text-cyan-100 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Transforming school students, educators, rural youth, and
              government employees through CSR-led initiatives with global
              certifications.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                Global Certifications
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                AI-Powered Learning
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                CSR Initiatives
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => router.push("/contact?type=csr")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-cyan-600 hover:to-blue-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-xl"
              >
                Enquire Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 max-w-7xl mx-auto">
        {/* Tabbed Content Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                      activeTab === tab.id
                        ? `border-blue-500 text-blue-600 bg-white`
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${tab.color} bg-opacity-20 flex items-center justify-center mr-2`}
                    >
                      <Icon
                        className={`w-3 h-3 ${
                          activeTab === tab.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <TabContent id={activeTab} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <div className="bg-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">
                Join Us in Shaping India&#39;s Tech Future
              </h2>
            </div>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              From schools to rural communities — together, we can unlock
              future-ready opportunities and create measurable impact across
              India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Contact Our CSR Team
                </button> */}
              <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Download CSR Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRLandingPage;
