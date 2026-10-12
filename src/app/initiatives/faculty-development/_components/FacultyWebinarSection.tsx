// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { Fragment, useEffect, useState } from "react";
// import { Check, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
// import facultyRegistrationApi from "@/lib/facultyRegistrationApi";

// // How long the countdown runs for. It restarts from this value on every
// // mount, so the block always opens on 02 : 00 : 00 : 00 and never expires
// // the way the old fixed date did.
// const REGISTRATION_WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

// const ROLES = [
//   "Teaching Faculty",
//   "Head of Department",
//   "Academic Coordinator",
//   "Trainer or Instructor",
//   "Principal or Director",
// ];

// const DISCIPLINES = [
//   "Engineering",
//   "Diploma & Polytechnic",
//   "Arts, Science & Commerce",
//   "ITI & Vocational",
//   "Law",
//   "Medical",
//   "Paramedical & Allied Health",
//   "Agriculture, Vet & Fisheries",
// ];

// const FACULTY_STRENGTHS = ["Under 50", "50 – 150", "150 – 400", "400+"];

// const BENEFITS = [
//   {
//     lead: "Unlock AWS Academy status.",
//     body: "See how a single cohort of certified faculty makes your campus eligible for global AWS partnership benefits.",
//   },
//   {
//     lead: "Walk away with 8 accreditation assets.",
//     body: "AI usage policy, assessment banks, outcome maps — documentation your institution owns permanently.",
//   },
//   {
//     lead: "Lift placement outcomes.",
//     body: "Map industry-demanded AI skills onto your existing syllabus across 8 disciplines — without a curriculum rewrite.",
//   },
// ];

// const GOLD_TEXT = "#a56a15";
// const TEAL = "#0f7a5e";

// const FIELD_CLASSES =
//   "h-9 w-full rounded-md border border-gray-300! bg-white px-3 text-sm text-slate-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#c8912e]! focus:ring-1 focus:ring-[#c8912e]/40";

// const LABEL_CLASSES = "mb-1 block text-[0.78rem] font-medium text-gray-600";

// const OTP_RESEND_COOLDOWN_SECONDS = 30;

// const MOBILE_REGEX = /^[6-9]\d{9}$/;
// const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// const pad = (n: number) => String(n).padStart(2, "0");

// // Rolling urgency timer, not a real deadline — it resets on reload, so a
// // visitor who refreshes sees it jump back to two days. Swapping
// // `Date.now() + windowMs` for a fixed timestamp makes it a true deadline.
// function useCountdown(windowMs: number) {
//   const [msLeft, setMsLeft] = useState<number | null>(null);

//   useEffect(() => {
//     const deadline = Date.now() + windowMs;

//     const tick = () => {
//       setMsLeft(Math.max(0, deadline - Date.now()));
//     };

//     tick();

//     const id = setInterval(tick, 1000);

//     return () => clearInterval(id);
//   }, [windowMs]);

//   if (msLeft === null) return null;

//   const total = Math.floor(msLeft / 1000);

//   return {
//     // Rounded UP, not down. With 47h59m left, floor() gives 1 and the panel
//     // reads "01 DAYS" one second after opening; ceil() reads 2, which is what
//     // "2 days left" means in ordinary speech and what the panel is meant to
//     // say. Consequence: the DAYS figure and the HH:MM:SS beside it are not
//     // additive — HH:MM:SS counts down to the next drop in the day figure,
//     // not on top of it.
//     days: pad(Math.ceil(total / 86400)),
//     hours: pad(Math.floor(total / 3600) % 24),
//     minutes: pad(Math.floor(total / 60) % 60),
//     seconds: pad(total % 60),
//   };
// }

// type OtpStep = "idle" | "sending" | "sent" | "verifying" | "verified";

// export default function FacultyWebinarSection() {
//   // ------------------------------------------------------------
//   // Form fields
//   // ------------------------------------------------------------

//   const [name, setName] = useState("");
//   const [institution, setInstitution] = useState("");
//   const [role, setRole] = useState(ROLES[0]);
//   const [discipline, setDiscipline] = useState(DISCIPLINES[0]);
//   const [email, setEmail] = useState("");
//   const [course, setCourse] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [strength, setStrength] = useState("");

//   // ------------------------------------------------------------
//   // OTP state
//   // ------------------------------------------------------------

//   const [otp, setOtp] = useState("");
//   const [otpStep, setOtpStep] = useState<OtpStep>("idle");
//   const [resendIn, setResendIn] = useState(0);

//   // ------------------------------------------------------------
//   // API / UI state
//   // ------------------------------------------------------------

//   const [otpError, setOtpError] = useState("");
//   const [formError, setFormError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [registered, setRegistered] = useState(false);

//   // ------------------------------------------------------------
//   // Countdown
//   // ------------------------------------------------------------

//   const left = useCountdown(REGISTRATION_WINDOW_MS);

