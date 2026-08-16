#!/usr/bin/env node
/**
 * Pre-release static checks — the gates whose absence let nine P0s reach a
 * shippable build (RE-01, RE-02, RE-06).
 *
 * Run with `npm run check`. Exits non-zero on any failure, so it can sit in a
 * PR pipeline and block the merge.
 *
 *   1. asset-refs   Every "/…​.png|jpg|svg|webm|pdf|…" literal in src/ resolves
 *                   to a real file under public/. This is what would have
 *                   caught the seven 404ing certification logos and the
 *                   fifteen AI-tool logos pointing at a directory that never
 *                   existed.
 *   2. internal-links  Every `href="/…"` resolves to a real App Router route.
 *                   This is what would have caught /products/caspa,
 *                   /products/lms and /products/talent-os 404ing from the
 *                   footer of all 14 pages.
 *   3. sitemap-coverage  Every public route directory appears in
 *                   PUBLIC_ROUTES, and vice versa.
 *   4. metadata     Every public route declares a title ≤ 60 chars, a
 *                   description 80–155 chars, and a self-referencing
 *                   canonical. No duplicate titles across routes.
 *   5. asset-names  No spaces, ampersands or parentheses in public/ paths
 *                   referenced from source.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, posix } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = join(ROOT, "src");
const APP = join(SRC, "app");
const PUBLIC = join(ROOT, "public");

const failures = [];
const warnings = [];

const fail = (check, message) => failures.push(`[${check}] ${message}`);
const warn = (check, message) => warnings.push(`[${check}] ${message}`);

// ── helpers ─────────────────────────────────────────────────────────────────

function walk(dir, filter = () => true, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, filter, acc);
    } else if (filter(full)) {
      acc.push(full);
    }
  }
  return acc;
}

const allSourceFiles = walk(SRC, (f) => /\.(tsx|ts)$/.test(f));

/**
 * Only check modules that actually ship.
 *
 * `src/` carries a fair amount of superseded work — a 1,254-line Footer.tsx
 * that CTAWithFooter replaced, several unused hero variants — and those files
 * reference assets that were deleted with them. Flagging those would drown the
 * real failures in noise, so the graph is walked from the App Router entry
 * points and anything unreachable is ignored. A broken reference that a
 * visitor can reach is a bug; one in a file no route imports is not.
 */
function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = join(fromFile, "..", spec);
  else return null; // package import

  for (const candidate of [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    join(base, "index.tsx"),
    join(base, "index.ts"),
  ]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const IMPORT_RE = /(?:import|export)[\s\S]*?from\s*["']([^"']+)["']|import\(["']([^"']+)["']\)/g;

function collectReachable() {
  const entries = allSourceFiles.filter((f) =>
    /[/\\]app[/\\].*[/\\]?(page|layout|template|error|not-found|route|sitemap|robots)\.(tsx|ts)$/.test(
      f,
    ) || /[/\\]middleware\.ts$/.test(f),
  );

  const seen = new Set();
  const queue = [...entries];

  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);

    const code = readFileSync(file, "utf8");
    for (const match of code.matchAll(IMPORT_RE)) {
      const spec = match[1] ?? match[2];
      if (!spec) continue;
      const resolved = resolveImport(spec, file);
      if (resolved && !seen.has(resolved)) queue.push(resolved);
    }
  }

  return seen;
}

const reachable = collectReachable();
const sourceFiles = allSourceFiles.filter((f) => reachable.has(f));
const orphanCount = allSourceFiles.length - sourceFiles.length;

/** Strip // line comments and /* block comments *​/ so commented-out code
 *  (of which there is a lot here) does not produce phantom failures. */
function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
}

// ── 1. asset references ─────────────────────────────────────────────────────

