"use client";

import { useState } from "react";
import EnrollDialog from "./_components/course/EnrollDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  AlertCircle,
  FileText,
  ClipboardList,
  Package,
  HelpCircle,
  TrendingUp,
  Briefcase,
  Star,
  Globe,
  Shield,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const courseHighlights = [
  "Official ISTQB Advanced Level certification preparation",
  "Design test automation frameworks and architectures",
  "Automation strategies for Agile and DevOps environments",
  "Hands-on with industry-standard automation tools",
  "CI/CD pipeline integration for automated testing",
  "Real-world automation scenarios and practice",
  "ISTQB CTAL-TAE v2.0 exam preparation included",
];

const objectives = [
  "Understand principles and limitations of test automation",
  "Design a Test Automation Architecture (TAA)",
  "Evaluate and select appropriate automation tools",
  "Implement automated test scripts and frameworks",
  "Integrate automated tests into CI/CD pipelines",
  "Manage and maintain automated test environments",
  "Monitor effectiveness using metrics and reporting",
  "Prepare for and pass the ISTQB CTAL-TAE exam",
];

const audience = [
  "Test Automation Engineers",
  "QA Engineers / QA Analysts",
  "Software Testers",
  "Test Architects",
  "Test Consultants",
  "Test Managers",
  "Software Developers in testing",
];

const prerequisites = {
  mandatory: "ISTQB Certified Tester Foundation Level (CTFL) certification",
  recommended: [
    "Basic knowledge of software testing principles",
    "Experience with automation tools or scripting",
    "2–3 years of experience in software testing or QA",
  ],
};

const modules = [
  {
    id: "m1",
    title: "Module 1 — Introduction to Test Automation",
    topics: [
      "Purpose and benefits of automation",
      "Limitations and risks of automation",
      "Test automation in different SDLC models",
      "Relationship between manual and automated testing",
      "Automation strategy fundamentals",
    ],
  },
  {
    id: "m2",
    title: "Module 2 — Preparing for Test Automation",
    topics: [
      "Testability and automation feasibility analysis",
      "System under test (SUT) architecture",
      "Automation scope and planning",
      "Automation tool selection criteria",
      "Automation environment setup",
    ],
  },
  {
    id: "m3",
    title: "Module 3 — Test Automation Architecture (TAA)",
    topics: [
      "Test Automation Architecture concepts",
      "Layered automation architecture",
      "Automation framework design",
      "Reusable automation components",
      "Integration with test management tools",
    ],
  },
  {
    id: "m4",
    title: "Module 4 — Implementation of Test Automation",
    topics: [
      "Designing automated test scripts",
      "Test data management",
      "Automated test execution",
      "Continuous integration support",
      "Test automation development practices",
    ],
  },
  {
    id: "m5",
    title: "Module 5 — Deployment of Test Automation",
    topics: [
      "Automation deployment strategy",
      "Integration with CI/CD pipelines",
      "Automation reporting and dashboards",
      "Monitoring automated test runs",
      "Handling automation failures",
    ],
  },
  {
    id: "m6",
    title: "Module 6 — Maintaining Test Automation",
    topics: [
      "Test automation maintenance strategies",
      "Refactoring automated test scripts",
      "Version control for automation",
      "Managing automation scalability",
      "Maintaining automation environments",
    ],
  },
  {
    id: "m7",
    title: "Module 7 — Metrics and Reporting",
    topics: [
      "Automation effectiveness metrics",
      "Automation coverage metrics",
      "Test execution logs analysis",
      "Automation reporting techniques",
      "ROI measurement of automation",
    ],
  },
  {
    id: "m8",
    title: "Module 8 — Risks and Continuous Improvement",
    topics: [
      "Risks in automation projects",
      "Automation project governance",
      "Improving automation maturity",
      "Automation best practices",
      "Continuous improvement models",
    ],
  },
];

const tools = [
  "Selenium",
  "Cypress",
  "Playwright",
  "Appium",
  "REST API Tools",
  "Jenkins / CI Pipelines",
  "Git Version Control",
];

const examDetails = [
  { icon: FileText, label: "Format", value: "Multiple Choice" },
  { icon: BookOpen, label: "Questions", value: "40 Questions" },
  { icon: Clock, label: "Duration", value: "90 Minutes" },
  { icon: Award, label: "Pass Score", value: "65%" },
  { icon: Globe, label: "Language", value: "English & Others" },
  { icon: ClipboardList, label: "Exam Type", value: "Closed Book" },
];

const careerRoles = [
  "Test Automation Engineer",
  "SDET (Software Development Engineer in Test)",
  "QA Automation Architect",
  "Test Automation Consultant",
  "QA Lead / Test Manager",
];

