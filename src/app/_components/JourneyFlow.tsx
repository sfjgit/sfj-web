"use client";

import Image from "next/image";

interface JourneyStep {
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  {
    title: "Apply",
    description:
      "Register for the AWS re/Start program, no prior tech experience required.",
  },
  {
    title: "Assessment",
    description: "Complete the screening and counselling process.",
  },
  {
    title: "Orientation",
    description: "Get introduced to the program structure and expectations.",
  },
  {
    title: "Training",
    description:
      "12 weeks of instructor-led learning with hands-on labs and real-world projects.",
  },
  {
    title: "Career readiness",
    description:
      "Resume building, interview preparation, and professional skills training.",
  },
  {
    title: "Graduate and get connected",
    description:
      "Earn your AWS re/Start certificate, prepare for AWS Certified Cloud Practitioner, and access placement support.",
  },
];

export default function JourneyFlow() {
  return (
    <section className="bg-[#0a0a0a] rounded-2xl px-6 py-10 md:px-10 md:py-14">
      <div className="inline-flex items-center gap-2 bg-[#1a1a1a] rounded-full px-3.5 py-1.5 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="text-xs font-medium text-neutral-200 tracking-wide">
          OUR JOURNEY
        </span>
      </div>

      <h2 className="text-white text-3xl md:text-[32px] font-medium mb-8">
        Your path through AWS re/Start
      </h2>

      <div className="bg-[#141414] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-stretch">
        <div className="flex-1 min-w-0 relative">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-neutral-800" />

          <div className="flex flex-col gap-5 md:gap-6">
            {journeySteps.map((step) => (
              <div key={step.title} className="flex gap-3.5">
                <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-600 shrink-0 flex items-center justify-center relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div>
                  <p className="text-white text-[15px] font-medium mb-1">
                    {step.title}
                  </p>
                  <p className="text-neutral-400 text-[13px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-7 bg-white text-neutral-900 rounded-full px-5 py-2.5 text-[13px] font-medium flex items-center gap-2 hover:bg-neutral-100 transition-colors"
          >
            <i className="ti ti-calendar text-base" aria-hidden="true" />
            Book a free discovery call
          </button>
        </div>

        <div className="md:w-[40%] rounded-xl overflow-hidden bg-neutral-800 min-h-[280px] md:min-h-[380px] relative">
          {/* Replace with the final AWS re/Start image when ready */}
          <Image
            src="/images/aws-restart-journey.jpg"
            alt="Learners collaborating during AWS re/Start training"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