//   const units = [
//     {
//       label: "Days",
//       value: left?.days ?? "––",
//     },
//     {
//       label: "Hours",
//       value: left?.hours ?? "––",
//     },
//     {
//       label: "Minutes",
//       value: left?.minutes ?? "––",
//     },
//     {
//       label: "Seconds",
//       value: left?.seconds ?? "––",
//     },
//   ];

//   // ------------------------------------------------------------
//   // OTP resend countdown
//   // ------------------------------------------------------------

//   useEffect(() => {
//     if (resendIn <= 0) return;

//     const timer = setInterval(() => {
//       setResendIn((seconds) => Math.max(0, seconds - 1));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [resendIn]);

//   // ------------------------------------------------------------
//   // Mobile validation
//   // ------------------------------------------------------------

//   const mobileValid = MOBILE_REGEX.test(mobile);

//   // ------------------------------------------------------------
//   // Mobile change
//   // ------------------------------------------------------------

//   const handleMobileChange = (value: string) => {
//     const cleaned = value.replace(/\D/g, "").slice(0, 10);

//     setMobile(cleaned);

//     /*
//      * If user changes the mobile number after sending/verifying OTP,
//      * the previous OTP state must be cleared.
//      */
//     if (otpStep !== "idle") {
//       setOtpStep("idle");
//       setOtp("");
//       setOtpError("");
//       setResendIn(0);
//     }
//   };

//   // ------------------------------------------------------------
//   // SEND OTP
//   // POST /api/faculty-registration/otp/send
//   // ------------------------------------------------------------

//   const handleSendCode = async () => {
//     if (!mobileValid) {
//       setOtpError("Enter a valid 10-digit mobile number.");
//       return;
//     }

//     setOtpError("");
//     setFormError("");
//     setOtpStep("sending");

//     try {
//       const response = await facultyRegistrationApi.post("/otp/send", {
//         mobile,
//       });

//       console.log("OTP send response:", response.data);

//       setOtpStep("sent");
//       setResendIn(OTP_RESEND_COOLDOWN_SECONDS);
//     } catch (error: any) {
//       console.error("Send OTP error:", error);

//       setOtpError(
//         error?.response?.data?.error ||
//           "Could not send verification code. Please try again.",
//       );

//       setOtpStep("idle");
//     }
//   };

//   // ------------------------------------------------------------
//   // VERIFY OTP
//   // POST /api/faculty-registration/otp/verify
//   // ------------------------------------------------------------

//   const handleVerifyCode = async () => {
//     if (!/^\d{6}$/.test(otp)) {
//       setOtpError("Enter the 6-digit verification code.");
//       return;
//     }

//     setOtpError("");
//     setFormError("");
//     setOtpStep("verifying");

//     try {
//       const response = await facultyRegistrationApi.post("/otp/verify", {
//         mobile,
//         otp,
//       });

//       console.log("OTP verification response:", response.data);

//       setOtpStep("verified");
//     } catch (error: any) {
//       console.error("Verify OTP error:", error);

//       setOtpError(
//         error?.response?.data?.error ||
//           "Incorrect verification code. Please try again.",
//       );

//       setOtpStep("sent");
//     }
//   };

//   // ------------------------------------------------------------
//   // FORM VALIDATION
//   // ------------------------------------------------------------

//   const formValid =
//     name.trim().length >= 2 &&
//     institution.trim().length >= 2 &&
//     EMAIL_REGEX.test(email.trim()) &&
//     mobileValid &&
//     strength.trim().length > 0 &&
//     otpStep === "verified";

