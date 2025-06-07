/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Brain,
  Video,
  Palette,
} from "lucide-react";

export default function SkillgenAISummary() {
  //   const aiTools = [
  //     { name: "ChatGPT", logo: "/tools/chatgpt.png" },
  //     { name: "DALL-E", logo: "/tools/dall-e.webp" },
  //     { name: "Pictory", logo: "/tools/pictory.png" },
  //     { name: "Gemini", logo: "/tools/gemini.png" },
  //     { name: "Bing", logo: "/tools/bing.jpg" },
  //     { name: "ElevenLabs", logo: "/tools/elevenlabs.png" },
  //     { name: "Grammarly", logo: "/tools/grammarly.webp" },
  //     { name: "Notion AI", logo: "/tools/notion-ai.webp" },
  //   ];
  const aiToolsData = {
    animaker: { name: "Animaker", logo: "/tools/animaker.png" },
    bing: { name: "Bing", logo: "/tools/bing.jpg" },
    "character-ai": { name: "Character AI", logo: "/tools/character-ai.png" },
    chatgpt: { name: "ChatGPT", logo: "/tools/chatgpt.png" },
    crayon: { name: "Crayon", logo: "/tools/crayon.png" },
    "dall-e": { name: "DALL-E", logo: "/tools/dall-e.webp" },
    diffit: { name: "Diffit", logo: "/tools/diffit.png" },
    elevenlabs: { name: "ElevenLabs", logo: "/tools/elevenlabs.png" },
    gemini: { name: "Gemini", logo: "/tools/gemini.png" },
    grammarly: { name: "Grammarly", logo: "/tools/grammarly.webp" },
    "magic-school": { name: "Magic School", logo: "/tools/magic-school.png" },
    mindgrasp: { name: "Mindgrasp", logo: "/tools/mindgrasp.webp" },
    "notion-ai": { name: "Notion AI", logo: "/tools/notion-ai.webp" },
    pictory: { name: "Pictory", logo: "/tools/pictory.png" },
    voicify: { name: "Voicify", logo: "/tools/voicify.png" },
  };

  // Convert to array for mapping
  const aiToolsArray = Object.entries(aiToolsData).map(([slug, data]) => ({
    slug,
    ...data,
  }));
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">SkillgenAI</span> for Students
          </h1>
          <p className="text-xl text-gray-600">
            4-Day AI Masterclass for Future-Ready Learning
          </p>
        </div>

        {/* Course Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">4 Hours Daily</div>
            <div className="text-sm text-gray-600">Intensive Learning</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">4 Days</div>
            <div className="text-sm text-gray-600">Complete Program</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">All Ages</div>
            <div className="text-sm text-gray-600">School Students</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">Certified</div>
            <div className="text-sm text-gray-600">Program</div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Students Learn
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Real AI Tools</h3>
                <p className="text-gray-600 text-sm">
                  Hands-on with ChatGPT, DALL-E, Pictory
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  No Coding Required
                </h3>
                <p className="text-gray-600 text-sm">
                  Beginner-friendly approach
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Real Projects</h3>
                <p className="text-gray-600 text-sm">
                  Create posters, videos, stories
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Safe & Ethical</h3>
                <p className="text-gray-600 text-sm">Responsible AI usage</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Digital Literacy
                </h3>
                <p className="text-gray-600 text-sm">21st-century skills</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Certificate</h3>
                <p className="text-gray-600 text-sm">
                  Official completion recognition
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tools */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            AI Tools Students Master
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 justify-center items-center gap-4">
            {aiToolsArray.map((tool, index) => (
              <div key={index} className="text-center">
                <img
                  src={"/app/b2i" + tool.logo}
                  alt={tool.name}
                  className="w-16 mx-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4-Day Curriculum */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            4-Day Learning Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Day 1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Fundamentals</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• What is AI & Generative AI</li>
                <li>• Live demos</li>
                <li>• Interactive activities</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Day 2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Text & Images</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• ChatGPT for writing</li>
                <li>• DALL-E image creation</li>
                <li>• Create posters & comics</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Day 3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Audio & Video</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• AI voice & music tools</li>
                <li>• Video generation</li>
                <li>• Future careers in AI</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
              <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Day 4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Projects & Certification
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Final project completion</li>
                <li>• Student presentations</li>
                <li>• Certificate ceremony</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What Students Take Home */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">What Students Take Home</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Award className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Certificate</h3>
              <p className="text-blue-200 text-sm">
                Official completion recognition
              </p>
            </div>
            <div>
              <Palette className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Project Portfolio</h3>
              <p className="text-blue-200 text-sm">
                AI-created art, stories, videos
              </p>
            </div>
            <div>
              <Video className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">AI Tool Confidence</h3>
              <p className="text-blue-200 text-sm">Real-world digital skills</p>
            </div>
            <div>
              <Brain className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Future-Ready Skills</h3>
              <p className="text-blue-200 text-sm">
                Foundation for continued growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
