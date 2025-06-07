"use client";
import React from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  Globe,
  BookOpen,
  Award,
  Clock,
} from "lucide-react";

const MBAStudentPrograms = () => {
  const mbaCourses = [
    {
      area: "Marketing Management",
      course: "Digital Marketing / SAP SD",
      duration: "60 Hours",
      certification: "Google Digital Marketing Certificate",
      targetJob: "Digital Marketing Executive",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      area: "Financial Management",
      course: "Financial Modeling / SAP FICO",
      duration: "60-160 Hours",
      certification: "Corporate Finance Institute (CFI)",
      targetJob: "Financial Analyst",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      area: "Human Resource Management",
      course: "People Analytics / SAP HCM",
      duration: "60 Hours",
      certification: "SAP, Tableau, Microsoft",
      targetJob: "HR Analyst",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      area: "Systems Management",
      course: "Business Analyst Professional, PMP",
      duration: "45 Hours",
      certification: "IIBA ECBA, PMP, PMI",
      targetJob: "Business Analyst",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-indigo-500",
    },
    {
      area: "Supply Chain Management",
      course: "Supply Chain Analytics / SAP SD",
      duration: "60-160 Hours",
      certification: "APICS CPIM & SAP",
      targetJob: "Supply Chain Analyst",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-teal-500",
    },
    {
      area: "Business Data Analytics",
      course: "Data Analysis with Python, Power BI",
      duration: "60 Hours",
      certification: "IBM Data Analyst Certificate",
      targetJob: "Data Analyst",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-orange-500",
    },
  ];

  const artsAndSciencePrograms = [
    {
      field: "B.A. English/Journalism",
      courses: [
        "Digital Marketing",
        "AI Content Creation",
        "Generative AI Tools",
      ],
      duration: "40-60 Hours",
      roles: [
        "Content Strategist",
        "SEO Executive",
        "Social Media Manager",
        "AI Copywriter",
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      field: "B.Com/BBA",
      courses: ["Financial Analytics", "Excel & Power BI", "SAP FICO"],
      duration: "50-60 Hours",
      roles: [
        "Financial Analyst",
        "MIS Executive",
        "Business Analyst (Junior)",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      field: "B.Sc. Computer Science/IT",
      courses: ["Full Stack Java", "Python", "Cybersecurity", "GenAI"],
      duration: "60-200 Hours",
      roles: [
        "Software Developer",
        "Cybersecurity Analyst",
        "AI Engineer (Entry-Level)",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      field: "B.Sc. Life Sciences/Biotech",
      courses: ["Health Data Analytics", "Digital Health with AI"],
      duration: "45 Hours",
      roles: [
        "Health Data Analyst",
        "Clinical Research Assistant",
        "Digital Health Coordinator",
      ],
      color: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            MBA & Student Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs for MBA students and undergraduate courses
            across multiple disciplines with global certifications
          </p>
        </div>

        {/* MBA Programs */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            MBA Specialization Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mbaCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${course.color} p-2 rounded-lg text-white`}>
                    {course.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {course.area}
                  </h4>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Course:
                    </span>
                    <p className="text-sm text-gray-800">{course.course}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Certified</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Certification:
                    </span>
                    <p className="text-sm text-blue-600">
                      {course.certification}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-500">
                      Target Role:
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      {course.targetJob}
                    </p>
                  </div>
                </div>

                {/* Placeholder for course image */}
                <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Course Visual</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arts & Science Programs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Arts & Science Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artsAndSciencePrograms.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  className={`bg-gradient-to-r ${program.color} p-6 text-white`}
                >
                  <h4 className="text-xl font-bold mb-2">{program.field}</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{program.duration}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-500 mb-2">
                      RECOMMENDED COURSES
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {program.courses.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-500 mb-2">
                      TARGET ROLES
                    </h5>
                    <div className="space-y-1">
                      {program.roles.map((role, roleIndex) => (
                        <div
                          key={roleIndex}
                          className="text-sm text-gray-700 flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Placeholder for program image */}
                  <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      Program Visual
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employability Skills Pyramid */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Employability Skills Framework
            </h3>
            <p className="text-blue-100">
              5-tier development structure for MBA, Engineering, Arts & Science
              students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">5</div>
              <div className="text-sm font-semibold mb-1">
                Future-ready Skills
              </div>
              <div className="text-xs text-blue-100">
                High-impact industry roles
              </div>
            </div>

            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">4</div>
              <div className="text-sm font-semibold mb-1">
                Real-world Projects
              </div>
              <div className="text-xs text-blue-100">Practical application</div>
            </div>

            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">3</div>
              <div className="text-sm font-semibold mb-1">
                Industry Certifications
              </div>
              <div className="text-xs text-blue-100">Career advancement</div>
            </div>

            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">2</div>
              <div className="text-sm font-semibold mb-1">
                Hands-on Training
              </div>
              <div className="text-xs text-blue-100">Practical experience</div>
            </div>

            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">1</div>
              <div className="text-sm font-semibold mb-1">
                Core Competencies
              </div>
              <div className="text-xs text-blue-100">
                Essential job market skills
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MBAStudentPrograms;
