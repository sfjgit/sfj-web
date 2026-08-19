/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";
import facultyRegistrationApi from "@/lib/facultyRegistrationApi";
import {
  FACULTY_DISCIPLINE_OPTIONS,
  FACULTY_ROLE_OPTIONS,
  FACULTY_STRENGTH_OPTIONS,
  // SYLLABUS_FILENAME,
  // SYLLABUS_PDF,
} from "../constants";

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const OTP_RESEND_COOLDOWN_SECONDS = 30; // matches OTP_RESEND_COOLDOWN_MS on the backend

type OtpStep = "idle" | "sending" | "sent" | "verifying" | "verified";

interface FormState {
  fullName: string;
  institution: string;
  role: string;
  discipline: string;
  courseTaught: string;
  facultyStrength: string;
  workEmail: string;
  mobile: string;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  institution: "",
  role: FACULTY_ROLE_OPTIONS[0],
  discipline: FACULTY_DISCIPLINE_OPTIONS[0],
  facultyStrength: "",
  courseTaught: "",
  workEmail: "",
  mobile: "",
};

const fieldClasses =
  "w-full rounded-lg border border-white/15 bg-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition-colors disabled:opacity-50";

const labelClasses = "block text-sm font-medium text-slate-300 mb-1.5";

export default function FacultyRegistrationForm({
  onRegistered,
}: {
  onRegistered?: () => void;
}) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState<OtpStep>("idle");
  const [resendIn, setResendIn] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => {
      setResendIn((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "mobile" && otpStep !== "idle") {
      // Number changed after a code was already requested/verified for the
      // previous number — the old code no longer applies to it.
      setOtpStep("idle");
      setOtp("");
      setOtpError("");
    }
  };

  const mobileValid = MOBILE_REGEX.test(form.mobile);

  const handleSendCode = async () => {
    if (!mobileValid) {
      setOtpError("Enter a valid 10-digit mobile number");
      return;
    }
    setOtpError("");
    setOtpStep("sending");
    try {
      await facultyRegistrationApi.post("/otp/send", { mobile: form.mobile });
      setOtpStep("sent");
      setResendIn(OTP_RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      setOtpError(
        err?.response?.data?.error || "Could not send the code. Try again.",
      );
      setOtpStep("idle");
    }
  };

  const handleVerifyCode = async () => {
    if (!/^\d{6}$/.test(otp)) return;
    setOtpError("");
    setOtpStep("verifying");
    try {
      await facultyRegistrationApi.post("/otp/verify", {
        mobile: form.mobile,
        otp,
      });
      setOtpStep("verified");
    } catch (err: any) {
      setOtpError(err?.response?.data?.error || "Incorrect code. Try again.");
      setOtpStep("sent");
    }
  };

  const formValid =
    form.fullName.trim().length >= 2 &&
    form.institution.trim().length >= 2 &&
    form.facultyStrength !== "" &&
    EMAIL_REGEX.test(form.workEmail) &&
    mobileValid &&
    otpStep === "verified";

  // const handleDownloadSyllabus = async () => {
  //   try {
  //     const response = await facultyRegistrationApi.get("/syllabus/download", {
  //       responseType: "blob",
  //     });

  //     const blob = new Blob([response.data], {
  //       type: "application/pdf",
  //     });

  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = SYLLABUS_FILENAME;

  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Syllabus download failed:", error);
  //   }
  // };

  // const handleDownloadSyllabus = async () => {
  //   try {
  //     const response = await facultyRegistrationApi.get("/syllabus/download");

  //     const { downloadUrl } = response.data;

  //     if (!downloadUrl) {
  //       throw new Error("Syllabus download URL not found");
  //     }

  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = SYLLABUS_FILENAME;

  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Syllabus download failed:", error);
  //   }
  // };
  const handleDownloadSyllabus = () => {
    const link = document.createElement("a");
    link.href = "/fac/faculty-ai-enablement-programme.pdf";
    link.download = "faculty-development-syllabus.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirm = async () => {
    if (!formValid) return;
    setFormError("");
    setSubmitting(true);
    try {
      await facultyRegistrationApi.post("/confirm", {
        fullName: form.fullName.trim(),
        institution: form.institution.trim(),
        role: form.role,
        discipline: form.discipline,
        facultyStrength: form.facultyStrength,
        courseTaught: form.courseTaught.trim() || undefined,
        workEmail: form.workEmail.trim(),
        mobile: form.mobile,
        otp,
      });
      setRegistered(true);
      onRegistered?.();
    } catch (err: any) {
      setFormError(
        err?.response?.data?.error ||
          "Could not complete registration. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (registered) {
    return (
      <div className="rounded-2xl bg-slate-900 px-6 py-10 text-center sm:px-10 sm:py-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 text-xl font-bold text-white">You&apos;re in!</h3>
        <p className="mt-2 text-sm text-slate-300">
          {/* We&apos;ve reserved your seat. The joining link and follow-up material
          will reach {form.workEmail} and your mobile. */}
          Registration successful!
        </p>
        {/* <a
          href={SYLLABUS_PDF}
          download={SYLLABUS_FILENAME}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-600"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download syllabus
        </a> */}
        <button
          type="button"
          onClick={handleDownloadSyllabus}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-600"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download syllabus
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Your name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Full name"
            className={fieldClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Institution</label>
          <input
            type="text"
            value={form.institution}
            onChange={(e) => updateField("institution", e.target.value)}
            placeholder="College or university"
            className={fieldClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Role</label>
          <select
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={fieldClasses}
          >
            {FACULTY_ROLE_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Discipline</label>
          <select
            value={form.discipline}
            onChange={(e) => updateField("discipline", e.target.value)}
            className={fieldClasses}
          >
            {FACULTY_DISCIPLINE_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Work email</label>
          <input
            type="email"
            value={form.workEmail}
            onChange={(e) => updateField("workEmail", e.target.value)}
            placeholder="name@institution.edu"
            className={fieldClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>
            One course you teach{" "}
            <span className="font-normal text-slate-500">— optional</span>
          </label>
          <input
            type="text"
            value={form.courseTaught}
            onChange={(e) => updateField("courseTaught", e.target.value)}
            placeholder="e.g. Strength of Materials"
            className={fieldClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Approx. faculty strength</label>
          <select
            value={form.facultyStrength}
            onChange={(e) => updateField("facultyStrength", e.target.value)}
            className={fieldClasses}
          >
            <option value="" disabled className="bg-slate-900">
              Select range...
            </option>
            {FACULTY_STRENGTH_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClasses}>
          Mobile{" "}
          <span className="font-normal text-slate-500">
            — verified by one-time code
          </span>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 gap-3">
            <span className="flex select-none items-center justify-center rounded-lg border border-white/15 bg-slate-800/70 px-4 text-sm text-slate-300">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              value={form.mobile}
              onChange={(e) =>
                updateField(
                  "mobile",
                  e.target.value.replace(/\D/g, "").slice(0, 10),
                )
              }
              placeholder="10-digit mobile number"
              disabled={otpStep === "verified"}
              className={`${fieldClasses} flex-1`}
            />
          </div>
          <button
            type="button"
            onClick={handleSendCode}
            disabled={
              !mobileValid ||
              otpStep === "sending" ||
              otpStep === "verified" ||
              resendIn > 0
            }
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-600/40"
          >
            {otpStep === "sending" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {otpStep === "verified"
              ? "Code verified"
              : resendIn > 0
                ? `Resend in ${resendIn}s`
                : otpStep === "sent"
                  ? "Resend code"
                  : "Send code"}
          </button>
        </div>

        {(otpStep === "sent" || otpStep === "verifying") && (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit code"
              maxLength={6}
              className={`${fieldClasses} text-center tracking-widest sm:max-w-[220px]`}
            />
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={otp.length !== 6 || otpStep === "verifying"}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600/40"
            >
              {otpStep === "verifying" && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Verify
            </button>
          </div>
        )}

        {otpStep === "verified" && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Mobile verified
          </p>
        )}
        {otpError && <p className="mt-2 text-xs text-red-400">{otpError}</p>}
      </div>

      {formError && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {formError}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!formValid || submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-amber-500/40"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Confirm my seat
        </button>
        <p className="text-xs text-slate-400 sm:max-w-xs">
          We use your email and number for the joining link and the follow-up
          material. Nothing else.
        </p>
      </div>
    </div>
  );
}
