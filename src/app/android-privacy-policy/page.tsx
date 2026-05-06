import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - CASPA",
  description: "Privacy Policy for CASPA by SFJ Business Solutions",
};

const sections = [
  {
    id: 1,
    title: "Introduction",
    content: (
      <p>
        SFJ Business Solutions built the CASPA mobile application for internal
        company use. This Privacy Policy explains how we collect, use, and
        protect your information. By using CASPA, you agree to this policy.
      </p>
    ),
  },
  {
    id: 2,
    title: "Information We Collect",
    content: (
      <ul>
        <li>
          <strong>Login credentials</strong> — email and password for
          authentication
        </li>
        <li>
          <strong>Employee data</strong> — name, employee ID, email, mobile,
          Aadhaar number from company database
        </li>
        <li>
          <strong>Location data</strong> — may be collected in future versions
          for attendance and field tracking
        </li>
        <li>
          <strong>Camera</strong> — may be used in future versions for profile
          photo and document uploads
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    title: "How We Use Your Information",
    content: (
      <>
        <ul>
          <li>To authenticate and provide secure access to CASPA</li>
          <li>To display your employee profile and company information</li>
          <li>To provide access to company modules and features</li>
          <li>To improve app performance and security</li>
        </ul>
        <p>
          We do <strong>not</strong> sell, trade, or share your data with any
          third parties.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Data Storage and Security",
    content: (
      <ul>
        <li>All data is transmitted over HTTPS (SSL encrypted)</li>
        <li>Credentials are stored using Android encrypted secure storage</li>
        <li>All locally stored data is cleared when you logout</li>
        <li>Passwords are never stored in plain text</li>
      </ul>
    ),
  },
  {
    id: 5,
    title: "Aadhaar Number",
    content: (
      <p>
        Your Aadhaar number is displayed in masked format (XXXX XXXX XXXX) for
        identity verification within the app only. It is sourced from our
        internal HR database and is never shared with any external party.
      </p>
    ),
  },
  {
    id: 6,
    title: "Third Party Services",
    content: (
      <p>
        CASPA does not use any third-party analytics, advertising, or tracking
        services. The app communicates only with SFJ Business Solutions servers.
      </p>
    ),
  },
  {
    id: 7,
    title: "Your Rights",
    content: (
      <ul>
        <li>
          You can logout at any time — this clears all locally stored data
        </li>
        <li>Contact your HR department to update or delete your records</li>
      </ul>
    ),
  },
  {
    id: 8,
    title: "Children's Privacy",
    content: (
      <p>
        CASPA is for SFJ Business Solutions employees only and is not intended
        for children under 13.
      </p>
    ),
  },
  {
    id: 9,
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this policy from time to time. Continued use of CASPA
        after changes means you accept the updated policy.
      </p>
    ),
  },
  {
    id: 10,
    title: "Contact Us",
    content: (
      <p>
        <strong>SFJ Business Solutions</strong>
        <br />
        Website:{" "}
        <a
          href="https://sfjbs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-blue-900"
        >
          sfjbs.com
        </a>
        <br />
        Email:{" "}
        <a
          href="mailto:info@sfjbs.com"
          className="text-blue-700 underline hover:text-blue-900"
        >
          info@sfjbs.com
        </a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-10 px-4 ">
      <div className="max-w-2xl mx-auto pb-16">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-1">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-500 text-sm mb-1">
          CASPA — by SFJ Business Solutions
        </p>
        <p className="text-center text-gray-400 text-xs mb-10">
          Last updated: March 2026
        </p>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.id}>
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                {section.id}. {section.title}
              </h2>
              <div className="text-gray-600 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-600 [&_p]:mb-2 [&_strong]:text-gray-700">
                {section.content}
              </div>
              {index < sections.length - 1 && (
                <hr className="mt-8 border-gray-200" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-12">
          &copy; 2026 SFJ Business Solutions. All rights reserved.
        </p>
      </div>
    </main>
  );
}
