"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SYLLABUS_PDF, SYLLABUS_FILENAME } from "../constants";

// Presentation only — no OTP is sent and nothing is stored. Submitting a
// well-formed number just starts the download, so the gate is a UI shell
// waiting to be wired, not a check anything depends on.

const TEAL = "#0f7a5e";
const GOLD = "#d9a441";

// Same reason as FacultyWebinarSection: globals.css:283 has an unlayered
// `* { @apply border-border … }` that outranks @layer utilities, so border
// colours need the important modifier to survive.
const FIELD_CLASSES =
  "h-11 w-full rounded-md border border-[#2a3a3e]! bg-[#0b1417] px-3 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[#0f7a5e]!";

export default function SyllabusDownloadButton({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // The <a download> the button used to be, created on demand. Same-origin,
    // so the download attribute is honoured and the file saves under a
    // readable name rather than the slugged path.
    const link = document.createElement("a");
    link.href = SYLLABUS_PDF;
    link.download = SYLLABUS_FILENAME;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setOpen(false);
    setMobile("");
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
        Download syllabus
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-[#24343a]! bg-[#101b1f] text-gray-300 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[1.35rem] font-bold text-white">
              Sign in
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Your mobile number is your login. We send a one-time code — no
              password to remember.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-2">
            <label
              htmlFor="syllabus-mobile"
              className="mb-1.5 block text-sm text-gray-400"
            >
              Registered mobile
            </label>

            <div className="flex gap-2">
              <span className="flex h-11 shrink-0 items-center rounded-md border border-[#2a3a3e]! bg-[#0b1417] px-3 text-sm text-gray-300">
                +91
              </span>
              <input
                id="syllabus-mobile"
                name="mobile"
                type="tel"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                autoComplete="tel-national"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className={`${FIELD_CLASSES} flex-1`}
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-md px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: TEAL }}
              >
                Send code
              </button>
            </div>

            <p className="mt-5 border-t border-[#1e2b2f]! pt-4 text-sm text-gray-500">
              Not registered yet?{" "}
              <a
                href="#fdp-webinar"
                onClick={() => setOpen(false)}
                className="underline underline-offset-2 transition-opacity hover:opacity-75"
                style={{ color: GOLD }}
              >
                Reserve a seat
              </a>{" "}
              — it takes about a minute.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
