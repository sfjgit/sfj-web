import React, { useState } from "react";

const ArtsAndScienceCourses = () => {
  const [activeTab, setActiveTab] = useState("english");

  const courseData = {
    english: {
      title: "B.A. English/Journalism",
      color: "bg-blue-500",
      courses: "Digital Marketing, AI Content Creation, Generative AI Tools",
      duration: "40-60 Hours",
      roles: [
        "Content Strategist",
        "SEO Executive",
        "Social Media Manager",
        "AI Copywriter",
      ],
    },
    commerce: {
      title: "B.Com/BBA",
      color: "bg-green-500",
      courses: "Financial Analytics, Excel & Power BI, SAP FICO",
      duration: "50-60 Hours",
      roles: [
        "Financial Analyst",
        "MIS Executive",
        "Business Analyst (Junior)",
      ],
    },
    computer: {
      title: "B.Sc. Computer Science/IT",
      color: "bg-purple-500",
      courses: "Full Stack Java, Python, Cybersecurity, GenAI",
      duration: "60-200 Hours",
      roles: [
        "Software Developer",
        "Cybersecurity Analyst",
        "AI Engineer (Entry-Level)",
      ],
    },
    mathematics: {
      title: "B.Sc. Mathematics/Statistics",
      color: "bg-indigo-500",
      courses: "Data Science with Python & Power BI, Excel Analytics",
      duration: "60 Hours",
      roles: ["Data Analyst", "BI Developer", "Market Research Analyst"],
    },
    physics: {
      title: "B.Sc. Physics/Electronics",
      color: "bg-yellow-500",
      courses: "IoT, Embedded Systems, Automation with Python",
      duration: "50 Hours",
      roles: ["IoT Developer", "Automation Analyst", "Tech Support Engineer"],
    },
    lifesciences: {
      title: "B.Sc. Life Sciences/Biotech",
      color: "bg-orange-500",
      courses: "Health Data Analytics, Digital Health with AI",
      duration: "45 Hours",
      roles: [
        "Health Data Analyst",
        "Clinical Research Assistant",
        "Digital Health Coordinator",
      ],
    },
    sociology: {
      title: "B.A. Sociology/Psychology",
      color: "bg-pink-500",
      courses: "HR Tech, Recruitments",
      duration: "40-50 Hours",
      roles: [
        "HR Analyst",
        "Behavioral Data Analyst",
        "Learning & Development",
      ],
    },
    general: {
      title: "B.Sc. General/Physical Sciences",
      color: "bg-teal-500",
      courses: "ServiceNow, Azure Basics, Tech Support",
      duration: "50 Hours",
      roles: ["IT Support Analyst", "Technical Helpdesk Executive"],
    },
    crossspecial: {
      title: "Cross-Specialization (All Streams)",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      courses: "Generative AI Tools & Applications",
      duration: "200 Hours",
      roles: [
        "GenAI Content Creator",
        "AI Video Script Writer",
        "AI Legal Research Assistant",
      ],
    },
  };

  const tabs = [
    { id: "english", label: "English/Journalism" },
    { id: "commerce", label: "Commerce/BBA" },
    { id: "computer", label: "Computer Science" },
    { id: "mathematics", label: "Mathematics/Stats" },
    { id: "physics", label: "Physics/Electronics" },
    { id: "lifesciences", label: "Life Sciences" },
    { id: "sociology", label: "Sociology/Psychology" },
    { id: "general", label: "General Sciences" },
    { id: "crossspecial", label: "Cross-Specialization" },
  ];

  const getIcon = (tabId: string) => {
    const iconMap = {
      english: "📚",
      commerce: "💼",
      computer: "💻",
      mathematics: "📊",
      physics: "⚙️",
      lifesciences: "🧬",
      sociology: "👥",
      general: "🧠",
      crossspecial: "⚡",
    };
    // @ts-expect-error error
    return iconMap[tabId] || "📚";
  };

  // @ts-expect-error error
  const currentCourse = courseData[activeTab];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl mr-2">🎓</span>
            <h2 className="text-3xl font-bold text-gray-900">
              Recommended Courses for Arts & Science Students
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover career-focused training programs tailored to your academic
            background
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Details Card */}
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Course Info */}
              <div>
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 ${currentCourse.color} rounded-lg flex items-center justify-center text-white mr-4 text-xl`}
                  >
                    {getIcon(activeTab)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentCourse.title}
                    </h3>
                    <p className="text-gray-500 text-sm">Academic Background</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="text-lg mr-2">📚</span>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Recommended Courses
                      </h4>
                    </div>
                    <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                      {currentCourse.courses}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-3">
                      <span className="text-lg mr-2">⏰</span>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Duration
                      </h4>
                    </div>
                    <p className="text-green-700 font-semibold text-xl">
                      {currentCourse.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Job Roles */}
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-lg mr-2">🎯</span>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Target Job Roles
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentCourse.roles.map(
                    (role: string, index: React.Key | null | undefined) => (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-semibold text-sm">
                            {
                              // @ts-expect-error error
                              index + 1
                            }
                          </span>
                        </div>
                        <span className="text-gray-800 font-medium">
                          {role}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm opacity-90">Placement Rate</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">₹4-8L</div>
                    <div className="text-sm opacity-90">Avg. Salary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Choose from our industry-aligned programs designed specifically for
            your academic background
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore All Courses
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Syllabus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtsAndScienceCourses;
