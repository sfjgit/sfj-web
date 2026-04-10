"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Job } from "@/types/jobs";
import { EMPLOYMENT_LABELS, LOCATION_LABELS, formatCTC } from "@/lib/job-utils";
import { MapPin, Briefcase, Search } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/jobs", { params: { status: "ACTIVE", limit: 100 } })
      .then((r) => setJobs(Array.isArray(r.data) ? r.data : r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.department?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200 px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Open Positions</h1>
        <p className="text-zinc-500 mt-2">
          Join our team — find a role that fits you
        </p>
        <div className="relative max-w-md mx-auto mt-6">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="Search by title, location, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
        {loading ? (
          <p className="text-center text-zinc-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-zinc-400">No open positions found</p>
        ) : (
          filtered.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-zinc-900 text-lg">
                    {job.title}
                  </h2>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {job.department?.name}
                  </p>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <MapPin size={12} /> {job.location} ·{" "}
                      {LOCATION_LABELS[job.locationType]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Briefcase size={12} />{" "}
                      {EMPLOYMENT_LABELS[job.employmentType]}
                    </span>
                    {job.salaryMin && (
                      <span className="text-xs text-zinc-500">
                        {formatCTC(job.salaryMin)} – {formatCTC(job.salaryMax)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                  {job.openings} opening{job.openings > 1 ? "s" : ""}
                </span>
              </div>
              {job.tags.length > 0 && (
                <div className="flex gap-1.5 mt-3 flex-wrap">
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
