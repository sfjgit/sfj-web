import Image from "next/image";
import StatsCounter from "./StatsCounter";

// Partner program logos for the scrolling strip beneath the hero. Kept in
// their original brand colours rather than the monochrome treatment used on
// the client-logo strips elsewhere — these identify specific government
// programs, and greying them out would undercut the point of showing them.
const PARTNER_LOGOS = [
  { src: "/B2G/B2g/10001.svg", alt: "Future Skills Prime" },
  { src: "/B2G/B2g/KSDC.svg", alt: "Kaushalya Karnataka (KSDC)" },
  { src: "/B2G/B2g/Naan Mudhalvan.svg", alt: "Naan Mudhalvan" },
  { src: "/B2G/B2g/NSDC.svg", alt: "NSDC" },
  { src: "/B2G/B2g/Skill India.svg", alt: "Skill India" },
];
// Repeated once so a single lap already fills wide screens, then the row is
// rendered twice more below so the -50% scroll loops with no visible seam —
// same structure as the home page's Certified Learning Partners strip.
const LOGO_SEQUENCE = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

// Was a carousel of five slides: this hero plus four partnership cards
// (Karnataka Skill Development Corporation, Naan Mudhalvan, Future Skills,
// NSDC). Those four were removed, and with a single slide left the carousel,
// its arrows and the slide data had nothing to do — so the hero is rendered
// directly instead of being wrapped in one.
//
// The <h1> is the page's only top-level heading, so it stays visible here for
// search engines and assistive tech.
const GovernmentHero = () => (
  <section className="w-full">
    <div className="relative w-full bg-slate-900 lg:bg-transparent">
      {/* Edge to edge, no side margins. From lg the height is pinned so the
          frame still clears the fold, and object-top puts the resulting crop
          on the empty foreground table — never on the hologram.
          Below lg it keeps its natural 2:1 ratio instead: a full-width cover
          crop on a narrow screen would slice off the right of the image,
          which is exactly where the map is. */}
      <div className="relative">
        <Image
          src="/B2G/B2G.webp"
          alt="Government leaders around a table with a holographic map of India"
          width={1774}
          height={887}
          priority
          sizes="100vw"
          className="w-full h-auto lg:h-[88dvh] lg:object-cover lg:object-top"
        />

        {/* Linear gradient scrim, left to right: 90% black at the left edge,
            76% at the 32% mark, fully clear by 55%. Scoped to the image
            wrapper so it never tints the copy panel that sits below the
            artwork on mobile. pointer-events-none so it cannot intercept
            clicks. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.76) 32%, rgba(0,0,0,0) 55%)",
          }}
        />
      </div>

      {/* From lg the copy overlays the darkened left of the artwork. Below lg
          the image is too short to hold text, so it drops beneath instead.
          `relative` keeps it painting above the gradient, which would
          otherwise cover it as the later-positioned element. */}
      <div className="relative px-6 py-6 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-0 lg:py-0">
        {/* Wider container at lg pulls the copy further left: the block is
            centred, so raising the cap from 80rem to 90rem moves its left
            edge outward rather than changing its width. */}
        <div className="w-full max-w-7xl lg:max-w-[90rem] mx-auto lg:px-12">
          {/* Nudged up off the vertical centre line, and 10% of its own width
              further left. Both axes on one element — a second transform would
              overwrite the first rather than combine with it. */}
          <div className="max-w-md lg:max-w-lg space-y-3 sm:space-y-4 text-left lg:-translate-x-[30%] lg:-translate-y-8">
            {/* Type is 10% up on the previous step: every value in both clamps
                scaled by 1.1, so the floor, the fluid rate and the ceiling all
                grow together and the scaling curve is unchanged. */}
            <h1
              className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(1.375rem, 2.2vw, 2.475rem)" }}
            >
              Empowering Government Skill Development &amp; Public Sector
              Missions
            </h1>
            {/* Left-aligned with a ragged right edge. Dropped the justify and
                the hyphenation that supported it — hyphens-auto would still
                break words mid-line here, which reads as a typo without the
                justified edge to explain it. */}
            <p
              className="text-gray-100 leading-relaxed"
              style={{ fontSize: "clamp(0.894rem, 0.935vw, 1.1rem)" }}
            >
              Partnering with public sector entities and government to execute
              large-scale workforce transformation. We deliver outcome-driven,
              industry-aligned skilling initiatives to build future-ready
              public institutions and drive national economic growth.
            </p>

            {/* Stacked directly under the paragraph on mobile — no room
                elsewhere on the short natural-ratio image. */}
            <div className="lg:hidden pt-2">
              <StatsCounter />
            </div>
          </div>
        </div>

        {/* From lg, pinned to the bottom-left corner of the artwork instead of
            the vertically-centred/translated heading block: the reference
            shows the stats anchored to the image's bottom edge, independent
            of wherever the heading happens to sit. inset-x-0 spans the full
            fill layer so the inner wrapper can re-apply the exact same
            max-w/px/translate the heading uses, keeping both left edges
            aligned without duplicating the offset by hand. */}
        <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:bottom-10 xl:bottom-14">
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto lg:px-12">
            {/* Fixed length, not -30% like the heading: percentage translate
                is relative to the ELEMENT'S OWN width, and this row (four
                stats plus labels) is far wider than the heading's max-w-lg
                box. -30% of the stats row's own ~700px width overshot the
                heading's actual -153.6px shift by nearly 2x, pushing "5+" —
                the leftmost item — off the left edge of the viewport
                entirely. 9.6rem is that same 153.6px, as a value that no
                longer depends on this row's own width. */}
            <div className="lg:-translate-x-[9.6rem]">
              <StatsCounter />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* White strip in the corner below the artwork, built exactly like the
        home page's "Trusted by Our Global Partners" strip: label pinned left,
        logos monochrome, edges dissolving into fade rather than a hard cut,
        continuous right-to-left scroll that pauses on hover. */}
    <div className="bg-white py-3 sm:py-4">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
        <div className="flex-shrink-0">
          <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
            Our Partners:
          </h2>
        </div>

        {/* Edge fade: logos dissolve in/out at the mask rather than being cut
            off flush at the container's edge. */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            className="marquee-pause-hover flex items-center w-max"
            style={{
              animation: "capabilityLogoScroll 32s linear infinite",
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
                {LOGO_SEQUENCE.map((logo, index) => (
                  <div
                    key={`${half}-${index}`}
                    className="flex items-center justify-center h-10 sm:h-11 lg:h-12 w-24 mx-6 flex-shrink-0"
                  >
                    <Image
                      src={logo.src}
                      alt={half === "b" ? "" : logo.alt}
                      width={96}
                      height={36}
                      className="h-full w-auto max-w-full object-contain"
                      // Monochrome, lightened a step off the ~#3a3a3b the
                      // other logo strips use, to ~#595959.
                      style={{ filter: "grayscale(1) brightness(0.35)" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GovernmentHero;