//   // ------------------------------------------------------------
//   // CONFIRM REGISTRATION
//   // POST /api/faculty-registration/confirm
//   // ------------------------------------------------------------

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formValid) {
//       setFormError(
//         "Please complete all required fields and verify your mobile number.",
//       );
//       return;
//     }

//     setFormError("");
//     setSubmitting(true);

//     try {
//       const response = await facultyRegistrationApi.post("/confirm", {
//         fullName: name.trim(),
//         institution: institution.trim(),
//         role,
//         discipline,
//         facultyStrength: strength,
//         courseTaught: course.trim() || undefined,
//         workEmail: email.trim(),
//         mobile,
//         otp,
//         registrationType: "FDP_WEBINAR",
//       });

//       console.log("Faculty registration successful:", response.data);

//       /*
//        * Backend response:
//        *
//        * {
//        *   registration: {
//        *     id: "...",
//        *     fullName: "...",
//        *     ...
//        *   }
//        * }
//        */

//       setRegistered(true);
//     } catch (error: any) {
//       console.error("Faculty registration error:", error);

//       setFormError(
//         error?.response?.data?.error ||
//           "Could not complete registration. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ------------------------------------------------------------
//   // SUCCESS UI
//   // ------------------------------------------------------------

//   if (registered) {
//     return (
//       <section
//         id="fdp-webinar"
//         className="scroll-mt-28 bg-white py-10 sm:py-12"
//       >
//         <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
//             <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />

//             <h2 className="mt-4 text-2xl font-bold text-slate-900">
//               Registration successful!
//             </h2>

//             <p className="mt-2 text-sm leading-relaxed text-gray-600">
//               Your seat has been reserved successfully.
//             </p>

//             <p className="mt-2 text-sm leading-relaxed text-gray-600">
//               We&apos;ll use <strong>{email}</strong> and your verified mobile
//               number for further communication.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // ------------------------------------------------------------
//   // FORM UI
//   // ------------------------------------------------------------

//   return (
//     <section id="fdp-webinar" className="scroll-mt-28 bg-white py-10 sm:py-12">
//       <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
//         <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
//           {/* =====================================================
//               LEFT SIDE
//           ===================================================== */}

//           <div>
//             <p
//               className="font-mono text-[0.7rem] uppercase tracking-[0.2em]"
//               style={{ color: GOLD_TEXT }}
//             />

//             <h3 className="mt-3 text-[1rem] font-semibold leading-tight text-slate-500 sm:text-[1.15rem]">
//               Register for the Webinar to Reserve Your Seat
//             </h3>
//             <h1 className="mt-3 text-[1.7rem] font-bold leading-tight text-slate-900 sm:text-[1.85rem]">
//               Bring AI & Cloud Skills to Your Campus Without Rewriting Your
//               Syllabus
//             </h1>

//             <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-gray-600">
//               A 65-minute executive briefing on clearing the AWS Academy
//               accreditation bottleneck, turning faculty upskilling into
//               permanent NAAC/NBA evidence, and locking down student data before
//               the DPDP rules bite.
//             </p>

//             <ul className="mt-5 space-y-4">
//               {BENEFITS.map((benefit) => (
//                 <li key={benefit.lead} className="flex gap-3">
//                   <span
//                     className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
//                     style={{
//                       backgroundColor: TEAL,
//                     }}
//                     aria-hidden="true"
//                   >
//                     <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
//                   </span>

//                   <p className="text-sm leading-relaxed text-gray-600">
//                     <strong className="font-semibold text-slate-900">
//                       {benefit.lead}
//                     </strong>{" "}
//                     {benefit.body}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* =====================================================
//               RIGHT SIDE
//           ===================================================== */}

//           <div className="self-start">
//             <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
//               <form
//                 onSubmit={handleSubmit}
//                 className="grid gap-3 sm:grid-cols-2"
//               >
//                 {/* NAME */}
//                 <div>
//                   <label htmlFor="webinar-name" className={LABEL_CLASSES}>
//                     Your name
//                   </label>

//                   <input
//                     id="webinar-name"
//                     name="name"
//                     type="text"
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     autoComplete="name"
//                     placeholder="Full name"
//                     className={FIELD_CLASSES}
//                   />
//                 </div>

//                 {/* INSTITUTION */}
//                 <div>
//                   <label
//                     htmlFor="webinar-institution"
//                     className={LABEL_CLASSES}
//                   >
//                     Institution
//                   </label>

//                   <input
//                     id="webinar-institution"
//                     name="institution"
//                     type="text"
//                     required
//                     value={institution}
//                     onChange={(e) => setInstitution(e.target.value)}
//                     autoComplete="organization"
//                     placeholder="College or university"
//                     className={FIELD_CLASSES}
//                   />
//                 </div>

//                 {/* ROLE */}
//                 <div>
//                   <label htmlFor="webinar-role" className={LABEL_CLASSES}>
//                     Role
//                   </label>

//                   <div className="relative">
//                     <select
//                       id="webinar-role"
//                       name="role"
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                       className={`${FIELD_CLASSES} appearance-none pr-9`}
//                     >
//                       {ROLES.map((r) => (
//                         <option key={r} value={r}>
//                           {r}
//                         </option>
//                       ))}
//                     </select>

//                     <ChevronDown
//                       className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </div>

//                 {/* DISCIPLINE */}
//                 <div>
//                   <label htmlFor="webinar-discipline" className={LABEL_CLASSES}>
//                     Discipline
//                   </label>

//                   <div className="relative">
//                     <select
//                       id="webinar-discipline"
//                       name="discipline"
//                       value={discipline}
//                       onChange={(e) => setDiscipline(e.target.value)}
//                       className={`${FIELD_CLASSES} appearance-none pr-9`}
//                     >
//                       {DISCIPLINES.map((d) => (
//                         <option key={d} value={d}>
//                           {d}
//                         </option>
//                       ))}
//                     </select>

//                     <ChevronDown
//                       className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </div>

//                 {/* EMAIL */}
//                 <div>
//                   <label htmlFor="webinar-email" className={LABEL_CLASSES}>
//                     Work email
//                   </label>

//                   <input
//                     id="webinar-email"
//                     name="email"
//                     type="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     autoComplete="email"
//                     placeholder="name@institution.edu"
//                     className={FIELD_CLASSES}
//                   />
//                 </div>

//                 {/* COURSE */}
//                 <div>
//                   <label htmlFor="webinar-course" className={LABEL_CLASSES}>
//                     One course you teach{" "}
//                     <span className="text-gray-400">— optional</span>
//                   </label>

//                   <input
//                     id="webinar-course"
//                     name="course"
//                     type="text"
//                     value={course}
//                     onChange={(e) => setCourse(e.target.value)}
//                     placeholder="e.g. Strength of Materials"
//                     className={FIELD_CLASSES}
//                   />
//                 </div>

//                 {/* MOBILE */}
//                 <div className="sm:col-span-2">
//                   <label htmlFor="webinar-mobile" className={LABEL_CLASSES}>
//                     Mobile{" "}
//                     <span className="text-gray-400">
//                       — verified by one-time code
//                     </span>
//                   </label>

//                   <div className="flex flex-col gap-2 sm:flex-row">
//                     <div className="flex flex-1 gap-2">
//                       <span className="flex h-9 shrink-0 items-center rounded-md border border-gray-300! bg-white px-3 text-sm text-gray-700">
//                         +91
//                       </span>

//                       <input
//                         id="webinar-mobile"
//                         name="mobile"
//                         type="tel"
//                         required
//                         inputMode="numeric"
//                         value={mobile}
//                         onChange={(e) => handleMobileChange(e.target.value)}
//                         maxLength={10}
//                         autoComplete="tel-national"
//                         placeholder="10-digit mobile number"
//                         disabled={otpStep === "verified"}
//                         className={`${FIELD_CLASSES} flex-1`}
//                       />
//                     </div>

//                     {/* SEND OTP */}
//                     <button
//                       type="button"
//                       onClick={handleSendCode}
//                       disabled={
//                         !mobileValid ||
//                         otpStep === "sending" ||
//                         otpStep === "verified" ||
//                         resendIn > 0
//                       }
//                       className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-[#0f7a5e] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0d6b52] disabled:cursor-not-allowed disabled:bg-[#0f7a5e]/40"
//                     >
//                       {otpStep === "sending" && (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       )}

//                       {otpStep === "verified"
//                         ? "Code verified"
//                         : resendIn > 0
//                           ? `Resend in ${resendIn}s`
//                           : otpStep === "sent"
//                             ? "Resend code"
//                             : "Send code"}
//                     </button>
//                   </div>

//                   {/* OTP INPUT */}
//                   {(otpStep === "sent" || otpStep === "verifying") && (
//                     <div className="mt-2 flex gap-2">
//                       <input
//                         type="text"
//                         inputMode="numeric"
//                         value={otp}
//                         onChange={(e) =>
//                           setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                         }
//                         placeholder="Enter 6-digit code"
//                         maxLength={6}
//                         className={`${FIELD_CLASSES} max-w-[220px] text-center tracking-widest`}
//                       />

//                       {/* VERIFY OTP */}
//                       <button
//                         type="button"
//                         onClick={handleVerifyCode}
//                         disabled={otp.length !== 6 || otpStep === "verifying"}
//                         className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#0d1621] px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
//                       >
//                         {otpStep === "verifying" && (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         )}
//                         Verify
//                       </button>
//                     </div>
//                   )}

//                   {/* VERIFIED */}
//                   {otpStep === "verified" && (
//                     <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
//                       <CheckCircle2 className="h-3.5 w-3.5" />
//                       Mobile verified
//                     </p>
//                   )}

//                   {/* OTP ERROR */}
//                   {otpError && (
//                     <p className="mt-2 text-xs text-red-600">{otpError}</p>
//                   )}
//                 </div>

//                 {/* FACULTY STRENGTH */}
//                 <div>
//                   <label htmlFor="webinar-strength" className={LABEL_CLASSES}>
//                     Approx. faculty strength
//                   </label>

//                   <div className="relative">
//                     <select
//                       id="webinar-strength"
//                       name="strength"
//                       required
//                       value={strength}
//                       onChange={(e) => setStrength(e.target.value)}
//                       className={`${FIELD_CLASSES} appearance-none pr-9 ${
//                         strength ? "" : "text-gray-400"
//                       }`}
//                     >
//                       <option value="" disabled>
//                         Select range…
//                       </option>

//                       {FACULTY_STRENGTHS.map((band) => (
//                         <option key={band} value={band}>
//                           {band}
//                         </option>
//                       ))}
//                     </select>

//                     <ChevronDown
//                       className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500"
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </div>

//                 {/* FORM ERROR */}
//                 {formError && (
//                   <div className="sm:col-span-2">
//                     <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
//                       {formError}
//                     </p>
//                   </div>
//                 )}

//                 {/* CONFIRM */}
//                 <div className="mt-1 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
//                   <button
//                     type="submit"
//                     disabled={!formValid || submitting}
//                     className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#0d1621] px-6 text-sm font-semibold text-[#ebebeb] transition-colors hover:bg-[#b8831f] disabled:cursor-not-allowed disabled:opacity-40"
//                   >
//                     {submitting && <Loader2 className="h-4 w-4 animate-spin" />}

//                     {submitting ? "Registering..." : "Confirm my seat"}
//                   </button>

//                   <p className="text-[0.78rem] leading-relaxed text-gray-500">
//                     We use your email and number for the joining link and the
//                     follow-up material. Nothing else.
//                   </p>
//                 </div>
//               </form>
//             </div>

//             {/* COUNTDOWN */}
//             <div className="mt-4 rounded-xl border border-[#1c2b38]! bg-[#0d1621] px-6 py-5">
//               <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gray-400">
//                 Registration closes in
//               </p>

//               <div className="mt-3 flex items-start gap-2 sm:gap-4">
//                 {units.map((unit, i) => (
//                   <Fragment key={unit.label}>
//                     {i > 0 && (
//                       <span
//                         className="font-mono text-[1.7rem] font-bold leading-none text-gray-600"
//                         aria-hidden="true"
//                       >
//                         :
//                       </span>
//                     )}

//                     <div className="text-center">
//                       <div className="font-mono text-[1.7rem] font-bold leading-none tabular-nums text-white">
//                         {unit.value}
//                       </div>

//                       <div className="mt-2 text-[0.6rem] uppercase tracking-[0.15em] text-gray-500">
//                         {unit.label}
//                       </div>
//                     </div>
//                   </Fragment>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Fragment, useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  Loader2,
  MonitorPlay,
  Users,
} from "lucide-react";
import facultyRegistrationApi from "@/lib/facultyRegistrationApi";

