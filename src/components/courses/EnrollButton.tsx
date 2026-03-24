/* eslint-disable @typescript-eslint/no-explicit-any */
// components/courses/EnrollButton.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { toast } from "sonner";

interface EnrollButtonProps {
  courseId: string;
  courseName: string;
  amount: number;
  currency?: string;
  isPaid: boolean;
}

export default function EnrollButton({
  courseId,
  courseName,
  amount,
  currency = "INR",
  isPaid,
}: EnrollButtonProps) {
  const { isAuthenticated, token, user, hydrated, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [couponCode, _] = useState("");

  // Check paid status from localStorage — only after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      const paidCourses: string[] = JSON.parse(
        localStorage.getItem("paidCourses") || "[]"
      );
      setAlreadyPaid(paidCourses.includes(courseId));
    } catch {
      setAlreadyPaid(false);
    }
  }, [hydrated, courseId]);

  // Discount calculation (same logic as PhonePeEnrollButton)
  const baseAmount = amount;
  const flatOff = 0.2 * baseAmount;
  const afterFlat = baseAmount - flatOff;
  const gst = 0.18 * afterFlat;
  const finalAmount = afterFlat + gst;

  const isFree = !isPaid || amount === 0;

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
    setEnrollOpen(true);
  };

  const handleFreeEnroll = async () => {
    // Free enroll — can be extended to call an enroll API
    toast.success(`You're enrolled in ${courseName}!`);
    try {
      const paidCourses: string[] = JSON.parse(
        localStorage.getItem("paidCourses") || "[]"
      );
      if (!paidCourses.includes(courseId)) {
        localStorage.setItem(
          "paidCourses",
          JSON.stringify([...paidCourses, courseId])
        );
        setAlreadyPaid(true);
      }
    } catch {}
  };

  const initiatePayment = async () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("paymentReturnUrl", window.location.href);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL}/api/payments/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId,
            amount: finalAmount,
            currency,
            callbackUrl: `${window.location.origin}/payment/callback`,
            ...(couponCode ? { couponCode } : {}),
          }),
        }
      );

      if (response.status === 401) {
        logout();
        setEnrollOpen(false);
        setAuthOpen(true);
        toast.error("Session expired. Please sign in again.");
        return;
      }

      const data = await response.json();
      if (!data.success)
        throw new Error(data.error || "Payment initiation failed");

      // Store pending payment info for callback page
      localStorage.setItem(
        "pendingPayment",
        JSON.stringify({
          merchantOrderId: data.data.merchantOrderId,
          orderId: data.data.orderId,
          courseId,
          courseName,
        })
      );

      window.location.href = data.data.redirectUrl;
      toast.success("Redirecting to PhonePe...");
    } catch (err: any) {
      toast.error(err.message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  // Before hydration — render neutral placeholder to avoid SSR mismatch
  if (!hydrated) {
    return <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse" />;
  }

  if (alreadyPaid) {
    return (
      <button
        disabled
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
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
        Enrolled
      </button>
    );
  }

  return (
    <>
      {enrollOpen ? (
        /* Inline payment summary */
        <div className="border border-blue-200 rounded-xl overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-800">
              Order Summary
            </span>
            <button
              onClick={() => setEnrollOpen(false)}
              className="text-blue-400 hover:text-blue-600 text-xs"
            >
              Cancel
            </button>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Base amount</span>
              <span>₹{baseAmount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Offer (20% off)</span>
              <span>−₹{flatOff.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>GST (18%)</span>
              <span>+₹{gst.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 text-base">
              <span>Total</span>
              <span>₹{finalAmount.toFixed(0)}</span>
            </div>
          </div>

          {/* User info */}
          {user && (
            <div className="px-4 pb-3 text-xs text-gray-500 flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Paying as <strong className="text-gray-700">{user.email}</strong>
            </div>
          )}

          <div className="px-4 pb-4">
            <button
              onClick={initiatePayment}
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
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
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">
              Secure payment via PhonePe
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
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
          {isFree ? "Enroll for Free" : "Enroll Now"}
        </button>
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultView="login"
        onSuccess={() => {
          setAuthOpen(false);
          if (isFree) {
            handleFreeEnroll();
          } else {
            setEnrollOpen(true);
          }
        }}
      />
    </>
  );
}
