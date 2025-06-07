"use client";
import React from "react";
import {
  Cpu,
  Zap,
  Cog,
  Database,
  Settings,
  Code,
  Trophy,
  Users,
  Building,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EngineeringPathways = () => {
  const engineeringPrograms = [
    {
      id: "cs",
      branch: "Computer Science / IT",
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        "Java Full Stack",
        "Python",
        ".NET",
        "Gen AI",
        "Cybersecurity",
        "Data Science",
        "AWS",
        "Azure",
        "Salesforce",
        "ServiceNow",
      ],
      roles: [
        "Software Developer",
        "Full Stack Developer",
        "Cloud Engineer",
        "Data Analyst",
        "Cybersecurity Analyst",
        "Salesforce Admin",
        "AI/ML Intern",
      ],
      description: "Master modern software development and cloud technologies",
    },
    {
      id: "ece",
      branch: "Electronics & Communication",
      icon: <Zap className="h-5 w-5" />,
      skills: [
        "IoT",
        "Embedded Systems",
        "Cybersecurity",
        "Blockchain",
        "Azure",
        "AWS",
      ],
      roles: [
        "IoT Developer",
        "Embedded Engineer",
        "Network Security Analyst",
        "Blockchain Intern",
      ],
      description:
        "Bridge hardware and software with cutting-edge technologies",
    },
    {
      id: "eee",
      branch: "Electrical / EEE",
      icon: <Zap className="h-5 w-5" />,
      skills: ["IoT", "Python", "AWS", "Azure", "ABAP with HANA"],
      roles: [
        "IoT Technician",
        "Automation Developer",
        "SAP ABAP Trainee",
        "Cloud Support Engineer",
      ],
      description: "Combine electrical engineering with modern automation",
    },
    {
      id: "mech",
      branch: "Mechanical Engineering",
      icon: <Cog className="h-5 w-5" />,
      skills: ["IoT", "ServiceNow", "Python", "ERP Basics"],
      roles: [
        "Maintenance Tech with IoT",
        "ServiceNow Support Analyst",
        "ERP Support Executive",
      ],
      description: "Modernize mechanical systems with digital solutions",
    },
    {
      id: "is",
      branch: "Information Science",
      icon: <Database className="h-5 w-5" />,
      skills: [
        "Java",
        "Python",
        "Data Science",
        "Gen AI",
        "AWS",
        "Azure",
        "Salesforce",
      ],
      roles: [
        "Software Developer",
        "Data Scientist",
        "Cloud Engineer",
        "AI Developer",
      ],
      description: "Focus on data management and intelligent systems",
    },
    {
      id: "ei",
      branch: "Electronics & Instrumentation",
      icon: <Settings className="h-5 w-5" />,
      skills: ["IoT", "Cybersecurity", "Azure", "Data Science"],
      roles: [
        "IoT Developer",
        "Security Analyst",
        "Data Analyst",
        "Automation Engineer",
      ],
      description: "Precision engineering meets digital transformation",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const developmentStages = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Technical Acumen",
      desc: "Industry-specific technical knowledge",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Soft Skills",
      desc: "Emotional intelligence & teamwork",
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "Communication",
      desc: "Verbal & non-verbal mastery",
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Corporate Readiness",
      desc: "Professional workplace ethics",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Engineering Career Pathways
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized skill development programs tailored for different
            engineering branches
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Horizontal Tab Navigation */}
          <Tabs defaultValue={engineeringPrograms[0].id} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-white border border-gray-200">
                {engineeringPrograms.map((program) => (
                  <TabsTrigger
                    key={program.id}
                    value={program.id}
                    className="flex flex-col items-center gap-2 py-4 px-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-sm font-medium whitespace-nowrap"
                  >
                    {program.icon}
                    <span className="text-xs text-center leading-tight">
                      {program.branch}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            {engineeringPrograms.map((program) => (
              <TabsContent key={program.id} value={program.id} className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className=" text-blue-600">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      {program.icon}
                      {program.branch}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Skills Section */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                          Technical Skills
                        </h3>
                        <div className="space-y-3">
                          {program.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                            >
                              <span className="font-medium text-gray-900">
                                {skill}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs font-medium"
                              >
                                {idx < 3
                                  ? "Core"
                                  : idx < 6
                                  ? "Advanced"
                                  : "Specialized"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Roles Section */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                          Career Opportunities
                        </h3>
                        <div className="space-y-3">
                          {program.roles.map((role, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                            >
                              <span className="font-medium text-gray-900">
                                {role}
                              </span>
                              <Badge
                                className={`text-xs font-medium text-white ${
                                  idx < 2
                                    ? "bg-green-600"
                                    : idx < 4
                                    ? "bg-blue-600"
                                    : "bg-purple-600"
                                }`}
                              >
                                {idx < 2
                                  ? "High Demand"
                                  : idx < 4
                                  ? "Growing"
                                  : "Emerging"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Learning Path */}
                    <div className="mt-10 p-6 bg-gray-50 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                        Recommended Learning Path
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          "Foundation",
                          "Intermediate",
                          "Advanced",
                          "Specialization",
                        ].map((level, idx) => (
                          <div key={idx} className="text-center">
                            <div
                              className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                                idx === 0
                                  ? "bg-green-600"
                                  : idx === 1
                                  ? "bg-blue-600"
                                  : idx === 2
                                  ? "bg-purple-600"
                                  : "bg-orange-600"
                              }`}
                            >
                              {idx + 1}
                            </div>
                            <p className="text-base font-semibold text-gray-900">
                              {level}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {idx === 0
                                ? "3-4 months"
                                : idx === 1
                                ? "4-5 months"
                                : idx === 2
                                ? "3-4 months"
                                : "2-3 months"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Development Journey */}
          {/* <Card className="border-0 shadow-lg mt-12">
            <CardHeader className="bg-gray-800 text-white text-center">
              <CardTitle className="text-2xl">
                Student Development Journey
              </CardTitle>
              <CardDescription className="text-gray-300 text-base">
                Four-stage comprehensive skill development program
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {developmentStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="text-center p-6 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white ${
                        idx === 0
                          ? "bg-blue-600"
                          : idx === 1
                          ? "bg-green-600"
                          : idx === 2
                          ? "bg-purple-600"
                          : "bg-orange-600"
                      }`}
                    >
                      {stage.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {stage.title}
                    </h4>
                    <p className="text-sm text-gray-600">{stage.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  );
};

export default EngineeringPathways;
