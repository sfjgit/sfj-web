import React from "react";
import {
  FaCode,
  FaDatabase,
  FaMicrophone,
  FaPaintBrush,
  FaComments,
  FaFileAlt,
  FaUniversalAccess,
  FaPen,
  FaGraduationCap,
  FaShieldAlt,
} from "react-icons/fa";

const jobRoles = [
  {
    title: "Prompt Engineer",
    description: "Crafting precise prompts for AI models",
    icon: FaCode,
    color: "bg-cyan-50 text-cyan-600 border-cyan-200",
  },
  {
    title: "AI Data Annotator",
    description: "Tagging and labelling datasets for AI training",
    icon: FaDatabase,
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    title: "Voice Model Tester",
    description: "Testing and providing feedback on voice AI models",
    icon: FaMicrophone,
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  {
    title: "Generative AI Visual Designer",
    description: "Creating images/videos using AI tools",
    icon: FaPaintBrush,
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    title: "Chatbot Conversation Designer",
    description: "Designing user-friendly dialogues for chatbots",
    icon: FaComments,
    color: "bg-red-50 text-red-600 border-red-200",
  },
  {
    title: "AI Content Reviewer",
    description: "Reviewing AI-generated content for relevance and quality",
    icon: FaFileAlt,
    color: "bg-pink-50 text-pink-600 border-pink-200",
  },
  {
    title: "Accessibility QA Tester",
    description: "Testing AI platforms for accessibility",
    icon: FaUniversalAccess,
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    title: "AI Technical Writer",
    description: "Writing user guides and documentation for AI tools",
    icon: FaPen,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  {
    title: "Generative AI Trainer",
    description: "Teaching AI concepts and advocating for inclusive AI",
    icon: FaGraduationCap,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "Inclusive AI Ethics Analyst",
    description: "Evaluating AI tools for bias and inclusivity",
    icon: FaShieldAlt,
    color: "bg-gray-50 text-gray-600 border-gray-200",
  },
];

export default function GenerativeAIRoles() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Generative AI Roles
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4">
        {jobRoles.map((role, index) => {
          const IconComponent = role.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 hover:shadow-md transition-all duration-300 ${role.color}`}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alternative Compact Version */}
      {/* <div className="mt-12 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Career Paths Enabled in Generative AI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobRoles.map((role, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <role.icon className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm text-gray-700">
                  {role.title}
                </span>
              </div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            <span className="font-semibold">Salary Range:</span> ₹15,000 -
            ₹35,000 per month
          </p>
        </div>
      </div> */}
    </div>
  );
}
