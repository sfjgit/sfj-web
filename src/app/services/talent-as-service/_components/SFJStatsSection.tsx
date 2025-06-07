import React from "react";
import {
  FaCalendar,
  FaUsers,
  FaBriefcase,
  FaGraduationCap,
  FaLaptopCode,
  FaGlobe,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaChartBar,
  FaCogs,
} from "react-icons/fa";

const businessStats = [
  {
    label: "Years in Business",
    value: "13+",
    subtext: "Since 2011",
    icon: FaCalendar,
    color: "text-blue-600",
  },
  {
    label: "Global Clients",
    value: "450+",
    subtext: "24+ Countries",
    icon: FaUsers,
    color: "text-green-600",
  },
  {
    label: "IT Professionals Placed",
    value: "10K+",
    subtext: "3-25+ Years Exp",
    icon: FaBriefcase,
    color: "text-purple-600",
  },
  {
    label: " IT Professionals Trained",
    value: "400,000+",
    subtext: "Certified Programs",
    icon: FaGraduationCap,
    color: "text-orange-600",
  },
  {
    label: "Online Courses",
    value: "640+",
    subtext: "Delivered",
    icon: FaLaptopCode,
    color: "text-cyan-600",
  },
  {
    label: "ILP Programs",
    value: "30K+",
    subtext: "Delivered",
    icon: FaCogs,
    color: "text-indigo-600",
  },
];

const skillsExpertise = [
  {
    skill: "Cloud & DevOps",
    trained: "5000",
    placed: "300",
    icon: FaCloudUploadAlt,
  },
  {
    skill: "Programming & Mobile",
    trained: "8000",
    placed: "500",
    icon: FaLaptopCode,
  },
  {
    skill: "Data & Analytics",
    trained: "4000",
    placed: "300",
    icon: FaChartBar,
  },
  { skill: "ERP Solutions", trained: "3000", placed: "400", icon: FaCogs },
  {
    skill: "Cyber Security",
    trained: "1000",
    placed: "100",
    icon: FaShieldAlt,
  },
  { skill: "AI & ML", trained: "2000", placed: "100", icon: FaBriefcase },
];

export default function SFJStatsSection() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-4">
            <FaGlobe className="mr-2" />
            SFJ Business Sense
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Impact</span> & Expertise
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Business Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {businessStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center ${stat.color}`}
                >
                  <IconComponent className="text-xl" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">{stat.subtext}</div>
              </div>
            );
          })}
        </div>

        {/* Skills Expertise Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            2023-2024 Training & Placement Expertise
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsExpertise.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      {skill.skill}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Trained:</span>
                      <span className="font-bold text-green-600">
                        {skill.trained}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Placed:</span>
                      <span className="font-bold text-blue-600">
                        {skill.placed}
                      </span>
                    </div>
                  </div>

                  {/* Success Rate Bar */}
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (parseInt(skill.placed) / parseInt(skill.trained)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {Math.round(
                        (parseInt(skill.placed) / parseInt(skill.trained)) * 100
                      )}
                      % Placement Rate
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Technologies */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">
              Key Technologies & Platforms
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Tableau",
                "Power BI",
                "Qlik Sense",
                "Python",
                "Salesforce",
                "SAP",
                "AWS",
                "Snowflake",
                "Service Now",
                "Generative AI",
                "Blockchain",
                "IoT",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Highlight */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-green-600">
                30% Reduced hiring cost
              </span>{" "}
              •
              <span className="font-semibold text-blue-600 ml-2">
                1000+ Successful onboardings
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
