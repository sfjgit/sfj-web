import type {
  ApplicationStatus,
  JobStatus,
  RoundStatus,
  RoundResult,
  HireOutcome,
  LocationType,
  EmploymentType,
} from "@/types/jobs";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  DRAFT: "Draft",
  ACTIVE: "Active",
  PAUSED: "Paused",
  CLOSED: "Closed",
};
export const JOB_STATUS_COLORS: Record<JobStatus, string> = {
  DRAFT: "bg-zinc-100 text-zinc-600",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  PAUSED: "bg-amber-100 text-amber-700",
  CLOSED: "bg-red-100 text-red-600",
};

export const APP_STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  SCREENING: "Screening",
  TEST: "Test",
  INTERVIEW: "Interview",
  OFFERED: "Offered",
  HIRED: "Hired",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
  ON_HOLD: "On Hold",
};
export const APP_STATUS_COLORS: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-100 text-blue-700",
  SCREENING: "bg-purple-100 text-purple-700",
  TEST: "bg-indigo-100 text-indigo-700",
  INTERVIEW: "bg-cyan-100 text-cyan-700",
  OFFERED: "bg-amber-100 text-amber-700",
  HIRED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-600",
  WITHDRAWN: "bg-zinc-100 text-zinc-500",
  ON_HOLD: "bg-orange-100 text-orange-600",
};

export const ROUND_STATUS_COLORS: Record<RoundStatus, string> = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-zinc-100 text-zinc-500",
  NO_SHOW: "bg-red-100 text-red-600",
};

export const ROUND_RESULT_COLORS: Record<RoundResult, string> = {
  PASS: "bg-emerald-100 text-emerald-700",
  FAIL: "bg-red-100 text-red-600",
  ON_HOLD: "bg-orange-100 text-orange-600",
  PENDING: "bg-zinc-100 text-zinc-500",
};

export const HIRE_OUTCOME_COLORS: Record<HireOutcome, string> = {
  HIRED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-600",
  WITHDRAWN: "bg-zinc-100 text-zinc-500",
  ON_HOLD: "bg-orange-100 text-orange-600",
};

export const LOCATION_LABELS: Record<LocationType, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};
export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

export function formatCTC(amount?: number | null, currency = "INR"): string {
  if (!amount) return "—";
  if (currency === "INR") {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso?: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(iso?: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