const ASSET_RE =
  /["'`](\/[^"'`\n?#]*\.(?:png|jpe?g|svg|webp|avif|gif|ico|webm|mp4|pdf|woff2?))["'`]/g;

const referencedAssets = new Map(); // path → Set(files)

for (const file of sourceFiles) {
  const code = stripComments(readFileSync(file, "utf8"));
  for (const [, assetPath] of code.matchAll(ASSET_RE)) {
    if (assetPath.startsWith("/_next/")) continue;
    if (!referencedAssets.has(assetPath)) referencedAssets.set(assetPath, new Set());
    referencedAssets.get(assetPath).add(relative(ROOT, file));
  }
}

/**
 * Assets built by interpolation — `["a.svg", "b.svg"].map(f => `/dir/${f}`)`.
 *
 * The literal scan above cannot see these, and they are not a rare shape: all
 * 89 technology logos on the IT staffing page are declared this way. A rename
 * that updates the directory but not the filenames (or vice versa) breaks
 * every one of them silently, which is exactly what a slug migration does if
 * nothing checks it.
 */
const MAPPED_ASSET_RE =
  /\[([^\]]*?)\]\s*\.map\(\s*\((?:file|logo|name)\)\s*=>\s*\n?\s*`([^`]*)\$\{(?:file|logo|name)\}`/g;

for (const file of sourceFiles) {
  const code = stripComments(readFileSync(file, "utf8"));
  for (const [, listLiteral, dirPrefix] of code.matchAll(MAPPED_ASSET_RE)) {
    if (!dirPrefix.startsWith("/")) continue;
    for (const [, name] of listLiteral.matchAll(/"([^"]+)"/g)) {
      const full = dirPrefix + name;
      if (!referencedAssets.has(full)) referencedAssets.set(full, new Set());
      referencedAssets.get(full).add(relative(ROOT, file));
    }
  }
}

/**
 * Case-sensitive existence check.
 *
 * `existsSync` asks the filesystem, and NTFS/APFS answer case-insensitively:
 * "/services/Corporate IT Training programs2.webp" resolved happily on a
 * Windows dev box while the file on disk is "…Programs2.webp". The Linux
 * build host disagreed, so this check passed locally and failed the Vercel
 * build on the same commit — the worst kind of failure, because the image was
 * also silently 404ing in production. Walking the path segment by segment and
 * requiring an exact name match makes the result identical on every platform.
 */
const dirEntries = new Map();
function readDirCached(dir) {
  if (!dirEntries.has(dir)) {
    try {
      dirEntries.set(dir, new Set(readdirSync(dir)));
    } catch {
      dirEntries.set(dir, new Set());
    }
  }
  return dirEntries.get(dir);
}

function existsExact(root, relPath) {
  const segments = relPath.split("/").filter(Boolean);
  let current = root;
  for (let i = 0; i < segments.length; i++) {
    if (!readDirCached(current).has(segments[i])) return false;
    current = join(current, segments[i]);
    const isLast = i === segments.length - 1;
    if (!isLast && !statSync(current).isDirectory()) return false;
  }
  return true;
}

for (const [assetPath, files] of referencedAssets) {
  const decoded = decodeURIComponent(assetPath);
  if (!existsExact(PUBLIC, decoded)) {
    fail(
      "asset-refs",
      `${assetPath} does not exist in public/ — referenced from ${[...files].join(", ")}`,
    );
  }

  // CR-03: spaces, ampersands and parentheses in asset paths cause
  // encoding-dependent failures and broken CDN cache keys.
  if (/[ &()]/.test(decoded)) {
    warn(
      "asset-names",
      `${assetPath} contains a space, ampersand or parenthesis — rename to kebab-case ASCII (referenced from ${[...files].join(", ")})`,
    );
  }
}

// ── 2. route inventory ──────────────────────────────────────────────────────

/** Every route the App Router will actually serve, as a URL path. */
function collectRoutes(dir, segments = [], acc = new Set()) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    // Route groups `(x)` and private folders `_x` do not create URL segments.
    if (entry.startsWith("_")) continue;
    const nextSegments = entry.startsWith("(") ? segments : [...segments, entry];
    if (existsSync(join(full, "page.tsx")) || existsSync(join(full, "page.ts"))) {
      acc.add("/" + posix.join(...nextSegments));
    }
    collectRoutes(full, nextSegments, acc);
  }
  return acc;
}

const routes = collectRoutes(APP);
if (existsSync(join(APP, "page.tsx"))) routes.add("/");

/** Dynamic routes (`/blog/[slug]`) match anything under their parent. */
const dynamicRoutePrefixes = [...routes]
  .filter((r) => r.includes("["))
  .map((r) => r.slice(0, r.indexOf("[")).replace(/\/$/, ""));

const staticRoutes = new Set([...routes].filter((r) => !r.includes("[")));

// ── 3. internal links ───────────────────────────────────────────────────────

const HREF_RE = /href=["'](\/[^"'\s>]*)["']/g;
// Link data held in arrays — `{ name: "CASPA", path: "/products/caspa" }` in
// the footer, `{ path: "/careers", label: "Careers" }` in the nav — is how the
// three product 404s reached every page, so it has to be checked too.
// `hasChildren: true` entries are dropdown parents whose `path` is only a key
// and an active-state prefix, never an href, so they are skipped.
const PATH_PROP_RE =
  /\b(?:path|href)\s*:\s*["'](\/[^"'\s]*)["'](?![\s\S]{0,200}?hasChildren:\s*true)/g;

