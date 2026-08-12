"use client";
// components/courses/EnrollButton.tsx

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { toast } from "sonner";

interface Installment {
  installmentNumber: number;
  amount: number;
  dueDate: string;
  label?: string;
}

interface EnrollButtonProps {
  courseId: string;
  courseName: string;
  amount: number;
  currency?: string;
  isPaid: boolean;
  hasPartialPayment?: boolean;
  installments?: Installment[];
}

interface PriceBreakdown {
  basePrice: number;
  gstAmount: number;
  discountAmount: number;
  finalAmount: number;
  offerApplied: { code?: string; type?: string; value?: number } | null;
}

// ── Error modal for initiation failures ──────────────────────────────────────

function ErrorModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4 z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <svg
            className="w-7 h-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-base font-bold text-gray-900">Payment Failed</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL!;

export default function EnrollButton({
  courseId,
  courseName,
  amount,
  currency = "INR",
  isPaid,
  hasPartialPayment = false,
  installments = [],
}: EnrollButtonProps) {
  const { isAuthenticated, token, user, hydrated, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  // ── NEW: error modal state ────────────────────────────────────────────────
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [breakdown, setBreakdown] = useState<PriceBreakdown | null>(null);
  const [breakdownLoading, setBreakdownLoading] = useState(false);

  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const [paymentMode, setPaymentMode] = useState<"full" | "installment">(
    hasPartialPayment && installments.length > 0 ? "installment" : "full"
  );
  const [selectedInstallment, setSelectedInstallment] = useState<number>(
    installments[0]?.installmentNumber ?? 1
  );

  const isFree = !isPaid || amount === 0;
  const showInstallmentOption = hasPartialPayment && installments.length > 0;

  useEffect(() => {
    if (!hydrated) return;
    try {
      const paid: string[] = JSON.parse(
        localStorage.getItem("paidCourses") || "[]"
      );
      setAlreadyPaid(paid.includes(courseId));
    } catch {
      setAlreadyPaid(false);
    }
  }, [hydrated, courseId]);

  const fetchBreakdown = async (coupon?: string) => {
    if (isFree) return;
    setBreakdownLoading(true);
    try {
      if (coupon) {
        const res = await fetch(`${BACKEND}/api/courses/validate-coupon`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId, couponCode: coupon }),
        });
        const data = await res.json();
        if (data.success) {
          setBreakdown(data.data.breakdown);
          setCouponApplied(coupon);
          toast.success(
            `Coupon applied! ₹${data.data.breakdown.discountAmount.toFixed(
              0
            )} off`
          );
        } else {
          toast.error(data.error || "Invalid coupon");
          setCouponApplied(null);
          await fetchBreakdown();
        }
      } else {
        setBreakdown({
          basePrice: amount,
          gstAmount: +(amount * 0.18).toFixed(2),
          discountAmount: 0,
          finalAmount: +(amount * 1.18).toFixed(2),
          offerApplied: null,
        });
      }
    } catch {
      toast.error("Could not load pricing");
    } finally {
      setBreakdownLoading(false);
    }
  };

  const handleOpenEnroll = () => {
    setEnrollOpen(true);
    if (paymentMode === "full") fetchBreakdown();
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await fetchBreakdown(couponInput.trim().toUpperCase());
    setCouponLoading(false);
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponInput("");
    fetchBreakdown();
  };

  const handleFreeEnroll = async () => {
    toast.success(`You're enrolled in ${courseName}!`);
    try {
      const paid: string[] = JSON.parse(
        localStorage.getItem("paidCourses") || "[]"
      );
      if (!paid.includes(courseId)) {
        localStorage.setItem(
          "paidCourses",
          JSON.stringify([...paid, courseId])
        );
        setAlreadyPaid(true);
      }
    } catch {}
  };

  // ── Initiate payment — full error surfacing ───────────────────────────────
  const initiatePayment = async () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("paymentReturnUrl", window.location.href);
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: Record<string, any> = {
        courseId,
        currency,
        callbackUrl: `${window.location.origin}/payment/callback`,
      };

      if (couponApplied) body.discountCode = couponApplied;
      if (paymentMode === "installment") {
        body.paymentType = "installment";
        body.installmentNumber = selectedInstallment;
      }

      const res = await fetch(`${BACKEND}/api/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      // ── 401: session expired ──────────────────────────────────────────────
      if (res.status === 401) {
        logout();
        setEnrollOpen(false);
        setAuthOpen(true);
        toast.error("Session expired. Please sign in again.");
        return;
      }

      // ── Parse response always — even on non-2xx ───────────────────────────
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let data: any;
      try {
        data = await res.json();
      } catch {
        // JSON parse failed — raw HTTP error
        setErrorMessage(
          `Server error (${res.status}). Please try again in a moment.`
        );
        return;
      }

      // ── Backend returned success: false ───────────────────────────────────
      if (!data.success) {
        // Prefer data.error, fall back to data.message, then status text
        const msg =
          data.error ||
          data.message ||
          `Payment failed (${res.status}). Please try again.`;
        setErrorMessage(msg);
        toast.error(msg, { duration: 4000 });
        return;
      }

      // ── Redirect to PhonePe ───────────────────────────────────────────────
      localStorage.setItem(
        "pendingPayment",
        JSON.stringify({
          merchantOrderId: data.data.merchantOrderId,
          orderId: data.data.orderId,
          courseId,
          courseName,
        })
      );

      toast.success("Redirecting to PhonePe...");
      window.location.href = data.data.redirectUrl;
    } catch (err: unknown) {
      // Network error / fetch itself failed
      const msg =
        err instanceof Error
          ? err.message
          : "Network error. Check your connection and try again.";
      setErrorMessage(msg);
      toast.error(msg, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      setAuthOpen(true);
      return;
    }
    if (isFree) {
      handleFreeEnroll();
      return;
    }
    handleOpenEnroll();
  };

  const chargeAmount =
    paymentMode === "installment"
      ? installments.find((i) => i.installmentNumber === selectedInstallment)
          ?.amount ?? 0
      : breakdown?.finalAmount ?? amount * 1.18;

  const selectedInst = installments.find(
    (i) => i.installmentNumber === selectedInstallment
  );

  if (!hydrated)
    return <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse" />;

  if (alreadyPaid) {
    return (
      <button
        disabled
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <CheckSVG /> Enrolled
      </button>
    );
  }

  return (
    <>
      {/* ── Error modal ──────────────────────────────────────────────────── */}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="space-y-3">
        {/* STEP 1: Payment mode selector */}
        {!isFree && showInstallmentOption && !enrollOpen && (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                How do you want to pay?
              </p>
            </div>
            <div className="p-3 flex gap-2">
              {(["full", "installment"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPaymentMode(mode)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    paymentMode === mode
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {mode === "full" ? "Pay in Full" : "Pay in EMI"}
                </button>
              ))}
            </div>

            {paymentMode === "installment" && (
              <div className="px-3 pb-3 space-y-2">
                {installments.map((inst) => (
                  <button
                    key={inst.installmentNumber}
                    onClick={() =>
                      setSelectedInstallment(inst.installmentNumber)
                    }
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all ${
                      selectedInstallment === inst.installmentNumber
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          selectedInstallment === inst.installmentNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {inst.installmentNumber}
                      </span>
                      <span className="font-medium text-gray-700">
                        {inst.label || `Installment ${inst.installmentNumber}`}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold text-gray-900">
                        ₹{inst.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-gray-400">
                        Due{" "}
                        {new Date(inst.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </button>
                ))}
                <p className="text-xs text-gray-400 text-center pt-1">
                  Total: ₹{amount.toLocaleString("en-IN")} ·{" "}
                  {installments.length} installments
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Enroll button */}
        {!enrollOpen && (
          <button
            onClick={handleClick}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <CartSVG />
            {isFree
              ? "Enroll for Free"
              : paymentMode === "installment" && selectedInst
              ? `Pay ₹${selectedInst.amount.toLocaleString("en-IN")} now`
              : "Enroll Now"}
          </button>
        )}

        {/* STEP 3: Order summary */}
        {enrollOpen && (
          <div className="border border-gray-200 rounded-xl overflow-hidden text-sm">
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
              <span className="font-semibold text-gray-800">Order Summary</span>
              <button
                onClick={() => setEnrollOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                Cancel
              </button>
            </div>

            {breakdownLoading ? (
              <div className="p-6 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {paymentMode === "installment" && selectedInst && (
                  <div className="px-4 pt-4 space-y-2">
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                          {selectedInst.installmentNumber}
                        </span>
                        <span className="font-medium text-gray-800">
                          {selectedInst.label ||
                            `Installment ${selectedInst.installmentNumber}`}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        ₹{selectedInst.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 text-center">
                      Due by{" "}
                      {new Date(selectedInst.dueDate).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </p>
                    <button
                      onClick={() => setEnrollOpen(false)}
                      className="text-xs text-blue-500 hover:text-blue-700 w-full text-center"
                    >
                      ← Change payment plan
                    </button>
                  </div>
                )}

                {paymentMode === "full" && breakdown && (
                  <div className="px-4 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-500">
                      <span>Base price</span>
                      <span>₹{breakdown.basePrice.toFixed(0)}</span>
                    </div>
                    {breakdown.discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          Discount
                          {breakdown.offerApplied?.code && (
                            <span className="text-xs font-mono bg-green-100 px-1.5 py-0.5 rounded">
                              {breakdown.offerApplied.code}
                            </span>
                          )}
                        </span>
                        <span>−₹{breakdown.discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>GST (18%)</span>
                      <span>+₹{breakdown.gstAmount.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 text-base">
                      <span>Total</span>
                      <span>₹{breakdown.finalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                )}

                {paymentMode === "full" && (
                  <div className="px-4 pt-3">
                    {couponApplied ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                        <span className="text-green-700 text-xs font-semibold flex items-center gap-1">
                          <CheckSVG className="w-3.5 h-3.5" /> {couponApplied}{" "}
                          applied
                        </span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={couponInput}
                          onChange={(e) =>
                            setCouponInput(e.target.value.toUpperCase())
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={!couponInput.trim() || couponLoading}
                          className="px-3 py-2 bg-gray-800 text-white text-xs font-semibold rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {user && (
                  <div className="px-4 pt-2 pb-1 text-xs text-gray-400 flex items-center gap-1.5">
                    <CheckSVG className="w-3 h-3 text-green-500" />
                    Paying as{" "}
                    <strong className="text-gray-600">{user.email}</strong>
                  </div>
                )}

                <div className="px-4 pb-4 pt-3">
                  <button
                    onClick={initiatePayment}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <SpinSVG /> Processing...
                      </>
                    ) : (
                      <>
                        Pay ₹{chargeAmount.toFixed(0)} <ArrowSVG />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-2">
                    Secure payment via PhonePe
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultView="signup"
        onSuccess={() => {
          setAuthOpen(false);
          if (isFree) handleFreeEnroll();
          else handleOpenEnroll();
        }}
      />
    </>
  );
}

// ── Inline SVGs ───────────────────────────────────────────────────────────────

function CheckSVG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
function SpinSVG() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
function ArrowSVG() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}
function CartSVG() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