const careerBenefits = [
  {
    icon: Star,
    title: "Higher Credibility",
    desc: "Globally recognized credential validating your automation expertise",
  },
  {
    icon: TrendingUp,
    title: "Better Opportunities",
    desc: "Access to senior QA automation roles and leadership positions",
  },
  {
    icon: Briefcase,
    title: "Framework Mastery",
    desc: "Lead scalable automation framework initiatives",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    desc: "Recognized by employers worldwide in software testing",
  },
];

const deliverables = [
  {
    icon: FileText,
    title: "Official Course Slides",
    desc: "Aligned with the ISTQB syllabus",
  },
  {
    icon: BookOpen,
    title: "ISTQB CTAL-TAE Syllabus",
    desc: "Official exam study guide from ISTQB",
  },
  {
    icon: ClipboardList,
    title: "Practice Exam Questions",
    desc: "Curated question bank for exam prep",
  },
  {
    icon: HelpCircle,
    title: "Mock Tests",
    desc: "Full-length timed mock exams",
  },
  {
    icon: Award,
    title: "Completion Certificate",
    desc: "Certificate from the training provider",
  },
  {
    icon: Package,
    title: "Exam Prep Guidance",
    desc: "Tips and strategies to maximise your score",
  },
];

const pricingPlans = [
  {
    id: "self",
    label: "Self-Paced",
    sublabel: "Online Training",
    price: "₹12,999",
    original: "₹18,999",
    badge: null,
    highlight: false,
    features: [
      "20–24 hrs recorded video content",
      "Official ISTQB syllabus materials",
      "Practice exam questions",
      "Mock tests included",
      "Certificate of completion",
      "6-month content access",
    ],
  },
  {
    id: "live",
    label: "Live Training",
    sublabel: "Instructor-Led",
    price: "₹21,999",
    original: "₹29,999",
    badge: "Most Popular",
    highlight: true,
    features: [
      "3-day live instructor sessions",
      "Interactive doubt-clearing",
      "All self-paced content included",
      "Mock tests + personal mentoring",
      "Exam registration fee included",
      "Post-training Q&A support",
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    sublabel: "Team Training",
    price: "Custom",
    original: null,
    badge: null,
    highlight: false,
    features: [
      "Minimum batch of 5 participants",
      "Fully customised schedule",
      "Dedicated corporate trainer",
      "Onsite or virtual delivery",
      "Team performance reports",
      "Post-training support",
    ],
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CoursePage() {
  const [openAccordion, setOpenAccordion] = useState<string[]>(["m1"]);

  return (
    <div className="min-h-screen bg-white font-sans pt-10">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 pt-14 pb-20">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #1e40af 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 text-xs font-medium px-3 py-1">
                  ISTQB Advanced Level
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 text-xs font-medium px-3 py-1">
                  Globally Recognized
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Certified Tester —{" "}
                <span className="text-blue-600">Test Automation Engineer</span>
                <br />
                <span className="text-xl sm:text-2xl font-semibold text-slate-500 mt-1 block">
                  (CT-TAE) · ISTQB Advanced Level
                </span>
              </h1>
              <p className="text-slate-600 text-base leading-relaxed mb-6 max-w-lg">
                Advanced qualification for professionals designing, developing,
                and maintaining automated testing solutions across Agile,
                DevOps, and CI/CD environments.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 text-sm text-slate-600">
                {[
                  { icon: Clock, text: "3 Days / 20–24 Hours" },
                  { icon: Users, text: "All Experience Levels" },
                  { icon: Award, text: "ISTQB Certified" },
                  { icon: BookOpen, text: "8 Modules" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-blue-500" />
                    {text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <EnrollDialog
                  trigger={
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 gap-2"
                    >
                      Enroll Now <ChevronRight className="w-4 h-4" />
                    </Button>
                  }
                />
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6"
                >
                  Download Syllabus
                </Button>
              </div>
            </div>

            <div className="space-y-4 animate-fadeInRight">
              {/* Image placeholder */}
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Award className="w-7 h-7 text-blue-600" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    Course Preview
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">1280 × 720</p>
                </div>
              </div>
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Exam Questions", value: "40" },
                  { label: "Pass Score", value: "65%" },
                  { label: "Exam Duration", value: "90 min" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm"
                  >
                    <p className="text-2xl font-bold text-slate-900">
                      {s.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Course Overview
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">
              Validates expertise in automation architecture, framework design,
              tool selection, and maintenance of automated test suites.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-2.5">
                {courseHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/80">
              <h3 className="font-semibold text-slate-900 mb-4">
                Course Objectives
              </h3>
              <ul className="space-y-2.5">
                {objectives.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Course Curriculum
            </h2>
            <p className="text-slate-500 text-sm">
              <Badge variant="outline" className="text-xs mr-2">
                8 Modules
              </Badge>
              Full ISTQB CTAL-TAE v2.0 syllabus coverage
            </p>
          </div>
          <Accordion
            type="multiple"
            value={openAccordion}
            onValueChange={setOpenAccordion}
            className="space-y-2"
          >
            {modules.map((mod, idx) => (
              <AccordionItem
                key={mod.id}
                value={mod.id}
                className="bg-white border border-slate-200 rounded-xl px-5 data-[state=open]:border-blue-200 data-[state=open]:bg-blue-50/20 transition-colors"
              >
                <AccordionTrigger className="text-sm font-medium text-slate-800 hover:no-underline py-4 hover:text-blue-600">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 border border-blue-100 rounded-md px-2 py-0.5 shrink-0 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {mod.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul className="space-y-2 ml-9">
                    {mod.topics.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── AUDIENCE + PREREQUISITES ─────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Who Should Attend
            </h2>
            <p className="text-slate-500 text-sm">
              Designed for testing professionals looking to advance their
              automation skills.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">
                  Target Audience
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {audience.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Prerequisites</h3>
              </div>
              <div className="bg-amber-50 border border-amber-200/70 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1.5">
                  Mandatory
                </p>
                <p className="text-sm text-slate-800 font-medium">
                  {prerequisites.mandatory}
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Recommended
              </p>
              <ul className="space-y-2">
                {prerequisites.recommended.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLS + EXAM ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Tools & Technologies
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Hands-on exposure to tools used in real automation projects.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="text-sm px-3 py-1.5 bg-white border-slate-200 text-slate-700 font-medium hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Exam Details
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                ISTQB CTAL-TAE v2.0 — issued by ISTQB, the world&apos;s leading
                testing certification body.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {examDetails.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Career Benefits
            </h2>
            <p className="text-slate-500 text-sm">
              Unlock new career paths and position yourself as an automation
              expert.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {careerBenefits.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
                >
                  <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Roles After Certification
                </h3>
                <p className="text-blue-200 text-sm mb-5">
                  Open doors to high-demand positions
                </p>
                <div className="space-y-2.5">
                  {careerRoles.map((role) => (
                    <div
                      key={role}
                      className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 text-sm font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-200 shrink-0" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              What You&apos;ll Receive
            </h2>
            <p className="text-slate-500 text-sm">
              Everything you need — from study materials to exam prep.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverables.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Pricing Plans
            </h2>
            <p className="text-slate-500 text-sm">
              Choose the format that fits your schedule and learning style.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-6 flex flex-col transition-shadow ${
                  plan.highlight
                    ? "border-blue-500 shadow-lg shadow-blue-100"
                    : "border-slate-200"
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 text-xs font-semibold whitespace-nowrap">
                    {plan.badge}
                  </Badge>
                )}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">
                    {plan.sublabel}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">
                    {plan.label}
                  </h3>
                </div>
                <div className="mb-5">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  {plan.original && (
                    <span className="text-sm text-slate-400 line-through ml-2">
                      {plan.original}
                    </span>
                  )}
                  {plan.original && (
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">
                      Save ₹
                      {(
                        parseInt(plan.original.replace(/\D/g, "")) -
                        parseInt(plan.price.replace(/\D/g, ""))
                      ).toLocaleString("en-IN")}
                    </p>
                  )}
                  {plan.id === "corporate" && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Contact us for team pricing
                    </p>
                  )}
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.highlight ? "text-blue-500" : "text-slate-400"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.id === "corporate" ? (
                  <Button variant="outline" className="w-full border-slate-300">
                    Contact Us
                  </Button>
                ) : (
                  <EnrollDialog
                    defaultPlan={plan.id}
                    trigger={
                      <Button
                        className={`w-full ${
                          plan.highlight
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-slate-900 hover:bg-slate-800 text-white"
                        }`}
                      >
                        Enroll Now
                      </Button>
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-slate-400">
            All prices inclusive of taxes · EMI options available · 7-day refund
            policy
          </p>
        </div>
      </section>

      {/* ── STICKY CTA ───────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-semibold text-slate-900 text-sm">
              ISTQB CT-TAE Certification
            </p>
            <p className="text-xs text-slate-500">
              Advanced Level · ISTQB Certified · Globally Recognized
            </p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              7-day refund guarantee
            </div>
            <EnrollDialog
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 text-sm gap-1.5">
                  Enroll Now <ChevronRight className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* bottom padding so sticky bar doesn't cover content */}
      <div className="h-16" />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.6s 0.15s ease-out both;
        }
      `}</style>
    </div>
  );
}
