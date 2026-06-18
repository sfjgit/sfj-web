"use client";

import { useState } from "react";
import { Mail, Phone, Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAxios } from "@/hooks/useAxios";

type ContactType = "email" | "phone";
type DialogMode = "EDIT" | "VERIFY";

interface Props {
  email: string | null;
  phone: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  refetchProfileAction: () => void;
}

export default function ProfileContactInfo({
  email,
  phone,
  emailVerified,
  phoneVerified,
  refetchProfileAction,
}: Props) {
  return (
    <div className="space-y-6">
      <ContactField
        type="email"
        label="Email Address"
        value={email}
        verified={emailVerified}
        refetchProfile={refetchProfileAction}
      />

      <ContactField
        type="phone"
        label="WhatsApp Number"
        value={phone}
        verified={phoneVerified}
        refetchProfile={refetchProfileAction}
      />
    </div>
  );
}

function ContactField({
  type,
  label,
  value,
  verified,
  refetchProfile,
}: {
  type: ContactType;
  label: string;
  value: string | null;
  verified: boolean;
  refetchProfile: () => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("EDIT");

  const handleOpenDialog = (mode: DialogMode) => {
    setDialogMode(mode);
    setDialogOpen(true);
  };

  return (
    <div>
      <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
        {type === "email" ? (
          <Mail className="w-4 h-4 text-primary" />
        ) : (
          <Phone className="w-4 h-4 text-primary" />
        )}
        {label}
      </label>

      <div className="relative">
        <Input
          value={value || "Not Provided"}
          disabled
          className="border-4 pr-10"
        />
        {verified && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="flex items-center gap-1 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-2 flex-wrap">
        {!verified && value && (
          <span className="text-xs text-red-500 font-medium">Not Verified</span>
        )}

        {/* Show different buttons based on whether value exists */}
        {!value ? (
          // No value - Show only "Add" button
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleOpenDialog("EDIT")}
            className="text-xs"
          >
            Add {type === "email" ? "Email" : "Phone"}
          </Button>
        ) : (
          // Value exists - Show "Edit" and "Verify" buttons
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenDialog("EDIT")}
              className="text-xs"
            >
              Edit
            </Button>
            {!verified && (
              <Button
                size="sm"
                variant="default"
                onClick={() => handleOpenDialog("VERIFY")}
                className="text-xs bg-primary/70 hover:bg-primary text-white"
              >
                Verify
              </Button>
            )}
          </>
        )}
      </div>

      <ContactDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type={type}
        mode={dialogMode}
        currentValue={value}
        verified={verified}
        refetchProfile={refetchProfile}
      />
    </div>
  );
}

