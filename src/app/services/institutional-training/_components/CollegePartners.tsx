import React from "react";

const COLLEGES = [
  { name: "PESCE Mandya", url: "https://pesce.ac.in/" },
  {
    name: "GPT Holealur",
    url: "https://gpt.karnataka.gov.in/gptholealur/public/en",
  },
  {
    name: "GEC Hassan",
    url: "https://gec.karnataka.gov.in/gechassan/public/en",
  },
  { name: "AVC College", url: "https://avccollege.net/" },
  {
    name: "GPT Koppal",
    url: "https://gpt.karnataka.gov.in/gptkoppal/public/en",
  },
  { name: "JICM", url: "https://jyothyicm.ac.in/" },
  { name: "RRCE", url: "https://www.rrce.org/" },
  { name: "AVCCE", url: "https://www.avccengg.net/" },
  { name: "RLJP", url: "https://www.rljp.in/" },
  { name: "GAC Salem", url: "https://gacsalem7.ac.in/" },
  { name: "SFC Bengaluru", url: "https://www.stfranciscollege.edu.in/" },
  {
    name: "SSWC Salem",
    url: "https://shrisowdesvariwomenscollege.org/",
  },
  { name: "TACW", url: "https://www.tacw.in/" },
  { name: "SKP Bengaluru", url: "https://www.sreis.in/skp" },
  { name: "MCET", url: "https://mcetengg.org/" },
  { name: "CASCW", url: "https://chezhianwomencollege.in/" },
  { name: "NLPTC", url: "https://nlptc.edu.in/" },
  { name: "TKSCAS", url: "https://tkscas.com/" },
  { name: "SCAD Polytechnic", url: "https://www.scadpoly.ac.in/" },
  { name: "GCE Srirangam", url: "https://www.gces.edu.in/" },
];

// Duplicated once so a single lap already fills wide screens, then rendered
// twice below so the capabilityLogoScroll 0 -> -50% travel loops with no
// visible seam — same structure as the other logo/name strips on the site.
const SEQUENCE = [...COLLEGES, ...COLLEGES];

// Lives inside the hero's dark artwork now (mt-auto pins it to the bottom of
// the hero's flex column), so it reads white-on-photo like the TaaS
// capability strip rather than the black-on-white strip this started as.
const CollegePartners = () => {
  return (
    <div className="relative mt-auto w-full max-w-[100rem] mx-auto pb-6 sm:pb-8">
      {/* Label beside the scrolling row rather than stacked above it — same
          layout as the "Our Clients:" strips elsewhere on the site (Clients,
          Taas): flex-col on mobile so the label doesn't fight the row for
          width on a narrow screen, flex-row with the label pinned to a fixed
          width from sm up. */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <span
          className="flex-shrink-0 text-white font-medium text-sm sm:text-base whitespace-nowrap"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}
        >
          Our College Partners
        </span>

        {/* Edge fade: names dissolve in/out at the mask rather than being cut
            off flush at the container's edge. */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {/* capabilityLogoScroll's own direction (no `reverse`): right to
              left, entering on the right and exiting left — same direction
              as every other marquee on the site, and the exact animation
              already confirmed running live elsewhere (TaaS capability
              strip, the B2G logo row). */}
          <div
            className="marquee-pause-hover flex items-center w-max"
            style={{
              animation: "capabilityLogoScroll 46s linear infinite",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {["a", "b"].map((half) => (
              <div
                className="flex items-center"
                key={half}
                aria-hidden={half === "b"}
              >
                {SEQUENCE.map((college, index) => (
                  <a
                    key={`${half}-${index}`}
                    href={college.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={half === "b" ? -1 : 0}
                    className="flex-shrink-0 mx-4 sm:mx-6 whitespace-nowrap text-base sm:text-lg font-bold text-white hover:underline"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
                  >
                    {college.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegePartners;
