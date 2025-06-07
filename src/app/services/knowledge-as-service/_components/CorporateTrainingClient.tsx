/* eslint-disable @next/next/no-img-element */
"use client";
// app/corporate-training/CorporateTrainingClient.tsx

import { Badge } from "@/components/ui/badge";
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
  Award,
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
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-20">
      {/* Hero Section */}
      <section className="relative px-20 flex items-center overflow-hidden bg-gradient-to-br  from-purple-600 via-blue-600 to-teal-500 text-white">
        <div className="w-full relative container mx-auto px-4 py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Corporate Training Solutions
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your{" "}
              <span className="text-gradient bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Workforce
              </span>{" "}
              with AI-Powered Skilling
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed">
              Comprehensive Corporate Training programs designed to bridge skill
              gaps and accelerate organizational growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  router.push("/contact");
                }}
                className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg"
              >
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="w-[70vw]">
          <img
            src="/app/corporate-training/Corporate.png"
            alt="corporate-training"
            className=" object-cover w-full h-full rounded-md border-4 border-white"
          />
        </div>
        {/* <div className="absolute inset-0 bg-black/30"></div> */}
      </section>

      {/* Training Mandate Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Corporate Training Mandate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to people supply chain management that
              transforms your workforce from assessment to deployment
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
                  step: "1",
                  title: "Assess Workforce Readiness",
                  description: "Evaluate current skills and competencies",
                  icon: BarChart3,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "2",
                  title: "Training Need Analysis",
                  description: "Determine areas needing improvement",
                  icon: Target,
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  step: "3",
                  title: "Curate Training Programs",
                  description: "Develop tailored learning experiences",
                  icon: BookOpen,
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  step: "4",
                  title: "Monitor Learning Outcomes",
                  description: "Track effectiveness through ILT & VLT methods",
                  icon: TrendingUp,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "5",
                  title: "People Supply Chain Management",
                  description: "Strategically allocate skilled talent",
                  icon: Users,
                  color: "from-red-500 to-rose-500",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="relative h-full border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="w-8 h-8 rounded-full p-0 flex items-center justify-center mx-auto mb-2"
                      >
                        {item.step}
                      </Badge>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-gray-600">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                title: "Skilling Youths",
                description:
                  "Equipping young individuals with essential tech skills for future readiness",
                icon: Users,
                level: "1",
                color: "blue",
              },
              {
                title: "CSR - Digital Literacy",
                description:
                  "Enhancing digital awareness and literacy among school students and teachers",
                icon: Monitor,
                level: "2",
                color: "purple",
              },
              {
                title: "B2I - Employability",
                description:
                  "Equipping graduates with industry-relevant skills through expert faculty",
                icon: Building2,
                level: "3",
                color: "yellow",
              },
              {
                title: "Corporate Training - Upskilling",
                description:
                  "Providing advanced training to working professionals for career growth",
                icon: TrendingUp,
                level: "4",
                color: "purple",
              },
              {
                title: "Corporate Training - Cross-Skilling",
                description:
                  "Enabling professionals to acquire skills in diverse fields with global certifications",
                icon: Globe,
                level: "5",
                color: "orange",
              },
              {
                title: "Corporate Training - Reskilling",
                description:
                  "Helping professionals adapt to new roles and technologies with global certifications",
                icon: Lightbulb,
                level: "6",
                color: "blue",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`bg-${service.color}-500 text-white`}>
                        {service.level}
                      </Badge>
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
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
      <section className="py-20 bg-white">
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
      </section>

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
