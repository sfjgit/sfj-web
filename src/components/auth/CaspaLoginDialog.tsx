"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Presentation only — deliberately no auth call, no API, no persistence.
// Submitting validates the email client-side (native constraint validation via
// type="email" + required) and closes. Wiring goes in handleSubmit later.
export default function CaspaLoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenChange(false);
    setEmail("");
    setUsername("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Login to CASPA</DialogTitle>
          <DialogDescription className="text-gray-500">
            Enter your email and password to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="caspa-login-email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="caspa-login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-gray-300 text-slate-900 placeholder:text-gray-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="caspa-login-username" className="text-gray-700">
              Pasword
            </Label>
            <Input
              id="caspa-login-username"
              name="username"
              type="text"
              required
              autoComplete="password"
              placeholder="@Password"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border-gray-300 text-slate-900 placeholder:text-gray-400"
            />
          </div>

          <DialogFooter>
            <DialogClose
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Cancel
            </DialogClose>

            {/* Same blue gradient as the navbar's login button, so the popup
                reads as that button's continuation. */}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Login
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
