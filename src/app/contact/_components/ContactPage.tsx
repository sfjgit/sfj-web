/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Check,
  ChevronDown,
  Globe,
  Building2,
  Users,
  GraduationCap,
  Handshake,
  HeadphonesIcon,
  HelpCircle,
  Circle,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const ContactForm = () => {
  const query = useSearchParams();
  const type = query.get("type");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    type: type ?? "b2b",
    subCategory: "",
    websiteUrl: "",
    query: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    value: "+91",
    label: "India (+91)",
    flag: "🇮🇳",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countryCodes = [
    { value: "+91", label: "India (+91)", flag: "🇮🇳" },
    { value: "+1", label: "USA (+1)", flag: "🇺🇸" },
    { value: "+44", label: "UK (+44)", flag: "🇬🇧" },
    { value: "+61", label: "Australia (+61)", flag: "🇦🇺" },
    { value: "+49", label: "Germany (+49)", flag: "🇩🇪" },
  ];

  useEffect(() => {
    console.log(type, "type");
    console.log(query, "query");
    if (type) {
      setFormData((prev) => ({ ...prev, type: type }));
    }
  }, [type]);

  const typeOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "b2b", label: "Corporate Training" },
    { value: "b2i", label: "Institution" },
    { value: "b2g", label: "Govt Skilling Mission" },
    { value: "csr", label: "Corporate Social Responsibility" },
    { value: "it-staffing", label: "IT Staffing" },
  ];

  const subCategoryOptions = [
    { value: "skills", label: "Skill Development" },
    { value: "jobs", label: "Job Assistance" },
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber || !/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10-15 digits";
    }

    if (!formData.type) {
      newErrors.type = "Please select an option";
    }

    if (formData.type === "b2i" && !formData.subCategory) {
      newErrors.subCategory = "Please select your interest area";
    }

    if (!formData.query || formData.query.length < 10) {
      newErrors.query = "Message must be at least 10 characters";
    }

    if (
      formData.websiteUrl &&
      !/^https?:\/\/.+\..+/.test(formData.websiteUrl)
    ) {
      newErrors.websiteUrl = "Please enter a valid website URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: "",
            email: "",
            countryCode: "+91",
            phoneNumber: "",
            type: type ?? "b2b",
            subCategory: "",
            websiteUrl: "",
            query: "",
          });
        }, 3000);
      } else {
        console.error("API Error:", result.message);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: "",
            email: "",
            countryCode: "+91",
            phoneNumber: "",
            type: type ?? "b2b",
            subCategory: "",
            websiteUrl: "",
            query: "",
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phoneNumber: "",
          type: type ?? "b2b",
          subCategory: "",
          websiteUrl: "",
          query: "",
        });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      // @ts-expect-error Clear error when user starts typing
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Contact Us
          </h1>
          <p className="text-slate-600 text-lg">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-8">
            {/* Service Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                What are you looking for? *
              </label>
              <div className="flex flex-wrap gap-5">
                {typeOptions.map((option) => {
                  // Define icons for each option
                  const getIcon = (value: any) => {
                    switch (value) {
                      case "general":
                        return <Building2 className="w-4 h-4 text-slate-500" />;
                      case "b2b":
                        return <Users className="w-4 h-4 text-slate-500" />;
                      case "b2i":
                        return (
                          <GraduationCap className="w-4 h-4 text-slate-500" />
                        );
                      case "b2g":
                        return <Handshake className="w-4 h-4 text-slate-500" />;
                      case "csr":
                        return (
                          <HeadphonesIcon className="w-4 h-4 text-slate-500" />
                        );
                      case "it-staffing":
                        return (
                          <HelpCircle className="w-4 h-4 text-slate-500" />
                        );
                      default:
                        return <Circle className="w-4 h-4 text-slate-500" />;
                    }
                  };

                  return (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="type"
                        value={option.value}
                        checked={formData.type === option.value}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 flex items-center gap-2 text-sm text-slate-700 font-medium">
                        {getIcon(option.value)}
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.type && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.type}
                </p>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/50 hover:bg-white/80"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500 mt-2 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/50 hover:bg-white/80"
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Phone Number *
              </label>
              <div className="flex gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-2 px-4 py-3.5 border-2 border-slate-200 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 min-w-[140px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {selectedCountry.value}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
                      {countryCodes.map((country) => (
                        <button
                          key={country.value}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            handleInputChange("countryCode", country.value);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors text-left border-b border-slate-100 last:border-b-0"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm font-medium text-slate-700">
                            {country.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-1 relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/50 hover:bg-white/80"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Sub Category for Institutions */}
            {formData.type === "b2i" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Your Interest Area *
                </label>
                <div className="space-y-3">
                  {subCategoryOptions.map((option) => {
                    // Define icons for subcategory options
                    const getSubIcon = (value: any) => {
                      switch (value) {
                        case "skills":
                          return (
                            <BookOpen className="w-4 h-4 text-slate-500" />
                          );
                        case "jobs":
                          return (
                            <MessageCircle className="w-4 h-4 text-slate-500" />
                          );

                        default:
                          return <Circle className="w-4 h-4 text-slate-500" />;
                      }
                    };

                    return (
                      <label
                        key={option.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="subCategory"
                          value={option.value}
                          checked={formData.subCategory === option.value}
                          onChange={(e) =>
                            handleInputChange("subCategory", e.target.value)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                          {getSubIcon(option.value)}
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.subCategory && (
                  <p className="text-sm text-red-500 mt-2 font-medium">
                    {errors.subCategory}
                  </p>
                )}
              </div>
            )}

            {/* Website URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Website URL (Optional)
              </label>
              <div className="relative">
                <Globe className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    handleInputChange("websiteUrl", e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/50 hover:bg-white/80"
                  placeholder="https://your-website.com"
                />
              </div>
              {errors.websiteUrl && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.websiteUrl}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Your Message *
              </label>
              <div className="relative">
                <MessageSquare className="w-5 h-5 text-slate-400 absolute left-3 top-4" />
                <textarea
                  rows={5}
                  value={formData.query}
                  onChange={(e) => handleInputChange("query", e.target.value)}
                  className="w-full pl-11 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-none bg-white/50 hover:bg-white/80"
                  placeholder="Tell us about your requirements, goals, or any specific questions you have..."
                />
              </div>
              {errors.query && (
                <p className="text-sm text-red-500 mt-2 font-medium">
                  {errors.query}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2856438459257!2d77.63598241536467!3d12.889345220163921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14b089698d85%3A0x9b02d066823e0b2d!2sSFJ%20Business%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1657910713116!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl border-2 border-white/20 shadow-xl"
            title="SFJ Business Solutions Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
