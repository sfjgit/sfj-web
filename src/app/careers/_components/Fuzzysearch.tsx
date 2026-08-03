// File: fuzzySearch.ts
// Path: src/lib/fuzzySearch.ts
//
// Zero-dependency, typo-tolerant search over job openings.
// Weighted: title matches beat primary-skill matches beat key-skill matches.
// "Clumsy typing" is handled with a bounded Levenshtein distance that scales
// with token length, plus prefix / substring shortcuts for partial words.
// Everything runs in-memory on the client, so results are instant.

export interface Searchable {
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
export function buildIndex<T extends Searchable>(items: T[]): Indexed<T>[] {
  return items?.map((item) => ({
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
export function searchIndex<T extends Searchable>(
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
export function skillMatchesQuery(skill: string, query: string): boolean {
  const q = norm(query);
  if (!q) return false;
  const sTokens = tokenize(skill);
  const qTokens = q.split(" ").filter(Boolean);
  return qTokens.some((qt) => sTokens.some((st) => tokenScore(qt, st) >= 0.6));
}
