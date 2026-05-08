/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  X,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import env from "@/config/env";
import axios from "axios";

interface LmsEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    slug: string;
  };
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    originalPrice: number | null;
  };
}

type Step = "register" | "processing" | "success" | "error";

const LMS_URL = process.env.NEXT_PUBLIC_LMS_BASE_URL;

export default function LmsEnrollModal({
  isOpen,
  onClose,
  course,
  plan,
}: LmsEnrollModalProps) {
  const [step, setStep] = useState<Step>("register");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  if (!isOpen) return null;

  const isFree = plan.price === 0;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: plan.currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError("");

  //     if (
  //       !formData.name ||
  //       !formData.email ||
  //       !formData.phone ||
  //       !formData.password
  //     ) {
  //       setError("All fields are required");
  //       return;
  //     }
  //     if (formData.phone.length < 10) {
  //       setError("Enter a valid 10-digit phone number");
  //       return;
  //     }
  //     if (formData.password.length < 6) {
  //       setError("Password must be at least 6 characters");
  //       return;
  //     }

  //     setStep("processing");

  //     try {
  //       //   const res = await fetch(`${LMS_URL}/payments/initiate`, {
  //       //     method: "POST",
  //       //     headers: { "Content-Type": "application/json" },
  //       //     body: JSON.stringify({
  //       //       courseId: course.id,
  //       //       pricingPlanId: plan.id,
  //       //       name: formData.name,
  //       //       email: formData.email,
  //       //       phone: formData.phone,
  //       //       password: formData.password,
  //       //     }),
  //       //   });
  //       const res = await fetch(`${LMS_URL}/user/auth/signup`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: formData.name,
  //           email: formData.email,
  //           phone: formData.phone,
  //           password: formData.password,
  //         }),
  //       });

  //       const data = await res.json();

  //       if (!res.ok || !data.success) {
  //         setError(data.error || "Something went wrong. Please try again.");
  //         setStep("register");
  //         return;
  //       }

  //       // Store JWT for after payment return
  //       if (data.data.token) {
  //         localStorage.setItem("lms_token", data.data.token);
  //         localStorage.setItem("lms_pending_course", course.slug);
  //       }

  //       if (data.data.type === "free") {
  //         // Free course — enrolled immediately
  //         setStep("success");
  //         return;
  //       }

  //       // Paid course — redirect to PhonePe
  //       window.location.href = data.data.paymentUrl;
  //     } catch (err) {
  //       console.error(err);
  //       setError("Network error. Please check your connection and try again.");
  //       setStep("register");
  //     }
  //   };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   if (
  //     !formData.name ||
  //     !formData.email ||
  //     !formData.phone ||
  //     !formData.password
  //   ) {
  //     setError("All fields are required");
  //     return;
  //   }
  //   if (formData.phone.length < 10) {
  //     setError("Enter a valid 10-digit phone number");
  //     return;
  //   }
  //   if (formData.password.length < 6) {
  //     setError("Password must be at least 6 characters");
  //     return;
  //   }

  //   setStep("processing");

  //   try {
  //     // ── Step 1: Signup ────────────────────────────────────────────────────
  //     const signupRes = await fetch(`${LMS_URL}/user/auth/signup`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         phone: formData.phone,
  //         password: formData.password,
  //       }),
  //     });

  //     const signupData = await signupRes.json();
  //     console.log("signupData", signupData);

  //     // If user already exists, try login instead
  //     if (!signupRes.ok && signupData.code === "USER_EXISTS") {
  //       const loginRes = await fetch(`${LMS_URL}/user/auth/sigin`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           includeCredentials: "true",
  //         },
  //         body: JSON.stringify({
  //           email: formData.email,
  //           password: formData.password,
  //         }),
  //       });

  //       const loginData = await loginRes.json();

  //       if (!loginRes.ok || !loginData.success) {
  //         setError(
  //           "An account with this email already exists. Please check your password.",
  //         );
  //         setStep("register");
  //         return;
  //       }

  //       // Use login token instead
  //       signupData.data = loginData.data;
  //     } else if (!signupRes.ok || !signupData.success) {
  //       setError(signupData.message || "Signup failed. Please try again.");
  //       setStep("register");
  //       return;
  //     }

  //     const accessToken = signupData.data?.accessToken;
  //     console.log("accessToken", accessToken);
  //     if (!accessToken) {
  //       setError("Authentication failed. Please try again.");
  //       setStep("register");
  //       return;
  //     }

  //     // Store token
  //     localStorage.setItem("lms_token", accessToken);
  //     localStorage.setItem("lms_pending_course", course.slug);

  //     // ── Step 2: Initiate payment ──────────────────────────────────────────
  //     const paymentRes = await fetch(
  //       `${env.NEXT_PUBLIC_LMS_COURSE_URL}/payments/initiate`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //           includeCredentials: "true",
  //         },
  //         body: JSON.stringify({
  //           courseId: course.id,
  //           pricingPlanId: plan.id,
  //         }),
  //       },
  //     );

  //     const paymentData = await paymentRes.json();

  //     if (!paymentRes.ok || !paymentData.success) {
  //       if (paymentData.error === "Already enrolled in this course") {
  //         setStep("success");
  //         return;
  //       }
  //       setError(paymentData.error || "Payment initiation failed.");
  //       setStep("register");
  //       return;
  //     }

  //     if (paymentData.data.type === "free") {
  //       setStep("success");
  //       return;
  //     }

  //     // Redirect to PhonePe payment page
  //     window.location.href = paymentData.data.paymentUrl;
  //   } catch (err) {
  //     console.error(err);
  //     setError("Network error. Please check your connection and try again.");
  //     setStep("register");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.phone.length < 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setStep("processing");

    try {
      // ── Step 1: Signup ─────────────────────────────────────────────
      let authData: any;

      try {
        const signupRes = await axios.post(
          `${LMS_URL}/user/auth/signup`,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
        console.log("signupRes", signupRes.data);

        authData = signupRes.data;
      } catch (signupError: any) {
        // If user already exists → login instead
        if (signupError.response?.data?.code === "USER_EXISTS") {
          const loginRes = await axios.post(
            `${LMS_URL}/user/auth/signin`,
            {
              email: formData.email,
              password: formData.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            },
          );

          console.log("loginRes", loginRes.data);

          authData = loginRes.data;
        } else {
          setError(
            signupError.response?.data?.message ||
              "Signup failed. Please try again.",
          );
          setStep("register");
          return;
        }
      }

      const accessToken = authData.data?.accessToken;

      console.log("accessToken", accessToken);

      if (!accessToken) {
        setError("Authentication failed. Please try again.");
        setStep("register");
        return;
      }

      // Store token
      localStorage.setItem("lms_token", accessToken);
      localStorage.setItem("lms_pending_course", course.slug);

      // ── Step 2: Initiate Payment ──────────────────────────────────
      const paymentRes = await axios.post(
        `${env.NEXT_PUBLIC_LMS_COURSE_URL}/payments/initiate`,
        {
          courseId: course.id,
          pricingPlanId: plan.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      console.log("paymentRes", paymentRes.data);

      const paymentData = paymentRes.data;

      if (!paymentData.success) {
        if (paymentData.error === "Already enrolled in this course") {
          setStep("success");
          return;
        }

        setError(paymentData.error || "Payment initiation failed.");
        setStep("register");
        return;
      }

      if (paymentData.data.type === "free") {
        setStep("success");
        return;
      }

      // Redirect to PhonePe
      window.location.href = paymentData.data.paymentUrl;
    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Network error. Please check your connection and try again.",
      );

      setStep("register");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === "register" ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f1117] text-white p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-xs text-gray-400 mb-1">Enrolling in</p>
              <h2 className="font-bold text-base leading-snug line-clamp-2">
                {course.title}
              </h2>
            </div>
            {step === "register" && (
              <button
                onClick={onClose}
                className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Price summary */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {isFree ? "Free" : formatPrice(plan.price)}
            </span>
            {plan.originalPrice && plan.originalPrice > plan.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(plan.originalPrice)}
              </span>
            )}
            <span className="text-sm text-gray-300">· {plan.name}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* STEP: Register */}
          {step === "register" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Create your account to continue
                </p>
                <p className="text-xs text-gray-500">
                  Already have an account? Your details will be matched
                  automatically.
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="John Doe"
                    className="w-full text-black px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="john@example.com"
                    className="w-full text-black px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-sm text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          phone: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      placeholder="9876543210"
                      className="flex-1 text-black px-3 py-2.5 border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
                      placeholder="Min. 6 characters"
                      className="w-full text-black px-3 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                {isFree ? "Enroll for free" : `Pay ${formatPrice(plan.price)}`}
              </button> */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Sign Up
              </button>

              <p className="text-center text-xs text-gray-400">
                By continuing you agree to our{" "}
                <a href="/terms" className="underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          )}

          {/* STEP: Processing */}
          {step === "processing" && (
            <div className="py-10 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {isFree
                    ? "Enrolling you..."
                    : "Connecting to payment gateway..."}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {isFree
                    ? "Setting up your course access"
                    : "You'll be redirected to complete payment securely"}
                </p>
              </div>
            </div>
          )}

          {/* STEP: Success (free courses only) */}
          {step === "success" && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">
                  You&apos;re enrolled!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  You can now access {course.title}
                </p>
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_LMS_URL}/courses/${course.slug}/learn`}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors text-center"
              >
                Start learning →
              </a>
            </div>
          )}

          {/* STEP: Error */}
          {step === "error" && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Something went wrong</p>
                <p className="text-sm text-gray-500 mt-1">{error}</p>
              </div>
              <button
                onClick={() => {
                  setStep("register");
                  setError("");
                }}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
