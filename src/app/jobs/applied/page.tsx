/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function AppliedPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center max-w-md w-full shadow-sm">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">
          Application Submitted!
        </h2>
        <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
          We've received your application and will review it shortly. We'll
          reach out to you via email.
        </p>
        <Link
          href="/jobs"
          className="inline-block mt-8 text-sm text-zinc-600 border border-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 transition-colors"
        >
          ← Browse more jobs
        </Link>
      </div>
    </div>
  );
}
