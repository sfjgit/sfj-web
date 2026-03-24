"use client";
// app/payment/failed/PaymentFailedContent.tsx
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UpdatedPurchase {
  _id: string;
  userId: string;
  courseId: string;
  orderId: string;
  amount: string;
  currency: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

export default function PaymentFailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("paymentId");
  const courseId = searchParams.get("courseId");
  const amount = searchParams.get("amount");
  const reason = searchParams.get("reason");
  const timestamp = new Date().toLocaleString();

  const [purchaseData, setPurchaseData] = useState<UpdatedPurchase | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) {
      setLoading(false);
      return;
    }

    const updateFailedStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/purchase-details/${paymentId}`
        );
        setPurchaseData(response.data?.data);
        toast.error("Payment failed and status updated.");
      } catch (error) {
        console.error("Error fetching failed payment:", error);
        toast.error("Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };

    updateFailedStatus();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <svg
              className="w-7 h-7 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Payment Failed
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            We couldn&apos;t process your payment
            {amount && (
              <>
                {" "}
                of <span className="font-semibold text-red-600">₹{amount}</span>
              </>
            )}
          </p>
        </div>

        {/* Error details */}
        <div className="mt-5 bg-red-50 p-4 rounded-lg border border-red-200 space-y-1.5">
          <p className="text-sm text-red-700">
            <span className="font-medium">Error: </span>
            {reason || "An unknown error occurred"}
          </p>
          {paymentId && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Reference ID: </span>
              {paymentId}
            </p>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Time: </span>
            {timestamp}
          </p>
        </div>

        {/* Purchase data rows */}
        {purchaseData && (
          <div className="mt-5 divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
            <DetailRow label="Status">
              <span className="font-semibold text-red-600">
                {purchaseData.status}
              </span>
            </DetailRow>
            <DetailRow label="Order ID">
              <span className="font-mono text-xs text-gray-700 break-all">
                {purchaseData.orderId}
              </span>
            </DetailRow>
            <DetailRow label="Currency">
              <span>{purchaseData.currency}</span>
            </DetailRow>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {courseId ? (
            <button
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-medium rounded-lg"
              onClick={() => router.push(`/courses/${courseId}`)}
            >
              Try Again
            </button>
          ) : (
            <button
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-medium rounded-lg"
              onClick={() => router.push("/courses")}
            >
              Browse Courses
            </button>
          )}

          <button
            className="w-full py-2.5 px-4 border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 rounded-lg"
            onClick={() => router.push("/support")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
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
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-500">{label}</span>
      {children}
    </div>
  );
}
