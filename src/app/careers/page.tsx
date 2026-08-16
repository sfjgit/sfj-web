// //page.tsx
// // Path: src/app/careers/page.tsx

// "use client";

// import Link from "next/link";
// import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
// import {
//   PublicRequirement,
//   formatExperience,
//   formatSalary,
//   REMOTE_LABEL,
//   JOB_TYPE_LABEL,
//   formatLocation,
// } from "./_components/format";
// import { buildIndex, searchIndex, skillMatchesQuery } from "@/lib/fuzzySearch";

// const MIN_QUERY_LEN = 3;
// const DEBOUNCE_MS = 250;
// const PAGE_SIZE = 20;

// // ── Debounce hook ────────────────────────────────────────────────────────────
// function useDebounced<T>(value: T, delay: number): T {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return debounced;
// }

// // ── Job card ─────────────────────────────────────────────────────────────────
// function JobCard({ r, query }: { r: PublicRequirement; query: string }) {
//   const experience = formatExperience(r);
//   const salary = formatSalary(r);
//   const skills = [...r.primarySkills, ...r.keySkills].slice(0, 6);
//   const extra = r.primarySkills.length + r.keySkills.length - skills.length;
//   const active = query.trim().length >= MIN_QUERY_LEN;

//   return (
//     <Link
//       href={`/careers/${encodeURIComponent(r.reqCode)}`}
//       className="group flex flex-col rounded-2xl border border-[#E9E7E0] bg-white p-6 outline-none transition-shadow duration-200 hover:shadow-[0_12px_40px_-24px_rgba(15,94,74,0.55)] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7] motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
//     >
//       <div className="mb-3 flex items-center gap-2">
//         <span className="rounded-full border border-[#CBE3D6] bg-[#E4F1EA] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#0B4838]">
//           {REMOTE_LABEL[r.remoteType]}
//         </span>
//         <span className="rounded-full border border-[#E9E7E0] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#6F7278]">
//           {JOB_TYPE_LABEL[r.jobType]}
//         </span>
//         {r.totalOpenings > 1 && (
//           <span className="ml-auto text-[11px] font-medium text-[#6F7278]">
//             {r.totalOpenings} openings
//           </span>
//         )}
//       </div>

//       <h3
//         className="text-[19px] leading-snug text-[#16181D] transition-colors group-hover:text-[#0F5E4A]"
//         style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
//       >
//         {r.title}
//       </h3>

//       <p className="mt-1.5 text-[13px] text-[#6F7278]">
//         {formatLocation(r)}
//         {experience && (
//           <>
//             <span className="mx-1.5 text-[#CFCCC3]">·</span>
//             {experience}
//           </>
//         )}
//       </p>

//       {skills.length > 0 && (
//         <div className="mt-4 flex flex-wrap gap-1.5">
//           {skills.map((skill) => {
//             const hit = active && skillMatchesQuery(skill, query);
//             return (
//               <span
//                 key={skill}
//                 className={
//                   hit
//                     ? "rounded-md bg-[#0F5E4A] px-2 py-0.5 text-[12px] font-medium text-white"
//                     : "rounded-md bg-[#F3F1EB] px-2 py-0.5 text-[12px] text-[#4A4D55]"
//                 }
//               >
//                 {skill}
//               </span>
//             );
//           })}
//           {extra > 0 && (
//             <span className="rounded-md px-1 py-0.5 text-[12px] text-[#9A9890]">
//               +{extra}
//             </span>
//           )}
//         </div>
//       )}

//       <div className="mt-5 flex items-center justify-between border-t border-[#F0EEE7] pt-4">
//         <span className="text-[13px] font-medium text-[#16181D]">
//           {salary ?? "Competitive"}
//         </span>
//         <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0F5E4A]">
//           View role
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden="true"
//             className="transition-transform motion-safe:group-hover:translate-x-0.5"
//           >
//             <path
//               d="M5 12h14M13 6l6 6-6 6"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </span>
//       </div>
//     </Link>
//   );
// }

// // ── Search bar ───────────────────────────────────────────────────────────────
// function SearchBar({
//   query,
//   setQuery,
//   inputRef,
//   resultsLabel,
// }: {
//   query: string;
//   setQuery: (v: string) => void;
//   inputRef: React.RefObject<HTMLInputElement>;
//   resultsLabel: React.ReactNode;
// }) {
//   const trimmed = query.trim();