const linkedPaths = new Map();

for (const file of sourceFiles) {
  const code = stripComments(readFileSync(file, "utf8"));
  for (const re of [HREF_RE, PATH_PROP_RE]) {
    for (const [, raw] of code.matchAll(re)) {
      const path = raw.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
      if (path.startsWith("/api/") || path.startsWith("/_next/")) continue;
      // Asset links are covered by check 1.
      if (/\.[a-z0-9]{2,5}$/i.test(path)) continue;
      if (!linkedPaths.has(path)) linkedPaths.set(path, new Set());
      linkedPaths.get(path).add(relative(ROOT, file));
    }
  }
}

for (const [path, files] of linkedPaths) {
  if (staticRoutes.has(path)) continue;
  if (dynamicRoutePrefixes.some((prefix) => prefix && path.startsWith(prefix)))
    continue;
  fail(
    "internal-links",
    `${path} is linked but no route serves it — from ${[...files].join(", ")}`,
  );
}

// ── 4. sitemap coverage ─────────────────────────────────────────────────────

const siteConfig = readFileSync(join(SRC, "config", "site.ts"), "utf8");
const manifestBlock = siteConfig.slice(
  siteConfig.indexOf("export const PUBLIC_ROUTES"),
);
const declaredRoutes = new Set(
  [...manifestBlock.matchAll(/"(\/[^"]*)"/g)].map((m) => m[1]),
);

/** Routes that exist but are deliberately not for search engines. */
const NON_INDEXABLE = [
  "/signin",
  "/signup",
  "/new-sso",
  "/lms",
  "/jobs",
  "/nm",
  "/test",
  "/payment",
  "/course",
  "/courses",
  "/android-privacy-policy",
];

for (const route of staticRoutes) {
  if (NON_INDEXABLE.some((p) => route === p || route.startsWith(p + "/")))
    continue;
  if (!declaredRoutes.has(route)) {
    fail(
      "sitemap-coverage",
      `${route} exists but is missing from PUBLIC_ROUTES in src/config/site.ts — it will not be in sitemap.xml`,
    );
  }
}

for (const route of declaredRoutes) {
  if (!staticRoutes.has(route)) {
    fail(
      "sitemap-coverage",
      `${route} is declared in PUBLIC_ROUTES but no page.tsx serves it — sitemap.xml would advertise a 404`,
    );
  }
}

// ── 5. metadata assertions ──────────────────────────────────────────────────

const TITLE_MAX = 60;
const DESC_MIN = 80;
const DESC_MAX = 155;

const titlesSeen = new Map();

/** Read a string metadata field out of a page or its co-located layout. */
function readMetaSources(route) {
  const dir =
    route === "/" ? APP : join(APP, ...route.split("/").filter(Boolean));
  return ["page.tsx", "layout.tsx"]
    .map((f) => join(dir, f))
    .filter(existsSync)
    .map((f) => ({ file: relative(ROOT, f), code: readFileSync(f, "utf8") }));
}

function extractTopLevelString(code, key) {
  // Matches `  key: "value",` and `  key:\n    "value",` at metadata depth.
  const direct = code.match(
    new RegExp(`^ {2}${key}:[ \\t]*(?:\\r?\\n[ \\t]+)?"((?:[^"\\\\]|\\\\.)*)"`, "m"),
  )?.[1];
  if (direct !== undefined) return direct;

  // Also resolve one level of indirection — `title: HOME_TITLE` where
  // `const HOME_TITLE = "…"` sits above the metadata export. Template
  // literals are skipped rather than guessed at.
  const identifier = code.match(
    new RegExp(`^ {2}${key}:[ \\t]*([A-Z_][A-Z0-9_]*),`, "m"),
  )?.[1];
  if (!identifier) return undefined;

  return code.match(
    new RegExp(`^const ${identifier} =[ \\t]*(?:\\r?\\n[ \\t]+)?"((?:[^"\\\\]|\\\\.)*)"`, "m"),
  )?.[1];
}

