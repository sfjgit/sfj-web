/* eslint-disable @next/next/no-img-element */
"use client";

// Same 15 logos as the "AI Tools Students Master" section (School.tsx).
// This used to share the bar with a category tab strip, which was removed
// once CategoryChooser.tsx took over category navigation — the logos now
// get the full width instead of just the leftover space beside the tabs.
const AI_TOOLS = [
  { name: "Animaker", logo: "/tools/animaker.png" },
  { name: "Bing", logo: "/tools/bing.jpg" },
  { name: "Character AI", logo: "/tools/character-ai.png" },
  { name: "ChatGPT", logo: "/tools/chatgpt.png" },
  { name: "Crayon", logo: "/tools/crayon.png" },
  { name: "DALL-E", logo: "/tools/dall-e.webp" },
  { name: "Diffit", logo: "/tools/diffit.png" },
  { name: "ElevenLabs", logo: "/tools/elevenlabs.png" },
  { name: "Gemini", logo: "/tools/gemini.png" },
  { name: "Grammarly", logo: "/tools/grammarly.webp" },
  { name: "Magic School", logo: "/tools/magic-school.png" },
  { name: "Mindgrasp", logo: "/tools/mindgrasp.webp" },
  { name: "Notion AI", logo: "/tools/notion-ai.webp" },
  { name: "Pictory", logo: "/tools/pictory.png" },
  { name: "Voicify", logo: "/tools/voicify.png" },
];

// Most logos share one box, sized by height. Two need their own: ElevenLabs
// is an extremely wide wordmark (7.5:1) that a shared box squashes down to
// a sliver, and Magic School is a stacked two-line wordmark that needs real
// height to read, not width — same per-logo override pattern already used
// for the TaaS client-logo strip elsewhere on the site.
const logoBoxOverrides: Record<string, string> = {
  ElevenLabs: "w-80 h-12",
  "Magic School": "w-20 h-20",
};

const AIToolsBar = () => {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 text-base font-semibold text-gray-700 whitespace-nowrap">
            AI Tools
          </span>
          <div
            className="relative flex-1 min-w-0 overflow-hidden h-20"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="marquee-pause-hover flex items-center w-max"
              style={{
                animation: "capabilityLogoScroll 28s linear infinite",
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
                  {AI_TOOLS.map((tool, index) => (
                    <div
                      key={`${half}-${index}`}
                      className={`flex-shrink-0 mx-3 flex items-center justify-center ${
                        logoBoxOverrides[tool.name] ?? "w-48 h-12"
                      }`}
                    >
                      <img
                        src={"/app/b2i" + tool.logo}
                        alt={tool.name}
                        className="max-w-full max-h-full object-contain"
                        style={{ filter: "grayscale(1) brightness(0.5)" }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AIToolsBar;
