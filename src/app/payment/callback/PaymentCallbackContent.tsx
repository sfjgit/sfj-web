"use client";
// app/payment/callback/PaymentCallbackContent.tsx
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, AlertCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentStatus = "checking" | "success" | "failed" | "cancelled" | "error";

interface PaymentDetails {
  amount: number;
  transactionId?: string;
  merchantOrderId: string;
  failureReason?: string;
  status: string;
}

export default function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const merchantOrderId = searchParams.get("merchantOrderId");

  const [status, setStatus] = useState<PaymentStatus>("checking");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );

  // Stable ref so the recursive poll closure always sees the latest router
  // without needing it in the dep array (avoids infinite re-effect)
  const routerRef = useRef(router);
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  // Stable ref for the timeout so we can clear it on unmount
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!merchantOrderId) {
      setStatus("error");
      return;
    }

    const token = localStorage.getItem("token");

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL}/api/payments/status/${merchantOrderId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        const data = await response.json();

        if (!data.success) {
          setStatus("error");
          return;
        }

        setPaymentDetails(data.data);

        switch (data.data.status) {
          case "SUCCESS": {
            setStatus("success");
            localStorage.removeItem("pendingPayment");
            const redirectUrl =
              localStorage.getItem("paymentReturnUrl") || "/my-courses";
            localStorage.removeItem("paymentReturnUrl");
            pollTimeoutRef.current = setTimeout(() => {
              routerRef.current.replace(redirectUrl);
            }, 3000);
            break;
          }
          case "CANCELLED":
            setStatus("cancelled");
            break;
          case "FAILED":
            setStatus("failed");
            break;
          default:
            // Still PENDING — poll again
            pollTimeoutRef.current = setTimeout(checkPaymentStatus, 2000);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setStatus("error");
      }
    };

    checkPaymentStatus();

    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, [merchantOrderId]); // only re-run if the order ID changes

  const handleViewCourses = () => {
    const redirectUrl =
      localStorage.getItem("paymentReturnUrl") || "/my-courses";
    localStorage.removeItem("paymentReturnUrl");
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        {status === "checking" && (
          <StatusCard>
            <IconCircle color="blue">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </IconCircle>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we confirm your payment with PhonePe...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:100ms]" />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:200ms]" />
            </div>
          </StatusCard>
        )}

        {status === "success" && (
          <StatusCard>
            <IconCircle color="green" bounce>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </IconCircle>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your enrollment has been confirmed. You now have access to the
              course.
            </p>

            {paymentDetails && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left space-y-2 text-sm">
                <DetailRow label="Amount Paid">
                  <span className="font-semibold text-green-700">
                    ₹{(paymentDetails.amount / 100).toFixed(2)}
                  </span>
                </DetailRow>
                <DetailRow label="Transaction ID">
                  <span className="font-mono text-xs text-gray-800 break-all">
                    {paymentDetails.transactionId ||
                      paymentDetails.merchantOrderId}
                  </span>
                </DetailRow>
              </div>
            )}

            <Button
              onClick={handleViewCourses}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              View My Courses
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Redirecting automatically in 3 seconds...
            </p>
          </StatusCard>
        )}

        {status === "cancelled" && (
          <StatusCard>
            <IconCircle color="orange">
              <Ban className="w-12 h-12 text-orange-600" />
            </IconCircle>
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              Payment Cancelled
            </h2>
            <p className="text-gray-600 mb-6">
              You cancelled the payment. No charges were made to your account.
            </p>

            {paymentDetails && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left text-sm">
                <DetailRow label="Order ID">
                  <span className="font-mono text-xs text-gray-800">
                    {paymentDetails.merchantOrderId}
                  </span>
                </DetailRow>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/courses")}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Try Again
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full"
              >
                Go Home
              </Button>
            </div>
          </StatusCard>
        )}

        {status === "failed" && (
          <StatusCard>
            <IconCircle color="red">
              <XCircle className="w-12 h-12 text-red-600" />
            </IconCircle>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-6">
              Your payment could not be processed. Please try again or contact
              support if the issue persists.
            </p>

            {paymentDetails && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left space-y-2 text-sm">
                <DetailRow label="Order ID">
                  <span className="font-mono text-xs text-gray-800">
                    {paymentDetails.merchantOrderId}
                  </span>
                </DetailRow>
                {paymentDetails.failureReason && (
                  <p className="pt-2 border-t border-red-200 text-red-600 text-xs">
                    Reason: {paymentDetails.failureReason}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/courses")}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Try Again
              </Button>
              <Button
                onClick={() => router.push("/support")}
                variant="outline"
                className="w-full"
              >
                Contact Support
              </Button>
            </div>
          </StatusCard>
        )}

        {status === "error" && (
          <StatusCard>
            <IconCircle color="yellow">
              <AlertCircle className="w-12 h-12 text-yellow-600" />
            </IconCircle>
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">
              Something Went Wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t verify your payment status. Please check your
              email for confirmation or contact support.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Retry Verification
              </Button>
              <Button
                onClick={() => router.push("/my-courses")}
                variant="outline"
                className="w-full"
              >
                View My Courses
              </Button>
            </div>
          </StatusCard>
        )}
      </div>
    </div>
  );
}

// ---- Sub-components ----

function StatusCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
      {children}
    </div>
  );
}

function IconCircle({
  color,
  bounce = false,
  children,
}: {
  color: "blue" | "green" | "orange" | "red" | "yellow";
  bounce?: boolean;
  children: React.ReactNode;
}) {
  const bg: Record<string, string> = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    orange: "bg-orange-100",
    red: "bg-red-100",
    yellow: "bg-yellow-100",
  };
  return (
    <div className="mb-6">
      <div
        className={`mx-auto w-20 h-20 ${
          bg[color]
        } rounded-full flex items-center justify-center ${
          bounce ? "animate-bounce" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}:</span>
      {children}
    </div>
  );
}