// ------------------------------------------------------------
// Webinar config
// ------------------------------------------------------------

const REGISTRATION_TYPE = "AI_GOVERNANCE_WEBINAR";

// Real deadline: registration closes when the session starts
// (28 Oct 2026, 12:30 IST).
const WEBINAR_START = new Date("2026-10-28T12:30:00+05:30").getTime();

// Brochure downloaded automatically after a successful registration.
// Place the file in /public/brochures/ (same origin, so the `download`
// attribute is honoured and the file saves instead of opening).
const BROCHURE_URL = "/brochures/ai-governance-webinar-brochure.pdf";
const BROCHURE_FILENAME = "SFJBS-AI-Governance-Webinar-Brochure.pdf";

function downloadBrochure() {
  const link = document.createElement("a");
  link.href = BROCHURE_URL;
  link.download = BROCHURE_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const EVENT_DETAILS = [
  { icon: CalendarDays, label: "Date", value: "28 Oct 2026", sub: "Wednesday" },
  { icon: Clock, label: "Time", value: "12:30 – 1:30 PM", sub: "IST" },
  {
    icon: MonitorPlay,
    label: "Platform",
    value: "Online",
    sub: "Microsoft Teams",
  },
  { icon: Users, label: "Audience", value: "Faculty", sub: "Free to attend" },
];

const TOPICS = [
  "Why AI Governance matters",
  "Why universities should care",
  "Practical framework for governing AI adoption",
  "ITIL AI Governance framework and governance perspectives",
  "ITIL AI Governance improvement model",
  "Balancing opportunity and risk",
  "Why this matters to every academic stakeholder",
];

const SPEAKER = {
  name: "David Cannon",
  initials: "DC",
  title: "IT Management & Digital Strategy Authority",
  credentials: [
    "Co-author of five ITIL books",
    "Former Chair, IT Service Management Forum",
    "Lifetime achievement award recipient",
  ],
  bio: "Over a three-decade career, David has led consulting practices at Forrester, Hewlett-Packard and BMC Software. A sought-after keynote speaker, he brings a practical perspective on connecting technology, operations and business strategy.",
  linkedin: "https://www.linkedin.com/in/dacannon/",
};

const ITIL_CERT_URL =
  "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-ai-governance-version-5-4234";

// ------------------------------------------------------------
// Form options
// ------------------------------------------------------------

const ROLES = [
  "Teaching Faculty",
  "Head of Department",
  "Academic Coordinator",
  "Trainer or Instructor",
  "Principal or Director",
];

const DISCIPLINES = [
  "Engineering",
  "Diploma & Polytechnic",
  "Arts, Science & Commerce",
  "ITI & Vocational",
  "Law",
  "Medical",
  "Paramedical & Allied Health",
  "Agriculture, Vet & Fisheries",
];

const FACULTY_STRENGTHS = ["Under 50", "50 – 150", "150 – 400", "400+"];

// ------------------------------------------------------------
// Styles
// ------------------------------------------------------------

const NAVY = "#0b1f4d";
const BLUE = "#1d5fd8";

const FIELD_CLASSES =
  "h-10 w-full rounded-lg border border-slate-300! bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#1d5fd8]! focus:ring-2 focus:ring-[#1d5fd8]/20 disabled:bg-slate-100 disabled:text-slate-500";

const LABEL_CLASSES = "mb-1.5 block text-[0.78rem] font-medium text-slate-600";

const OTP_RESEND_COOLDOWN_SECONDS = 30;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown(deadline: number) {
  const [msLeft, setMsLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMsLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (msLeft === null) return null;

  const total = Math.floor(msLeft / 1000);

  return {
    closed: total === 0,
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor(total / 3600) % 24),
    minutes: pad(Math.floor(total / 60) % 60),
    seconds: pad(total % 60),
  };
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

type OtpStep = "idle" | "sending" | "sent" | "verifying" | "verified";

export default function AiGovernanceWebinarSection() {
  // Form fields
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [discipline, setDiscipline] = useState(DISCIPLINES[0]);
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [mobile, setMobile] = useState("");
  const [strength, setStrength] = useState("");

  // OTP state
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState<OtpStep>("idle");
  const [resendIn, setResendIn] = useState(0);

  // API / UI state
  const [otpError, setOtpError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Countdown
  const left = useCountdown(WEBINAR_START);
  const closed = left?.closed ?? false;

  const units = [
    { label: "Days", value: left?.days ?? "––" },
    { label: "Hours", value: left?.hours ?? "––" },
    { label: "Minutes", value: left?.minutes ?? "––" },
    { label: "Seconds", value: left?.seconds ?? "––" },
  ];

  // OTP resend cooldown
  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(
      () => setResendIn((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [resendIn]);

  const mobileValid = MOBILE_REGEX.test(mobile);

  const handleMobileChange = (value: string) => {
    setMobile(value.replace(/\D/g, "").slice(0, 10));

    // Changing the number invalidates any OTP already sent/verified.
    if (otpStep !== "idle") {
      setOtpStep("idle");
      setOtp("");
      setOtpError("");
      setResendIn(0);
    }
  };

  // POST /api/faculty-registration/otp/send
  const handleSendCode = async () => {
    if (!mobileValid) {
      setOtpError("Enter a valid 10-digit mobile number.");
      return;
    }

    setOtpError("");
    setFormError("");
    setOtpStep("sending");

    try {
      await facultyRegistrationApi.post("/otp/send", { mobile });
      setOtpStep("sent");
      setResendIn(OTP_RESEND_COOLDOWN_SECONDS);
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setOtpError(
        error?.response?.data?.error ||
          "Could not send verification code. Please try again.",
      );
      setOtpStep("idle");
    }
  };

  // POST /api/faculty-registration/otp/verify
  const handleVerifyCode = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Enter the 6-digit verification code.");
      return;
    }

    setOtpError("");
    setFormError("");
    setOtpStep("verifying");

    try {
      await facultyRegistrationApi.post("/otp/verify", { mobile, otp });
      setOtpStep("verified");
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      setOtpError(
        error?.response?.data?.error ||
          "Incorrect verification code. Please try again.",
      );
      setOtpStep("sent");
    }
  };

  const formValid =
    name.trim().length >= 2 &&
    institution.trim().length >= 2 &&
    EMAIL_REGEX.test(email.trim()) &&
    mobileValid &&
    strength.trim().length > 0 &&
    otpStep === "verified";

  // POST /api/faculty-registration/confirm
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (closed) {
      setFormError("Registration for this webinar has closed.");
      return;
    }

    if (!formValid) {
      setFormError(
        "Please complete all required fields and verify your mobile number.",
      );
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      await facultyRegistrationApi.post("/confirm", {
        fullName: name.trim(),
        institution: institution.trim(),
        role,
        discipline,
        facultyStrength: strength,
        courseTaught: course.trim() || undefined,
        workEmail: email.trim(),
        mobile,
        otp,
        registrationType: REGISTRATION_TYPE,
      });

      setRegistered(true);

      // Auto-download the brochure. A failure here must not undo the
      // registration, so it is isolated in its own try/catch.
      try {
        downloadBrochure();
      } catch (downloadError) {
        console.error("Brochure download error:", downloadError);
      }
    } catch (error: any) {
      console.error("AI Governance registration error:", error);
      setFormError(
        error?.response?.data?.error ||
          "Could not complete registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------------------------------------------------
  // SUCCESS UI
  // ------------------------------------------------------------

  if (registered) {
    return (
      <section
        id="ai-governance-webinar"
        className="scroll-mt-28 bg-white py-12 sm:py-16"
      >
        <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              You&apos;re registered!
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Your seat for <strong>AI Without Governance?</strong> is reserved
              — 28 Oct 2026, 12:30 PM IST on Microsoft Teams.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The joining link will be sent to <strong>{email}</strong>.
            </p>

            <div className="mt-6 border-t border-emerald-200 pt-5">
              <p className="text-xs text-slate-500">
                Your brochure download has started. If it didn&apos;t, download
                it here:
              </p>

              <a
                href={BROCHURE_URL}
                download={BROCHURE_FILENAME}
                className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0b1f4d] px-5 text-sm font-semibold text-white transition hover:bg-[#13306f]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download brochure
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------------
  // MAIN UI
  // ------------------------------------------------------------

  return (
    <section
      id="ai-governance-webinar"
      className="scroll-mt-28 bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* =====================================================
              LEFT — webinar details
          ===================================================== */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#f5b301] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#0b1f4d]">
                Free Webinar
              </span>
              <span className="rounded-full border border-slate-300 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-600">
                For Faculty
              </span>
            </div>

            <h1
              className="mt-4 text-[2rem] font-extrabold leading-[1.1] sm:text-[2.6rem]"
              style={{ color: NAVY }}
            >
              AI Without <span style={{ color: BLUE }}>Governance?</span>
            </h1>

            <p className="mt-3 max-w-xl text-[1rem] font-medium leading-relaxed text-slate-700">
              Understanding AI governance and preparing students for responsible
              AI leadership.
            </p>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              The risks are real. The solutions are clear. Learn why AI needs
              governance — and how ITIL v5 helps build responsible, trusted and
              future-ready AI systems.
            </p>

            {/* Event details */}
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {EVENT_DETAILS.map(({ icon: Icon, label, value, sub }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: BLUE }}
                    aria-hidden="true"
                  />
                  <dt className="mt-2 text-[0.68rem] font-medium uppercase tracking-wider text-slate-400">
                    {label}
                  </dt>
                  <dd className="text-sm font-bold text-slate-900">{value}</dd>
                  <dd className="text-xs text-slate-500">{sub}</dd>
                </div>
              ))}
            </dl>

            {/* Topics */}
            <div className="mt-8">
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                What we&apos;ll cover
              </h2>

              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {TOPICS.map((topic, i) => (
                  <li
                    key={topic}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: NAVY }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug text-slate-700">
                      {topic}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Speaker */}
            <div className="mt-8">
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                Speaker
              </h2>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`,
                    }}
                    aria-hidden="true"
                  >
                    {SPEAKER.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-base font-bold text-slate-900">
                          {SPEAKER.name}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: BLUE }}
                        >
                          {SPEAKER.title}
                        </p>
                      </div>

                      <a
                        href={SPEAKER.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#0a66c2] transition hover:border-[#0a66c2] hover:bg-[#0a66c2]/5"
                        aria-label={`${SPEAKER.name} on LinkedIn`}
                      >
                        <LinkedInIcon className="h-3.5 w-3.5" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {SPEAKER.credentials.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      {c}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {SPEAKER.bio}
                </p>

                <a
                  href={ITIL_CERT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:underline"
                  style={{ color: BLUE }}
                >
                  About the ITIL AI Governance (v5) certification
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — registration form
          ===================================================== */}
          <div className="self-start lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
              <div
                className="border-b border-slate-100 px-6 py-4"
                style={{ backgroundColor: NAVY }}
              >
                <h3 className="text-lg font-bold text-white">
                  Reserve your seat
                </h3>
                <p className="text-xs text-slate-300">
                  Free for faculty · Joining link sent by email
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 p-6 sm:grid-cols-2"
              >
                {/* NAME */}
                <div>
                  <label htmlFor="aig-name" className={LABEL_CLASSES}>
                    Your name
                  </label>
                  <input
                    id="aig-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Full name"
                    className={FIELD_CLASSES}
                  />
                </div>

                {/* INSTITUTION */}
                <div>
                  <label htmlFor="aig-institution" className={LABEL_CLASSES}>
                    Institution
                  </label>
                  <input
                    id="aig-institution"
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    autoComplete="organization"
                    placeholder="College or university"
                    className={FIELD_CLASSES}
                  />
                </div>

                {/* ROLE */}
                <div>
                  <label htmlFor="aig-role" className={LABEL_CLASSES}>
                    Role
                  </label>
                  <div className="relative">
                    <select
                      id="aig-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={`${FIELD_CLASSES} appearance-none pr-9`}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* DISCIPLINE */}
                <div>
                  <label htmlFor="aig-discipline" className={LABEL_CLASSES}>
                    Discipline
                  </label>
                  <div className="relative">
                    <select
                      id="aig-discipline"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className={`${FIELD_CLASSES} appearance-none pr-9`}
                    >
                      {DISCIPLINES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label htmlFor="aig-email" className={LABEL_CLASSES}>
                    Work email
                  </label>
                  <input
                    id="aig-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="name@institution.edu"
                    className={FIELD_CLASSES}
                  />
                </div>

                {/* FACULTY STRENGTH */}
                <div>
                  <label htmlFor="aig-strength" className={LABEL_CLASSES}>
                    Approx. faculty strength
                  </label>
                  <div className="relative">
                    <select
                      id="aig-strength"
                      required
                      value={strength}
                      onChange={(e) => setStrength(e.target.value)}
                      className={`${FIELD_CLASSES} appearance-none pr-9 ${
                        strength ? "" : "text-slate-400"
                      }`}
                    >
                      <option value="" disabled>
                        Select range…
                      </option>
                      {FACULTY_STRENGTHS.map((band) => (
                        <option key={band} value={band}>
                          {band}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* COURSE */}
                <div className="sm:col-span-2">
                  <label htmlFor="aig-course" className={LABEL_CLASSES}>
                    One course you teach{" "}
                    <span className="text-slate-400">— optional</span>
                  </label>
                  <input
                    id="aig-course"
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. Machine Learning"
                    className={FIELD_CLASSES}
                  />
                </div>

                {/* MOBILE + OTP */}
                <div className="sm:col-span-2">
                  <label htmlFor="aig-mobile" className={LABEL_CLASSES}>
                    Mobile{" "}
                    <span className="text-slate-400">
                      — verified by one-time code
                    </span>
                  </label>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex flex-1 gap-2">
                      <span className="flex h-10 shrink-0 items-center rounded-lg border border-slate-300! bg-slate-50 px-3 text-sm text-slate-700">
                        +91
                      </span>
                      <input
                        id="aig-mobile"
                        type="tel"
                        required
                        inputMode="numeric"
                        value={mobile}
                        onChange={(e) => handleMobileChange(e.target.value)}
                        maxLength={10}
                        autoComplete="tel-national"
                        placeholder="10-digit mobile number"
                        disabled={otpStep === "verified"}
                        className={`${FIELD_CLASSES} flex-1`}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={
                        !mobileValid ||
                        otpStep === "sending" ||
                        otpStep === "verified" ||
                        resendIn > 0 ||
                        closed
                      }
                      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1d5fd8] px-4 text-sm font-semibold text-white transition hover:bg-[#174fb5] disabled:cursor-not-allowed disabled:bg-[#1d5fd8]/40"
                    >
                      {otpStep === "sending" && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {otpStep === "verified"
                        ? "Verified"
                        : resendIn > 0
                          ? `Resend in ${resendIn}s`
                          : otpStep === "sent"
                            ? "Resend code"
                            : "Send code"}
                    </button>
                  </div>

                  {(otpStep === "sent" || otpStep === "verifying") && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        aria-label="Verification code"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="6-digit code"
                        maxLength={6}
                        autoComplete="one-time-code"
                        className={`${FIELD_CLASSES} max-w-[200px] text-center tracking-[0.3em]`}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={otp.length !== 6 || otpStep === "verifying"}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0b1f4d] px-5 text-sm font-semibold text-white transition hover:bg-[#13306f] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {otpStep === "verifying" && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        Verify
                      </button>
                    </div>
                  )}

                  {otpStep === "verified" && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Mobile verified
                    </p>
                  )}

                  {otpError && (
                    <p className="mt-2 text-xs text-red-600">{otpError}</p>
                  )}
                </div>

                {formError && (
                  <div className="sm:col-span-2">
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                      {formError}
                    </p>
                  </div>
                )}

                {/* SUBMIT */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={!formValid || submitting || closed}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#f5b301] text-sm font-bold text-[#0b1f4d] transition hover:bg-[#e0a300] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {closed
                      ? "Registration closed"
                      : submitting
                        ? "Registering…"
                        : "Register now"}
                  </button>

                  <p className="mt-2.5 text-center text-[0.75rem] leading-relaxed text-slate-500">
                    We use your email and number only for the joining link and
                    follow-up material.
                  </p>
                </div>
              </form>
            </div>

            {/* COUNTDOWN */}
            <div
              className="mt-4 rounded-2xl px-6 py-5"
              style={{ backgroundColor: NAVY }}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                {closed ? "Registration has closed" : "Webinar starts in"}
              </p>

              <div className="mt-3 flex items-start justify-between gap-2 sm:justify-start sm:gap-5">
                {units.map((unit, i) => (
                  <Fragment key={unit.label}>
                    {i > 0 && (
                      <span
                        className="font-mono text-[1.7rem] font-bold leading-none text-slate-600"
                        aria-hidden="true"
                      >
                        :
                      </span>
                    )}
                    <div className="text-center">
                      <div className="font-mono text-[1.7rem] font-bold leading-none tabular-nums text-white">
                        {unit.value}
                      </div>
                      <div className="mt-2 text-[0.6rem] uppercase tracking-[0.15em] text-slate-400">
                        {unit.label}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
