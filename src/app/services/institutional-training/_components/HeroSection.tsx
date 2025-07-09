/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Award,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Cpu,
  School,
  Heart,
  Users,
} from "lucide-react";
import Link from "next/link";

interface EducationSegment {
  title: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  students: string;
  programs: string;
}

interface EducationSegments {
  [key: string]: EducationSegment;
}

type TabKey =
  | "engineering"
  | "arts"
  | "bcom"
  | "polytechnic"
  | "schools"
  | "mba";

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("engineering");

  const educationSegments: EducationSegments = {
    schools: {
      title: "Schools & Colleges",
      icon: <School className="h-5 w-5" />,
      description: "Institution-wide training programs",
      highlights: [
        "AI-Enhanced Pedagogy",
        "Generative AI for Content Creation",
        "AI Ethics in Education",
        "Prompt Engineering for Educators",
      ],
      students: "200+",
      programs: "8+",
    },
    // polytechnic: {
    //   title: "Polytechnic & Diploma",
    //   icon: <Building2 className="h-5 w-5" />,
    //   description: "Technical skill enhancement for diploma students",
    //   highlights: [
    //     "Industrial Automation",
    //     "IoT Applications",
    //     "Technical Support",
    //     "Manufacturing Tech",
    //   ],
    //   students: "1,400+",
    //   programs: "10+",
    // },
    arts: {
      title: "Arts & Science",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Comprehensive skill development for liberal arts students",
      highlights: [
        "AI-Assisted Creative Writing",
        "Generative Art & Design Tools",
        "AI in Music Composition",
        "Digital Storytelling with AI",
      ],
      students: "3,800+",
      programs: "15+",
    },
    engineering: {
      title: "Engineering Programs",
      icon: <Cpu className="h-5 w-5" />,
      description: "Specialized training for all engineering branches",
      highlights: [
        "AI/ML Model Development",
        "Prompt Engineering & Fine-tuning",
        "AI System Architecture",
        "Responsible AI Development",
      ],
      students: "8,500+",
      programs: "25+",
    },

    mba: {
      title: "MBA & Management",
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Advanced management and leadership training",
      highlights: [
        "AI Strategy & Business Transformation",
        "Digital Transformation",
        "Leadership Skills",
        "Business Analytics",
      ],
      students: "4,200+",
      programs: "18+",
    },
    medical: {
      title: "Medical & Healthcare",
      icon: <Heart className="h-5 w-5" />,
      description: "Comprehensive medical education and healthcare training",
      highlights: [
        "Clinical Medicine",
        "Medical Research",
        "Patient Care Excellence",
        "Healthcare Technology",
      ],
      students: "3,800+",
      programs: "15+",
    },
    paramedical: {
      title: "Para-Medical & Allied Health",
      icon: <Users className="h-5 w-5" />,
      description:
        "Essential healthcare support and technical medical training",
      highlights: [
        "Medical Laboratory Technology",
        "Radiography & Imaging",
        "Physiotherapy",
        "Emergency Medical Services",
      ],
      students: "2,600+",
      programs: "12+",
    },
  };

  const tabs: TabKey[] = Object.keys(educationSegments) as TabKey[];

  const handleTabClick = (tab: TabKey): void => {
    setActiveTab(tab);
  };

  const currentSegment: EducationSegment = educationSegments[activeTab];

  return (
    <section id="overview" className="pt-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-5">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <Award className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Industry-Leading Training
              </span>
            </div>
            <h1 className="hidden">
              Institutional Training Programs | Skill Development for Students
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Create Industry-Ready AI-Driven Graduates,
              <span className="text-blue-600"> Not Just Graduates</span>
            </h2>

            <p className="text-lg text-gray-600">
              Comprehensive training programs across Polytechnic, Arts &
              Science, B.Com, Engineering, MBA, Medical, Paramedical and
              School-College partnerships.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">20,000+</div>
                <div className="text-xs text-gray-600">Learners Trained</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-xs text-gray-600">
                  Partner Institutions
                </div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact?type=b2i">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
              {/* <button
                type="button"
                className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
              >
                Schedule Demo
              </button> */}
            </div>
          </div>

          <img
            src="/app/b2i/hero.png"
            alt="b2i"
            className="w-full rounded-md object-cover mt-5"
          />
          {/* 
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="grid grid-cols-3 lg:grid-cols-6">
                {tabs.map((tab: TabKey) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabClick(tab)}
                    className={`p-3 text-xs font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {educationSegments[tab].icon}
                      <span className="hidden lg:block">
                        {educationSegments[tab].title.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  {currentSegment.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {currentSegment.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentSegment.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {currentSegment.students}
                  </div>
                  <div className="text-xs text-gray-600">Students Trained</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-600">
                    {currentSegment.programs}
                  </div>
                  <div className="text-xs text-gray-600">
                    Programs Available
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Key Training Areas:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentSegment.highlights.map(
                    (highlight: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">
                  {currentSegment.title} Visual
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
