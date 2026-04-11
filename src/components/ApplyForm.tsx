"use client";
import { useState } from "react";
import axios from "axios";

interface Props {
  jobId: string;
  onSuccess: () => void;
}

export default function ApplyForm({ jobId, onSuccess }: Props) {
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

  async function handleSubmit() {
    if (!form.name || !form.email)
      return setError("Name and email are required");
    if (!resume) return setError("Please upload your resume");
    setSaving(true);
    setError("");
    try {
      // 1. Create candidate
      const { data: candidate } = await axios.post("/api/v1/candidates", {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        currentCompany: form.currentCompany || undefined,
        currentTitle: form.currentTitle || undefined,
        totalExpYears: form.totalExpYears
          ? Number(form.totalExpYears)
          : undefined,
        noticePeriod: form.noticePeriod ? Number(form.noticePeriod) : undefined,
        notes: form.notes || undefined,
        source: "DIRECT",
      });

      // 2. Upload resume
      const formData = new FormData();
      formData.append("file", resume);
      await axios.post(
        `/api/v1/candidates/${candidate.id}/resume/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // 3. Create application
      await axios.post("/api/v1/applications", {
        jobId,
        candidateId: candidate.id,
      });

      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(
        e?.response?.data?.message ??
          e?.response?.data?.error ??
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 sticky top-6">
      <h2 className="font-semibold text-zinc-900 mb-4">Apply for this role</h2>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-600">
            Full Name *
          </label>
          <input
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600">Email *</label>
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600">Phone</label>
          <input
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600">
            Current Company
          </label>
          <input
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.currentCompany}
            onChange={(e) =>
              setForm((f) => ({ ...f, currentCompany: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600">
            Current Title
          </label>
          <input
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={form.currentTitle}
            onChange={(e) =>
              setForm((f) => ({ ...f, currentTitle: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-zinc-600">
              Experience (yrs)
            </label>
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.totalExpYears}
              onChange={(e) =>
                setForm((f) => ({ ...f, totalExpYears: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-600">
              Notice (days)
            </label>
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
              value={form.noticePeriod}
              onChange={(e) =>
                setForm((f) => ({ ...f, noticePeriod: e.target.value }))
              }
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600">
            Cover Note
          </label>
          <textarea
            rows={3}
            className="w-full mt-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600">
            Resume (PDF/DOC) *
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full mt-1 text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-900 file:text-white hover:file:bg-zinc-700 cursor-pointer"
            onChange={(e) => setResume(e.target.files?.[0] ?? null)}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-zinc-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {saving ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
