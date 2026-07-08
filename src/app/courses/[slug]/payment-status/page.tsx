/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useParams } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Loader2,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useAxios } from "@/hooks/useAxios";

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentStatus = "SUCCESS" | "FAILED" | "CANCELLED" | "PENDING";

interface PaymentData {
  status: PaymentStatus;
  courseName: string;
  courseSlug: string;
  enrollmentId?: string;
  currency?: string;
  amount: number;
}

interface ApiResponse {
  success: boolean;
  data: PaymentData | null;
}

type UIState = "polling" | "success" | "failed" | "error";

// ─── Config ───────────────────────────────────────────────────────────────────

const LMS_API_URL = `${process.env.NEXT_PUBLIC_LMS_BASE_URL}/course/api`;
// const LMS_LEARN_URL = process.env.NEXT_PUBLIC_LMS_URL;

const POLL_INTERVAL_MS = 3_000;
const MAX_POLL_ATTEMPTS = 20; // 60 seconds max (20 × 3s)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusIcon({ state }: { state: UIState }) {
  if (state === "polling") {
    return (
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
        <Loader2 className="w-9 h-9 text-blue-500 animate-spin" />
      </div>
    );
  }
  if (state === "success") {
    return (
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-9 h-9 text-emerald-500" />
      </div>
    );
  }
  return (
    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
      <XCircle className="w-9 h-9 text-red-500" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const axios = useAxios();

  const slug = params.slug as string;
  const merchantOrderId = searchParams.get("merchantOrderId");

  const [uiState, setUiState] = useState<UIState>("polling");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use refs so the interval callback always sees the latest values
  const attemptRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleApiResponse = useCallback(
    (response: ApiResponse) => {
      if (!mountedRef.current) return;

      // API itself reported failure
      if (!response.success) {
        stopPolling();
        setUiState("failed");
        return;
      }

      const d = response.data;

      // No data yet — keep polling (handled by interval)
      if (!d || !d.status) return;

      // Terminal states
      if (d.status === "SUCCESS") {
        stopPolling();
        setPaymentData(d);
        setUiState("success");
        return;
      }

      if (d.status === "FAILED" || d.status === "CANCELLED") {
        stopPolling();
        setPaymentData(d);
        setUiState("failed");
        return;
      }

      // PENDING — keep polling (interval will retry)
    },
    [stopPolling],
  );

  const pollOnce = useCallback(async () => {
    if (!merchantOrderId || !mountedRef.current) return;

    attemptRef.current += 1;

    // Give up after MAX_POLL_ATTEMPTS
    if (attemptRef.current > MAX_POLL_ATTEMPTS) {
      stopPolling();
      setErrorMessage(
        "Payment verification is taking longer than expected. Check your email for a confirmation or contact support.",
      );
      setUiState("error");
      return;
    }

    try {
      const res = await axios.get<ApiResponse>(
        `${LMS_API_URL}/payments/status/${merchantOrderId}`,
      );
      handleApiResponse(res.data);
    } catch (err: unknown) {
      // Network/server error on final attempt → show error
      if (attemptRef.current >= MAX_POLL_ATTEMPTS) {
        stopPolling();
        setErrorMessage("Unable to reach the server. Please try again.");
        setUiState("error");
      }
      // Otherwise silently retry on next tick
      console.error("[PaymentStatus] poll error:", err);
    }
  }, [merchantOrderId, axios, handleApiResponse, stopPolling]);

  useEffect(() => {
    mountedRef.current = true;

    if (!merchantOrderId) {
      setErrorMessage("No order ID found. Please go back and try again.");
      setUiState("error");
      return;
    }

    // Fire immediately, then every POLL_INTERVAL_MS
    pollOnce();
    intervalRef.current = setInterval(pollOnce, POLL_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantOrderId]);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <StatusIcon state={uiState} />

        {/* ── Polling ── */}
        {uiState === "polling" && (
          <>
            <h2 className="text-xl font-bold text-gray-900">
              Verifying payment…
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              This usually takes a few seconds. Do not close this tab.
            </p>
          </>
        )}

        {/* ── Success ── */}
        {uiState === "success" && paymentData && (
          <>
            <h2 className="text-xl font-bold text-gray-900">
              Payment successful!
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              You're now enrolled in{" "}
              <span className="font-semibold text-gray-800">
                {paymentData.courseName}
              </span>
            </p>

            {/* Receipt card */}
            <div className="mt-5 mb-6 rounded-xl bg-gray-50 border border-gray-100 px-5 py-4 text-left space-y-2">
              <ReceiptRow
                label="Amount paid"
                value={formatAmount(
                  paymentData.amount,
                  paymentData.currency ?? "INR",
                )}
              />
              <ReceiptRow
                label="Order ID"
                value={merchantOrderId ?? "—"}
                mono
              />
              {paymentData.enrollmentId && (
                <ReceiptRow
                  label="Enrollment ID"
                  value={paymentData.enrollmentId}
                  mono
                  truncate
                />
              )}
            </div>

            <a
              href={`/lms/dashboard`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl transition-colors"
            >
              My Courses <ArrowRight className="w-4 h-4" />
            </a>
          </>
        )}

        {/* ── Failed ── */}
        {uiState === "failed" && (
          <>
            <h2 className="text-xl font-bold text-gray-900">Payment failed</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Your payment could not be processed. You have not been charged.
            </p>
            <Link
              href={`/courses/${slug}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Try again
            </Link>
          </>
        )}

        {/* ── Error (timeout / missing order ID / server failure) ── */}
        {uiState === "error" && (
          <>
            <h2 className="text-xl font-bold text-gray-900">
              Something went wrong
            </h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              {errorMessage ?? "An unexpected error occurred."}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`/courses/${slug}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Back to course
              </Link>
              <a
                href="mailto:support@sfjbs.com"
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
              >
                Contact support
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// ─── Receipt Row ──────────────────────────────────────────────────────────────

function ReceiptRow({
  label,
  value,
  mono = false,
  truncate = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-gray-500 shrink-0">{label}</span>
      <span
        className={[
          "text-gray-800 text-right",
          mono ? "font-mono text-xs" : "font-medium",
          truncate ? "truncate max-w-[160px]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        title={truncate ? value : undefined}
      >
        {value}
      </span>
    </div>
  );
}
