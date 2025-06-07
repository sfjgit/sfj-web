/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Building,
  GraduationCap,
  Globe,
  Check,
  ChevronDown,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { handleErrors } from "@/lib/handleError";

// Validation Schema
const contactSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    countryCode: z.string().default("+91"),
    phoneNumber: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
    type: z.enum(["b2b", "b2i", "b2g", "it-staffing"], {
      required_error: "Please select an option",
    }),
    subCategory: z.enum(["jobs", "skills"]).optional(),
    websiteUrl: z
      .string()
      .url("Please enter a valid website URL")
      .optional()
      .or(z.literal("")),
    course: z.string().optional(),
    query: z.string().min(10, "Message must be at least 10 characters"),
    from: z.enum(["sfj"]).default("sfj").optional(),
  })
  .refine(
    (data) => {
      if (data.type === "b2i" && !data.subCategory) {
        return false;
      }
      return true;
    },
    {
      message: "Please select your interest area",
      path: ["subCategory"],
    }
  );

const countryCodes = [
  { value: "+91", label: "India (+91)", flag: "🇮🇳" },
  { value: "+1", label: "USA (+1)", flag: "🇺🇸" },
  { value: "+44", label: "UK (+44)", flag: "🇬🇧" },
  { value: "+61", label: "Australia (+61)", flag: "🇦🇺" },
  { value: "+49", label: "Germany (+49)", flag: "🇩🇪" },
];

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    // @ts-expect-error error
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: "+91",
      from: "sfj",
    },
  });

  const watchedType = watch("type");
  const showSubCategory = watchedType === "b2i";

  const typeOptions = [
    {
      value: "b2b",
      title: "Corporate Training",
      description: "Professional development for your team",
      icon: <Building className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      value: "b2i",
      title: "Institution",
      description: "Educational programs for institutions",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-green-500 to-green-600",
    },
    {
      value: "it-staffing",
      title: "IT Staffing",
      description: "Hiring IT professionals for your organization",
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const subCategoryOptions = [
    {
      value: "skills",
      title: "Skill Development",
      description: "Focus on building technical skills",
    },
    {
      value: "jobs",
      title: "Job Assistance",
      description: "Career placement and guidance",
    },
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setValue("type", type as "b2b" | "b2i" | "b2g");
    if (type !== "b2i") {
      setSelectedSubCategory("");
      setValue("subCategory", undefined);
    }
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setValue("subCategory", subCategory as "jobs" | "skills");
  };

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/lead", {
        ...data,
      });
    },
    onSuccess: () => {
      // Show success message
      setTimeout(() => {
        reset(); // Reset form
        // onClose(); // Close dialog
      }, 2000);
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        handleErrors(err as any) ?? "Something went wrong. Please try again."
      );
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Convert empty strings to undefined
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === "string" && value.trim() === "" ? undefined : value,
        ])
      ) as ContactFormData;

      // Simulate API call
      await submitMutation.mutateAsync(cleanedData);

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        setSelectedType("");
        setSelectedSubCategory("");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full mx-auto h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your message has been sent successfully. Our team will get back to
            you within 24 hours.
          </p>
          <div className="inline-flex items-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Message delivered</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Ready to transform your team&apos;s skills? Let&apos;s discuss how
            we can help you achieve your goals.
          </p>
        </div>

        <form
          onSubmit={
            // @ts-expect-error error
            handleSubmit(onSubmit)
          }
          className="p-8 space-y-8"
        >
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  {...register("name")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors min-w-[140px]"
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium">
                    {selectedCountry.value}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {countryCodes.map((country) => (
                      <button
                        key={country.value}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setValue("countryCode", country.value);
                          setShowCountryDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm">{country.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  {...register("phoneNumber")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Service Type Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              What are you looking for?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {typeOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleTypeSelect(option.value)}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedType === option.value
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.gradient} text-white flex items-center justify-center mb-4`}
                  >
                    {option.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">{option.description}</p>

                  {selectedType === option.value && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Sub Category for Institutions */}
          {showSubCategory && (
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">
                Your Interest Area
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subCategoryOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSubCategorySelect(option.value)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSubCategory === option.value
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h4 className="font-medium text-gray-800 mb-1">
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>

                    {selectedSubCategory === option.value && (
                      <div className="mt-2">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {errors.subCategory && (
                <p className="text-sm text-red-500">
                  {errors.subCategory.message}
                </p>
              )}
            </div>
          )}

          {/* Website URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Website URL (Optional)
            </label>
            <div className="relative">
              <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                {...register("websiteUrl")}
                type="url"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="https://your-website.com"
              />
            </div>
            {errors.websiteUrl && (
              <p className="text-sm text-red-500">
                {errors.websiteUrl.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Message
            </label>
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <textarea
                {...register("query")}
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your requirements, goals, or any specific questions you have..."
              />
            </div>
            {errors.query && (
              <p className="text-sm text-red-500">{errors.query.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default ContactForm;

export default function page() {
  return (
    <div className="pt-20 flex flex-col max-w-7xl mx-auto">
      <ContactForm />
      <section className="w-full pt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2856438459257!2d77.63598241536467!3d12.889345220163921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14b089698d85%3A0x9b02d066823e0b2d!2sSFJ%20Business%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1657910713116!5m2!1sen!2sin"
          width="100%"
          height="600"
          //   allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