for (const route of declaredRoutes) {
  const sources = readMetaSources(route);
  if (sources.length === 0) continue;

  const withMetadata = sources.find((s) =>
    s.code.includes("export const metadata"),
  );
  if (!withMetadata) {
    fail("metadata", `${route} declares no metadata export`);
    continue;
  }

  const { code, file } = withMetadata;

  // Canonical must be self-referencing. Accept either the literal absolute URL
  // or the canonical("/path") helper.
  const canonicalLiteral = code.match(/canonical:\s*"([^"]+)"/)?.[1];
  const canonicalHelper = code.match(/canonical:\s*canonical\("([^"]*)"\)/)?.[1];
  const expected = route === "/" ? "" : route;

  if (canonicalHelper !== undefined) {
    if (canonicalHelper.replace(/\/$/, "") !== expected) {
      fail(
        "metadata",
        `${route} canonicalises to "${canonicalHelper}" (${file}) — must be self-referencing`,
      );
    }
  } else if (canonicalLiteral) {
    const normalized = canonicalLiteral
      .replace("https://www.sfjbs.com", "")
      .replace(/\/$/, "");
    if (normalized !== expected) {
      fail(
        "metadata",
        `${route} canonicalises to "${canonicalLiteral}" (${file}) — must be self-referencing`,
      );
    }
  } else {
    fail("metadata", `${route} has no canonical (${file})`);
  }

  const title = extractTopLevelString(code, "title");
  if (!title) {
    fail("metadata", `${route} has no title (${file})`);
  } else {
    if (title.length > TITLE_MAX) {
      fail(
        "metadata",
        `${route} title is ${title.length} chars, over the ${TITLE_MAX} budget: "${title}"`,
      );
    }
    if (titlesSeen.has(title)) {
      fail(
        "metadata",
        `${route} shares its title with ${titlesSeen.get(title)}: "${title}"`,
      );
    }
    titlesSeen.set(title, route);
  }

  const description = extractTopLevelString(code, "description");
  if (!description) {
    fail("metadata", `${route} has no description (${file})`);
  } else if (description.length > DESC_MAX || description.length < DESC_MIN) {
    fail(
      "metadata",
      `${route} description is ${description.length} chars, outside ${DESC_MIN}–${DESC_MAX}`,
    );
  }

  if (/^ {2}keywords:/m.test(code)) {
    fail("metadata", `${route} still ships a meta keywords tag (${file})`);
  }
}

// ── 6. claims consistency ───────────────────────────────────────────────────

/**
 * TR-01 / RE-06. One page stated the company's age three different ways — "15
 * years" in the hero, "For 14+ years" in the section under it, "over 14 years"
 * in the JSON-LD — and the client count appeared as 300,000+, 350+ and 500+.
 * A procurement team reading that sees an unverified vendor.
 *
 * config/site.ts is the single source of truth; this fails the build if any
 * *other* year count reappears in shipped source.
 */
const declaredYears = Number(
  siteConfig.match(/yearsOfExperience:\s*(\d+)/)?.[1] ?? 0,
);

const YEARS_CLAIM_RE = /\b(?:over\s+|For\s+)?(\d{1,2})\+?\s+years\b/gi;

for (const file of sourceFiles) {
  if (file.endsWith(join("config", "site.ts"))) continue;
  // CRLF normalised first: the proximity window below counts characters, and
  // with core.autocrlf=true a Windows checkout carries one extra byte per
  // line. That shifted the 60-char window just far enough to drop the trigger
  // word, so this check disagreed with the LF checkout on the build host.
  const code = stripComments(
    readFileSync(file, "utf8").replace(/\r\n/g, "\n"),
  );
  for (const match of code.matchAll(YEARS_CLAIM_RE)) {
    const claimed = Number(match[1]);
    // Only company-age claims matter; programme durations ("12 weeks",
    // "2 years of experience required") are filtered by proximity to a
    // company-ish word.
    const context = code.slice(
      Math.max(0, match.index - 60),
      match.index + 60,
    );
    if (
      !/SFJ|workforce|partner|expertise|transformation|market|industry/i.test(
        context,
      )
    )
      continue;

    if (claimed !== declaredYears) {
      fail(
        "claims",
        `"${match[0].trim()}" in ${relative(ROOT, file)} contradicts METRICS.yearsOfExperience = ${declaredYears} (src/config/site.ts)`,
      );
    }
  }
}

// ── report ──────────────────────────────────────────────────────────────────

for (const w of warnings) console.warn("WARN  " + w);
for (const f of failures) console.error("FAIL  " + f);

console.log(
  `\n${staticRoutes.size} routes · ${sourceFiles.length} reachable modules ` +
    `(${orphanCount} unreferenced, skipped) · ${referencedAssets.size} asset refs · ` +
    `${failures.length} failure(s) · ${warnings.length} warning(s)`,
);

process.exit(failures.length > 0 ? 1 : 0);
