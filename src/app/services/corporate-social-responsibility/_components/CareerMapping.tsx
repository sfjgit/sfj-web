"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type Role = {
  id: string;
  name: string;
  tag: string;
  level: "beginner" | "high" | "advanced";
  cert: string[];
  skills: string[];
  resp: string[];
  salary: string;
};

const certBadges: Record<string, string> = {
  "Cloud Practitioner": "/Cloud Practitioner.png",
  "Solutions Architect Associate": "/Solution Architect Associate.png",
  "Solutions Architect Professional": "/Solution Architect Professional.png",
  "Developer Associate": "/Developer Associate.png",
  "DevOps Professional": "/DevOps Professional.png",
  "SysOps Associate": "/SysOps Associate.png",
  "Security Specialty": "/Security Specialty.png",
  "Data Engineer Associate": "/Data Engineer Associate.png",
  "AI Practitioner": "/AI Practitioner.png",
  "Machine Learning Engineer Associate": "/Machine Learining.png",
  "Advanced Networking Specialty": "/Advanced Networking Specialty.png",
};

const roles: Role[] = [
  {
    id: "support",
    name: "Cloud support",
    tag: "Start your cloud journey",
    level: "beginner",
    cert: ["Cloud Practitioner"],
    skills: [
      "AWS core services",
      "Cloud concepts",
      "IAM",
      "Billing and pricing",
      "Networking basics",
    ],
    resp: [
      "Understand AWS cloud concepts and services",
      "Support cloud operations and troubleshooting",
      "Assist in deployment and configuration",
      "Handle customer queries and technical issues",
    ],
    salary: "3 - 8 LPA",
  },
  {
    id: "cloudeng",
    name: "Cloud engineer",
    tag: "Build and deploy cloud infrastructure",
    level: "beginner",
    cert: ["Cloud Practitioner", "Solutions Architect Associate"],
    skills: ["EC2", "S3", "VPC", "IAM", "CloudFormation", "Linux"],
    resp: [
      "Deploy and manage AWS infrastructure",
      "Automate provisioning and scaling",
      "Monitor system performance",
      "Support architecture decisions",
    ],
    salary: "4 - 12 LPA",
  },
  {
    id: "sa",
    name: "Solutions architect",
    tag: "Design scalable cloud solutions",
    level: "advanced",
    cert: [
      "Cloud Practitioner",
      "Solutions Architect Associate",
      "Solutions Architect Professional",
    ],
    skills: [
      "Architecture design",
      "Cost optimization",
      "High availability",
      "Security design",
      "Migration planning",
    ],
    resp: [
      "Design end-to-end cloud architectures",
      "Advise on best practices and cost efficiency",
      "Lead technical solution reviews",
      "Guide migration strategy",
    ],
    salary: "15 - 30 LPA",
  },
  {
    id: "devops",
    name: "DevOps engineer",
    tag: "Automate and optimize delivery",
    level: "high",
    cert: ["Cloud Practitioner", "Developer Associate", "DevOps Professional"],
    skills: [
      "CI/CD",
      "CloudFormation",
      "Docker",
      "Kubernetes",
      "Monitoring and logging",
    ],
    resp: [
      "Build and maintain CI/CD pipelines",
      "Automate infrastructure deployment",
      "Manage containerized workloads",
      "Monitor system reliability",
    ],
    salary: "8 - 18 LPA",
  },
  {
    id: "sre",
    name: "Site reliability engineer",
    tag: "Ensure reliability and uptime",
    level: "high",
    cert: ["Cloud Practitioner", "SysOps Associate", "DevOps Professional"],
    skills: [
      "Incident response",
      "Monitoring",
      "Automation",
      "Scalability",
      "Load balancing",
    ],
    resp: [
      "Maintain system uptime and reliability",
      "Respond to incidents and outages",
      "Automate operational workflows",
      "Improve system observability",
    ],
    salary: "10 - 20 LPA",
  },
  {
    id: "admin",
    name: "Cloud administrator",
    tag: "Manage and operate systems",
    level: "beginner",
    cert: ["Cloud Practitioner", "SysOps Associate"],
    skills: [
      "System monitoring",
      "Backup and recovery",
      "Patch management",
      "Cost management",
    ],
    resp: [
      "Manage day-to-day cloud operations",
      "Monitor system health",
      "Handle backups and recovery",
      "Support access management",
    ],
    salary: "4 - 9 LPA",
  },
  {
    id: "sec",
    name: "Cloud security engineer",
    tag: "Secure cloud environments",
    level: "advanced",
    cert: ["Cloud Practitioner", "Security Specialty"],
    skills: [
      "IAM policies",
      "Encryption",
      "Threat detection",
      "Compliance",
      "Network security",
    ],
    resp: [
      "Implement security best practices",
      "Monitor for threats and vulnerabilities",
      "Manage identity and access controls",
      "Support compliance audits",
    ],
    salary: "6 - 18 LPA",
  },
  {
    id: "data",
    name: "Data engineer",
    tag: "Build data pipelines",
    level: "high",
    cert: ["Cloud Practitioner", "Data Engineer Associate"],
    skills: ["ETL pipelines", "Redshift", "Glue", "Data lakes", "SQL"],
    resp: [
      "Design and build data pipelines",
      "Manage data storage and warehousing",
      "Ensure data quality and governance",
      "Support analytics teams",
    ],
    salary: "6 - 15 LPA",
  },
  {
    id: "ml",
    name: "AI/ML engineer",
    tag: "Build AI and ML solutions",
    level: "advanced",
    cert: ["AI Practitioner", "Machine Learning Engineer Associate"],
    skills: [
      "SageMaker",
      "Model training",
      "MLOps",
      "Data preprocessing",
      "Python",
    ],
    resp: [
      "Build and deploy ML models",
      "Manage ML pipelines and workflows",
      "Evaluate model performance",
      "Collaborate with data teams",
    ],
    salary: "8 - 20 LPA",
  },
  {
    id: "net",
    name: "Cloud network engineer",
    tag: "Design and manage networks",
    level: "advanced",
    cert: ["Cloud Practitioner", "Advanced Networking Specialty"],
    skills: [
      "VPC design",
      "Direct Connect",
      "Route 53",
      "Load balancing",
      "VPN",
    ],
    resp: [
      "Design secure network architectures",
      "Manage connectivity and routing",
      "Optimize network performance",
      "Troubleshoot connectivity issues",
    ],
    salary: "10 - 25 LPA",
  },
];

