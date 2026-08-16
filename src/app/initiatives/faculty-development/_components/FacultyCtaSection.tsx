import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const SYLLABUS_PDF = "/fac/faculty-ai-enablement-programme.pdf";

export default function FacultyCtaSection() {
  return (
    <section className="bg-gray-50 py-16">
      {/* Same 110rem measure and padding as the CategoryChooser section
          directly above, so the card's edges line up with the discipline grid
          instead of sitting in a narrower column of their own. */}
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 px-6 py-10 sm:px-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Registrations are open for the next cohort
          </h2>
          <p className="mt-3 text-gray-300 text-base leading-relaxed max-w-2xl">
            Institutions may nominate a full department or a mixed cohort.
            Individual faculty may register directly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link
              href="/contact?type=b2i"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Register now
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>

            {/* Same-origin file plus the download attribute, so it saves
                rather than opening the browser's PDF viewer. The filename is
                set here because the path is slugged for the asset checks and
                would otherwise be what lands in the user's downloads. */}
            <a
              href={SYLLABUS_PDF}
              download="SFJ Faculty AI Enablement Programme.pdf"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40 text-white font-semibold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download syllabus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
