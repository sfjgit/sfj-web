"use client";

// File: CareersClient.tsx
// Path: src/app/careers/_components/Careersclient.tsx
//
// Everything in one file: the zero-dep typo-tolerant search, the debounce hook,
// all the UI components, and the page. Search index is built once per dataset,
// a 250ms debounce + useDeferredValue keep typing smooth, searching kicks in at
// >= 3 chars, and results are paginated 20/page with the pager ABOVE the grid.

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  PublicRequirement,
  formatExperience,
  formatSalary,
  REMOTE_LABEL,
  JOB_TYPE_LABEL,
  formatLocation,
} from "./format";

const MIN_QUERY_LEN = 3;
const DEBOUNCE_MS = 250;
const PAGE_SIZE = 20;

// ── Fuzzy search (zero-dependency, in-memory, typo-tolerant) ─────────────────

interface Searchable {
  title: string;
  primarySkills: string[];
  keySkills: string[];
  city?: string | null;
  functionalArea?: string | null;
}

// lowercase, strip accents, keep letters/digits and a few tech chars (+ # .)
const norm = (s: string): string =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s: string): string[] => norm(s).split(" ").filter(Boolean);

// Bounded Levenshtein — bails out early once distance exceeds `max`.
function levenshtein(a: string, b: string, max: number): number {
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > max) return max + 1;

  let prev: number[] = Array.from({ length: bl + 1 }, (_, j) => j);
  for (let i = 1; i <= al; i++) {
    const cur: number[] = [i];
    let rowBest = i;
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      cur[j] = v;
      if (v < rowBest) rowBest = v;
    }
    if (rowBest > max) return max + 1; // whole row already too far
    prev = cur;
  }
  return prev[bl];
}

// how many typos we tolerate, scaled to word length
function allowedDistance(len: number): number {
  if (len <= 3) return 1;
  if (len <= 6) return 2;
  return 3;
}

// match quality of a query token against one field token, 0..1
function tokenScore(qt: string, ft: string): number {
  if (qt === ft) return 1;
  if (ft.startsWith(qt)) return 0.92; // "java" → "javascript"
  if (qt.startsWith(ft) && ft.length >= 3) return 0.7; // "reactjs" → "react"
  if (ft.includes(qt) && qt.length >= 3) return 0.75; // "script" in "javascript"
  if (qt.includes(ft) && ft.length >= 3) return 0.6;
  const max = allowedDistance(qt.length);
  const d = levenshtein(qt, ft, max);
  if (d <= max) return 0.85 * (1 - d / (max + 1)); // "pyhton" → "python"
  return 0;
}

const FIELD_WEIGHTS = { title: 3, primary: 2, key: 1.2, meta: 0.8 } as const;

interface IndexedField {
  tokens: string[];
  weight: number;
}
interface Indexed<T> {
  item: T;
  titleNorm: string;
  fields: IndexedField[];
}

// Precompute once per dataset — cheap, and keeps search O(reqs × tokens).
function buildIndex<T extends Searchable>(items: T[]): Indexed<T>[] {
  return items.map((item) => ({
    item,
    titleNorm: norm(item.title),
    fields: [
      { tokens: tokenize(item.title), weight: FIELD_WEIGHTS.title },
      {
        tokens: (item.primarySkills ?? []).flatMap(tokenize),
        weight: FIELD_WEIGHTS.primary,
      },
      {
        tokens: (item.keySkills ?? []).flatMap(tokenize),
        weight: FIELD_WEIGHTS.key,
      },
      {
        tokens: [
          ...(item.city ? tokenize(item.city) : []),
          ...(item.functionalArea ? tokenize(item.functionalArea) : []),
        ],
        weight: FIELD_WEIGHTS.meta,
      },
    ],
  }));
}

// AND semantics: every query word must match somewhere, so multi-word
// queries stay precise. Results ranked by summed weighted score.
function searchIndex<T extends Searchable>(
  index: Indexed<T>[],
  query: string,
): T[] {
  const q = norm(query);
  if (!q) return index.map((i) => i.item);

  const qTokens = q.split(" ").filter(Boolean);
  const scored: { item: T; score: number }[] = [];

  for (const entry of index) {
    let total = 0;
    let allMatched = true;

    for (const qt of qTokens) {
      let bestForToken = 0;
      for (const field of entry.fields) {
        for (const ft of field.tokens) {
          const s = tokenScore(qt, ft) * field.weight;
          if (s > bestForToken) bestForToken = s;
        }
      }
      if (bestForToken <= 0.001) {
        allMatched = false;
        break;
      }
      total += bestForToken;
    }

    if (!allMatched) continue;
    if (entry.titleNorm.includes(q)) total += 2; // exact phrase in title wins
    scored.push({ item: entry.item, score: total });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.item);
}

