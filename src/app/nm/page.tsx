/* eslint-disable @typescript-eslint/no-explicit-any */
// app/nm/verify/page.tsx
"use client";
import { useState } from "react";
import {
  Check,
  X,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Toast Component
interface Toast {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

const ToastContainer = ({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: number) => void;
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] animate-slide-in ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
          {toast.type === "error" && <XCircle className="w-5 h-5" />}
          {toast.type === "info" && <AlertCircle className="w-5 h-5" />}
          <p className="flex-1 font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default function NMVerificationPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    const id = toastId;
    setToastId((prev) => prev + 1);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Handle phone OTP input
  const handlePhoneOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...phoneOtp];
    newOtp[index] = value;
    setPhoneOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`phone-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      index > 0
    ) {
      const prevInput = document.getElementById(`phone-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Send Phone OTP
  const handleSendPhoneOtp = async () => {
    setPhoneError("");
    setPhoneLoading(true);

    try {
      const response = await fetch("/api/nm/send-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setPhoneOtpSent(true);
      showToast("success", "✓ OTP sent to your WhatsApp successfully!");
    } catch (err: any) {
      setPhoneError(err.message);
      showToast("error", `✗ ${err.message}`);
    } finally {
      setPhoneLoading(false);
    }
  };

  // Verify Phone OTP
  const handleVerifyPhoneOtp = async () => {
    const otp = phoneOtp.join("");
    if (otp.length !== 6) {
      setPhoneError("Please enter complete OTP");
      showToast("error", "✗ Please enter complete 6-digit OTP");
      return;
    }

    setPhoneError("");
    setPhoneLoading(true);

    try {
      const response = await fetch("/api/nm/verify-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      setPhoneVerified(true);
      showToast("success", "✓ Phone number verified successfully!");

      // Redirect after 1 second
      setTimeout(() => {
        router.push("/nm/details");
      }, 1000);
    } catch (err: any) {
      setPhoneError(err.message);
      showToast("error", `✗ ${err.message}`);
    } finally {
      setPhoneLoading(false);
    }
  };

  // Change phone number
  const handleChangePhone = () => {
    setPhoneOtpSent(false);
    setPhoneOtp(["", "", "", "", "", ""]);
    setPhoneError("");
    showToast("info", "Phone number reset. Please enter a new number.");
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verify Your Phone
            </h1>
            <p className="text-gray-600">
              Enter your phone number to receive OTP via WhatsApp
            </p>
          </div>

          {/* Phone Verification Card */}
          <div
            className={`p-6 rounded-2xl border-2 transition-all ${
              phoneVerified
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {!phoneVerified && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      pattern="[0-9]{10}"
                      disabled={phoneOtpSent}
                    />
                    {phoneOtpSent && (
                      <button
                        onClick={handleChangePhone}
                        className="px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition"
                      >
                        Change
                      </button>
                    )}
                  </div>
                </div>

                {phoneOtpSent && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter WhatsApp OTP
                      </label>
                      <div className="flex gap-2 justify-center mb-2">
                        {phoneOtp.map((digit, index) => (
                          <input
                            key={index}
                            id={`phone-otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handlePhoneOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        OTP sent to {phoneNumber}
                      </p>
                    </div>

                    {phoneError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <X className="w-4 h-4 text-red-600" />
                        <p className="text-red-800 text-sm">{phoneError}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={handleVerifyPhoneOtp}
                        disabled={phoneLoading}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                      >
                        {phoneLoading ? "Verifying..." : "Verify Phone"}
                      </button>
                      <button
                        onClick={handleSendPhoneOtp}
                        disabled={phoneLoading}
                        className="px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition flex items-center gap-2"
                        title="Resend OTP"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {!phoneOtpSent && (
                  <>
                    {phoneError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <X className="w-4 h-4 text-red-600" />
                        <p className="text-red-800 text-sm">{phoneError}</p>
                      </div>
                    )}
                    <button
                      onClick={handleSendPhoneOtp}
                      disabled={
                        phoneLoading ||
                        !phoneNumber ||
                        phoneNumber.length !== 10
                      }
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                    >
                      {phoneLoading ? "Sending..." : "Send OTP via WhatsApp"}
                    </button>
                  </>
                )}
              </>
            )}

            {phoneVerified && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Verified Successfully!
                </h3>
                <p className="text-green-700 text-sm">
                  Phone number <strong>{phoneNumber}</strong> has been verified.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Redirecting to details page...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
