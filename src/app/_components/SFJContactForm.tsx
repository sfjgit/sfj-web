"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MessageSquare, Send, Check } from "lucide-react";
import { RiContactsLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";

// Name tag for the two floating action buttons. Sits to the left of its
// button and slides in on hover or keyboard focus, so each icon identifies
// itself without the buttons carrying permanent text. `pointer-events-none`
// keeps it from stealing the click it is describing.
const LABEL_CLASS =
  "pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 " +
  "whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium " +
  "text-white shadow-lg opacity-0 translate-x-1 transition-all duration-200 " +
  "group-hover:opacity-100 group-hover:translate-x-0 " +
  "group-focus-visible:opacity-100 group-focus-visible:translate-x-0";

const SFJContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    type: "general",
    query: "",
  });

  const [errors, setErrors] = useState<any>({});

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: null }));
    }
  };

  // Validate form
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

    if (!formData.query || formData.query.length < 10) {
      newErrors.query = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
            type: "general",
            query: "",
          });
          setIsOpen(false);
        }, 3000);
      } else {
        console.error("API Error:", result.message);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        isOpen &&
        !e.target.closest(".contact-form-container") &&
        !e.target.closest(".contact-button")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Contact Button and Form */}
      <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40 flex flex-col items-end gap-2">
        {/* Login Button */}
        <button
          type="button"
          aria-label="Login"
          title="Login"
          className="group relative bg-slate-700 hover:bg-slate-800 text-white p-2.5 md:p-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <CiLogin className="w-6 h-6 md:w-7 md:h-7" />
          <span className={LABEL_CLASS}>Login</span>
        </button>
        {/* Moved down from the navbar — sits above the chat button.
            `group` drives the name tag: two identical dark squares are
            indistinguishable at a glance, so each one labels itself on
            hover/focus rather than relying on the icon alone. */}
        <Link
          href="/contact"
          aria-label="Contact Us"
          className="group relative bg-slate-700 hover:bg-slate-800 text-white p-2.5 md:p-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <RiContactsLine className="w-6 h-6 md:w-7 md:h-7" />
          <span className={LABEL_CLASS}>Contact Us</span>
        </Link>

        <div className="relative">
          {/* Rounded message-box plate rather than a circle. The muted dark
              fill keeps the mark readable over any section it floats above. */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Chat with us"
            className="contact-button group relative bg-slate-700 hover:bg-slate-800 text-white p-1.5 md:p-2 rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center transition-shadow duration-300"
            // Perspective must sit on an ancestor for the child's rotateX/Y to
            // render as depth rather than a flat squash.
            style={{ perspective: "700px" }}
          >
            {/* Pre-cropped to the mascot's ink box — the source artwork sits in
                a 1536x1024 canvas that is 79% empty, so object-contain would
                fit the blank canvas and render the mascot at half size. */}
            <span className="chat-mascot-tilt block">
              <Image
                src="/mascot-chat.png"
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="chat-mascot w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md"
              />
            </span>
            <span className={LABEL_CLASS}>Chat with us</span>
          </button>

          {/* Floating notification dot */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>

          {/* Form popup - responsive position */}
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Form positioned responsively */}
              <div
                className="contact-form-container fixed right-4 md:right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4
                bottom-32 max-h-[calc(100vh-8rem)] overflow-y-auto
                md:bottom-32 md:max-h-[calc(100vh-10rem)]
                lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:max-h-[calc(100vh-4rem)]"
              >
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-t-2xl sticky top-0 z-10"></div>

                {/* Success State */}
                {isSuccess ? (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your message has been sent successfully. Our SFJ team will
                      get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-y-auto">
                    {/* Logo and header */}
                    <div className="px-4 pt-4 pb-2 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        SFJ
                      </p>
                      <h2 className="text-lg font-bold text-gray-900 mb-1">
                        Let's Connect
                      </h2>
                      <p className="text-sm text-gray-600">
                        We're here to help with any questions you may have.
                      </p>
                    </div>

                    {/* Form */}
                    <div className="px-4 pb-4 space-y-3">
                      {/* Name Field */}
                      <div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your Name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Email Address"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone Fields */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.countryCode}
                          onChange={(e) =>
                            handleInputChange("countryCode", e.target.value)
                          }
                          placeholder="+91"
                          className="w-16 px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-center"
                        />
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          placeholder="Phone Number"
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}

                      {/* Message Field */}
                      <div>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                          <textarea
                            rows={3}
                            value={formData.query}
                            onChange={(e) =>
                              handleInputChange("query", e.target.value)
                            }
                            placeholder="How can we help you today?"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-sm"
                          />
                        </div>
                        {errors.query && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.query}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submit Query
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Query
                          </>
                        )}
                      </button>

                      {/* Footer */}
                      <p className="text-xs text-gray-500 text-center mt-3">
                        By submitting this form, you agree to our{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* WhatsApp Chat Button */}
      {/*<div className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-30">
        <a
          href="https://wa.me/9845348601"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-6 md:h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.01 2.002c-5.522 0-9.998 4.477-9.998 9.998 0 1.762.46 3.419 1.264 4.849L2.01 22l5.292-1.388c1.377.745 2.942 1.135 4.708 1.135 5.522 0 9.998-4.477 9.998-9.998s-4.476-9.998-9.998-9.998M12.01.002c6.628 0 12.01 5.382 12.01 12.01S18.638 24.022 12.01 24.022c-1.892 0-3.679-.437-5.273-1.218L.002 24.022l1.302-4.769C.438 17.673.002 14.922.002 12.01.002 5.382 5.384.002 12.01.002" />
          </svg>
          <span className="text-xs md:text-sm font-medium">Chat with us</span>
        </a>
      </div>*/}
    </>
  );
};

export default SFJContactForm;
