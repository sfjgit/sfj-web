import type { Metadata } from "next";
import { canonical } from "@/config/site";

// /careers renders a client component, so its metadata lives here.
//
// Before this file existed the page inherited the site-wide fallback title and
// description verbatim — the same 82-char string as /privacy-policy and
// /terms-and-conditions — and canonicalised to the homepage, which told Google
// to drop it from the index entirely. Job seekers could not find it (P0-03,
// OP-02).
export const metadata: Metadata = {
  title: "Careers — IT Training & Talent Jobs in Bengaluru",
  description:
    "Open roles at SFJ Business Solutions in Bengaluru — trainers, engineers, recruiters and delivery teams. See current openings and apply directly.",
  alternates: { canonical: canonical("/careers") },
  openGraph: {
    type: "website",
    url: canonical("/careers"),
    title: "Careers — IT Training & Talent Jobs in Bengaluru | SFJBS",
    description:
      "Open roles at SFJ Business Solutions in Bengaluru — trainers, engineers, recruiters and delivery teams. See current openings and apply directly.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
