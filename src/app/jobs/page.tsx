/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Job } from "@/types/jobs";
import { EMPLOYMENT_LABELS, LOCATION_LABELS, formatCTC } from "@/lib/job-utils";
import { MapPin, Briefcase, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("ALL");

  useEffect(() => {
    axios
      .get("/api/v1/jobs", { params: { status: "ACTIVE", limit: 100 } })
      .then((r) => setJobs(Array.isArray(r.data) ? r.data : r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const departments = [
    "ALL",
    ...(Array.from(
      new Set(jobs.map((j) => j.department?.name).filter(Boolean))
    ) as string[]),
  ];

  const filtered = jobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.department?.name?.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "ALL" || j.department?.name === dept;
    return matchSearch && matchDept;
  });

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* ── Hero ── */}
      <div className="bg-zinc-950 text-white px-6 py-16 text-center relative overflow-hidden">
        {/* subtle grid bg */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative">
          <span className="inline-block text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-4">
            We're hiring
          </span>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Open Positions
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Build something meaningful. Find a role where your work actually
            matters.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-8">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-zinc-500 outline-none focus:bg-white/15 focus:border-white/40 transition-all"
              placeholder="Search by title, location, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Dept filter pills ── */}
      {departments.length > 1 && (
        <div className="border-b border-zinc-200 bg-white px-6 py-3 flex gap-2 overflow-x-auto">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                dept === d
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {d === "ALL" ? "All Departments" : d}
            </button>
          ))}
        </div>
      )}

      {/* ── Job list ── */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-3">
        {loading ? (
          // Skeleton
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-zinc-200 rounded-xl p-5 animate-pulse"
            >
              <div className="h-5 bg-zinc-100 rounded w-1/2 mb-3" />
              <div className="h-3 bg-zinc-100 rounded w-1/4 mb-4" />
              <div className="flex gap-3">
                <div className="h-3 bg-zinc-100 rounded w-24" />
                <div className="h-3 bg-zinc-100 rounded w-20" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-sm">
              No open positions match your search
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-zinc-500 underline mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-xs text-zinc-400 mb-4">
              {filtered.length} position{filtered.length !== 1 ? "s" : ""} found
            </p>
            {filtered.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group block bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="font-semibold text-zinc-900 text-base group-hover:text-zinc-700 transition-colors">
                        {job.title}
                      </h2>
                      {/* test badge — shows if job has a test attached (we don't know from list, skip) */}
                    </div>
                    <p className="text-xs text-zinc-500 mb-3">
                      {job.department?.name}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin size={11} className="shrink-0" />
                        {job.location} · {LOCATION_LABELS[job.locationType]}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Briefcase size={11} className="shrink-0" />
                        {EMPLOYMENT_LABELS[job.employmentType]}
                      </span>
                      {job.salaryMin && (
                        <span className="text-xs text-zinc-500">
                          {formatCTC(job.salaryMin)} –{" "}
                          {formatCTC(job.salaryMax)}
                        </span>
                      )}
                    </div>

                    {job.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {job.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                        {job.tags.length > 4 && (
                          <span className="text-xs text-zinc-400">
                            +{job.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                      {job.openings} opening{job.openings > 1 ? "s" : ""}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