const progression = [
  { n: 1, name: "Learner", time: "0-6 months" },
  { n: 2, name: "Associate", time: "6 months-2 yrs" },
  { n: 3, name: "Engineer", time: "2-4 yrs" },
  { n: 4, name: "Specialist", time: "4-7 yrs" },
  { n: 5, name: "Architect/Lead", time: "7+ yrs" },
];

const levelLabel: Record<string, string> = {
  beginner: "Beginner friendly",
  high: "High demand",
  advanced: "Advanced",
};

const levelStyles: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  high: "bg-orange-100 text-orange-800",
  advanced: "bg-purple-100 text-purple-800",
};

const CareerMapping = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeRoleId, setActiveRoleId] = useState(roles[0].id);

  const filtered = roles.filter((r) => {
    const matchesFilter = activeFilter === "all" || r.level === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(q) ||
      r.cert.join(" ").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const activeRole = filtered.find((r) => r.id === activeRoleId) || filtered[0];

  return (
    <div>
      <h4 className="text-3xl font-bold text-gray-900 mb-2">Career Mapping</h4>
      <p className="text-gray-600 text-base max-w-xl mb-4">
        Explore in-demand AWS career paths, role progression, and recommended
        certifications, built around SFJ&#39;s AWS re/Start program.
      </p>

      <div className="flex gap-8 flex-wrap mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">{roles.length}</div>
          <div className="text-sm text-gray-600">Career roles</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">10+</div>
          <div className="text-sm text-gray-600">Certification paths</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">&#8377;3-8 LPA</div>
          <div className="text-sm text-gray-600">
            Avg. starting salary (India)
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 border-t border-gray-100 pt-3 mb-4">
        Salary ranges are approximate, aggregated from public sources
        (Glassdoor, PayScale, Indeed, AmbitionBox and industry salary guides) as
        of 2026, and vary by city, employer type, and certification level.
      </p>

      <div className="flex gap-3 flex-wrap items-center mb-4">
        {[
          { id: "all", label: "All career paths" },
          { id: "beginner", label: "Beginner friendly" },
          { id: "high", label: "High demand" },
          { id: "advanced", label: "Advanced roles" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`text-base font-semibold px-4 py-2 rounded-lg border transition-colors ${
              activeFilter === f.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
            }`}
          >
            {f.label}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search role or certification..."
          className="w-full sm:w-56 sm:ml-auto border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
        <div className="flex flex-col gap-1">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRoleId(r.id)}
              className={`text-left rounded-lg px-3 py-2 border ${
                r.id === activeRole?.id
                  ? "bg-blue-50 border-blue-300"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              <div className="text-base font-semibold text-gray-900">
                {r.name}
              </div>
              <div className="text-sm text-gray-500 mt-0.5">{r.tag}</div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-base text-gray-500 p-3">
              No roles match your search. Try a different keyword or filter.
            </p>
          )}
        </div>

        {activeRole && (
          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {activeRole.name}
                </div>
                <div className="text-base text-gray-600 mt-1">
                  {activeRole.tag}
                </div>
                <span
                  className={`inline-block mt-2 text-sm font-semibold px-3 py-1 rounded-full ${levelStyles[activeRole.level]}`}
                >
                  {levelLabel[activeRole.level]}
                </span>
              </div>
              <div className="border border-gray-200 rounded-lg px-4 py-3 text-right min-w-[160px]">
                <div className="text-sm text-gray-500">
                  Avg. salary in India
                </div>
                <div className="text-lg font-bold text-gray-900 mt-0.5">
                  &#8377;{activeRole.salary}
                </div>
              </div>
            </div>

            <h5 className="text-base font-semibold text-gray-900 mb-3">
              Career progression path
            </h5>
            <div className="flex justify-between gap-2 overflow-x-auto mb-6">
              {progression.map((p) => (
                <div
                  key={p.n}
                  className="flex flex-col items-center text-center w-20 flex-shrink-0"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-900">
                    {p.n}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-2">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.time}</div>
                </div>
              ))}
            </div>

            <h5 className="text-base font-semibold text-gray-900 mb-3">
              Recommended certifications
            </h5>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeRole.cert.map((c) =>
                certBadges[c] ? (
                  <Image
                    key={c}
                    src={certBadges[c]}
                    alt={c}
                    width={120}
                    height={120}
                    className="h-28 w-auto object-contain"
                  />
                ) : (
                  <span
                    key={c}
                    className="bg-blue-50 text-blue-800 text-sm font-semibold px-3 py-2 rounded-lg"
                  >
                    {c}
                  </span>
                )
              )}
            </div>

            <h5 className="text-base font-semibold text-gray-900 mb-3">
              In-demand skills
            </h5>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeRole.skills.map((s) => (
                <span
                  key={s}
                  className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg"
                >
                  {s}
                </span>
              ))}
            </div>

            <h5 className="text-base font-semibold text-gray-900 mb-3">
              Key responsibilities
            </h5>
            <ul className="space-y-2">
              {activeRole.resp.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-base text-gray-700"
                >
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerMapping;
