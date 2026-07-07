/* eslint-disable react/no-unescaped-entities */
// File: PrivacyPolicy.tsx
// Path: src/app/privacy-policy/page.tsx

import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-[#E8E9EF] font-sans">
      {/* Header */}
      <header className="border-b border-[#1E2130] px-6 py-5 flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#4F6EF7] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L2 4V8C2 11.31 4.55 14.41 8 15C11.45 14.41 14 11.31 14 8V4L8 1Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-[#E8E9EF]">
            TalentOS
          </span>
        </div>
        <span className="text-[#3A3F55] text-sm">
          / Resume Capture Extension
        </span>
      </header>

      {/* Page content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Eyebrow + Title */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4F6EF7] mb-4">
          Privacy Policy
        </p>
        <h1 className="text-[2rem] font-bold leading-tight text-white mb-3 tracking-tight">
          TalentOS Resume Capture
        </h1>
        <p className="text-[#7B82A0] text-sm mb-10">
          Chrome Extension &nbsp;·&nbsp; Internal Tool &nbsp;·&nbsp; Last
          updated: June 15, 2026
        </p>

        <hr className="border-[#1E2130] mb-10" />

        {/* Intro------ */}
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            The{" "}
            <strong className="text-[#E8E9EF]">TalentOS Resume Capture</strong>{" "}
            Chrome extension is an internal tool developed and operated
            exclusively by{" "}
            <strong className="text-[#E8E9EF]">
              SFJ Business Solutions (SFJBS)
            </strong>{" "}
            for use by authorised recruiters and employees. It is not
            distributed publicly and is not available on the Chrome Web Store
            for general audiences.
          </p>
          <p className="text-[#A9AEBE] leading-relaxed mt-4">
            This policy explains what data the extension collects, why it
            collects it, how it is handled, and your rights as a user.
          </p>
        </Section>

        <SectionTitle>1. Who This Extension Is For</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            This extension is intended solely for SFJBS employees and authorised
            recruiters who access the TalentOS Applicant Tracking System (ATS).
            Access requires a valid TalentOS account. Unauthorised use is not
            permitted.
          </p>
        </Section>

        <SectionTitle>2. What Data Is Collected</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed mb-4">
            The extension collects only the minimum data necessary to perform
            its core function: capturing resume files from Naukri / Naukri
            ResDex and uploading them to TalentOS.
          </p>

          <div className="space-y-4">
            <DataItem
              label="Resume files"
              detail="PDF/DOC resume files downloaded or viewed by the recruiter on naukri.com or resdex.naukri.com are intercepted via XHR monitoring and forwarded to TalentOS as a base64-encoded upload."
            />
            <DataItem
              label="Authentication token"
              detail="Your TalentOS access token is synced from the TalentOS web application via a cookie watcher and stored in chrome.storage.local. This token is used to authenticate all API calls on your behalf."
            />
            <DataItem
              label="Recruiter identity"
              detail="Your name and email address are synced from TalentOS at login and stored locally in the extension to display in the popup dashboard."
            />
            <DataItem
              label="Active requirement context"
              detail="When a recruiter activates a job requirement in TalentOS, the requirement ID, code, title, and assignment ID are stored locally so the extension knows which role a captured resume belongs to."
            />
            <DataItem
              label="Naukri credentials (optional)"
              detail="If the Naukri auto-login feature is enabled for your account, the extension fetches your stored Naukri email and password from the TalentOS API to auto-fill the Naukri login form. These credentials are never stored in the extension itself — they are fetched on demand and used only to fill the login form."
            />
            <DataItem
              label="Capture counters"
              detail="A local count of resumes captured in the current session is maintained in chrome.storage.local for display in the popup. This counter is cleared on logout."
            />
          </div>
        </Section>

        <SectionTitle>3. What Data Is NOT Collected</SectionTitle>
        <Section>
          <ul className="space-y-2 text-[#A9AEBE]">
            {[
              "The extension does not collect browsing history.",
              "It does not read or transmit page content outside of resume file interception on naukri.com and resdex.naukri.com.",
              "It does not track keystrokes, form inputs, or any candidate personal data beyond what is contained in the resume file itself.",
              "It does not collect analytics, usage metrics, or crash reports to any third-party service.",
              "It does not access your microphone, camera, clipboard, or location.",
            ].map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-[#1A2035] border border-[#4F6EF7] flex items-center justify-center">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#4F6EF7]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <SectionTitle>4. How Data Is Used</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            All data collected is used exclusively to operate the resume capture
            workflow within TalentOS:
          </p>
          <ul className="mt-4 space-y-2 text-[#A9AEBE]">
            {[
              "Resume files are uploaded to the TalentOS Candidate Service API for parsing, deduplication, and storage.",
              "Authentication tokens are used to authorise API requests to TalentOS backend services (hosted on Google Cloud Run).",
              "Requirement context ensures captured resumes are linked to the correct job opening and recruiter assignment.",
            ].map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 text-[#4F6EF7] mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[#A9AEBE] leading-relaxed mt-4">
            Data is never sold, rented, shared with third parties, or used for
            advertising.
          </p>
        </Section>

        <SectionTitle>5. Data Storage & Retention</SectionTitle>
        <Section>
          <div className="space-y-3 text-[#A9AEBE] leading-relaxed">
            <p>
              <strong className="text-[#E8E9EF]">
                Local extension storage (chrome.storage.local):
              </strong>{" "}
              Session data (token, recruiter identity, active requirement,
              capture counters) is stored locally on your device. It is cleared
              when you log out of TalentOS or when the extension session is
              reset.
            </p>
            <p>
              <strong className="text-[#E8E9EF]">TalentOS backend:</strong>{" "}
              Uploaded resumes and candidate records are stored in
              SFJBS-controlled PostgreSQL databases and Google Cloud Storage
              (S3-compatible). Retention follows SFJBS internal data retention
              policies.
            </p>
            <p>
              <strong className="text-[#E8E9EF]">No remote logging:</strong> The
              extension does not send logs, errors, or telemetry to any external
              service. Console output is limited to your local browser DevTools.
            </p>
          </div>
        </Section>

        <SectionTitle>6. Permissions Used</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed mb-4">
            The following Chrome permissions are declared in the extension
            manifest, each with a specific justification:
          </p>
          <div className="space-y-3">
            {[
              {
                perm: "storage",
                reason:
                  "Stores auth token, recruiter identity, and active requirement context locally on your device.",
              },
              {
                perm: "cookies",
                reason:
                  "Watches for changes to the TalentOS accessToken cookie to keep the extension session in sync when you log in or refresh your token.",
              },
              {
                perm: "activeTab",
                reason:
                  "Allows the popup to interact with the currently active tab when a recruiter activates a requirement.",
              },
              {
                perm: "scripting",
                reason:
                  "Enables injection of the content scripts on Naukri pages for XHR interception.",
              },
              {
                perm: "tabs",
                reason:
                  "Used to open the TalentOS web application in a new tab when the recruiter clicks the login button in the popup.",
              },
              {
                perm: "notifications",
                reason:
                  "Shows a browser notification when a resume is successfully captured or when an error occurs.",
              },
            ].map(({ perm, reason }) => (
              <div
                key={perm}
                className="flex gap-4 rounded-lg bg-[#13161F] border border-[#1E2130] px-4 py-3"
              >
                <code className="text-[#4F6EF7] font-mono text-sm shrink-0 mt-0.5 w-24">
                  {perm}
                </code>
                <p className="text-[#A9AEBE] text-sm leading-relaxed">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <SectionTitle>7. Host Permissions</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            The extension is granted access to the following domains only:
          </p>
          <ul className="mt-4 space-y-1 text-sm font-mono text-[#7B82A0]">
            {[
              "*.naukri.com / resdex.naukri.com — for resume XHR interception and Naukri auto-login",
              "TalentOS frontend domains (Vercel) — to receive login/logout/requirement events",
              "TalentOS API gateway (Google Cloud Run) — to upload resumes and fetch credentials",
              "localhost — for internal development and testing only",
            ].map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-[#2E3450]">▸</span>
                {h}
              </li>
            ))}
          </ul>
          <p className="text-[#A9AEBE] leading-relaxed mt-4">
            The extension does not operate on any other websites or domains.
          </p>
        </Section>

        <SectionTitle>8. Security</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            All communication between the extension and the TalentOS backend is
            performed over HTTPS. Authentication uses short-lived JWT access
            tokens. The extension does not persist any passwords. Naukri
            credentials, if used, are fetched ephemerally from the TalentOS API
            and never written to extension storage.
          </p>
          <p className="text-[#A9AEBE] leading-relaxed mt-4">
            If you believe there is a security issue with this extension, please
            contact the TalentOS engineering team at{" "}
            <a
              href="mailto:growth@sfjbs.com"
              className="text-[#4F6EF7] hover:underline"
            >
              growth@sfjbs.com
            </a>
            .
          </p>
        </Section>

        <SectionTitle>9. Changes to This Policy</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            SFJBS may update this privacy policy as the extension evolves. Since
            this is an internal tool, updates will be communicated to authorised
            users via internal channels. The "last updated" date at the top of
            this page reflects the most recent revision.
          </p>
        </Section>

        <SectionTitle>10. Contact</SectionTitle>
        <Section>
          <p className="text-[#A9AEBE] leading-relaxed">
            For questions about this privacy policy, data handling, or the
            TalentOS Resume Capture extension:
          </p>
          <div className="mt-5 rounded-xl bg-[#13161F] border border-[#1E2130] p-5">
            <p className="text-white font-semibold text-sm">
              SFJ Business Solutions
            </p>
            <p className="text-[#7B82A0] text-sm mt-1">
              Bengaluru, Karnataka, India
            </p>
            <a
              href="mailto:growth@sfjbs.com"
              className="mt-3 inline-flex items-center gap-2 text-[#4F6EF7] text-sm font-medium hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1"
                  y="3"
                  width="12"
                  height="8"
                  rx="1.5"
                  stroke="#4F6EF7"
                  strokeWidth="1.2"
                />
                <path
                  d="M1 4.5L7 8.5L13 4.5"
                  stroke="#4F6EF7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              growth@sfjbs.com
            </a>
          </div>
        </Section>

        <hr className="border-[#1E2130] mt-12 mb-8" />
        <p className="text-[#3A3F55] text-xs text-center">
          © {new Date().getFullYear()} SFJ Business Solutions. Internal use
          only.
        </p>
      </div>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-semibold text-white mt-10 mb-3 tracking-tight">
      {children}
    </h2>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

function DataItem({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-lg bg-[#13161F] border border-[#1E2130] px-4 py-3.5">
      <p className="text-[#E8E9EF] text-sm font-medium mb-1">{label}</p>
      <p className="text-[#7B82A0] text-sm leading-relaxed">{detail}</p>
    </div>
  );
}
