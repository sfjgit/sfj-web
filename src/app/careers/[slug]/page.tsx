/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Eye,
  Users,
  Calendar,
  Briefcase,
  Factory,
} from "lucide-react";
import JobApplicationForm from "@/components/forms/JobApplicationForm";

// Client-side fetching function
async function fetchJobBySlug(slug: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/hr/jobs/slug/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch job");
    }

    return {
      success: true,
      job: data.data,
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return {
      success: false,
      // @ts-expect-error error
      error: error?.message,
    };
  }
}

interface Department {
  _id: string;
  name: string;
}

interface Industry {
  _id: string;
  name: string;
}

interface JobData {
  _id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  department: Department | string; // Can be populated object or string ID
  industry: Industry | string; // Can be populated object or string ID
  employmentType: string;
  location: {
    type: string;
    address: {
      country?: string;
    };
  };
  requirements: {
    education: {
      fieldOfStudy: string[];
      certifications: string[];
    };
    experience: {
      minimumYears: number;
      level: string;
      industries: string[];
      specificExperience: string[];
    };
    skills: {
      required: string[];
      preferred: string[];
      technical: string[];
      soft: string[];
    };
    languages: string[];
    other: string[];
  };
  benefits: any;
  collectResume: boolean;
  collectCoverLetter: boolean;
  customQuestions: any[];
  keywords: string[];
  status: string;
  featured: boolean;
  urgent: boolean;
  visaSponsorship: boolean;
  backgroundCheckRequired: boolean;
  slug: string;
  viewCount: number;
  applicationCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  publishedAt: string;
  salary: {
    type: string;
    currency: string;
    min: number;
    max: number;
    negotiable: boolean;
    displayPublicly: boolean;
  };
}

export default function JobPage() {
  const params = useParams();
  const slug = params.slug;

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      const result = await fetchJobBySlug(slug);

      if (result.success) {
        setJob(result.job);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    if (slug) {
      loadJob();
    }
  }, [slug]);

  // Helper functions to get department and industry names
  const getDepartmentName = (department: Department | string): string => {
    if (typeof department === "object" && department !== null) {
      return department.name;
    }
    return typeof department === "string" ? department : "Not specified";
  };

  const getIndustryName = (industry: Industry | string): string => {
    if (typeof industry === "object" && industry !== null) {
      return industry.name;
    }
    return typeof industry === "string" ? industry : "Not specified";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading job...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Job not found</div>
      </div>
    );
  }

  const formatSalary = (salary: JobData["salary"]) => {
    if (!salary || !salary.displayPublicly) return null;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salary.currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (salary.min && salary.max) {
      return `${formatter.format(salary.min)} - ${formatter.format(
        salary.max
      )} ${salary.type?.toLowerCase() || "yearly"}`;
    }
    return null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-28">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{job.shortDescription}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{getDepartmentName(job.department)}</span>
              </div>

              <div className="flex items-center gap-1">
                <Factory className="w-4 h-4" />
                <span>{getIndustryName(job.industry)}</span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {job.location.type === "REMOTE"
                    ? "Remote"
                    : job.location.address?.country || "Not specified"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{job.employmentType.replace("_", " ")}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Posted {formatDate(job.publishedAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {job.featured && <Badge variant="secondary">Featured</Badge>}
            {job.urgent && <Badge variant="destructive">Urgent</Badge>}
            <Badge variant="outline">{job.category}</Badge>
          </div>
        </div>

        {/* Salary and Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {formatSalary(job.salary) && (
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <DollarSign className="w-5 h-5" />
                <span>{formatSalary(job.salary)}</span>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{job.viewCount} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{job.applicationCount} applications</span>
              </div>
            </div>
          </div>

          {/* <Button size="lg" className="px-8">
            Apply Now
          </Button> */}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Description */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          {(job.requirements.skills.required.length > 0 ||
            job.requirements.skills.preferred.length > 0 ||
            job.requirements.experience.minimumYears > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.requirements.experience.minimumYears > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-gray-600">
                      {job.requirements.experience.minimumYears} years minimum
                      experience
                    </p>
                    <p className="text-gray-600">
                      Level:{" "}
                      {job.requirements.experience.level.replace("_", " ")}
                    </p>
                  </div>
                )}

                {job.requirements.skills.required.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.skills.required.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {job.requirements.skills.preferred.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Preferred Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.skills.preferred.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end mt-5">
                <div className="flex justify-end">
                  <JobApplicationForm
                    jobId={job._id}
                    companyName={"SFJBS"}
                    jobTitle={job.title}
                    onError={(error) => console.log(error)}
                    onSuccess={(application) => console.log(application)}
                    trigger={
                      <Button size="lg" className="px-8">
                        Apply Now
                      </Button>
                    }
                  />
                </div>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Apply */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Quick Apply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <JobApplicationForm
                jobId={job._id}
                companyName={"SFJBS"}
                jobTitle={job.title}
                onError={(error) => console.log(error)}
                onSuccess={(application) => console.log(application)}
                trigger={
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                }
              />

              <div className="text-sm text-gray-600 space-y-2">
                <p>Application Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  {job.collectResume && <li>Resume required</li>}
                  {job.collectCoverLetter && <li>Cover letter required</li>}
                  {job.backgroundCheckRequired && (
                    <li>Background check required</li>
                  )}
                  {job.visaSponsorship && <li>Visa sponsorship available</li>}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Employment Type:</span>
                <span className="font-medium">
                  {job.employmentType.replace("_", " ")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Industry:</span>
                <span className="font-medium">
                  {getIndustryName(job.industry)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">
                  {job.location.type === "REMOTE"
                    ? "Remote"
                    : job.location.address?.country}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{job.category}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Published:</span>
                <span className="font-medium">
                  {formatDate(job.publishedAt)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Company Info Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>About the Company</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                SFJ Business Solutions Private Limited, offers cutting edge
                industry solutions for deriving business value for our IT
                Service & Product based clients. Cirrus1 leads its service in
                offering skills Consulting (Turnkey Projects), Professional
                Consulting Services and Knowledge Services, with over 400+
                professionals across India, USA, Middle East and APAC and
                serving client across 34 Countries for IT Training needs.
                Delivered 15000+ VLP & ILP Program for 6,00,000 IT Professionals
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
