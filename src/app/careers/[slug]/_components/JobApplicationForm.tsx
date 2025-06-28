/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
// components/forms/JobApplicationForm.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Loader2, File } from "lucide-react";
import FileUploadInput from "../../../../components/forms/FileUploadInput";
import axios from "axios";
// import { env } from "node:process";
// import { env } from "process";
// import type { ApplicationCreate } from "@/types/careers";

const backend_url =
  process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3001";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle?: string;
  companyName?: string;
  trigger?: React.ReactNode;
  onSuccess?: (application: any) => void;
  onError?: (error: string) => void;
}

interface FormData {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location: {
    city?: string;
    state?: string;
    country?: string;
    willingToRelocate: boolean;
  };
  currentRole?: string;
  currentCompany?: string;
  yearsOfExperience: number;
  noticePeriod?: string;
  availableStartDate?: Date;
  expectedSalary: {
    amount?: number;
    currency: string;
    negotiable: boolean;
  };
  resumeUrl?: string;
  coverLetterUrl?: string;
  source?: string;
  referrer?: string;
  customAnswers: any[];
  consentToProcess: boolean;
  consentToMarketing: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobId,
  jobTitle,
  companyName,
  trigger,
  onSuccess,
  onError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    jobId,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    location: {
      city: "",
      state: "",
      country: "",
      willingToRelocate: false,
    },
    currentRole: "",
    currentCompany: "",
    yearsOfExperience: 0,
    noticePeriod: "",
    availableStartDate: undefined,
    expectedSalary: {
      amount: undefined,
      currency: "USD",
      negotiable: true,
    },
    resumeUrl: "",
    coverLetterUrl: "",
    source: "",
    referrer: "",
    customAnswers: [],
    consentToProcess: false,
    consentToMarketing: false,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (formData.yearsOfExperience < 0)
      newErrors.yearsOfExperience = "Years of experience must be 0 or greater";
    if (!formData.resumeUrl) newErrors.resumeUrl = "Resume is required";
    if (!formData.consentToProcess)
      newErrors.consentToProcess = "You must consent to data processing";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const keys = field.split(".");
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            // @ts-ignore
            ...prev[keys[0] as keyof FormData],
            [keys[1]]: value,
          },
        };
      }
      return prev;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    const cleanedFormData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        // @ts-ignore
        acc[key] = value === "" ? undefined : value;
        return acc;
      },
      {}
    );
    try {
      const response = await fetch(backend_url + "/api/hr/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cleanedFormData,
          // @ts-ignore
          availableStartDate: cleanedFormData.availableStartDate?.toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      const result = await response.json();

      onSuccess?.(result.data);
      setIsOpen(false);

      // Reset form
      setFormData({
        jobId,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedinUrl: "",
        portfolioUrl: "",
        location: {
          city: "",
          state: "",
          country: "",
          willingToRelocate: false,
        },
        currentRole: "",
        currentCompany: "",
        yearsOfExperience: 0,
        noticePeriod: "",
        availableStartDate: undefined,
        expectedSalary: {
          amount: undefined,
          currency: "USD",
          negotiable: true,
        },
        resumeUrl: "",
        coverLetterUrl: "",
        source: "",
        referrer: "",
        customAnswers: [],
        consentToProcess: false,
        consentToMarketing: false,
      });
      setErrors({});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setSubmitError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleFileUpload = async (
  //   file: File,
  //   type: "resume" | "coverLetter"
  // ): Promise<string> => {
  //   try {
  //     // Step 1: Request upload URL
  //     const uploadResponse = await axios.post(backend_url + "/api/files", {
  //       fileName: file.name,
  //       mimeType: file.type,
  //       size: file.size,
  //       type: type === "resume" ? "RESUME" : "COVER_LETTER",
  //       associatedId: jobId,
  //       associatedType: "job_application",
  //       isPublic: false,
  //     });

  //     // if (!uploadResponse.ok) {
  //     //   throw new Error("Failed to get upload URL");
  //     // }

  //     const data = await uploadResponse.data;
  //     // const { fileId, uploadUrl } = data;

  //     console.log(data);

  //     // // Step 2: Upload to S3
  //     // const uploadFileResponse = await axios.put(uploadUrl, file, {
  //     //   headers: { "Content-Type": file.type },
  //     // });

  //     // if (!uploadFileResponse.ok) {
  //     //   throw new Error("Failed to upload file");
  //     // }

  //     // // Step 3: Confirm upload
  //     // const confirmResponse = await fetch(
  //     //   backend_url + `/api/files/${fileId}/confirm`,
  //     //   {
  //     //     method: "POST",
  //     //   }
  //     // );

  //     // if (!confirmResponse.ok) {
  //     //   throw new Error("Failed to confirm upload");
  //     // }

  //     // const { data: confirmedFile } = await confirmResponse.json();
  //     return data?.fileUrl;
  //   } catch (error) {
  //     throw new Error(error instanceof Error ? error.message : "Upload failed");
  //   }
  // };
  const handleFileUpload = async (
    file: File,
    type: "resume" | "coverLetter"
  ): Promise<string> => {
    try {
      // Create FormData for direct upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("mimeType", file.type);
      formData.append("size", file.size.toString());
      formData.append("type", type === "resume" ? "RESUME" : "COVER_LETTER");
      formData.append("associatedId", jobId);
      formData.append("associatedType", "job_application");
      formData.append("isPublic", "false");

      // Single API call - replace your 3-step process with this
      const uploadResponse = await axios.post(
        backend_url + "/api/files", // New endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = uploadResponse.data;
      return data.fileUrl;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Upload failed");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="w-full">
            Apply Now
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className=" !w-[70vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle || "Position"}</DialogTitle>
          <DialogDescription>
            {companyName && `at ${companyName} • `}
            Please fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    placeholder="https://linkedin.com/in/johndoe"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio URL</label>
                  <Input
                    placeholder="https://johndoe.com"
                    value={formData.portfolioUrl}
                    onChange={(e) =>
                      handleInputChange("portfolioUrl", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    placeholder="New York"
                    value={formData.location.city}
                    onChange={(e) =>
                      handleInputChange("location.city", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Input
                    placeholder="NY"
                    value={formData.location.state}
                    onChange={(e) =>
                      handleInputChange("location.state", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    placeholder="United States"
                    value={formData.location.country}
                    onChange={(e) =>
                      handleInputChange("location.country", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="relocate"
                  checked={formData.location.willingToRelocate}
                  onCheckedChange={(checked) =>
                    handleInputChange("location.willingToRelocate", checked)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="relocate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Willing to relocate
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Check if you're open to relocating for this position
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Role</label>
                  <Input
                    placeholder="Software Engineer"
                    value={formData.currentRole}
                    onChange={(e) =>
                      handleInputChange("currentRole", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Company</label>
                  <Input
                    placeholder="Tech Corp"
                    value={formData.currentCompany}
                    onChange={(e) =>
                      handleInputChange("currentCompany", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Years of Experience *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="5"
                    value={formData.yearsOfExperience || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "yearsOfExperience",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                  {errors.yearsOfExperience && (
                    <p className="text-sm text-red-500">
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notice Period</label>
                  <Select
                    value={formData.noticePeriod}
                    onValueChange={(value) =>
                      handleInputChange("noticePeriod", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="2-months">2 Months</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Available Start Date
                </label>
                <Input
                  type="date"
                  value={
                    formData.availableStartDate?.toISOString().split("T")[0] ||
                    ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "availableStartDate",
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Salary Expectations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Salary Expectations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Salary</label>
                  <Input
                    type="number"
                    placeholder="75000"
                    value={formData.expectedSalary.amount || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "expectedSalary.amount",
                        parseFloat(e.target.value) || undefined
                      )
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Annual salary in your preferred currency
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select
                    value={formData.expectedSalary.currency}
                    onValueChange={(value) =>
                      handleInputChange("expectedSalary.currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="negotiable"
                  checked={formData.expectedSalary.negotiable}
                  onCheckedChange={(checked) =>
                    handleInputChange("expectedSalary.negotiable", checked)
                  }
                />
                <label
                  htmlFor="negotiable"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Salary is negotiable
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
              <CardDescription>
                Upload your resume and cover letter (PDF, DOC, DOCX formats
                accepted)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Resume *</label>
                <FileUploadInput
                  onFileUpload={(file) => handleFileUpload(file, "resume")}
                  onUploadComplete={(url) =>
                    handleInputChange("resumeUrl", url)
                  }
                  accept=".pdf,.doc,.docx"
                  maxSizeMB={10}
                  placeholder="Upload your resume"
                />
                {errors.resumeUrl && (
                  <p className="text-sm text-red-500">{errors.resumeUrl}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  How did you hear about this position?
                </label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => handleInputChange("source", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company-website">
                      Company Website
                    </SelectItem>
                    <SelectItem value="job-board">Job Board</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="referral">Employee Referral</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Referrer Name</label>
                <Input
                  placeholder="If referred by someone, enter their name"
                  value={formData.referrer}
                  onChange={(e) =>
                    handleInputChange("referrer", e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground">
                  If you were referred by a current employee, please enter their
                  name
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consent & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consentToProcess}
                  onCheckedChange={(checked) =>
                    handleInputChange("consentToProcess", checked)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to the processing of my personal data *
                  </label>
                  <p className="text-xs text-muted-foreground">
                    I agree to the processing of my personal data for the
                    purpose of this job application and future recruitment
                    opportunities.
                  </p>
                </div>
              </div>
              {errors.consentToProcess && (
                <p className="text-sm text-red-500">
                  {errors.consentToProcess}
                </p>
              )}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={formData.consentToMarketing}
                  onCheckedChange={(checked) =>
                    handleInputChange("consentToMarketing", checked)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="marketing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I would like to receive updates about future opportunities
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Receive emails about similar job openings and company
                    updates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Alert */}
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
