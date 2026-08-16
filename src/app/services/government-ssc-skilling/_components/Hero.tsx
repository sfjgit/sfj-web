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
          src="/B2G/B2Gnew.png"
          alt="A P J Abdul Kalam beside a holographic map of India, with a team collaborating on national skilling initiatives"
          width={1672}
          height={941}
          priority
          sizes="100vw"
          className="w-full h-auto lg:h-[88dvh] lg:object-cover lg:object-top"
        />

        {/* Linear gradient scrim, mirrored from the old artwork: this image
            carries its own portrait + quote on the LEFT, so darkening that
            side would fight content that's already baked into the photo.
            The right side (people, panels, laptops) is instead where the
            copy now sits, so the dark edge moved there. Lightened a step off
            the original 90/76 stops so more of the artwork shows through.
            Scoped to the image wrapper so it never tints the copy panel
            below the artwork on mobile. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 32%, rgba(0,0,0,0) 55%)",
          }}
        />
      </div>

      {/* From lg the copy overlays the darkened left of the artwork. Below lg
          the image is too short to hold text, so it drops beneath instead.
          `relative` keeps it painting above the gradient, which would
          otherwise cover it as the later-positioned element. */}
      <div className="relative px-6 py-6 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-0 lg:py-0">
        {/* max-w-[90rem] widens the reference column at lg so lg:px-12
            reaches further toward the true screen edges before ml-auto below
            pins the copy to its right side. */}
        <div className="w-full max-w-7xl lg:max-w-[90rem] mx-auto lg:px-12">
          {/* lg:ml-auto pushes the block flush against the container's right
              edge — the image's busy side now, per the mirrored gradient
              above — rather than the translate-x used when the copy sat on
              the left. ml-auto scales safely with the container; the old
              translate-x was a percentage of THIS block's own width and
              nearly pushed content off-screen once reused elsewhere (see the
              stats block below, which had the same bug). */}
          <div className="max-w-md lg:max-w-lg lg:ml-auto space-y-3 sm:space-y-4 text-left lg:-translate-y-8">
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

        {/* From lg, pinned to the bottom-right corner of the artwork — the
            same side the heading now sits on, independent of wherever the
            heading happens to sit vertically. inset-x-0 spans the full fill
            layer so the inner wrapper can re-apply the exact same
            max-w/px container the heading uses, then flex+justify-end pins
            the row's right edge to the container's right edge — the same
            edge ml-auto gives the heading above, so both stay aligned.
            (The previous version used a fixed translate-x to match the
            heading's position; justify-end doesn't need that number at all,
            and can't repeat the earlier bug where a translate tuned for one
            element's width overshot when reused on a wider one.) */}
        <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:bottom-10 xl:bottom-14">
          <div className="max-w-7xl lg:max-w-[90rem] mx-auto lg:px-12 flex justify-end">
            <StatsCounter />
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
