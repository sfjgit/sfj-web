"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import type { Job } from "@/types/jobs";
import {
  EMPLOYMENT_LABELS,
  LOCATION_LABELS,
  formatCTC,
  formatDate,
} from "@/lib/job-utils";
import { MapPin, Briefcase, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import ApplyForm from "@/components/ApplyForm";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/v1/jobs/${id}`)
      .then((r) => setJob(r.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="p-10 text-center text-zinc-400">Loading...</div>;
  if (!job)
    return <div className="p-10 text-center text-red-500">Job not found</div>;

  if (applied)
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center max-w-md">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900">
            Application Submitted!
          </h2>
          <p className="text-zinc-500 mt-2 text-sm">
            We'll review your application and get back to you soon.
          </p>
          <Link
            href="/jobs"
            className="inline-block mt-6 text-sm text-zinc-600 hover:underline"
          >
            ← Back to jobs
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={16} /> Back to jobs
        </Link>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">{job.title}</h1>
              <p className="text-zinc-500 mt-1">{job.department?.name}</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-zinc-500">
                  <MapPin size={14} /> {job.location} ·{" "}
                  {LOCATION_LABELS[job.locationType]}
                </span>
                <span className="flex items-center gap-1 text-sm text-zinc-500">
                  <Briefcase size={14} />{" "}
                  {EMPLOYMENT_LABELS[job.employmentType]}
                </span>
              </div>
            </div>
            <div className="text-right">
              {job.salaryMin && (
                <p className="font-semibold text-zinc-900">
                  {formatCTC(job.salaryMin)} – {formatCTC(job.salaryMax)}
                </p>
              )}
              <p className="text-xs text-zinc-400 mt-1">
                Posted {formatDate(job.createdAt)}
              </p>
              <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                {job.openings} opening{job.openings > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          {job.tags.length > 0 && (
            <div className="flex gap-1.5 mt-4 flex-wrap">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-6">
              <h2 className="font-semibold text-zinc-900 mb-3">
                About the Role
              </h2>
              <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-6">
              <h2 className="font-semibold text-zinc-900 mb-3">Requirements</h2>
              <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                {job.requirements}
              </p>
            </div>
            {job.jobDescription?.fileUrl && (
              <a
                href={job.jobDescription.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <FileText size={14} /> Download full Job Description
              </a>
            )}
          </div>
          <div>
            <ApplyForm jobId={job.id} onSuccess={() => setApplied(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}