function ContactDialog({
  open,
  onClose,
  type,
  mode,
  currentValue,
  // verified,
  refetchProfile,
}: {
  open: boolean;
  onClose: () => void;
  type: ContactType;
  mode: DialogMode;
  currentValue: string | null;
  verified: boolean;
  refetchProfile: () => void;
}) {
  const axios = useAxios();

  const [step, setStep] = useState<"INPUT" | "OTP">("INPUT");
  const [input, setInput] = useState(currentValue || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset state when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep("INPUT");
      setInput(currentValue || "");
      setOtp("");
      setError("");
      onClose();
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post(
        type === "email" ? "/auth/send-email-otp" : "/auth/send-whatsapp-otp",
        { value: input },
      );
      setStep("OTP");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error("Send OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/auth/verify-otp", {
        type,
        value: input,
        otp,
      });
      refetchProfile();
      handleOpenChange(false);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.error("Verify OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Determine dialog title
  const getDialogTitle = () => {
    if (step === "OTP") return "Verify OTP";
    if (mode === "EDIT") {
      return currentValue
        ? `Edit ${type === "email" ? "Email" : "Phone Number"}`
        : `Add ${type === "email" ? "Email" : "Phone Number"}`;
    }
    return `Verify ${type === "email" ? "Email" : "Phone Number"}`;
  };

  // Handle primary action
  const handlePrimaryAction = () => {
    if (step === "OTP") {
      verifyOtp();
    } else {
      // For VERIFY mode with existing value, use currentValue
      // For EDIT mode, use the new input
      if (mode === "VERIFY" && currentValue) {
        setInput(currentValue);
        sendOtp();
      } else {
        sendOtp();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {step === "INPUT" ? (
            <>
              {mode === "VERIFY" ? (
                // Verify mode - show current value (read-only)
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    We&apos;ll send an OTP to verify:
                  </p>
                  <Input
                    value={currentValue || ""}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              ) : (
                // Edit/Add mode - allow input
                <div className="space-y-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Enter ${type === "email" ? "email address" : "phone number"}`}
                    type={type === "email" ? "email" : "tel"}
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500">
                    {mode === "EDIT" && currentValue
                      ? "Enter a new value to update"
                      : "An OTP will be sent for verification"}
                  </p>
                </div>
              )}
            </>
          ) : (
            // OTP step
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Enter the OTP sent to{" "}
                <span className="font-medium">{input}</span>
              </p>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                disabled={loading}
                className="text-center text-lg tracking-widest"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {step === "OTP" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep("INPUT");
                setOtp("");
                setError("");
              }}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
          )}

          <Button
            onClick={handlePrimaryAction}
            disabled={
              loading ||
              (step === "INPUT" && mode === "EDIT" && !input.trim()) ||
              (step === "OTP" && otp.length !== 6)
            }
            className="w-full sm:w-auto"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {step === "OTP" ? "Verify OTP" : "Send OTP"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import { useState } from "react";
// import { Mail, Phone, Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useAxios } from "@/hooks/useAxios";
// // import useAxios from "@/hooks/useAxios";

// type ContactType = "email" | "phone";
// type Step = "ADD" | "UPDATE" | "OTP";

// interface Props {
//   email: string | null;
//   phone: string | null;
//   emailVerified: boolean;
//   phoneVerified: boolean;
//   refetchProfile: () => void;
// }

// export default function ProfileContactInfo({
//   email,
//   phone,
//   emailVerified,
//   phoneVerified,
//   refetchProfile,
// }: Props) {
//   return (
//     <div className="space-y-6">
//       <ContactField
//         type="email"
//         label="Email Address"
//         value={email}
//         verified={emailVerified}
//         refetchProfile={refetchProfile}
//       />

//       <ContactField
//         type="phone"
//         label="WhatsApp Number"
//         value={phone}
//         verified={phoneVerified}
//         refetchProfile={refetchProfile}
//       />
//     </div>
//   );
// }

// function ContactField({
//   type,
//   label,
//   value,
//   verified,
//   refetchProfile,
// }: {
//   type: ContactType;
//   label: string;
//   value: string | null;
//   verified: boolean;
//   refetchProfile: () => void;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
//         {type === "email" ? (
//           <Mail className="w-4 h-4 text-primary" />
//         ) : (
//           <Phone className="w-4 h-4 text-primary" />
//         )}
//         {label}
//       </label>

//       <Input value={value || "Not Provided"} disabled className="border-4" />

//       <div className="flex items-center gap-3 mt-2">
//         {!verified && (
//           <span className="text-xs text-red-500">Not Verified</span>
//         )}

//         <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
//           {value ? "Edit" : "Add"}
//         </Button>
//       </div>

//       <ContactDialog
//         open={open}
//         onClose={() => setOpen(false)}
//         type={type}
//         value={value}
//         verified={verified}
//         refetchProfile={refetchProfile}
//       />
//     </div>
//   );
// }

// function ContactDialog({
//   open,
//   onClose,
//   type,
//   value,
//   verified,
//   refetchProfile,
// }: {
//   open: boolean;
//   onClose: () => void;
//   type: ContactType;
//   value: string | null;
//   verified: boolean;
//   refetchProfile: () => void;
// }) {
//   const axios = useAxios();

//   const [step, setStep] = useState<Step>(() => {
//     if (!value) return "ADD";
//     if (!verified) return "OTP";
//     return "UPDATE";
//   });

//   const [input, setInput] = useState(value || "");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const sendOtp = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await axios.post(
//         type === "email" ? "/auth/send-email-otp" : "/auth/send-whatsapp-otp",
//         { value: input }
//       );
//       setStep("OTP");
//     } catch {
//       setError("Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await axios.post("/auth/verify-otp", {
//         type,
//         value: input,
//         otp,
//       });
//       refetchProfile();
//       onClose();
//     } catch {
//       setError("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="w-sm">
//         <DialogHeader>
//           <DialogTitle>
//             {step === "OTP"
//               ? "Verify OTP"
//               : value
//               ? `Update ${type}`
//               : `Add ${type}`}
//           </DialogTitle>
//         </DialogHeader>

//         {error && <p className="text-sm text-red-500">{error}</p>}

//         {step !== "OTP" && (
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder={`Enter ${type}`}
//           />
//         )}

//         {step === "OTP" && (
//           <Input
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             maxLength={6}
//           />
//         )}

//         <DialogFooter>
//           {step !== "OTP" ? (
//             <Button onClick={sendOtp} disabled={loading}>
//               {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//               {value ? "Update & Verify" : "Send OTP"}
//             </Button>
//           ) : (
//             <Button onClick={verifyOtp} disabled={loading}>
//               {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//               Verify
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
