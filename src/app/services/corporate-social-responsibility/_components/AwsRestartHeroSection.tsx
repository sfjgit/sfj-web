import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Same full-bleed-photo + dark scrim + clamp-sized heading pattern as
// CSRHeroSection.tsx and the other rebuilt service hero sections — same
// background photo as the main CSR hero too, so the two pages read as one
// program rather than two different visual treatments.
const AwsRestartHeroSection = () => (
  <section className="relative w-full min-h-[28rem] sm:min-h-[34rem] lg:min-h-[88dvh] flex flex-col justify-center bg-slate-900">
    <Image
      src="/CSR heo.png"
      alt="Students working together in a computer lab as part of SFJ Business Solutions' AWS re/Start program"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/30" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="max-w-2xl space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <span className="text-xs font-semibold tracking-wide uppercase">
            For CSR
          </span>
        </div>

        <h1
          className="font-bold text-white leading-tight"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}
        >
          CSR-led skilling that transforms effort into employability.
        </h1>

        <p
          className="text-white leading-normal sm:leading-relaxed"
          style={{ fontSize: "clamp(0.8125rem, 0.95vw, 1.05rem)" }}
        >
          Empowering underserved students with industry-ready skills,
          confidence and career pathways.
        </p>

        <div className="pt-2">
          <Link
            href="/contact?type=csr"
            className="inline-flex items-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Partner With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default AwsRestartHeroSection;
