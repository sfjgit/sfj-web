"use client";
import Image from "next/image";
import SubscribeSection from "./SubscribeSection";

export default function FacultyDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <div className="w-full bg-white pt-18 px-4 md:px-8 lg:px-16 pb-10">
        <div className="max-w-7xl mx-auto text-center pt-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-8 tracking-tight">
            Empowering Faculty to Deliver Industry-Relevant Education
          </h1>

          <p className="text-center text-gray-600 text-sm md:text-base mb-2 max-w-5xl mx-auto leading-relaxed">
            As technology reshapes education and employment, upskilling faculty
            with contemporary IT and digital competencies is essential to
            nurture innovation-driven learning environments.
          </p>
        </div>
      </div>
      <div className="w-16 h-1 bg-orange-500 mx-auto mb-10"></div>

      {/* Overview Section */}
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative h-64 md:h-90 w-full">
              <Image
                src="/app/facultydevelopmentprogram.webp"
                alt="Faculty Development Program"
                fill
                className="object-cover rounded-md"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 mb-3 leading-relaxed">
                India&apos;s higher education ecosystem is rapidly evolving,
                making it essential to empower faculty with industry-aligned
                digital and pedagogical skills to prepare students for
                tomorrow&apos;s workforce. Faculty Development Programs play a
                critical role in bridging the academia–industry gap and driving
                sustainable educational excellence.
              </p>
              <p className="text-gray-700 leading-relaxed">
                At SFJ Business Solutions, our Faculty Development Programs
                (FDPs) in Information Technology are thoughtfully designed to
                equip educators with industry-relevant competencies, emerging
                technologies, and hands-on exposure aligned with current
                academic frameworks and corporate expectations. Through
                practical, outcome-driven learning models, we enable faculty
                members to deliver future-ready education and cultivate
                job-ready talent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            Objectives of IT FDPs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Upskill faculty in latest IT tools & technologies",
              "Enable industry-aligned curriculum delivery",
              "Promote hands-on and experiential learning",
              "Support digital transformation in education",
              "Enhance student employability outcomes",
            ].map((objective, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600"
              >
                <p className="text-gray-800 font-medium">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Domains Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            Key IT FDP Domains
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Programming & Software Development",
              "Artificial Intelligence & Data Analytics",
              "Cloud Computing & DevOps",
              "Cybersecurity & Networking",
              "Automation & Emerging Technologies",
              "Digital Teaching Tools & EdTech",
            ].map((domain, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-lg border border-blue-200"
              >
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 text-xl">
                    ✔
                  </span>
                  <p className="text-gray-800 font-medium">{domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Delivery Model Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            Program Delivery Model
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  Mode
                </h3>
                <p className="text-gray-700">Online / Offline / Hybrid</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  Duration
                </h3>
                <p className="text-gray-700">2–5 Days (Customizable)</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Methodology
              </h3>
              <ul className="space-y-3">
                {[
                  "Expert-led sessions",
                  "Hands-on labs & demos",
                  "Case studies & real-world examples",
                  "Assessments & certification",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Who Can Participate Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            Who Can Participate
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Engineering & Arts & Science Faculty",
              "Polytechnic & ITI Trainers",
              "Academic Leaders & HoDs",
              "Research Scholars",
            ].map((participant, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white p-6 rounded-lg text-center shadow-lg"
              >
                <p className="font-medium">{participant}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IT Programs Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-16 text-center">
            IT-Focused Faculty Development Programs
          </h2>

          {/* Category A */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-2 border-blue-600">
              A. Core IT & Programming
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Programming Essentials in Python",
                "Python Programming for Faculty",
                "Data Structures & Algorithms Using Python",
                "Java Programming Fundamentals",
                "Full Stack Development Fundamentals",
                "Object-Oriented Programming Concepts",
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                >
                  <p className="text-gray-800 font-medium">
                    {index + 1}. {program}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Category B */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-2 border-blue-600">
              B. Data, AI & Emerging Technologies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Fundamentals of Artificial Intelligence & Machine Learning",
                "Data Analytics Using Python",
                "Introduction to Data Science",
                "Generative AI for Educators",
                "AI Tools for Teaching & Research",
                "Internet of Things (IoT) Fundamentals",
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-green-500"
                >
                  <p className="text-gray-800 font-medium">
                    {index + 1}. {program}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Category C */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-2 border-blue-600">
              C. Cloud & DevOps
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Cloud Computing Fundamentals (AWS / Azure)",
                "AWS Cloud Practitioner (Faculty Track)",
                "Microsoft Azure Fundamentals",
                "Introduction to DevOps & CI/CD",
                "Cloud Security Essentials",
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-purple-500"
                >
                  <p className="text-gray-800 font-medium">
                    {index + 1}. {program}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Category D */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-2 border-blue-600">
              D. Cybersecurity & Networking
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Cybersecurity Fundamentals",
                "Introduction to Ethical Hacking",
                "Networking Essentials (Cisco Aligned)",
                "Cybersecurity Awareness for Educators",
                "Secure Coding Practices",
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-red-500"
                >
                  <p className="text-gray-800 font-medium">
                    {index + 1}. {program}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Category E */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-2 border-blue-600">
              E. Software, Platforms & Automation
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Web Development Using HTML, CSS & JavaScript",
                "Low-Code / No-Code Platforms",
                "Robotic Process Automation (UiPath / Automation Anywhere)",
                "Software Testing & Quality Assurance",
                "API Fundamentals & Integration",
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500"
                >
                  <p className="text-gray-800 font-medium">
                    {index + 1}. {program}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Category F */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 pb-3 border-b-2 border-blue-600">
              F. Digital Skills for Faculty
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Digital Transformation in Higher Education",
                "LMS, EdTech & AI-Enabled Classrooms",
                "Technology-Enabled Teaching & Assessment",
                "Industry 4.0 & Future IT Skills",
                "Research Tools & Digital Productivity",
              ].map((program, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-teal-500"
                >
                  <p className="text-gray-800 font-medium">
                    {index + 1}. {program}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-1 px-4">
        <h4 className="font-bold text-blue-900 mb-16 text-center text-3xl">
          Comprehensive Training Program Development Timeline
        </h4>
        <Image
          src="/app/comprehensivetrainingprogram.webp"
          alt="Comprehensive Training Program Development Timeline"
          width={660}
          height={400}
          className="mx-auto my-8 rounded-md"
        />
      </div>

      {/* Footer */}
      {/* <div className="bg-blue-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">SFJ Business Solutions</p>
          <p className="text-sm opacity-80 mt-2">
            Empowering Education Through Technology
          </p>
        </div>
      </div> */}
      <div className="-mt-12 mb-8">
        <SubscribeSection />
      </div>
    </div>
  );
}