//   return (
//     <div className="sticky top-0 z-20 border-b border-[#E9E7E0] bg-[#FBFAF7]/85 backdrop-blur-md">
//       <div className="mx-auto max-w-6xl px-5 py-4">
//         <div className="relative">
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             aria-hidden="true"
//             className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9890]"
//           >
//             <circle
//               cx="11"
//               cy="11"
//               r="7"
//               stroke="currentColor"
//               strokeWidth="2"
//             />
//             <path
//               d="M20 20l-3.5-3.5"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//           <input
//             ref={inputRef}
//             type="search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Try “react”, “data engineer”, or “bengaluru”"
//             aria-label="Search open roles by title or skill"
//             className="w-full rounded-xl border border-[#E4E1D8] bg-white py-3.5 pl-11 pr-24 text-[15px] text-[#16181D] shadow-sm outline-none transition-colors placeholder:text-[#9A9890] focus:border-[#0F5E4A] focus:ring-4 focus:ring-[#0F5E4A]/10"
//           />
//           {trimmed ? (
//             <button
//               type="button"
//               onClick={() => {
//                 setQuery("");
//                 inputRef.current?.focus();
//               }}
//               className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-[13px] font-medium text-[#6F7278] outline-none transition-colors hover:bg-[#F3F1EB] hover:text-[#16181D] focus-visible:ring-2 focus-visible:ring-[#0F5E4A]"
//             >
//               Clear
//             </button>
//           ) : (
//             <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-[#E4E1D8] bg-[#F7F5EF] px-2 py-0.5 text-[12px] font-medium text-[#9A9890] sm:block">
//               /
//             </kbd>
//           )}
//         </div>

//         <p className="mt-3 text-[13px] text-[#6F7278]" aria-live="polite">
//           {resultsLabel}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Pagination (rendered ABOVE the grid) ─────────────────────────────────────
// function Pagination({
//   page,
//   pageCount,
//   onChange,
// }: {
//   page: number;
//   pageCount: number;
//   onChange: (p: number) => void;
// }) {
//   if (pageCount <= 1) return null;

//   // Compact window of page numbers around the current page.
//   const pages: (number | "…")[] = [];
//   const push = (n: number | "…") => pages.push(n);
//   const window = 1;
//   for (let p = 1; p <= pageCount; p++) {
//     if (
//       p === 1 ||
//       p === pageCount ||
//       (p >= page - window && p <= page + window)
//     ) {
//       push(p);
//     } else if (pages[pages.length - 1] !== "…") {
//       push("…");
//     }
//   }

//   const btn =
//     "min-w-9 rounded-lg border px-3 py-1.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#0F5E4A]";

//   return (
//     <nav
//       className="mb-6 flex flex-wrap items-center justify-center gap-1.5"
//       aria-label="Pagination"
//     >
//       <button
//         type="button"
//         onClick={() => onChange(page - 1)}
//         disabled={page <= 1}
//         className={`${btn} border-[#E4E1D8] bg-white text-[#16181D] hover:bg-[#F3F1EB] disabled:cursor-not-allowed disabled:opacity-40`}
//       >
//         Prev
//       </button>

//       {pages.map((p, i) =>
//         p === "…" ? (
//           <span key={`e${i}`} className="px-1 text-[13px] text-[#9A9890]">
//             …
//           </span>
//         ) : (
//           <button
//             key={p}
//             type="button"
//             onClick={() => onChange(p)}
//             aria-current={p === page ? "page" : undefined}
//             className={
//               p === page
//                 ? `${btn} border-[#0F5E4A] bg-[#0F5E4A] text-white`
//                 : `${btn} border-[#E4E1D8] bg-white text-[#16181D] hover:bg-[#F3F1EB]`
//             }
//           >
//             {p}
//           </button>
//         ),
//       )}

//       <button
//         type="button"
//         onClick={() => onChange(page + 1)}
//         disabled={page >= pageCount}
//         className={`${btn} border-[#E4E1D8] bg-white text-[#16181D] hover:bg-[#F3F1EB] disabled:cursor-not-allowed disabled:opacity-40`}
//       >
//         Next
//       </button>
//     </nav>
//   );
// }

// // ── Empty states ─────────────────────────────────────────────────────────────
// function EmptyBox({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="rounded-2xl border border-dashed border-[#E4E1D8] bg-white/60 px-6 py-20 text-center">
//       {children}
//     </div>
//   );
// }

// // ── Page ─────────────────────────────────────────────────────────────────────
// export default function CareersClient({
//   openings,
// }: {
//   openings: PublicRequirement[];
// }) {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Two-stage smoothing: debounce the raw input, then defer the heavy work.
//   const debouncedQuery = useDebounced(query, DEBOUNCE_MS);
//   const deferredQuery = useDeferredValue(debouncedQuery);

