/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
// app/corporate-training/CorporateTrainingClient.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  BookOpen,
  Monitor,
  Globe,
  Building2,
  Lightbulb,
  BarChart3,
  Settings,
  Zap,
  Brain,
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  ChevronRight,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CorporateTrainingClient() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-white overflow-hidden pt-10">
        {/* Geometric Background Pattern */}

        <div className="max-w-7xl mx-auto px-6 py-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
            {/* Left Content */}
            <div className="space-y-4 pt-10">
              {/* Header Section */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-2">
                  {/* Main Title as Badge */}
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">
                    Corporate Training Solutions
                  </div>
                  {/* Subtitle - Bigger Text */}
                  <h2 className="text-2xl lg:text-3xl text-gray-800 font-bold leading-tight mt-3">
                    Transform Your{" "}
                    <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                      Workforce
                    </span>
                    <br />
                    <span className="text-blue-600">
                      'Bridge Every Skill Gap'
                    </span>
                  </h2>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-base text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Comprehensive Corporate Training programs designed to bridge
                skill gaps and accelerate organizational growth through
                cutting-edge AI and digital transformation.
              </motion.p>

              {/* Features */}
              <motion.div
                className="grid grid-cols-2 gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[
                  "AI-Driven Learning",
                  "Custom Curricula",
                  "Skills Assessment",
                  "Progress Tracking",
                  "Industry Experts",
                  "Certification Programs",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded border border-blue-100"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-sm group">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/90 hover:cursor-pointer backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md text-sm">
                  Learn More
                </button>
              </motion.div>
            </div>

            {/* Right Content - Image with Geometric Background */}
            <motion.div
              className="relative h-full flex-col flex justify-center items-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Geometric shapes behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-400 transform rotate-45 opacity-10"></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-15"></div>
              </div>

              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="/app/corporate-training/Corporate.png"
                  alt="Corporate Training Program"
                  className="w-[80%] object-cover rounded-lg shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                />

                {/* Floating stats cards */}
                <div className="absolute -top-4 -left-10 bg-white rounded-lg shadow-lg p-3 border border-blue-100">
                  <div className="text-xs text-gray-500">Success Rate</div>
                  <div className="text-lg font-bold text-blue-600">95%</div>
                </div>

                <div className="absolute -bottom-4 right-10 bg-white rounded-lg shadow-lg p-3 border border-blue-100">
                  <div className="text-xs text-gray-500">
                    Enterprise Clients
                  </div>
                  <div className="text-lg font-bold text-blue-600">350+</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Mandate Section */}
      {/* Training Mandate Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern
                id="training-grid"
                patternUnits="userSpaceOnUse"
                width="20"
                height="20"
              >
                <circle cx="10" cy="10" r="2" fill="#3B82F6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#training-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Target className="mr-2 h-4 w-4" />
              Strategic Training Framework
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Corporate Training
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Transformation Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A systematic approach to people supply chain management that
              transforms your workforce from assessment to deployment through
              data-driven methodologies
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Process Flow */}
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 hidden lg:block transform -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Assess Workforce Readiness",
                    description:
                      "Comprehensive skill mapping and competency evaluation using AI-driven analytics",
                    icon: BarChart3,
                    gradient: "from-blue-500 to-cyan-500",
                    bgGradient: "from-blue-50 to-cyan-50",
                    features: [
                      "Skills Assessment",
                      "Gap Analysis",
                      "Baseline Metrics",
                    ],
                  },
                  {
                    step: "02",
                    title: "Training Need Analysis",
                    description:
                      "Strategic identification of learning priorities aligned with business objectives",
                    icon: Target,
                    gradient: "from-emerald-500 to-teal-500",
                    bgGradient: "from-emerald-50 to-teal-50",
                    features: [
                      "Business Alignment",
                      "Priority Matrix",
                      "ROI Planning",
                    ],
                  },
                  {
                    step: "03",
                    title: "Curate Training Programs",
                    description:
                      "Design personalized learning pathways with industry-leading methodologies",
                    icon: BookOpen,
                    gradient: "from-yellow-500 to-orange-500",
                    bgGradient: "from-yellow-50 to-orange-50",
                    features: [
                      "Custom Curriculum",
                      "Multi-Modal Learning",
                      "Expert Instructors",
                    ],
                  },
                  {
                    step: "04",
                    title: "Monitor Learning Outcomes",
                    description:
                      "Real-time tracking and analytics through advanced ILT & VLT frameworks",
                    icon: TrendingUp,
                    gradient: "from-purple-500 to-pink-500",
                    bgGradient: "from-purple-50 to-pink-50",
                    features: [
                      "Progress Tracking",
                      "Performance Analytics",
                      "Adaptive Learning",
                    ],
                  },
                  {
                    step: "05",
                    title: "People Supply Chain",
                    description:
                      "Strategic talent deployment and continuous workforce optimization",
                    icon: Users,
                    gradient: "from-indigo-500 to-blue-500",
                    bgGradient: "from-indigo-50 to-blue-50",
                    features: [
                      "Talent Allocation",
                      "Career Pathing",
                      "Succession Planning",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="relative"
                  >
                    {/* Step Number Circle */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg border-4 border-white`}
                      >
                        <span className="text-white font-bold text-sm">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    {/* Main Card */}
                    <div
                      className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 pt-12 h-full border border-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2 pt-4">
                          {item.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-center space-x-2"
                            >
                              <div
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                              ></div>
                              <span className="text-xs font-medium text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-b-2xl`}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Stats */}
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={fadeInUp}
            >
              {[
                { number: "500+", label: "Companies Trained", icon: Building },
                { number: "95%", label: "Success Rate", icon: TrendingUp },
                {
                  number: "50K+",
                  label: "Professionals Upskilled",
                  icon: Users,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fostering Skilled Talent for an AI-Powered Global Economy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From youth skilling to professional reskilling, we cover the
              entire spectrum of workforce development
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Corporate Training - Upskilling",
                description:
                  "Providing advanced training to working professionals for career growth",
                icon: TrendingUp,
                color: "purple",
              },
              {
                title: "Corporate Training - Cross-Skilling",
                description:
                  "Enabling professionals to acquire skills in diverse fields with global certifications",
                icon: Globe,
                color: "orange",
              },
              {
                title: "Corporate Training - Reskilling",
                description:
                  "Helping professionals adapt to new roles and technologies with global certifications",
                icon: Lightbulb,
                color: "blue",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Journey to Global Talent Empowerment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over a decade of excellence in transforming careers and
              organizations worldwide
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  year: "2011",
                  title: "Founding",
                  description: "Established a strong foundation in IT training",
                  icon: Building2,
                  color: "blue",
                },
                {
                  year: "2015",
                  title: "Training 3,00,000+",
                  description:
                    "Achieved a significant milestone in training IT professionals",
                  icon: Users,
                  color: "orange",
                },
                {
                  year: "2018",
                  title: "Delivering 640+ Courses",
                  description:
                    "Expanded educational offerings with high-impact courses",
                  icon: BookOpen,
                  color: "yellow",
                },
                {
                  year: "2020",
                  title: "Partnering with Key Organizations",
                  description:
                    "Collaborated with Universities, Skill Mission, NSDC & NASSCOM",
                  icon: Globe,
                  color: "purple",
                },
                {
                  year: "2022",
                  title: "Global Presence",
                  description:
                    "Established offices in multiple countries (SG, UAE, US)",
                  icon: Award,
                  color: "orange",
                },
                {
                  year: "2023",
                  title: "Digital Literacy Programs",
                  description:
                    "Initiated programs to bridge the digital divide in schools",
                  icon: Monitor,
                  color: "blue",
                },
                {
                  year: "2024",
                  title: "CSR Initiatives",
                  description:
                    "Actively engaged in Partners CSR-led digital education initiatives",
                  icon: Star,
                  color: "indigo",
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:shadow-md transition-all duration-300"
                  variants={fadeInUp}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-${milestone.color}-500 to-${milestone.color}-600 flex items-center justify-center flex-shrink-0`}
                  >
                    <milestone.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`bg-${milestone.color}-500 text-white`}>
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Collaborative Curriculum Development */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Collaborative Curriculum Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Working with industry leaders, academic institutions, and aspiring
              learners to create comprehensive learning experiences
            </p>
          </motion.div>

          <motion.div
            className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Aspirational Learners",
                description:
                  "Students and jobseekers gaining future-ready skills",
                icon: Users,
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Academic Institutions",
                description:
                  "Educational entities providing micro-credentials and infrastructure",
                icon: Building2,
                color: "from-emerald-500 to-emerald-600",
              },
              {
                title: "IT Organizations",
                description:
                  "Tech companies offering infrastructure and mentoring",
                icon: Code,
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Industry Partners",
                description:
                  "Businesses sharing knowledge and offering opportunities",
                icon: Globe,
                color: "from-orange-500 to-orange-600",
              },
            ].map((stakeholder, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stakeholder.color} flex items-center justify-center mb-4`}
                    >
                      <stakeholder.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {stakeholder.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      {stakeholder.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Methods Section */}
      <section className="py-20 bg-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Which Training Method Should Be Used?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer diverse training methodologies tailored to your
              organization&#39;s specific needs and learning objectives
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Instructor-Led Training",
                description:
                  "Allows real-time interaction and immediate feedback",
                icon: Users,
                color: "blue",
              },
              {
                title: "E-Learning",
                description: "Offers flexibility and self-paced learning",
                icon: Monitor,
                color: "emerald",
              },
              {
                title: "Blended Learning",
                description:
                  "Combines traditional and online methods for comprehensive learning",
                icon: Settings,
                color: "orange",
              },
              {
                title: "On-the-Job Training",
                description:
                  "Effective for practical skills development in the workplace",
                icon: Building2,
                color: "purple",
              },
              {
                title: "Simulation-Based Training",
                description:
                  "Replicates real-world scenarios for hands-on experience",
                icon: Zap,
                color: "pink",
              },
            ].map((method, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${method.color}-100 flex items-center justify-center`}
                      >
                        <method.icon
                          className={`h-6 w-6 text-${method.color}-600`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {method.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Lifecycle Management */}
      <section className="py-20 bg-gradient-to-br max-w-7xl mx-auto from-slate-50 to-blue-50">
        <div className="container mx-auto ">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Training Lifecycle Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial candidate to employable professional - our
              comprehensive transformation process
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  stage: "Initial Candidate",
                  description: "Lacking specific industry skills",
                  icon: Users,
                  color: "red",
                },
                {
                  stage: "Personalized Assessments",
                  description: "Identify strengths and weaknesses",
                  icon: BarChart3,
                  color: "orange",
                },
                {
                  stage: "Structured LMS Learning",
                  description:
                    "Guided educational path with job-aligned modules",
                  icon: BookOpen,
                  color: "yellow",
                },
                {
                  stage: "Expert-Led Sessions",
                  description:
                    "Interactive, collaborative environment with hands-on projects",
                  icon: Brain,
                  color: "blue",
                },
                {
                  stage: "Employable Candidate",
                  description: "Industry-ready with job placement support",
                  icon: CheckCircle,
                  color: "emerald",
                },
              ].map((stage, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-600 flex items-center justify-center mb-4`}
                      >
                        <stage.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {stage.stage}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {stage.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Assessment Platform */}
      <section className="py-20 bg-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enhanced AI Assessment Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge assessment technology that ensures accurate skill
              evaluation and secure testing environment
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Real-Time Analytics",
                description: "Provides immediate performance insights",
                icon: BarChart3,
                color: "blue",
              },
              {
                title: "Flexible Assessment Formats",
                description: "Supports various question types and tasks",
                icon: Settings,
                color: "emerald",
              },
              {
                title: "Role-Based Skill Mapping",
                description: "Aligns assessments with specific job roles",
                icon: Target,
                color: "purple",
              },
              {
                title: "AI-Enabled Proctoring",
                description: "Ensures fair and secure testing",
                icon: Shield,
                color: "orange",
              },
              {
                title: "Customizable Test Templates",
                description: "Allows for reusable and branded tests",
                icon: Database,
                color: "pink",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center`}
                      >
                        <feature.icon
                          className={`h-6 w-6 text-${feature.color}-600`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Programs Statistics */}
      <section className="py-20 bg-gradient-to-br  mx-auto from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">
              Training Programs by Professional Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              35,000+ learners trained across diverse technology domains in 2024
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                domain: "Programming & Mobile Development",
                count: "8,000",
                icon: Code,
                color: "from-pink-400 to-pink-600",
              },
              {
                domain: "Generative AI & ML",
                count: "6,000",
                icon: Brain,
                color: "from-purple-400 to-purple-600",
              },
              {
                domain: "Big Data & Analytics",
                count: "6,000",
                icon: BarChart3,
                color: "from-blue-400 to-blue-600",
              },
              {
                domain: "Cloud Technologies",
                count: "5,000",
                icon: Cloud,
                color: "from-cyan-400 to-cyan-600",
              },
              {
                domain: "ERP Systems",
                count: "5,000",
                icon: Database,
                color: "from-emerald-400 to-emerald-600",
              },
              {
                domain: "Software Testing",
                count: "2,500",
                icon: CheckCircle,
                color: "from-yellow-400 to-yellow-600",
              },
              {
                domain: "Cybersecurity",
                count: "1,000",
                icon: Shield,
                color: "from-red-400 to-red-600",
              },
              {
                domain: "IoT & Embedded",
                count: "200",
                icon: Smartphone,
                color: "from-indigo-400 to-indigo-600",
              },
            ].map((program, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center mb-4`}
                    >
                      <program.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {program.count}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      {program.domain}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of organizations that have empowered their teams
              with SFJ&apos;s comprehensive training solutions. Let&#39;s build
              the future-ready workforce your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Your Training Journey{" "}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-600 hover:bg-white/10"
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
