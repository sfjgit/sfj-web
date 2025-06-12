/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Building,
  Search,
  Filter,
} from "lucide-react";
import CareersHeader from "./HeaderSection";

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

// Fetch jobs function
const fetchJobs = async (
  params: URLSearchParams
): Promise<{ data: JobsResponse }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/jobs?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
};

// Job Card Component
const JobCard = ({ job }: { job: JobPosting }) => {
  const router = useRouter();

  const formatSalary = (salary: JobPosting["salary"]) => {
    if (!salary.displayPublicly) return "Salary not disclosed";
    const min = (salary.min / 100000).toFixed(0);
    const max = (salary.max / 100000).toFixed(0);
    return `$${min}K - $${max}K ${salary.type.toLowerCase()}`;
  };

  const formatEmploymentType = (type: string) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleViewJob = () => {
    router.push(`/careers/${job.slug}`);
  };

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleViewJob}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{job.department}</p>
          </div>
          <Badge variant="secondary">
            {formatEmploymentType(job.employmentType)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {job.shortDescription}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>
              {job.location.type === "REMOTE"
                ? "Remote"
                : job.location.address.country}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{job.requirements.experience.minimumYears}+ years</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{formatSalary(job.salary)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <Button size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Filters Component
const JobFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [department, setDepartment] = useState(
    searchParams.get("department") || ""
  );
  const [employmentType, setEmploymentType] = useState(
    searchParams.get("employmentType") || ""
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");

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

  const clearFilters = () => {
    setSearchTerm("");
    setDepartment("");
    setEmploymentType("");
    setLocation("");
    router.push("/careers");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search Jobs</label>
          <div className="flex gap-2">
            <Input
              placeholder="Job title, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button size="sm" onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="text-sm font-medium mb-2 block">Department</label>
          <Select
            value={department}
            onValueChange={(value) => {
              setDepartment(value);
              updateURL("department", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">All Departments</SelectItem> */}
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Employment Type
          </label>
          <Select
            value={employmentType}
            onValueChange={(value) => {
              setEmploymentType(value);
              updateURL("employmentType", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">All Types</SelectItem> */}
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="PART_TIME">Part Time</SelectItem>
              <SelectItem value="CONTRACT">Contract</SelectItem>
              <SelectItem value="INTERNSHIP">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <Select
            value={location}
            onValueChange={(value) => {
              setLocation(value);
              updateURL("location", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">All Locations</SelectItem> */}
              <SelectItem value="REMOTE">Remote</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
              <SelectItem value="ONSITE">On-site</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

// Main Careers Page Component
const CareersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Build query parameters
  const queryParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    queryParams.set(key, value);
  });

  // Fetch jobs using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", queryParams.toString()],
    queryFn: () => fetchJobs(queryParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const skip = (newPage - 1) * 20;
    params.set("skip", skip.toString());
    router.push(`/careers?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading jobs
          </h2>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CareersHeader
        // companyName="SFJ Business Solutions"
        totalJobs={data?.data?.total}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Careers</h1>
          <p className="text-gray-600">Find your next opportunity with us</p>
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
                  <p className="text-gray-600">
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
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : data?.data.jobs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Currently not hiring for this position
                  </h3>
                  <p className="text-gray-600">
                    We're not actively recruiting for roles matching your
                    criteria at this time
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {data?.data?.jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
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
                >
                  Previous
                </Button>

                {[...Array(data?.data?.totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={data?.data?.page === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(data?.data?.page + 1)}
                  disabled={data?.data?.page >= data?.data?.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;
