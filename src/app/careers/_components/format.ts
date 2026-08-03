// File: format.ts
// Path: src/app/careers/_components/format.ts
//
// Shared, framework-agnostic helpers for the careers list + detail pages.
// No "use client" — safe to import from both server and client components.

export type JobType =
  | "CONTRACT"
  | "PERMANENT"
  | "CONTRACT_TO_HIRE"
  | "FREELANCE";
export type RemoteType = "ONSITE" | "REMOTE" | "HYBRID";
export type SalaryType = "MONTHLY" | "ANNUAL" | "HOURLY" | "DAILY";
export type JobOpenFor = "EXTERNAL" | "INTERNAL" | "BOTH";

export interface Salary {
  min: number | null;
  max: number | null;
  type: SalaryType | null;
  currency: string | null;
  showMedian: boolean;
}

// Shape from GET /api/public/requirements (list)
export interface PublicRequirement {
  id: string;
  reqCode: string;
  title: string;
  jobType: JobType;
  remoteType: RemoteType;
  city: string | null;
  state: string | null;
  country: string | null;
  primarySkills: string[];
  keySkills: string[];
  experienceMin: number | null;
  experienceMax: number | null;
  totalOpenings: number;
  functionalArea: string | null;
  salary: Salary | null;
  requirementCategory: { name: string; slug: string } | null;
}

// Shape from GET /api/public/requirements/:reqCode (detail) — adds the JD body
export interface PublicRequirementDetail extends PublicRequirement {
  description: string | null;
  jobOpenFor: JobOpenFor;
  education: string | null;
  shift: string | null;
  jdFileName: string | null;
}

export const JOB_TYPE_LABEL: Record<JobType, string> = {
  CONTRACT: "Contract",
  PERMANENT: "Permanent",
  CONTRACT_TO_HIRE: "Contract to hire",
  FREELANCE: "Freelance",
};

export const REMOTE_LABEL: Record<RemoteType, string> = {
  ONSITE: "On-site",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

export function formatLocation(r: PublicRequirement): string {
  const parts = [r.city, r.state].filter(Boolean);
  return parts.length ? parts.join(", ") : r.country || "Location on request";
}

export function formatExperience(r: PublicRequirement): string | null {
  const lo = r.experienceMin;
  const hi = r.experienceMax;
  if (lo != null && hi != null) return `${lo}–${hi} yrs`;
  if (lo != null) return `${lo}+ yrs`;
  if (hi != null) return `Up to ${hi} yrs`;
  return null;
}

export function formatSalary(r: PublicRequirement): string | null {
  const s = r.salary;
  if (!s || (s.min == null && s.max == null)) return null;

  const cur = s.currency || "INR";
  const lakh = (n: number) => {
    const l = n / 100000;
    return Number.isInteger(l) ? `${l}` : l.toFixed(1);
  };

  if (cur === "INR" && s.type === "ANNUAL") {
    if (s.min != null && s.max != null)
      return `₹${lakh(s.min)}–${lakh(s.max)} LPA`;
    if (s.min != null) return `₹${lakh(s.min)} LPA+`;
    return `Up to ₹${lakh(s.max!)} LPA`;
  }

  const sym = cur === "INR" ? "₹" : `${cur} `;
  const per =
    s.type === "MONTHLY"
      ? "/mo"
      : s.type === "HOURLY"
        ? "/hr"
        : s.type === "DAILY"
          ? "/day"
          : "";
  const short = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
  if (s.min != null && s.max != null)
    return `${sym}${short(s.min)}–${short(s.max)}${per}`;
  if (s.min != null) return `${sym}${short(s.min)}+${per}`;
  return `${sym}${short(s.max!)}${per}`;
}
