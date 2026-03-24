/* eslint-disable react/no-unescaped-entities */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FailedPaymentDetails {
  paymentId: string | null;
  courseId: string | null;
  userId: string | null;
  amount: string | null;
  reason: string | null;
  timestamp: string;
}

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

export default function PaymentFailed() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [purchaseData, setPurchaseData] = useState<UpdatedPurchase | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // ✅ Read params directly
  const paymentDetails: FailedPaymentDetails = {
    paymentId: searchParams.get("paymentId"),
    courseId: searchParams.get("courseId"),
    userId: searchParams.get("userId"),
    amount: searchParams.get("amount"),
    reason: searchParams.get("reason"),
    timestamp: new Date().toLocaleString(),
  };

  useEffect(() => {
    const updateFailedStatus = async () => {
      if (!paymentDetails.paymentId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/purchase-details/${paymentDetails.paymentId}`
        );

        toast.error("Payment failed and status updated.");
        setPurchaseData(response.data?.data);
      } catch (error: any) {
        console.error("Error updating failed payment:", error);
        toast.error("Failed to update failed payment status.");
      } finally {
        setLoading(false);
      }
    };

    updateFailedStatus();
  }, [paymentDetails.paymentId]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Payment Failed
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          We couldn't process your payment
          {paymentDetails.amount && (
            <span>
              {" "}
              of{" "}
              <span className="font-medium text-red-600">
                ₹{paymentDetails.amount}
              </span>
            </span>
          )}
        </p>

        <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-700">
            <span className="font-medium">Error:</span>{" "}
            {paymentDetails.reason || "An unknown error occurred"}
          </p>

          {paymentDetails.paymentId && (
            <div className="mt-2 text-sm text-gray-700">
              <span className="font-medium">Reference ID:</span>{" "}
              {paymentDetails.paymentId}
            </div>
          )}

          <div className="mt-2 text-sm text-gray-700">
            <span className="font-medium">Time:</span>{" "}
            {paymentDetails.timestamp}
          </div>
        </div>

        {purchaseData && (
          <>
            <div className="flex justify-between border-t pt-2 mt-4">
              <span>Status</span>
              <span className="text-red-600 font-semibold">
                {purchaseData.status}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Currency</span>
              <span>{purchaseData.currency}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Order ID</span>
              <span>{purchaseData.orderId}</span>
            </div>
          </>
        )}

        <div className="mt-6 space-y-3">
          {paymentDetails.courseId ? (
            <button
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md"
              onClick={() => router.push(`/course/${paymentDetails.courseId}`)}
            >
              Try Again
            </button>
          ) : (
            <button
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md"
              onClick={() => router.push("/courses")}
            >
              Browse Courses
            </button>
          )}

          <button
            className="w-full py-2 px-4 border rounded-md"
            onClick={() => router.push("/support")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
