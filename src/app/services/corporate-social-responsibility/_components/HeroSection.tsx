"use client";
import React, { useState } from "react";
import {
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Building,
  Star,
  Target,
  BookOpen,
  TrendingUp,
  Check,
  Cloud,
} from "lucide-react";
import CSRBottomCTA from "./Cta";
import Image from "next/image";
import { useEffect } from "react";
import { useTabVisibility } from "./TabVisibilityContext";
import CareerMapping from "./CareerMapping";
import AwsRestartContent from "./AwsRestartContent";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
const CSRLandingPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    pathname?.includes("/aws-restart")
      ? "awsRestart"
      : searchParams.get("tab") || "awsRestart",
  );
  const { setIsAwsRestartActive } = useTabVisibility();

  useEffect(() => {
    setIsAwsRestartActive(activeTab === "awsRestart");
  }, [activeTab, setIsAwsRestartActive]);
  const router = useRouter();

  // AWS re/Start is the default tab, so opening the bare CSR URL renders the
  // AWS screen while the address bar still reads
  // /services/corporate-social-responsibility. Line the URL up with what is
  // actually on screen, so the page can be linked, shared and bookmarked.
  //
  // `replace`, not `push`: this is a correction of the current entry, not a
  // navigation. Pushing would put the bare URL in history directly behind the
  // corrected one, and Back would bounce straight forward again.
  //
  // Only fires when the tab really is awsRestart and we are not already on
  // /aws-restart, so there is no loop — that route sets the same tab from its
  // own pathname and the condition is false on arrival.
  useEffect(() => {
    if (activeTab !== "awsRestart") return;
    if (pathname?.includes("/aws-restart")) return;
    router.replace("/services/corporate-social-responsibility/aws-restart");
  }, [activeTab, pathname, router]);

  const handleTabClick = (tabId: string) => {
    const isCurrentlyOnAwsRestartPage = pathname?.includes("/aws-restart");

    if (tabId === "awsRestart") {
      router.push("/services/corporate-social-responsibility/aws-restart");
      return;
    }

    if (isCurrentlyOnAwsRestartPage) {
      router.push(`/services/corporate-social-responsibility?tab=${tabId}`);
      return;
    }

    setActiveTab(tabId);
  };

  const tabs = [
    {
      id: "awsRestart",
      label: "AWS re/Start",
      icon: Cloud,
      color: "bg-blue-900",
    },
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
      case "awsRestart":
        return <AwsRestartContent />;
        return (
          <div className="space-y-8">
            {/* Hero banner */}
            <div className="relative rounded-2xl overflow-hidden min-h-[600px] flex items-center">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/Aws Restart Hero.svg')" }}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative w-full px-8 md:px-12 py-12">
                <div className="max-w-2xl flex flex-col items-start text-left">
                  <Image
                    src="/AWS restart logo.svg"
                    alt="AWS re/Start logo"
                    width={220}
                    height={110}
                    className="h-[3.2rem] md:h-16 w-auto mb-6"
                  />
                  <h3 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
                    AWS re/Start Program
                  </h3>
                  <p className="text-white text-xl md:text-2xl font-medium mb-4">
                    Your cloud career, built from zero to job-ready
                  </p>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
                    SFJ Business Solutions delivers AWS re/Start — a free,
                    full-time, 12-week cloud computing training program for job
                    seekers, in official partnership with Amazon Web Services.
                    No prior technical background required.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => router.push("/contact?type=csr")}
                      className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => router.push("/contact?type=csr")}
                      className="border border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                    >
                      Book a Call
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature section with image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-4 mt-8">
                  <h3 className="text-4xl font-semibold text-gray-900">
                    AWS re/Start
                  </h3>
                  <h4 className="text-black-600 text-lg font-medium mt-1">
                    Preparing individuals for cloud careers with free to the
                    learner cohort-based training
                  </h4>
                  <h3 className="text-3xl font-medium text-gray-900 mt-6">
                    Helping people build careers in the cloud
                  </h3>
                </div>
                <p className="text-black-600 text-lg leading-relaxed">
                  AWS re/Start is a cohort-based workforce development program
                  that equips individuals for cloud careers and connects them
                  with prospective employers. No prior technology background is
                  needed to apply. The program is offered at no cost to the
                  learner and is designed to support unemployed or underemployed
                  individuals starting a new career path. AWS re/Start&#39;s
                  partner organizations work to uplift underrepresented groups,
                  minorities, displaced individuals, young people, and other
                  communities in need of opportunity.
                </p>
                <p className="text-black-600 text-lg leading-relaxed mt-4">
                  Through structured coursework and hands-on labs built around
                  real-world scenarios, learners develop the technical skills
                  required for entry to mid-level cloud roles. The program also
                  builds professional readiness through resume support and
                  interview coaching, preparing learners to confidently meet
                  employers and take on job interviews.
                </p>
              </div>

              <div className="relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden">
                <Image
                  src="/Aws feature.webp"
                  alt="AWS re/Start program feature"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* About the curriculum */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full h-80 md:h-[420px] rounded-2xl overflow-hidden">
                <Image
                  src="/Aws csr 2.webp"
                  alt="AWS re/Start curriculum"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="text-3xl font-medium text-gray-900">
                    About the curriculum
                  </h3>
                </div>
                <p className="text-black-600 text-lg leading-relaxed">
                  AWS re/Start&#39;s curriculum is built around the learner, not
                  a fixed syllabus. It adapts to each person&#39;s starting
                  point, whether they&#39;re completely new to technology or
                  bring some prior exposure. It shapes itself around individual
                  goals, connecting every module to the kind of cloud role a
                  learner is working toward. It flexes across learning
                  modalities, combining instructor-led sessions, scenario-based
                  exercises, and hands-on labs so different learning styles are
                  supported. This adaptability is what allows learners from very
                  different backgrounds to reach the same outcome: real,
                  job-ready cloud skills. The result is a program that meets
                  learners where they are, and moves with them from there.
                </p>
              </div>
            </div>

            {/* What you'll learn */}
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                What you&#39;ll learn
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    logo: "/Liux and Network.svg",
                    title: "Linux and networking",
                    desc: "The operating fundamentals every cloud role runs on",
                  },
                  {
                    logo: "/Security and Database.svg",
                    title: "Security and databases",
                    desc: "Protecting and managing data at cloud scale",
                  },
                  {
                    logo: "/Cloud skill.svg",
                    title: "Core AWS cloud skills",
                    desc: "Hands-on labs using real AWS environments",
                  },
                  {
                    logo: "/Job.svg",
                    title: "Job readiness",
                    desc: "Resume building, mock interviews, hiring day prep",
                  },
                ].map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden mb-3">
                      <Image
                        src="/Aws1.png"
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={item.logo}
                          alt={`${item.title} icon`}
                          width={74}
                          height={74}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Career mapping */}
            <CareerMapping />

            {/* Eligibility + FAQ split block */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-gray-200 rounded-2xl p-6">
              {/* Eligibility */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Check your eligibility
                </h4>
                <p className="text-gray-600 text-base mb-3">
                  To be eligible for the program, you need to fulfil these
                  requirements:
                </p>
                <ul className="space-y-2">
                  {[
                    "You are not in full-time employment, or are working regularly more than 16 hours per week",
                    "You are currently not in education or training",
                    "You have the legal right to live and work in India",
                    "You are interested in a career in technology and can demonstrate that interest",
                    "You are available for 12 consecutive weeks of full-day training, Monday to Friday, 9 AM to 5:30 PM",
                    "You have your own computing equipment and a steady internet connection",
                    "You're ready to start working immediately after training, should a job opportunity come up",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Frequently asked questions
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      q: "Is AWS re/Start really free?",
                      a: "Yes. There is no cost to the learner for training, materials, or certification exam preparation.",
                    },
                    {
                      q: "Do I need a technical background?",
                      a: "No prior coding or IT experience is required — the program is built for complete beginners.",
                    },
                    {
                      q: "What happens after I complete the program?",
                      a: "You'll receive support applying for entry-level cloud roles, including resume review, interview coaching, and access to SFJBS's hiring network.",
                    },
                    {
                      q: "Is the training online or in person?",
                      a: "Training runs full-day, Monday to Friday, for 12 consecutive weeks — confirm the exact format with our team when you apply.",
                    },
                  ].map((faq) => (
                    <div
                      key={faq.q}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="text-base font-medium text-gray-900">
                        {faq.q}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-[100rem] mx-auto py-10 px-3 sm:px-4 overflow-x-hidden">
      {/* Tabbed Content Section */}
      <div className="w-full min-w-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex w-full flex-wrap lg:flex-nowrap lg:overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-white"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${tab.color} bg-opacity-20 flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon
                      className={`w-3 h-3 ${activeTab === tab.id ? "text-blue-600" : "text-gray-500"}`}
                    />
                  </div>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          <TabContent id={activeTab} />
        </div>
      </div>
      {activeTab !== "awsRestart" && <CSRBottomCTA />}

      {/* Bottom CTA */}
    </div>
  );
};

export default CSRLandingPage;
