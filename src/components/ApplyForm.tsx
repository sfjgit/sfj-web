/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  jobId: string;
  onSuccess?: () => void; // kept for backward compat but redirect takes over
}

export default function ApplyForm({ jobId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentCompany: "",
    currentTitle: "",
    totalExpYears: "",
    noticePeriod: "",
    notes: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "submitting" | "redirecting">(
    "form",
  );

  async function handleSubmit() {
    if (!form.name || !form.email)
      return setError("Name and email are required");
    if (!resume) return setError("Please upload your resume");

    setSaving(true);
    setStep("submitting");
    setError("");

    try {
      // 1. Create candidate
      const { data: candidate } = await axios.post(
        "/api/v1/candidates",
        {
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          currentCompany: form.currentCompany || undefined,
          currentTitle: form.currentTitle || undefined,
          totalExpYears: form.totalExpYears
            ? Number(form.totalExpYears)
            : undefined,
          noticePeriod: form.noticePeriod
            ? Number(form.noticePeriod)
            : undefined,
          notes: form.notes || undefined,
          source: "DIRECT",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? "",
          },
        },
      );

      // 2. Upload resume
      const formData = new FormData();
      formData.append("file", resume);
      await axios.post(
        `/api/v1/candidates/${candidate.id}/resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? "",
          },
        },
      );

      // 3. Create application — get applicationId back
      const { data: application } = await axios.post(
        "/api/v1/applications",
        { jobId, candidateId: candidate.id },
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? "",
          },
        },
      );

      // 4. Check if job has an active test
      // const testsRes = await axios
      //   .get("/api/v1/tests", { params: { jobId } })
      //   .then((r) => r.data)
      //   .catch(() => []);

      // const activeTest = Array.isArray(testsRes)
      //   ? testsRes.find((t: any) => t.isActive)
      //   : null;
      const activeTest = await axios
        .get(`/api/v1/tests/by-job/${jobId}`)
        .then((r) => r.data)
        .catch(() => null);

      // then redirect:
      if (activeTest) {
        // router.push(`/test/${activeTest.id}?appId=${application.id}`);
        router.push(
          `/test/${activeTest.id}?appId=${
            application.id
          }&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(
            form.email,
          )}`,
        );
        return;
      } else {
        router.push(`/jobs/applied?jobId=${jobId}`);
        return;
      }
      // setStep("redirecting");

      // if (activeTest) {
      //   // redirect to test page with appId linked
      //   router.push(`/test/${activeTest.id}?appId=${application.id}`);
      // } else {
      //   // no test — go to success page
      //   router.push(`/jobs/applied?jobId=${jobId}`);
      // }
    } catch (e: any) {
      setStep("form");
      setError(
        e?.response?.data?.message ??
          e?.response?.data?.error ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  // Submitting / redirecting overlay
  if (step === "submitting" || step === "redirecting") {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl p-8 sticky top-6 text-center">
        <div className="w-10 h-10 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium text-zinc-900">
          {step === "submitting"
            ? "Submitting your application..."
            : "Application received! Taking you to the test..."}
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          {step === "redirecting"
            ? "Please don't close this tab"
            : "Hang on a moment"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 sticky top-6">
      <h2 className="font-semibold text-zinc-900 mb-1">Apply for this role</h2>
      <p className="text-xs text-zinc-400 mb-4">
        After applying you'll be directed to a short screening test.
      </p>
      <div className="space-y-3">
        <Field label="Full Name *">
          <input
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Rahul Sharma"
          />
        </Field>
        <Field label="Email *">
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Phone">
          <input
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+91 9876543210"
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Current Company">
            <input
              className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.currentCompany}
              onChange={(e) =>
                setForm((f) => ({ ...f, currentCompany: e.target.value }))
              }
              placeholder="Acme Inc"
            />
          </Field>
          <Field label="Current Title">
            <input
              className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.currentTitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, currentTitle: e.target.value }))
              }
              placeholder="Engineer"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Experience (yrs)">
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.totalExpYears}
              onChange={(e) =>
                setForm((f) => ({ ...f, totalExpYears: e.target.value }))
              }
              placeholder="3"
            />
          </Field>
          <Field label="Notice (days)">
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.noticePeriod}
              onChange={(e) =>
                setForm((f) => ({ ...f, noticePeriod: e.target.value }))
              }
              placeholder="30"
            />
          </Field>
        </div>
        <Field label="Cover Note">
          <textarea
            rows={3}
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Why are you a great fit for this role?"
          />
        </Field>
        <Field label="Resume (PDF/DOC) *">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full mt-1 text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-900 file:text-white hover:file:bg-zinc-700 cursor-pointer"
            onChange={(e) => setResume(e.target.files?.[0] ?? null)}
          />
        </Field>

        {/* Info note about test */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 text-xs text-blue-700">
          📋 <span className="font-medium">Heads up:</span> After submitting
          you'll be asked to complete a short screening test. Keep this tab
          open.
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-zinc-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {saving ? "Submitting..." : "Submit Application →"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-zinc-600">{label}</label>
      {children}
    </div>
  );
}
