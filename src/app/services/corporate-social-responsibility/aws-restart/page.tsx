import { Metadata } from "next";
import { Suspense } from "react";
import CSRLandingPage from "../_components/HeroSection";
import AwsRestartHeroSection from "../_components/AwsRestartHeroSection";
import { TabVisibilityProvider } from "../_components/TabVisibilityContext";

// This route now receives the default CSR traffic, not just explicit clicks on
// the tab, so it needs its own metadata rather than inheriting the root
// layout's.
export const metadata: Metadata = {
  title: "AWS re/Start Program | Free 12-Week Cloud Training | SFJBS",
  description:
    "A free, full-time, 12-week cloud computing programme for job seekers, delivered by SFJBS with AWS. No prior technical background required.",
  openGraph: {
    title: "AWS re/Start Program | Free 12-Week Cloud Training | SFJBS",
    description:
      "A free, full-time, 12-week cloud computing training program for job seekers, delivered by SFJBS in official partnership with Amazon Web Services.",
    url: "https://www.sfjbs.com/services/corporate-social-responsibility/aws-restart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS re/Start Program | Free 12-Week Cloud Training | SFJBS",
    description:
      "A free, full-time, 12-week cloud computing training program for job seekers, delivered by SFJBS in official partnership with Amazon Web Services.",
  },
  alternates: {
    canonical:
      "https://www.sfjbs.com/services/corporate-social-responsibility/aws-restart",
  },
};

export default function AwsRestartPage() {
  return (
    <>
      <AwsRestartHeroSection />
      <TabVisibilityProvider>
        <Suspense fallback={null}>
          <CSRLandingPage />
        </Suspense>
      </TabVisibilityProvider>
    </>
  );
}
