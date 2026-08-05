"use client";

// File: ApplyDialog.tsx
// Path: src/app/careers/_components/ApplyDialog.tsx
//
// "Apply for this role" trigger + popup form. Renders a button (styled via the
// `className` prop so it can match the sidebar CTA and the mobile bar), and a
// portalled modal. Submits multipart/form-data to the public apply endpoint —
// field names match publicIngestCandidate exactly. The modal is portalled to
// <body> so it isn't clipped by the sticky sidebar or the blurred mobile bar.

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Where the public apply endpoint lives. Adjust the path to wherever your
// candidate service is exposed through your gateway.
const APPLY_ENDPOINT =
  process.env.NEXT_PUBLIC_APPLY_ENDPOINT ??
  `${process.env.NEXT_PUBLIC_ATS_BASE_URL}/candidate/api/public/apply`;

const MAX_FILE_MB = 20;
const ACCEPTED = ".pdf,.doc,.docx,.rtf";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export default function ApplyDialog({
  reqCode,
  requirementId,
  title,
  className,
  label = "Apply for this role",
}: {
  reqCode: string;
  requirementId: string;
  title: string;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open && (
        <ApplyModal
          reqCode={reqCode}
          requirementId={requirementId}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function ApplyModal({
  reqCode,
  requirementId,
  title,
  onClose,
}: {
  reqCode: string;
  requirementId: string;
  title: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentCompany: "",
    currentTitle: "",
    totalExpYears: "",
    currentCtc: "",
    expectedCtc: "",
    noticePeriodDays: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
  });
  const [consent, setConsent] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Portal + scroll lock + ESC + focus
  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [onClose, status]);

  const set =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_FILE_MB}MB.`);
      setFile(null);
      return;
    }
    setFile(f);
  };

  const emailValid = EMAIL_RE.test(values.email.trim());
  const canSubmit =
    values.firstName.trim() !== "" &&
    emailValid &&
    !!file &&
    consent &&
    status !== "submitting";

  async function submit() {
    if (!canSubmit || !file) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const fd = new FormData();
      fd.append("reqCode", reqCode);
      fd.append("requirementId", requirementId);
      Object.entries(values).forEach(([k, v]) => {
        if (v.trim() !== "") fd.append(k, v.trim());
      });
      fd.append("consent", "true");
      fd.append("resume", file);

      const res = await fetch(APPLY_ENDPOINT, { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.success === false) {
        throw new Error(
          json?.message || "Your application could not be submitted.",
        );
      }
      setStatus("success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center mt-3.5"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${title}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#16181D]/45 backdrop-blur-sm"
        onClick={() => status !== "submitting" && onClose()}
      />

      {/* Panel */}
      <div className="relative z-10 flex w-[92vw] max-w-md max-h-[80vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-full">
        {status === "success" ? (
          <SuccessPanel title={title} onClose={onClose} />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#F0EEE7] px-6 py-5">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#0F5E4A]">
                  Apply
                </p>
                <h2
                  className="mt-1 text-[19px] leading-snug text-[#16181D]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={status === "submitting"}
                aria-label="Close"
                className="rounded-lg p-1.5 text-[#9A9890] outline-none transition-colors hover:bg-[#F3F1EB] hover:text-[#16181D] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] disabled:opacity-40"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" required>
                  <input
                    ref={firstFieldRef}
                    value={values.firstName}
                    onChange={set("firstName")}
                    className={inputCls}
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Last name">
                  <input
                    value={values.lastName}
                    onChange={set("lastName")}
                    className={inputCls}
                    autoComplete="family-name"
                  />
                </Field>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label="Email" required>
                  <input
                    type="email"
                    value={values.email}
                    onChange={set("email")}
                    className={inputCls}
                    autoComplete="email"
                    aria-invalid={values.email !== "" && !emailValid}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    value={values.phone}
                    onChange={set("phone")}
                    className={inputCls}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </Field>
              </div>

              {/* Resume */}
              <div className="mt-4">
                <label className="text-[13px] font-medium text-[#16181D]">
                  Resume <span className="text-[#0F5E4A]">*</span>
                </label>
                <label
                  className={`mt-1.5 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed px-4 py-3 text-[13px] transition-colors ${
                    file
                      ? "border-[#0F5E4A] bg-[#E4F1EA]"
                      : "border-[#D9D6CD] bg-[#FBFAF7] hover:border-[#0F5E4A]"
                  }`}
                >
                  <span
                    className={
                      file ? "font-medium text-[#0B4838]" : "text-[#6F7278]"
                    }
                  >
                    {file
                      ? file.name
                      : `Upload PDF, DOCX or RTF (max ${MAX_FILE_MB}MB)`}
                  </span>
                  <span className="shrink-0 rounded-lg bg-white px-3 py-1 text-[12px] font-medium text-[#16181D] shadow-sm">
                    {file ? "Change" : "Browse"}
                  </span>
                  <input
                    type="file"
                    accept={ACCEPTED}
                    onChange={onFile}
                    className="hidden"
                  />
                </label>
                {fileError && (
                  <p className="mt-1.5 text-[12px] text-[#B42318]">
                    {fileError}
                  </p>
                )}
              </div>

              {/* Optional details */}
              {/* <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9A9890]">
                Optional
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Field label="Current company">
                  <input
                    value={values.currentCompany}
                    onChange={set("currentCompany")}
                    className={inputCls}
                  />
                </Field>
                <Field label="Current title">
                  <input
                    value={values.currentTitle}
                    onChange={set("currentTitle")}
                    className={inputCls}
                  />
                </Field>
                <Field label="Experience (yrs)">
                  <input
                    value={values.totalExpYears}
                    onChange={set("totalExpYears")}
                    className={inputCls}
                    inputMode="decimal"
                  />
                </Field>
                <Field label="Notice (days)">
                  <input
                    value={values.noticePeriodDays}
                    onChange={set("noticePeriodDays")}
                    className={inputCls}
                    inputMode="numeric"
                  />
                </Field>
                <Field label="Current CTC (₹ LPA)">
                  <input
                    value={values.currentCtc}
                    onChange={set("currentCtc")}
                    className={inputCls}
                    inputMode="decimal"
                  />
                </Field>
                <Field label="Expected CTC (₹ LPA)">
                  <input
                    value={values.expectedCtc}
                    onChange={set("expectedCtc")}
                    className={inputCls}
                    inputMode="decimal"
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="LinkedIn URL">
                  <input
                    value={values.linkedinUrl}
                    onChange={set("linkedinUrl")}
                    className={inputCls}
                    inputMode="url"
                  />
                </Field>
              </div>
              <div className="mt-3">
                <label className="text-[13px] font-medium text-[#16181D]">
                  Cover note
                </label>
                <textarea
                  value={values.coverLetter}
                  onChange={set("coverLetter")}
                  rows={3}
                  className={`${inputCls} mt-1.5 resize-none`}
                  placeholder="A line or two on why you're a fit (optional)"
                />
              </div> */}

              {/* Consent */}
              <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#0F5E4A]"
                />
                <span className="text-[12px] leading-relaxed text-[#6F7278]">
                  I agree to SFJ Business Solutions storing and processing my
                  details for recruitment purposes.
                </span>
              </label>

              {status === "error" && (
                <p className="mt-3 rounded-lg bg-[#FDECEA] px-3 py-2 text-[13px] text-[#B42318]">
                  {errorMsg}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#F0EEE7] px-6 py-4">
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F5E4A] px-4 py-3 text-[14px] font-semibold text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                {status === "submitting" ? (
                  <>
                    <Spinner /> Submitting…
                  </>
                ) : (
                  "Submit application"
                )}
              </button>
              <p className="mt-2 text-center text-[11px] text-[#9A9890]">
                Ref: {reqCode}
              </p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

const inputCls =
  "w-full rounded-lg border border-[#E4E1D8] bg-white px-3 py-2 text-[14px] text-[#16181D] outline-none transition-colors placeholder:text-[#B7B5AD] focus:border-[#0F5E4A] focus:ring-2 focus:ring-[#0F5E4A]/15";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-[#16181D]">
        {label}
        {required && <span className="text-[#0F5E4A]"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuccessPanel({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F1EA]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="#0F5E4A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2
        className="mt-5 text-[20px] text-[#16181D]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        Application received
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-[#6F7278]">
        Thanks for applying to {title}. Our team will review your profile and
        reach out if it&rsquo;s a match.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-xl bg-[#0F5E4A] px-5 py-2.5 text-[14px] font-semibold text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A]"
      >
        Done
      </button>
    </div>
  );
}
