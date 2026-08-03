// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   MapPin,
//   Building2,
//   Clock,
//   DollarSign,
//   Eye,
//   Users,
//   Calendar,
//   Briefcase,
//   Factory,
// } from "lucide-react";
// import JobApplicationForm from "@/app/careers/[slug]/_components/JobApplicationForm";

// // Client-side fetching function
// async function fetchJobBySlug(slug: any) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/hr/jobs/slug/${slug}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to fetch job");
//     }

//     return {
//       success: true,
//       job: data.data,
//     };
//   } catch (error) {
//     console.error("Error fetching job:", error);
//     return {
//       success: false,
//       // @ts-expect-error error
//       error: error?.message,
//     };
//   }
// }

// interface Department {
//   _id: string;
//   name: string;
// }

// interface Industry {
//   _id: string;
//   name: string;
// }

// interface JobData {
//   _id: string;
//   title: string;
//   category: string;
//   description: string;
//   shortDescription: string;
//   department: Department | string; // Can be populated object or string ID
//   industry: Industry | string; // Can be populated object or string ID
//   employmentType: string;
//   location: {
//     type: string;
//     address: {
//       country?: string;
//     };
//   };
//   requirements: {
//     education: {
//       fieldOfStudy: string[];
//       certifications: string[];
//     };
//     experience: {
//       minimumYears: number;
//       level: string;
//       industries: string[];
//       specificExperience: string[];
//     };
//     skills: {
//       required: string[];
//       preferred: string[];
//       technical: string[];
//       soft: string[];
//     };
//     languages: string[];
//     other: string[];
//   };
//   benefits: any;
//   collectResume: boolean;
//   collectCoverLetter: boolean;
//   customQuestions: any[];
//   keywords: string[];
//   status: string;
//   featured: boolean;
//   urgent: boolean;
//   visaSponsorship: boolean;
//   backgroundCheckRequired: boolean;
//   slug: string;
//   viewCount: number;
//   applicationCount: number;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   lastModifiedBy: string;
//   publishedAt: string;
//   salary: {
//     type: string;
//     currency: string;
//     min: number;
//     max: number;
//     negotiable: boolean;
//     displayPublicly: boolean;
//   };
// }

// export default function JobPageClient() {
//   const params = useParams();
//   const slug = params.slug;

//   const [job, setJob] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadJob = async () => {
//       setLoading(true);
//       const result = await fetchJobBySlug(slug);

//       if (result.success) {
//         setJob(result.job);
//       } else {
//         setError(result.error);
//       }

//       setLoading(false);
//     };

//     if (slug) {
//       loadJob();
//     }
//   }, [slug]);

//   // Helper functions to get department and industry names
//   const getDepartmentName = (department: Department | string): string => {
//     if (typeof department === "object" && department !== null) {
//       return department.name;
//     }
//     return typeof department === "string" ? department : "Not specified";
//   };

//   const getIndustryName = (industry: Industry | string): string => {
//     if (typeof industry === "object" && industry !== null) {
//       return industry.name;
//     }
//     return typeof industry === "string" ? industry : "Not specified";
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-lg">Loading job...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-500">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-gray-500">Job not found</div>
//       </div>
//     );
//   }

//   const formatSalary = (salary: JobData["salary"]) => {
//     if (!salary || !salary.displayPublicly) return null;

//     const formatter = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: salary.currency || "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     });

//     if (salary.min && salary.max) {
//       return `${formatter.format(salary.min)} - ${formatter.format(
//         salary.max
//       )} ${salary.type?.toLowerCase() || "yearly"}`;
//     }
//     return null;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 pt-28">
//       {/* Header Section */}
//       <div className="mb-8">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex-1">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {job.title}
//             </h1>
//             <p className="text-lg text-gray-600 mb-4">{job.shortDescription}</p>

//             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <Building2 className="w-4 h-4" />
//                 <span>{getDepartmentName(job.department)}</span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <Factory className="w-4 h-4" />
//                 <span>{getIndustryName(job.industry)}</span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <MapPin className="w-4 h-4" />
//                 <span>
//                   {job.location.type === "REMOTE"
//                     ? "Remote"
//                     : job.location.address?.country || "Not specified"}
//                 </span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 <span>{job.employmentType.replace("_", " ")}</span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <Calendar className="w-4 h-4" />
//                 <span>Posted {formatDate(job.publishedAt)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col items-end gap-2">
//             {job.featured && <Badge variant="secondary">Featured</Badge>}
//             {job.urgent && <Badge variant="destructive">Urgent</Badge>}
//             <Badge variant="outline">{job.category}</Badge>
//           </div>
//         </div>

