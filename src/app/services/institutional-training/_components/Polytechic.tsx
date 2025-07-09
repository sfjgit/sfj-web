import React from "react";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  Wrench,
  Cog,
  Building,
  Zap,
  Monitor,
  Car,
  FlaskConical,
  Calculator,
} from "lucide-react";

export default function PolytechnicSummary() {
  const engineeringBranches = [
    {
      name: "Civil Engineering",
      icon: Building,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Mechanical Engineering",
      icon: Cog,
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Electrical Engineering",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Computer Engineering",
      icon: Monitor,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Electronics & Comm.",
      icon: Wrench,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Automobile Engineering",
      icon: Car,
      color: "bg-red-100 text-red-600",
    },
    {
      name: "Chemical Engineering",
      icon: FlaskConical,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "Instrumentation Engg.",
      icon: Calculator,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Polytechnic</span> Diploma Programs
          </h2>
          <p className="text-xl text-gray-600">
            3-Year Technical Education for Career-Ready Professionals
          </p>
        </div>

        {/* Course Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">3 Years</div>
            <div className="text-sm text-gray-600">Full Program</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">6 Semesters</div>
            <div className="text-sm text-gray-600">Semester System</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">After 10th/12th</div>
            <div className="text-sm text-gray-600">Eligibility</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="font-semibold text-gray-900">Diploma</div>
            <div className="text-sm text-gray-600">Certification</div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Polytechnic
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Practical Training
                </h3>
                <p className="text-gray-600 text-sm">
                  Hands-on experience with industry tools
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Quick Employment
                </h3>
                <p className="text-gray-600 text-sm">
                  Direct job opportunities after completion
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Cost-Effective</h3>
                <p className="text-gray-600 text-sm">
                  Affordable compared to degree programs
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Industry Relevant
                </h3>
                <p className="text-gray-600 text-sm">
                  Curriculum designed for industry needs
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Further Education
                </h3>
                <p className="text-gray-600 text-sm">
                  Lateral entry to B.Tech 2nd year
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Skill Development
                </h3>
                <p className="text-gray-600 text-sm">
                  Technical and soft skills training
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Branches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Engineering Specializations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {engineeringBranches.map((branch, index) => {
              const IconComponent = branch.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${branch.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {branch.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility & Admission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Eligibility & Admission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Eligibility Criteria
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 10th pass with minimum 35-50% marks</li>
                <li>• Physics, Chemistry, Mathematics compulsory</li>
                <li>• Age limit: Usually 17-25 years</li>
                <li>• Some states have domicile requirements</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Admission Process
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Merit-based or entrance exam</li>
                <li>• Popular exams: JEECUP, JEXPO, AP POLYCET</li>
                <li>• Online application & document upload</li>
                <li>• Counselling & seat allocation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Curriculum Structure */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            3-Year Curriculum Structure
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
              <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Year 1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Foundation Subjects
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Applied Mathematics</li>
                <li>• Applied Physics</li>
                <li>• Applied Chemistry</li>
                <li>• Engineering Drawing</li>
                <li>• English & Communication</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Year 2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Core Engineering</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Specialization subjects</li>
                <li>• Technical workshops</li>
                <li>• Laboratory practicals</li>
                <li>• Industrial training</li>
                <li>• Project work</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6">
              <div className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Year 3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Advanced & Industry
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Advanced specialization</li>
                <li>• Major project</li>
                <li>• Industrial internship</li>
                <li>• Soft skills development</li>
                <li>• Placement preparation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fees & Career Prospects */}
        {/* <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Course Fees</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Government Colleges:</span>
                <span className="font-semibold">₹15K - ₹80K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Private Colleges:</span>
                <span className="font-semibold">₹50K - ₹2.5L</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                *Fees vary by state, college reputation, and facilities
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Career Prospects</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Starting Salary:</span>
                <span className="font-semibold">₹1.5L - ₹2.5L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Job Roles:</span>
                <span className="font-semibold">Junior Engineer</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Opportunities in PSUs, private companies, and government sectors
              </div>
            </div>
          </div>
        </div> */}

        {/* What Students Achieve */}
        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">What Students Achieve</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Award className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Diploma Certificate</h3>
              <p className="text-blue-200 text-sm">
                Government recognized qualification
              </p>
            </div>
            <div>
              <Wrench className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <p className="text-blue-200 text-sm">
                Industry-ready practical expertise
              </p>
            </div>
            <div>
              <Building className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Job Opportunities</h3>
              <p className="text-blue-200 text-sm">
                Direct employment in engineering firms
              </p>
            </div>
            <div>
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Higher Education</h3>
              <p className="text-blue-200 text-sm">
                Lateral entry to B.Tech programs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