//   // Only treat >= 3 non-space chars as an active search.
//   const effectiveQuery =
//     deferredQuery.trim().length >= MIN_QUERY_LEN ? deferredQuery.trim() : "";

//   // Built once per dataset — not on every keystroke.
//   const index = useMemo(() => buildIndex(openings), [openings]);

//   const results = useMemo<PublicRequirement[]>(() => {
//     if (!effectiveQuery) return openings;
//     return searchIndex(index, effectiveQuery);
//   }, [index, effectiveQuery, openings]);

//   // Reset to first page whenever the active query changes.
//   useEffect(() => {
//     setPage(1);
//   }, [effectiveQuery]);

//   const total = openings?.length;
//   const trimmed = query.trim();
//   const searching = trimmed.length >= MIN_QUERY_LEN;

//   const pageCount = Math.max(1, Math.ceil(results?.length / PAGE_SIZE));
//   const safePage = Math.min(page, pageCount);
//   const pageItems = useMemo(
//     () => results?.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
//     [results, safePage],
//   );

//   // "/" focuses search from anywhere on the page.
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       const el = document.activeElement;
//       const typing =
//         el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
//       if (e.key === "/" && !typing) {
//         e.preventDefault();
//         inputRef.current?.focus();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const resultsLabel = searching ? (
//     <>
//       <span className="font-semibold text-[#16181D]">{results?.length}</span> of{" "}
//       {total} {total === 1 ? "role" : "roles"} match{" "}
//       <span className="text-[#16181D]">“{trimmed}”</span>
//     </>
//   ) : trimmed.length > 0 ? (
//     <>
//       Keep typing — <span className="text-[#16181D]">{MIN_QUERY_LEN}</span>+
//       characters to search
//     </>
//   ) : (
//     <>
//       <span className="font-semibold text-[#16181D]">{total}</span> open{" "}
//       {total === 1 ? "role" : "roles"}
//     </>
//   );

//   return (
//     <div
//       className="min-h-screen bg-[#FBFAF7] text-[#16181D]"
//       style={{ fontFamily: "var(--font-body)" }}
//     >
//       {/* Hero */}
//       <header className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24">
//         <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#0F5E4A]">
//           SFJ Business Solutions · Careers
//         </p>
//         <h1
//           className="mt-3 max-w-2xl text-4xl leading-[1.05] text-[#16181D] sm:text-5xl"
//           style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
//         >
//           Roles open right now.
//         </h1>
//         <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#6F7278]">
//           Search by job title or skill. Rough spelling is fine — we&rsquo;ll
//           still find the match.
//         </p>
//       </header>

//       <SearchBar
//         query={query}
//         setQuery={setQuery}
//         inputRef={inputRef}
//         resultsLabel={resultsLabel}
//       />

//       {/* Results */}
//       <main className="mx-auto max-w-6xl px-5 py-10">
//         {total === 0 ? (
//           <EmptyBox>
//             <p
//               className="text-lg text-[#16181D]"
//               style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
//             >
//               No roles are open right now.
//             </p>
//             <p className="mt-2 text-[14px] text-[#6F7278]">
//               New openings are posted here as soon as they go live. Check back
//               soon.
//             </p>
//           </EmptyBox>
//         ) : searching && results?.length === 0 ? (
//           <EmptyBox>
//             <p
//               className="text-lg text-[#16181D]"
//               style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
//             >
//               Nothing matches “{trimmed}”.
//             </p>
//             <p className="mt-2 text-[14px] text-[#6F7278]">
//               Try a job title like{" "}
//               <span className="text-[#16181D]">“recruiter”</span> or a single
//               skill like <span className="text-[#16181D]">“python”</span>.
//             </p>
//             <button
//               type="button"
//               onClick={() => {
//                 setQuery("");
//                 inputRef.current?.focus();
//               }}
//               className="mt-5 rounded-lg bg-[#0F5E4A] px-4 py-2 text-[14px] font-medium text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
//             >
//               Clear search
//             </button>
//           </EmptyBox>
//         ) : (
//           <>
//             <Pagination
//               page={safePage}
//               pageCount={pageCount}
//               onChange={(p) => {
//                 setPage(p);
//                 if (typeof window !== "undefined")
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//             />
//             <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {pageItems?.map((item) => (
//                 <JobCard key={item.id} r={item} query={effectiveQuery} />
//               ))}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

