/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Building,
  Search,
  Filter,
} from "lucide-react";

// Types
interface JobPosting {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  department: string;
  employmentType: string;
  location: {
    type: string;
    address: {
      country: string;
    };
  };
  salary: {
    type: string;
    currency: string;
    min: number;
    max: number;
    displayPublicly: boolean;
  };
  requirements: {
    experience: {
      minimumYears: number;
      level: string;
    };
  };
  status: string;
  createdAt: string;
  slug: string;
}

interface JobsResponse {
  jobs: JobPosting[];
  total: number;
  page: number;
  totalPages: number;
}

interface Department {
  _id: string;
  name: string;
}

// Fetch functions
const fetchJobs = async (
  params: URLSearchParams
): Promise<{ data: JobsResponse }> => {
  const newParams = new URLSearchParams(params);
  newParams.set("status", "PUBLISHED");
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_FRONTEND_URL
    }/api/hr/jobs?${newParams.toString()}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
};

const fetchDepartments = async (): Promise<Department[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/hr/departments`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  const data = await response.json();
  return data.departments || [];
};

const SimpleJobCard = ({ job }: { job: any }) => {
  const router = useRouter();

  // Simple format functions
  const formatSalary = (salary: any) => {
    if (!salary || !salary.displayPublicly) {
      return "Salary not disclosed";
    }
    const min = Math.floor(salary.min / 100000);
    const max = Math.floor(salary.max / 100000);
    return `$${min}K - $${max}K ${salary.type?.toLowerCase() || "monthly"}`;
  };

  const formatEmploymentType = (type: string) => {
    if (!type) return "Not specified";
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getLocation = () => {
    if (!job.location) return "Location not specified";
    if (job.location.type === "REMOTE") return "Remote";
    if (job.location.type === "ON_SITE" || job.location.type === "ONSITE") {
      return (
        job.location.address?.city + ", " + job.location.address?.country ||
        "On-site"
      );
    }
    return job.location.address?.country || "Location not specified";
  };

  const getDepartmentName = () => {
    if (
      job.department &&
      typeof job.department === "object" &&
      job.department.name
    ) {
      return job.department.name;
    }
    if (typeof job.department === "string") {
      return job.department;
    }
    return "Department Not Specified";
  };

  const getExperienceYears = () => {
    return job.requirements?.experience?.minimumYears || 0;
  };

  const formatDate = () => {
    try {
      return new Date(job.createdAt).toLocaleDateString();
    } catch {
      return "Date not available";
    }
  };

  const handleViewJob = () => {
    if (job.slug) {
      router.push(`/careers/${job.slug}`);
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200"
      onClick={handleViewJob}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {job.title || "Job Title Not Available"}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              {getDepartmentName()}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {formatEmploymentType(job.employmentType)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {job.shortDescription || "No description available"}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{getLocation()}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{getExperienceYears()}+ years</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span>{formatSalary(job.salary)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500">Posted {formatDate()}</span>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Radio Button Group Component
const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  loading = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-900 block">
        {label}
      </label>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <input
            type="radio"
            name={name}
            value=""
            checked={value === ""}
            onChange={() => onChange("")}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            disabled={loading}
          />
          <span className="text-gray-700">All {label}</span>
        </label>
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
};

// Filters Component
const JobFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [department, setDepartment] = useState(
    searchParams.get("department") || ""
  );
  const [employmentType, setEmploymentType] = useState(
    searchParams.get("employmentType") || ""
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Fetch departments
  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const updateURL = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("skip"); // Reset pagination
      router.push(`/careers?${params.toString()}`);
    },
    [searchParams, router]
  );

  const clearFilters = () => {
    setDepartment("");
    setEmploymentType("");
    setLocation("");
    router.push("/careers");
  };

  // Convert departments to options format
  const departmentOptions =
    departments?.map((dept) => ({
      value: dept._id,
      label: dept.name,
    })) || [];

  const employmentTypeOptions = [
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "INTERNSHIP", label: "Internship" },
  ];

  const locationOptions = [
    { value: "REMOTE", label: "Remote" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "ONSITE", label: "On-site" },
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Filter className="w-5 h-5 text-gray-600" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Department */}
        <RadioGroup
          label="Departments"
          name="department"
          options={departmentOptions}
          value={department}
          loading={departmentsLoading}
          onChange={(value) => {
            setDepartment(value);
            updateURL("department", value);
          }}
        />

        {/* Employment Type */}
        <RadioGroup
          label="Employment Types"
          name="employmentType"
          options={employmentTypeOptions}
          value={employmentType}
          onChange={(value) => {
            setEmploymentType(value);
            updateURL("employmentType", value);
          }}
        />

        {/* Location */}
        <RadioGroup
          label="Locations"
          name="location"
          options={locationOptions}
          value={location}
          onChange={(value) => {
            setLocation(value);
            updateURL("location", value);
          }}
        />

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

// Main Careers Page Component
const CareersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // Build query parameters
  const queryParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    queryParams.set(key, value);
  });

  const updateURL = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("skip"); // Reset pagination
      router.push(`/careers?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleSearch = () => {
    updateURL("q", searchTerm);
  };

  // Fetch jobs using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", queryParams],
    queryFn: () => fetchJobs(queryParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const skip = (newPage - 1) * 20;
    params.set("skip", skip.toString());
    router.push(`/careers?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container lg:max-w-7xl sm:max-w-6xl mx-auto sm:px-16 lg:px-4 py-8">
        {/* Header with Search */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Discover exciting opportunities and join our team
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jobs, keywords, positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-12 pr-28 py-4 text-lg border border-gray-300 rounded-lg bg-white shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                {isLoading ? (
                  <p className="text-gray-600">Loading jobs...</p>
                ) : (
                  <p className="text-gray-600 font-medium">
                    {data?.data?.total || 0} job
                    {data?.data?.total !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            </div>

            {/* Jobs Grid */}
            {isLoading ? (
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse border-gray-200">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : data?.data.jobs.length === 0 || error ? (
              error ? (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="text-center py-12">
                    <Building className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-red-700">
                      {error.message ?? "Failed to fetch jobs"}
                    </h3>
                    <p className="text-red-600">Please try again later</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-gray-200">
                  <CardContent className="text-center py-12">
                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      Currently not hiring for this position
                    </h3>
                    <p className="text-gray-600">
                      We're not actively recruiting for roles matching your
                      criteria at this time
                    </p>
                  </CardContent>
                </Card>
              )
            ) : (
              <div className="grid gap-6">
                {data?.data?.jobs?.map((job) => (
                  <SimpleJobCard key={job?._id} job={job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {data && data?.data?.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(data?.data?.page - 1)}
                  disabled={data?.data?.page <= 1}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </Button>

                {[...Array(data?.data?.totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={data?.data?.page === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 ${
                      data?.data?.page === i + 1
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(data?.data?.page + 1)}
                  disabled={data?.data?.page >= data?.data?.totalPages}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
