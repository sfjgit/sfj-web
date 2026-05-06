"use client";

import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Lock, ShieldCheck, ArrowRight } from "lucide-react";

const plans = [
  {
    id: "self",
    label: "Self-Paced Online",
    price: "₹12,999",
    original: "₹18,999",
    badge: null,
    features: [
      "20–24 hrs recorded content",
      "Practice exams",
      "Completion cert",
      "6-month access",
    ],
  },
  {
    id: "live",
    label: "Live Instructor-Led",
    price: "₹21,999",
    original: "₹29,999",
    badge: "Most Popular",
    features: [
      "3-day live sessions",
      "Doubt clearing",
      "Mock tests + mentoring",
      "Exam fee included",
    ],
  },
  {
    id: "corporate",
    label: "Corporate Batch",
    price: "Custom",
    original: null,
    badge: null,
    features: [
      "Team of 5+",
      "Custom schedule",
      "Dedicated trainer",
      "Post-training support",
    ],
  },
];

type Step = "plan" | "details" | "payment" | "success";

export default function EnrollDialog({
  trigger,
  defaultPlan,
}: {
  trigger: ReactNode;
  defaultPlan?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan || "live");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const plan = plans.find((p) => p.id === selectedPlan)!;

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.replace(/\s/g, "").match(/^\d{10}$/))
      e.phone = "10-digit phone required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setStep("success");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("plan");
      setForm({ name: "", email: "", phone: "" });
      setErrors({});
    }, 300);
  };

  const steps: Step[] = ["plan", "details", "payment"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stepIdx = steps.indexOf(step as any);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </span>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg w-full p-0 overflow-hidden rounded-2xl gap-0">
          {/* Step bar */}
          {step !== "success" && (
            <div className="flex items-center gap-1 border-b border-slate-100 px-6 pt-5 pb-4">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      step === s
                        ? "text-blue-600"
                        : stepIdx > i
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                        step === s
                          ? "bg-blue-600 text-white border-blue-600"
                          : stepIdx > i
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {stepIdx > i ? "✓" : i + 1}
                    </div>
                    <span className="hidden sm:inline">
                      {s === "plan"
                        ? "Choose Plan"
                        : s === "details"
                        ? "Your Details"
                        : "Payment"}
                    </span>
                  </div>
                  {i < 2 && <div className="w-6 h-px bg-slate-200 mx-1" />}
                </div>
              ))}
            </div>
          )}

          <div className="p-6">
            {/* STEP 1 — Plan */}
            {step === "plan" && (
              <div>
                <DialogHeader className="mb-5">
                  <DialogTitle className="text-lg font-bold text-slate-900">
                    Choose Your Plan
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-500">
                    Select the format that works for you.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mb-6">
                  {plans.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        selectedPlan === p.id
                          ? "border-blue-500 bg-blue-50/40"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {p.badge && (
                        <Badge className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[10px] px-2 py-0.5">
                          {p.badge}
                        </Badge>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedPlan === p.id
                                ? "border-blue-600"
                                : "border-slate-300"
                            }`}
                          >
                            {selectedPlan === p.id && (
                              <div className="w-2 h-2 rounded-full bg-blue-600" />
                            )}
                          </div>
                          <span className="font-semibold text-slate-900 text-sm">
                            {p.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-900 text-sm">
                            {p.price}
                          </span>
                          {p.original && (
                            <span className="text-xs text-slate-400 line-through ml-1.5">
                              {p.original}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 ml-6">
                        {p.features.map((f) => (
                          <span key={f} className="text-xs text-slate-500">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setStep("details")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* STEP 2 — Details */}
            {step === "details" && (
              <div>
                <DialogHeader className="mb-5">
                  <DialogTitle className="text-lg font-bold text-slate-900">
                    Your Details
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-500">
                    We&apos;ll send your confirmation and course access to these
                    details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mb-6">
                  {(["name", "email", "phone"] as const).map((field) => (
                    <div key={field}>
                      <Label
                        htmlFor={field}
                        className="text-sm font-medium text-slate-700 mb-1.5 block capitalize"
                      >
                        {field === "phone"
                          ? "Phone Number"
                          : field === "email"
                          ? "Email Address"
                          : "Full Name"}{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={field}
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone"
                            ? "tel"
                            : "text"
                        }
                        placeholder={
                          field === "name"
                            ? "e.g. Rahul Sharma"
                            : field === "email"
                            ? "you@example.com"
                            : "10-digit mobile"
                        }
                        value={form[field]}
                        onChange={(e) => {
                          setForm({ ...form, [field]: e.target.value });
                          setErrors({ ...errors, [field]: undefined });
                        }}
                        className={
                          errors[field]
                            ? "border-red-400 focus-visible:ring-red-300"
                            : ""
                        }
                      />
                      {errors[field] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("plan")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (validate()) setStep("payment");
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    Proceed to Pay <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step === "payment" && (
              <div>
                <DialogHeader className="mb-5">
                  <DialogTitle className="text-lg font-bold text-slate-900">
                    Payment
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-500">
                    Review your order and complete payment securely.
                  </DialogDescription>
                </DialogHeader>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Order Summary
                  </p>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-700">
                      ISTQB CT-TAE — {plan.label}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {plan.price}
                    </span>
                  </div>
                  {plan.original && (
                    <div className="flex justify-between">
                      <span className="text-xs text-emerald-600">You save</span>
                      <span className="text-xs text-emerald-600 font-medium">
                        ₹
                        {(
                          parseInt(plan.original.replace(/\D/g, "")) -
                          parseInt(plan.price.replace(/\D/g, ""))
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <Separator className="my-3" />
                  <div className="space-y-0.5 text-xs text-slate-500">
                    <p>
                      <span className="font-medium text-slate-700">Name:</span>{" "}
                      {form.name}
                    </p>
                    <p>
                      <span className="font-medium text-slate-700">Email:</span>{" "}
                      {form.email}
                    </p>
                    <p>
                      <span className="font-medium text-slate-700">Phone:</span>{" "}
                      {form.phone}
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 mb-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Payment Method
                  </p>
                  <Select defaultValue="razorpay">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">
                        Razorpay (UPI / Cards / Net Banking)
                      </SelectItem>
                      <SelectItem value="card">Credit / Debit Card</SelectItem>
                      <SelectItem value="upi">UPI Direct</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    256-bit SSL encrypted. Your payment info is secure.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("details")}
                    className="flex-1"
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePay}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                          />
                        </svg>
                        Processing…
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Pay {plan.price}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4 — Success */}
            {step === "success" && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Enrollment Confirmed!
                </h3>
                <p className="text-slate-500 text-sm mb-1">
                  Hey{" "}
                  <span className="font-medium text-slate-700">
                    {form.name}
                  </span>
                  , you&apos;re all set.
                </p>
                <p className="text-slate-500 text-sm mb-6">
                  Confirmation sent to{" "}
                  <span className="font-medium text-blue-600">
                    {form.email}
                  </span>
                  . We&apos;ll reach out on{" "}
                  <span className="font-medium text-slate-700">
                    {form.phone}
                  </span>{" "}
                  with next steps.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-left">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    What&apos;s Next
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {[
                      "Check your email for course access details",
                      "Download the ISTQB CTAL-TAE syllabus",
                      "Join the student community group",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={handleClose}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