//         {/* Salary and Stats */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-6">
//             {formatSalary(job.salary) && (
//               <div className="flex items-center gap-2 text-green-600 font-semibold">
//                 <DollarSign className="w-5 h-5" />
//                 <span>{formatSalary(job.salary)}</span>
//               </div>
//             )}

//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <Eye className="w-4 h-4" />
//                 <span>{job.viewCount} views</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Users className="w-4 h-4" />
//                 <span>{job.applicationCount} applications</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Separator className="mb-8" />

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Job Description */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Job Description</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="prose max-w-none">
//                 <p className="whitespace-pre-wrap">{job.description}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Requirements */}
//           {(job.requirements.skills.required.length > 0 ||
//             job.requirements.skills.preferred.length > 0 ||
//             job.requirements.experience.minimumYears > 0) && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Requirements</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {job.requirements.experience.minimumYears > 0 && (
//                   <div>
//                     <h4 className="font-semibold mb-2">Experience</h4>
//                     <p className="text-gray-600">
//                       {job.requirements.experience.minimumYears} years minimum
//                       experience
//                     </p>
//                     <p className="text-gray-600">
//                       Level:{" "}
//                       {job.requirements.experience.level.replace("_", " ")}
//                     </p>
//                   </div>
//                 )}

//                 {job.requirements.skills.required.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold mb-2">Required Skills</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {job.requirements.skills.required.map((skill, index) => (
//                         <Badge key={index} variant="secondary">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {job.requirements.skills.preferred.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold mb-2">Preferred Skills</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {job.requirements.skills.preferred.map((skill, index) => (
//                         <Badge key={index} variant="outline">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//               <CardFooter className="flex justify-end mt-5">
//                 <div className="flex justify-end">
//                   <JobApplicationForm
//                     jobId={job._id}
//                     companyName={"SFJBS"}
//                     jobTitle={job.title}
//                     onError={(error) => console.log(error)}
//                     onSuccess={(application) => console.log(application)}
//                     trigger={
//                       <Button size="lg" className="px-8">
//                         Apply Now
//                       </Button>
//                     }
//                   />
//                 </div>
//               </CardFooter>
//             </Card>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Quick Apply */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Briefcase className="w-5 h-5" />
//                 Quick Apply
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <JobApplicationForm
//                 jobId={job._id}
//                 companyName={"SFJBS"}
//                 jobTitle={job.title}
//                 onError={(error) => console.log(error)}
//                 onSuccess={(application) => console.log(application)}
//                 trigger={
//                   <Button className="w-full" size="lg">
//                     Apply Now
//                   </Button>
//                 }
//               />

//               <div className="text-sm text-gray-600 space-y-2">
//                 <p>Application Requirements:</p>
//                 <ul className="list-disc list-inside space-y-1">
//                   {job.collectResume && <li>Resume required</li>}
//                   {job.collectCoverLetter && <li>Cover letter required</li>}
//                   {job.backgroundCheckRequired && (
//                     <li>Background check required</li>
//                   )}
//                   {job.visaSponsorship && <li>Visa sponsorship available</li>}
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Job Details */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Job Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Employment Type:</span>
//                 <span className="font-medium">
//                   {job.employmentType.replace("_", " ")}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Industry:</span>
//                 <span className="font-medium">
//                   {getIndustryName(job.industry)}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Location:</span>
//                 <span className="font-medium">
//                   {job.location.type === "REMOTE"
//                     ? "Remote"
//                     : job.location.address?.country}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Category:</span>
//                 <span className="font-medium">{job.category}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Published:</span>
//                 <span className="font-medium">
//                   {formatDate(job.publishedAt)}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Company Info Placeholder */}
//           <Card>
//             <CardHeader>
//               <CardTitle>About the Company</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-600">
//                 SFJ Business Solutions Private Limited, offers cutting edge
//                 industry solutions for deriving business value for our IT
//                 Service & Product based clients. Cirrus1 leads its service in
//                 offering skills Consulting (Turnkey Projects), Professional
//                 Consulting Services and Knowledge Services, with over 400+
//                 professionals across India, USA, Middle East and APAC and
//                 serving client across 34 Countries for IT Training needs.
//                 Delivered 15000+ VLP & ILP Program for 6,00,000 IT Professionals
//                 .
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// File: page.tsx
// Path: src/app/careers/[reqCode]/page.tsx
//
// Dynamic JD page. SSR-fetches one public opening by reqCode, renders the full
// description + facts, emits JobPosting structured data for Google Jobs, and
// 404s cleanly when the code is unknown or the role isn't publicly visible.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  formatExperience,
  formatLocation,
  formatSalary,
  JOB_TYPE_LABEL,
  PublicRequirementDetail,
  REMOTE_LABEL,
} from "../_components/format";
import ApplyDialog from "../_components/ApplyDialog";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const API_BASE =
  process.env.NEXT_PUBLIC_ATS_BASE_URL ?? "http://localhost:4000";

