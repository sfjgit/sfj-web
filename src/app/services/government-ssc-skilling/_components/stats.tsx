import React, { useState } from "react";

const SkillDevelopmentDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const initiatives = [
    {
      id: 1,
      title: "Tamil Nadu Skill Development Corporation",
      learners: "27,000",
      category: "State Initiative",
      description:
        "Comprehensive skill development program across Tamil Nadu focusing on industry-relevant training modules.",
      growth: "+12%",
      completion: 94,
    },
    {
      id: 2,
      title: "Karnataka Skill Development Corporation",
      learners: "500",
      category: "State Initiative",
      description:
        "Targeted training programs for emerging technologies and traditional skills development.",
      growth: "+8%",
      completion: 88,
    },
    {
      id: 3,
      title: "MP State Skill Development Mission",
      learners: "1,600",
      category: "Gen AI Program",
      description:
        "Generative AI focused training program preparing workforce for next-generation technologies.",
      growth: "+24%",
      completion: 91,
    },
    {
      id: 4,
      title: "NSDC",
      learners: "4,000",
      category: "Cloud & AI",
      description:
        "National initiative for cloud computing and artificial intelligence skill development.",
      growth: "+18%",
      completion: 96,
    },
    {
      id: 5,
      title: "NASSCOM - Future Skills Prime",
      learners: "2,000",
      category: "Future Tech",
      description:
        "Industry-led program focusing on future-ready skills and emerging technology adoption.",
      growth: "+15%",
      completion: 89,
    },
    {
      id: 6,
      title: "NASSCOM - Digital 101",
      learners: "4,000",
      category: "Digital Literacy",
      description:
        "Foundational digital skills program covering essential technology competencies.",
      growth: "+10%",
      completion: 92,
    },
    {
      id: 7,
      title: "CSR - AspireForHer",
      learners: "2,000",
      category: "Women Empowerment",
      description:
        "Women-focused skill development initiative promoting gender equality in technology.",
      growth: "+20%",
      completion: 95,
    },
  ];

  const totalLearners = initiatives.reduce(
    (sum, init) => sum + parseInt(init.learners.replace(",", "")),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Skill Development Analytics
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive overview of training initiatives and learner
                progress
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-4">
              <div className="bg-blue-50 px-6 py-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {totalLearners.toLocaleString()}
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Total Learners
                </div>
              </div>
              <div className="bg-green-50 px-6 py-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-sm text-green-600 font-medium">
                  Active Programs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Completion Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">92.1%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Growth Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">+15.3%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Technology Focus
                </p>
                <p className="text-2xl font-bold text-gray-900">71%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Initiative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                selectedCard === initiative.id
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : ""
              }`}
              onClick={() =>
                setSelectedCard(
                  // @ts-expect-error  error
                  selectedCard === initiative.id ? null : initiative.id
                )
              }
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {initiative.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {initiative.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {initiative.learners}
                    </div>
                    <div className="text-sm text-gray-500">learners</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-green-600">
                        {initiative.growth}
                      </span>
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-600">
                      {initiative.completion}% completion
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${initiative.completion}%` }}
                    ></div>
                  </div>
                </div>

                {/* Description (when selected) */}
                {selectedCard === initiative.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CSRStrategyFramework = () => {
  const [activeStrategy, setActiveStrategy] = useState(1);

  const strategies = [
    {
      id: 1,
      title: "Strategy & Program Design",
      description: "Define objectives and align with government schemes",
      details:
        "Comprehensive planning involving stakeholder analysis, objective setting, and alignment with national skill development programs.",
      metrics: { efficiency: 95, impact: 88 },
    },
    {
      id: 2,
      title: "Partner Selection & Due Diligence",
      description: "Identify and vet credible training partners",
      details:
        "Rigorous evaluation process including background checks, capability assessments, and compliance verification.",
      metrics: { efficiency: 92, impact: 85 },
    },
    {
      id: 3,
      title: "Budgeting & Fund Allocation",
      description: "Allocate and track funds for optimal utilization",
      details:
        "Strategic financial planning with milestone-based fund release and transparent tracking mechanisms.",
      metrics: { efficiency: 97, impact: 90 },
    },
    {
      id: 4,
      title: "Program Implementation",
      description: "Oversee training execution and monitoring",
      details:
        "Active program management including curriculum oversight, progress tracking, and quality assurance.",
      metrics: { efficiency: 89, impact: 93 },
    },
    {
      id: 5,
      title: "Impact Assessment",
      description: "Collect data and validate social impact",
      details:
        "Comprehensive evaluation including assessments, employment tracking, and detailed impact reporting.",
      metrics: { efficiency: 91, impact: 96 },
    },
    {
      id: 6,
      title: "Stakeholder Engagement",
      description: "Coordinate with stakeholders for effectiveness",
      details:
        "Multi-stakeholder coordination involving government agencies, corporate partners, and institutions.",
      metrics: { efficiency: 88, impact: 87 },
    },
    {
      id: 7,
      title: "Risk & Compliance",
      description: "Ensure standards and prevent fund misuse",
      details:
        "Comprehensive risk management including compliance monitoring, audits, and fraud prevention.",
      metrics: { efficiency: 94, impact: 89 },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            CSR Strategy Framework
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive approach to maximize social impact through strategic
            initiatives
          </p>
        </div>
      </div>

      {/* Strategy Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strategy List */}
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  activeStrategy === strategy.id
                    ? "bg-blue-50 border-blue-300 shadow-md"
                    : "bg-white hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() =>
                  setActiveStrategy(
                    // @ts-expect-error errr
                    activeStrategy === strategy.id ? null : strategy.id
                  )
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      activeStrategy === strategy.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {strategy.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {strategy.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {strategy.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Efficiency
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${strategy.metrics.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {strategy.metrics.efficiency}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Impact</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-600 h-1.5 rounded-full"
                            style={{ width: `${strategy.metrics.impact}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {strategy.metrics.impact}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategy Details Panel */}
          <div className="lg:sticky lg:top-8">
            {activeStrategy ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {activeStrategy}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {strategies.find((s) => s.id === activeStrategy)?.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {strategies.find((s) => s.id === activeStrategy)?.details}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {
                        strategies.find((s) => s.id === activeStrategy)?.metrics
                          .efficiency
                      }
                      %
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      Efficiency Score
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {
                        strategies.find((s) => s.id === activeStrategy)?.metrics
                          .impact
                      }
                      %
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Impact Score
                    </div>
                  </div>
                </div>

                {/* Implementation Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Implementation Status
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Active & Optimized
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a Strategy
                </h3>
                <p className="text-gray-600">
                  Click on any strategy component to view detailed information
                  and metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CSRStrategyFramework, SkillDevelopmentDashboard };