// Used to highlight the chips that actually caused a match.
function skillMatchesQuery(skill: string, query: string): boolean {
  const q = norm(query);
  if (!q) return false;
  const sTokens = tokenize(skill);
  const qTokens = q.split(" ").filter(Boolean);
  return qTokens.some((qt) => sTokens.some((st) => tokenScore(qt, st) >= 0.6));
}

// ── Debounce hook ────────────────────────────────────────────────────────────
function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Job card ─────────────────────────────────────────────────────────────────
function JobCard({ r, query }: { r: PublicRequirement; query: string }) {
  const experience = formatExperience(r);
  const salary = formatSalary(r);
  const skills = [...r.primarySkills, ...r.keySkills].slice(0, 6);
  const extra = r.primarySkills.length + r.keySkills.length - skills.length;
  const active = query.trim().length >= MIN_QUERY_LEN;

  return (
    <Link
      href={`/careers/${encodeURIComponent(r.reqCode)}`}
      className="group flex flex-col rounded-2xl border border-[#E9E7E0] bg-white p-6 outline-none transition-shadow duration-200 hover:shadow-[0_12px_40px_-24px_rgba(15,94,74,0.55)] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7] motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-[#CBE3D6] bg-[#E4F1EA] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#0B4838]">
          {REMOTE_LABEL[r.remoteType]}
        </span>
        <span className="rounded-full border border-[#E9E7E0] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#6F7278]">
          {JOB_TYPE_LABEL[r.jobType]}
        </span>
        {r.totalOpenings > 1 && (
          <span className="ml-auto text-[11px] font-medium text-[#6F7278]">
            {r.totalOpenings} openings
          </span>
        )}
      </div>

      <h3
        className="text-[19px] leading-snug text-[#16181D] transition-colors group-hover:text-[#0F5E4A]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        {r.title}
      </h3>

      <p className="mt-1.5 text-[13px] text-[#6F7278]">
        {formatLocation(r)}
        {experience && (
          <>
            <span className="mx-1.5 text-[#CFCCC3]">·</span>
            {experience}
          </>
        )}
      </p>

      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skills.map((skill) => {
            const hit = active && skillMatchesQuery(skill, query);
            return (
              <span
                key={skill}
                className={
                  hit
                    ? "rounded-md bg-[#0F5E4A] px-2 py-0.5 text-[12px] font-medium text-white"
                    : "rounded-md bg-[#F3F1EB] px-2 py-0.5 text-[12px] text-[#4A4D55]"
                }
              >
                {skill}
              </span>
            );
          })}
          {extra > 0 && (
            <span className="rounded-md px-1 py-0.5 text-[12px] text-[#9A9890]">
              +{extra}
            </span>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-[#F0EEE7] pt-4">
        <span className="text-[13px] font-medium text-[#16181D]">
          {salary ?? "Competitive"}
        </span>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0F5E4A]">
          View role
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="transition-transform motion-safe:group-hover:translate-x-0.5"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Search bar ───────────────────────────────────────────────────────────────
function SearchBar({
  query,
  setQuery,
  inputRef,
  resultsLabel,
}: {
  query: string;
  setQuery: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  resultsLabel: React.ReactNode;
}) {
  const trimmed = query.trim();

  return (
    <div className="sticky top-0 z-20 border-b border-[#E9E7E0] bg-[#FBFAF7]/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-4">
        <div className="relative">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9890]"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “react”, “data engineer”, or “bengaluru”"
            aria-label="Search open roles by title or skill"
            className="w-full rounded-xl border border-[#E4E1D8] bg-white py-3.5 pl-11 pr-24 text-[15px] text-[#16181D] shadow-sm outline-none transition-colors placeholder:text-[#9A9890] focus:border-[#0F5E4A] focus:ring-4 focus:ring-[#0F5E4A]/10"
          />
          {trimmed ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-[13px] font-medium text-[#6F7278] outline-none transition-colors hover:bg-[#F3F1EB] hover:text-[#16181D] focus-visible:ring-2 focus-visible:ring-[#0F5E4A]"
            >
              Clear
            </button>
          ) : (
            <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-[#E4E1D8] bg-[#F7F5EF] px-2 py-0.5 text-[12px] font-medium text-[#9A9890] sm:block">
              /
            </kbd>
          )}
        </div>

        <p className="mt-3 text-[13px] text-[#6F7278]" aria-live="polite">
          {resultsLabel}
        </p>
      </div>
    </div>
  );
}

// ── Pagination (rendered ABOVE the grid) ─────────────────────────────────────
function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const pages: (number | "…")[] = [];
  const window = 1;
  for (let p = 1; p <= pageCount; p++) {
    if (
      p === 1 ||
      p === pageCount ||
      (p >= page - window && p <= page + window)
    ) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const btn =
    "min-w-9 rounded-lg border px-3 py-1.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0F5E4A]";

  return (
    <nav
      className="mb-6 flex flex-wrap items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={`${btn} border-[#E4E1D8] bg-white text-[#16181D] hover:bg-[#F3F1EB] disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-[13px] text-[#9A9890]">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? `${btn} border-[#0F5E4A] bg-[#0F5E4A] text-white`
                : `${btn} border-[#E4E1D8] bg-white text-[#16181D] hover:bg-[#F3F1EB]`
            }
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        className={`${btn} border-[#E4E1D8] bg-white text-[#16181D] hover:bg-[#F3F1EB] disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Next
      </button>
    </nav>
  );
}

// ── Empty state box ──────────────────────────────────────────────────────────
function EmptyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E4E1D8] bg-white/60 px-6 py-20 text-center">
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CareersClient({
  openings,
}: {
  openings: PublicRequirement[];
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Two-stage smoothing: debounce the raw input, then defer the heavy work.
  const debouncedQuery = useDebounced(query, DEBOUNCE_MS);
  const deferredQuery = useDeferredValue(debouncedQuery);

  // Only treat >= 3 non-space chars as an active search.
  const effectiveQuery =
    deferredQuery.trim().length >= MIN_QUERY_LEN ? deferredQuery.trim() : "";

  // Built once per dataset — not on every keystroke.
  const index = useMemo(() => buildIndex(openings), [openings]);

  const results = useMemo<PublicRequirement[]>(() => {
    if (!effectiveQuery) return openings;
    return searchIndex(index, effectiveQuery);
  }, [index, effectiveQuery, openings]);

  // Reset to first page whenever the active query changes.
  useEffect(() => {
    setPage(1);
  }, [effectiveQuery]);

  const total = openings.length;
  const trimmed = query.trim();
  const searching = trimmed.length >= MIN_QUERY_LEN;

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = useMemo(
    () => results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [results, safePage],
  );

  // "/" focuses search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const resultsLabel = searching ? (
    <>
      <span className="font-semibold text-[#16181D]">{results.length}</span> of{" "}
      {total} {total === 1 ? "role" : "roles"} match{" "}
      <span className="text-[#16181D]">“{trimmed}”</span>
    </>
  ) : trimmed.length > 0 ? (
    <>
      Keep typing — <span className="text-[#16181D]">{MIN_QUERY_LEN}</span>+
      characters to search
    </>
  ) : (
    <>
      <span className="font-semibold text-[#16181D]">{total}</span> open{" "}
      {total === 1 ? "role" : "roles"}
    </>
  );

  return (
    <div
      className="min-h-screen bg-[#FBFAF7] text-[#16181D]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#0F5E4A]">
          SFJ Business Solutions · Careers
        </p>
        <h1
          className="mt-3 max-w-2xl text-4xl leading-[1.05] text-[#16181D] sm:text-5xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Roles open right now.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#6F7278]">
          Search by job title or skill. Rough spelling is fine — we&rsquo;ll
          still find the match.
        </p>
      </header>

      <SearchBar
        query={query}
        setQuery={setQuery}
        inputRef={inputRef}
        resultsLabel={resultsLabel}
      />

      {/* Results */}
      <main className="mx-auto max-w-6xl px-5 py-10">
        {total === 0 ? (
          <EmptyBox>
            <p
              className="text-lg text-[#16181D]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              No roles are open right now.
            </p>
            <p className="mt-2 text-[14px] text-[#6F7278]">
              New openings are posted here as soon as they go live. Check back
              soon.
            </p>
          </EmptyBox>
        ) : searching && results.length === 0 ? (
          <EmptyBox>
            <p
              className="text-lg text-[#16181D]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Nothing matches “{trimmed}”.
            </p>
            <p className="mt-2 text-[14px] text-[#6F7278]">
              Try a job title like{" "}
              <span className="text-[#16181D]">“recruiter”</span> or a single
              skill like <span className="text-[#16181D]">“python”</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="mt-5 rounded-lg bg-[#0F5E4A] px-4 py-2 text-[14px] font-medium text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
            >
              Clear search
            </button>
          </EmptyBox>
        ) : (
          <>
            <Pagination
              page={safePage}
              pageCount={pageCount}
              onChange={(p) => {
                setPage(p);
                if (typeof window !== "undefined")
                  window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((item) => (
                <JobCard key={item.id} r={item} query={effectiveQuery} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