export const revalidate = 300;

async function getOpening(
  reqCode: string,
): Promise<PublicRequirementDetail | null> {
  try {
    const res = await fetch(
      `${API_BASE}/core/api/public/requirements/${encodeURIComponent(reqCode)}`,
      { next: { revalidate } },
    );
    if (!res.ok) return null; // 404 or anything else → treat as not found
    const json = await res.json();
    return (json?.data ?? null) as PublicRequirementDetail | null;
  } catch (err) {
    console.error("careers/[reqCode]: fetch failed", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reqCode: string }>;
}): Promise<Metadata> {
  const { reqCode } = await params;
  const r = await getOpening(reqCode); // deduped with the page fetch by Next
  if (!r) return { title: "Role not found · SFJ Careers" };

  const loc = formatLocation(r);
  return {
    title: `${r.title} · SFJ Careers`,
    description:
      r.description?.slice(0, 155) ??
      `${r.title} — ${loc}. Apply at SFJ Business Solutions.`,
  };
}

// ── Small presentational helpers ────────────────────────────────────────────
function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-[13px] text-[#6F7278]">{label}</dt>
      <dd className="text-right text-[13px] font-medium text-[#16181D]">
        {value}
      </dd>
    </div>
  );
}

function ChipRow({
  title,
  skills,
  strong,
}: {
  title: string;
  skills: string[];
  strong?: boolean;
}) {
  if (!skills.length) return null;
  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9A9890]">
        {title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className={
              strong
                ? "rounded-lg border border-[#CBE3D6] bg-[#E4F1EA] px-3 py-1 text-[13px] font-medium text-[#0B4838]"
                : "rounded-lg bg-[#F3F1EB] px-3 py-1 text-[13px] text-[#4A4D55]"
            }
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// JobPosting structured data → eligible for the Google Jobs rich result.
function jobPostingJsonLd(r: PublicRequirementDetail) {
  const employmentType = r.jobType === "PERMANENT" ? "FULL_TIME" : "CONTRACTOR";
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: r.title,
    description: r.description ?? r.title,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "SFJ Business Solutions",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: r.city ?? undefined,
        addressRegion: r.state ?? undefined,
        addressCountry: r.country ?? "IN",
      },
    },
  };
  if (r.remoteType === "REMOTE") data.jobLocationType = "TELECOMMUTE";
  if (r.salary && (r.salary.min != null || r.salary.max != null)) {
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: r.salary.currency ?? "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: r.salary.min ?? undefined,
        maxValue: r.salary.max ?? undefined,
        unitText: r.salary.type ?? "YEAR",
      },
    };
  }
  return data;
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function RequirementDetailPage({
  params,
}: {
  params: Promise<{ reqCode: string }>;
}) {
  const { reqCode } = await params;
  const r = await getOpening(reqCode);
  if (!r) notFound();

  const experience = formatExperience(r);
  const salary = formatSalary(r);
  const eyebrow =
    r.functionalArea ?? r.requirementCategory?.name ?? "Open role";
  const applyHref = `/careers/${encodeURIComponent(r.reqCode)}/apply`;
  const paragraphs = (r.description ?? "").split(/\n{2,}/).filter(Boolean);

  return (
    <div className={`${display.variable} ${body.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd(r)),
        }}
      />

      <div
        className="min-h-screen bg-[#FBFAF7] pb-24 text-[#16181D] lg:pb-0 pt-20"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Back */}
        <div className="mx-auto max-w-5xl px-5 pt-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 rounded-lg text-[13px] font-medium text-[#6F7278] outline-none transition-colors hover:text-[#16181D] focus-visible:ring-2 focus-visible:ring-[#0F5E4A]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All roles
          </Link>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-5xl px-5 pb-8 pt-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#0F5E4A]">
            {eyebrow}
          </p>
          <h1
            className="mt-2 max-w-3xl text-3xl leading-[1.08] text-[#16181D] sm:text-[42px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {r.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#CBE3D6] bg-[#E4F1EA] px-3 py-1 text-[12px] font-medium text-[#0B4838]">
              {REMOTE_LABEL[r.remoteType]}
            </span>
            <span className="rounded-full border border-[#E9E7E0] px-3 py-1 text-[12px] font-medium text-[#6F7278]">
              {JOB_TYPE_LABEL[r.jobType]}
            </span>
            <span className="rounded-full border border-[#E9E7E0] px-3 py-1 text-[12px] font-medium text-[#6F7278]">
              {formatLocation(r)}
            </span>
            {r.totalOpenings > 1 && (
              <span className="rounded-full border border-[#E9E7E0] px-3 py-1 text-[12px] font-medium text-[#6F7278]">
                {r.totalOpenings} openings
              </span>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto grid max-w-5xl gap-10 px-5 lg:grid-cols-[1fr_320px]">
          {/* Main — the JD */}
          <div className="min-w-0">
            <section>
              <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[#9A9890]">
                About the role
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-[#3A3D45]">
                {paragraphs.length ? (
                  paragraphs.map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-[#6F7278]">
                    A detailed description will be shared during the first
                    conversation. Apply and the hiring team will reach out.
                  </p>
                )}
              </div>
            </section>

            {(r.primarySkills.length > 0 || r.keySkills.length > 0) && (
              <section className="mt-10 space-y-6">
                <ChipRow
                  title="Must-have skills"
                  skills={r.primarySkills}
                  strong
                />
                <ChipRow title="Good to have" skills={r.keySkills} />
              </section>
            )}

            {r.jdFileName && (
              <p className="mt-8 text-[13px] text-[#9A9890]">
                A full job description document is available on request.
              </p>
            )}
          </div>

          {/* Sidebar — facts + apply */}
          <aside className="lg:pt-1">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-2xl border border-[#E9E7E0] bg-white p-6">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9A9890]">
                  At a glance
                </h2>
                <dl className="mt-2 divide-y divide-[#F0EEE7]">
                  <Fact label="Employment" value={JOB_TYPE_LABEL[r.jobType]} />
                  <Fact label="Work mode" value={REMOTE_LABEL[r.remoteType]} />
                  <Fact label="Location" value={formatLocation(r)} />
                  <Fact label="Experience" value={experience} />
                  <Fact label="Compensation" value={salary} />
                  <Fact label="Education" value={r.education} />
                  <Fact label="Shift" value={r.shift} />
                  <Fact label="Function" value={r.functionalArea} />
                  <Fact
                    label="Openings"
                    value={r.totalOpenings > 0 ? `${r.totalOpenings}` : null}
                  />
                </dl>

                {/* <Link
                  href={applyHref}
                  className="mt-6 hidden w-full items-center justify-center rounded-xl bg-[#0F5E4A] px-4 py-3 text-[14px] font-semibold text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:flex"
                >
                  Apply for this role
                </Link> */}
                <ApplyDialog
                  reqCode={r.reqCode}
                  requirementId={r.id}
                  title={r.title}
                  label="Apply for this role"
                  className="mt-6 hidden w-full items-center justify-center rounded-xl bg-[#0F5E4A] px-4 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#0B4838] lg:flex"
                />
                <p className="mt-3 hidden text-center text-[12px] text-[#9A9890] lg:block">
                  Ref: {r.reqCode}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky apply bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E9E7E0] bg-[#FBFAF7]/95 p-4 backdrop-blur-md lg:hidden">
        <Link
          href={applyHref}
          className="flex w-full items-center justify-center rounded-xl bg-[#0F5E4A] px-4 py-3 text-[15px] font-semibold text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Apply for this role
        </Link>
      </div>
    </div>
  );
}