//page.tsx
// Path: src/app/careers/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  PublicRequirement,
  formatExperience,
  formatSalary,
  REMOTE_LABEL,
  JOB_TYPE_LABEL,
  formatLocation,
} from "./_components/format";
import { buildIndex, searchIndex, skillMatchesQuery } from "@/lib/fuzzySearch";

const MIN_QUERY_LEN = 3;
const DEBOUNCE_MS = 250;
const PAGE_SIZE = 20;

// Point this at your ATS core service (where /api/public/* is mounted).
// Must be NEXT_PUBLIC_* — this fetch runs in the browser.
const API_BASE =
  process.env.NEXT_PUBLIC_ATS_BASE_URL ?? "http://localhost:4000";

// ── Debounce hook ────────────────────────────────────────────────────────────
function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Data fetch (client-side, paginates the public API) ───────────────────────
function useOpenings() {
  const [openings, setOpenings] = useState<PublicRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);

    const all: PublicRequirement[] = [];
    const limit = 50;
    let page = 1;

    try {
      // Walk every page so search has the full set in memory.
      for (let guard = 0; guard < 40; guard++) {
        const res = await fetch(
          `${API_BASE}/core/api/public/requirements?page=${page}&limit=${limit}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const rows: PublicRequirement[] = json?.data ?? [];
        all.push(...rows);

        const pages: number = json?.meta?.pages ?? 1;
        if (page >= pages || rows.length === 0) break;
        page++;
      }
      setOpenings(all);
    } catch (e) {
      console.error("careers: failed to load openings", e);
      setError(true);
      setOpenings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { openings, loading, error, reload: load };
}

// ── Job card ─────────────────────────────────────────────────────────────────
function JobCard({ r, query }: { r: PublicRequirement; query: string }) {
  const experience = formatExperience(r);
  const salary = formatSalary(r);
  // Every skill now, not the first six: the row is clipped to one line
  // visually and the toggle below reveals the rest. De-duplicated because
  // primarySkills and keySkills overlap on some requirements, and a repeat
  // would collide on the React key.
  const skills = useMemo(
    () => Array.from(new Set([...r.primarySkills, ...r.keySkills])),
    [r.primarySkills, r.keySkills],
  );
  const active = query.trim().length >= MIN_QUERY_LEN;

  // Whether the toggle is needed depends on how many chips fit on one line,
  // which changes with the card's width — a phone shows far fewer than a
  // three-column desktop grid. So it is measured rather than guessed from a
  // chip count, and re-measured whenever the column resizes.
  const skillsRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clipped, setClipped] = useState(false);
  const skillsKey = skills.join("|");

  useEffect(() => {
    // Only measurable while collapsed — expanded, scrollHeight equals
    // clientHeight, and the "Show less" control would vanish under the
    // cursor that just opened it.
    if (expanded) return;
    const el = skillsRef.current;
    if (!el) return;
    const measure = () => setClipped(el.scrollHeight - el.clientHeight > 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded, skillsKey]);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-[#E9E7E0] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_12px_40px_-24px_rgba(15,94,74,0.55)] motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
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
        {/* Stretched link. The card used to be one big <a>, which cannot
            contain the toggle below: a button inside an anchor is invalid
            HTML, and the anchor swallows the click before the handler runs.
            The link now wraps only the title and throws an ::after overlay
            across the card, so the whole surface stays clickable while real
            controls can sit above it on their own stacking context. */}
        <Link
          href={`/careers/${encodeURIComponent(r.reqCode)}`}
          className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
        >
          {r.title}
        </Link>
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
        <div className="mt-4">
          {/* leading-5 fixes each chip at 24px (20px line box + 2px padding
              either side), so max-h-6 clips to exactly one row — the second
              row would start at 30px with the 6px gap and never peeks
              through. A guessed pixel height would clip mid-glyph the first
              time the type scale changed. */}
          <div
            ref={skillsRef}
            className={`flex flex-wrap gap-1.5 ${
              expanded ? "" : "max-h-6 overflow-hidden"
            }`}
          >
            {skills.map((skill) => {
              const hit = active && skillMatchesQuery(skill, query);
              return (
                <span
                  key={skill}
                  className={
                    hit
                      ? "rounded-md bg-[#0F5E4A] px-2 py-0.5 text-[12px] font-medium leading-5 text-white"
                      : "rounded-md bg-[#F3F1EB] px-2 py-0.5 text-[12px] leading-5 text-[#4A4D55]"
                  }
                >
                  {skill}
                </span>
              );
            })}
          </div>

          {clipped && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              // z-10 lifts it above the title link's ::after overlay, which
              // otherwise covers the whole card and would take this click.
              className="relative z-10 mt-2 rounded-sm text-[12px] font-medium text-[#0F5E4A] underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {expanded ? "Show less" : `Show all ${skills.length}`}
            </button>
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
    </div>
  );
}

// ── Skeleton card (shown while fetching) ─────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col rounded-2xl border border-[#E9E7E0] bg-white p-6">
      <div className="mb-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-[#EFEDE6]" />
        <div className="h-5 w-20 rounded-full bg-[#EFEDE6]" />
      </div>
      <div className="h-5 w-3/4 rounded bg-[#EFEDE6]" />
      <div className="mt-2 h-3 w-1/2 rounded bg-[#EFEDE6]" />
      <div className="mt-5 flex gap-1.5">
        <div className="h-5 w-14 rounded-md bg-[#F3F1EB]" />
        <div className="h-5 w-16 rounded-md bg-[#F3F1EB]" />
        <div className="h-5 w-12 rounded-md bg-[#F3F1EB]" />
      </div>
      <div className="mt-6 h-4 w-full rounded bg-[#F3F1EB]" />
    </div>
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
      <div className="mx-auto max-w-[90rem] px-5 py-4">
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
  const win = 1;
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || (p >= page - win && p <= page + win)) {
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

// ── Empty states ─────────────────────────────────────────────────────────────
function EmptyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E4E1D8] bg-white/60 px-6 py-20 text-center">
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const { openings, loading, error, reload } = useOpenings();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Two-stage smoothing: debounce the raw input, then defer the heavy work.
  const debouncedQuery = useDebounced(query, DEBOUNCE_MS);
  const deferredQuery = useDeferredValue(debouncedQuery);

  // Only treat >= 3 non-space chars as an active search.
  const effectiveQuery =
    deferredQuery.trim().length >= MIN_QUERY_LEN ? deferredQuery.trim() : "";

  // Built once per dataset — not on every keystroke. Always an array now.
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

  const resultsLabel = loading ? (
    <>Loading roles…</>
  ) : searching ? (
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
      {/* Career.webp — 2:1 photo, close to this section's own ratio so
          object-cover only trims a little off the top/bottom. Height formula
          matches the TaaS hero (taas/page.tsx). Note this photo
          does carry baked-in text: etched glass wording on the left and a
          "We're hiring" board on the right, so the scrim below is heavier on
          the left to keep it behind our own headline. */}
      <section className="relative w-full bg-slate-900 min-h-[32rem] sm:min-h-[36rem] lg:min-h-[max(38rem,min(60vw,calc(100dvh-120px)))] lg:max-h-[56rem] flex flex-col justify-start pt-28 sm:pt-32 lg:pt-40 pb-10 sm:pb-12 px-5 overflow-hidden">
        <Image
          src="/Career.webp"
          alt="SFJ Business Solutions team members collaborating in a meeting room beside a board listing current hiring areas including AI and cloud, cybersecurity, ERP, data analytics and corporate training"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15 sm:bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

        <div className="relative mx-auto max-w-[90rem] w-full">
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#B9E8D4]">
            SFJ Business Solutions · Careers
          </p>
          <h1
            className="mt-3 max-w-2xl text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              textShadow: "0 2px 14px rgba(0,0,0,0.85)",
            }}
          >
            Current Job Openings
          </h1>
        </div>
      </section>

      <SearchBar
        query={query}
        setQuery={setQuery}
        inputRef={inputRef}
        resultsLabel={resultsLabel}
      />

      {/* Results. 90rem rather than the previous 72rem: at 1920 the grid was
          leaving ~380px of empty page either side. The hero headline and the
          sticky search bar above use the same measure, so the three stay
          aligned. */}
      <main className="mx-auto max-w-[90rem] px-5 py-10">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <EmptyBox>
            <p
              className="text-lg text-[#16181D]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              We couldn&rsquo;t load the openings.
            </p>
            <p className="mt-2 text-[14px] text-[#6F7278]">
              The careers service didn&rsquo;t respond. Check your connection
              and try again.
            </p>
            <button
              type="button"
              onClick={reload}
              className="mt-5 rounded-lg bg-[#0F5E4A] px-4 py-2 text-[14px] font-medium text-white outline-none transition-colors hover:bg-[#0B4838] focus-visible:ring-2 focus-visible:ring-[#0F5E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7]"
            >
              Retry
            </button>
          </EmptyBox>
        ) : total === 0 ? (
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
