"use client";
// app/payment/callback/PaymentCallbackContent.tsx
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Ban,
  Download,
  Printer,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentStatus = "checking" | "success" | "failed" | "cancelled" | "error";

interface PaymentDetails {
  amount: number;
  transactionId?: string;
  merchantOrderId: string;
  orderId?: string;
  failureReason?: string;
  status: string;
  currency?: string;
  courseName?: string; // ← added to backend response
  emailNotification?: {
    recipientName?: string;
    recipientEmail?: string;
  };
}

// ── Invoice HTML ──────────────────────────────────────────────────────────────

function buildInvoiceHtml(details: PaymentDetails): string {
  const invoiceNumber = `INV-${(details.orderId || details.merchantOrderId)
    .replace(/[^A-Z0-9]/gi, "")
    .toUpperCase()
    .slice(-10)}`;

  const issuedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalAmount = details.amount / 100;
  const gstRate = 18;
  const baseAmount = +(totalAmount / (1 + gstRate / 100)).toFixed(2);
  const gstAmount = +(totalAmount - baseAmount).toFixed(2);
  const currency = details.currency || "INR";

  // Pull from actual response
  const userName = details.emailNotification?.recipientName || "Student";
  const userEmail = details.emailNotification?.recipientEmail || "";
  const courseName = details.courseName || "Course Enrollment";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice ${invoiceNumber}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #fff; color: #111; padding: 48px; font-size: 13px; line-height: 1.6; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 28px; border-bottom: 2px solid #e5e7eb; margin-bottom: 32px; }
    .logo-block img { height: 48px; object-fit: contain; }
    .logo-block .company-name { font-size: 20px; font-weight: 700; color: #111; margin-top: 6px; }
    .logo-block .company-sub { font-size: 11px; color: #6b7280; }
    .invoice-meta { text-align: right; }
    .invoice-meta .invoice-title { font-size: 28px; font-weight: 700; color: #2563eb; letter-spacing: -0.5px; }
    .invoice-meta .invoice-number { font-size: 12px; color: #6b7280; margin-top: 4px; }
    .invoice-meta .invoice-date { font-size: 12px; color: #374151; margin-top: 2px; }
    .status-badge { display: inline-block; background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
    .addresses { display: flex; justify-content: space-between; margin-bottom: 32px; gap: 40px; }
    .address-block .label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #9ca3af; margin-bottom: 8px; }
    .address-block .name { font-weight: 600; font-size: 14px; color: #111; }
    .address-block .detail { color: #6b7280; font-size: 12px; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .items-table thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
    .items-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: #6b7280; }
    .items-table th:last-child, .items-table td:last-child { text-align: right; }
    .items-table tbody tr { border-bottom: 1px solid #f3f4f6; }
    .items-table td { padding: 12px 14px; font-size: 13px; color: #374151; }
    .items-table td .item-name { font-weight: 600; color: #111; }
    .items-table td .item-sub { font-size: 11px; color: #9ca3af; margin-top: 2px; }
    .totals { margin-left: auto; width: 280px; margin-bottom: 32px; }
    .totals-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #4b5563; border-bottom: 1px solid #f3f4f6; }
    .totals-row.total { padding-top: 10px; font-size: 15px; font-weight: 700; color: #111; border-bottom: none; border-top: 2px solid #e5e7eb; margin-top: 4px; }
    .gst-note { font-size: 10px; color: #9ca3af; margin-top: 4px; }
    .txn-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 28px; font-size: 12px; color: #166534; }
    .txn-box strong { font-family: monospace; font-size: 13px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
    .footer .note { font-size: 11px; color: #9ca3af; max-width: 320px; }
    .footer .thank-you { font-size: 13px; font-weight: 600; color: #2563eb; }
    @media print { body { padding: 24px; } @page { margin: 0; size: A4; } }
  </style>
</head>
<body>

  <div class="header">
    <div class="logo-block">
      <img src="/SFJ-logo.png" alt="SFJ Business Solutions" onerror="this.style.display='none'" />
      <div class="company-name">SFJ Business Solutions</div>
      <div class="company-sub">SFJ Business Solutions Pvt. Ltd.</div>
      <div class="company-sub">GSTIN: 29AAXCS1234F1Z5 · Bengaluru, India</div>
    </div>
    <div class="invoice-meta">
      <div class="invoice-title">INVOICE</div>
      <div class="invoice-number">${invoiceNumber}</div>
      <div class="invoice-date">Issued: ${issuedDate}</div>
      <div><span class="status-badge">✓ Paid</span></div>
    </div>
  </div>

  <div class="addresses">
    <div class="address-block">
      <div class="label">Bill From</div>
      <div class="name">SFJ Business Solutions Pvt. Ltd.</div>
      <div class="detail">bSkilling Platform</div>
      <div class="detail">Bengaluru, Karnataka 560001</div>
      <div class="detail">support@bskilling.com</div>
    </div>
    <div class="address-block" style="text-align:right">
      <div class="label">Bill To</div>
      <div class="name">${userName}</div>
      ${userEmail ? `<div class="detail">${userEmail}</div>` : ""}
      <div class="detail">Order ID: ${details.orderId || "—"}</div>
    </div>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th style="width:50%">Description</th>
        <th>HSN/SAC</th>
        <th>GST Rate</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="item-name">${courseName}</div>
          <div class="item-sub">Online Education Service · ${currency}</div>
        </td>
        <td>9992</td>
        <td>18%</td>
        <td>₹${baseAmount.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  ${
    details.transactionId
      ? `<div class="txn-box">Transaction ID: <strong>${details.transactionId}</strong></div>`
      : ""
  }

  <div class="totals">
    <div class="totals-row"><span>Subtotal</span><span>₹${baseAmount.toFixed(
      2
    )}</span></div>
    <div class="totals-row"><span>CGST (9%)</span><span>₹${(
      gstAmount / 2
    ).toFixed(2)}</span></div>
    <div class="totals-row"><span>SGST (9%)</span><span>₹${(
      gstAmount / 2
    ).toFixed(2)}</span></div>
    <div class="totals-row total"><span>Total Paid</span><span>₹${totalAmount.toFixed(
      2
    )}</span></div>
    <div class="gst-note">GST split as CGST + SGST for intra-state transactions</div>
  </div>

  <div class="footer">
    <div class="note">This is a computer-generated invoice and does not require a physical signature. For queries, contact support@bskilling.com</div>
    <div class="thank-you">Thank you for enrolling! 🎓</div>
  </div>

</body>
</html>`;
}

// ── Invoice modal ─────────────────────────────────────────────────────────────

function InvoiceModal({
  details,
  onClose,
}: {
  details: PaymentDetails;
  onClose: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const html = buildInvoiceHtml(details);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [details]);

  const handlePrint = () => iframeRef.current?.contentWindow?.print();

  const handleDownload = () => {
    if (!blobUrl) return;
    const invoiceNumber = `INV-${(details.orderId || details.merchantOrderId)
      .replace(/[^A-Z0-9]/gi, "")
      .toUpperCase()
      .slice(-10)}`;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `invoice-${invoiceNumber}.html`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black/60 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shrink-0">
        <span className="font-semibold text-gray-800 text-sm">
          Invoice Preview
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Save as HTML
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-gray-100 p-4">
        {blobUrl ? (
          <iframe
            ref={iframeRef}
            src={blobUrl}
            className="w-full h-full bg-white rounded-lg shadow-lg border-0"
            title="Invoice"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      <div className="px-4 py-2 bg-white border-t border-gray-100 text-xs text-center text-gray-400">
        Tap <strong>Print / Save PDF</strong> → choose{" "}
        <strong>Save as PDF</strong> in the print dialog
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantOrderId = searchParams.get("merchantOrderId");

  const [status, setStatus] = useState<PaymentStatus>("checking");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [showInvoice, setShowInvoice] = useState(false);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!merchantOrderId) {
      setStatus("error");
      return;
    }
    const token = localStorage.getItem("token");

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL}/api/payments/status/${merchantOrderId}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        const data = await response.json();
        if (!data.success) {
          setStatus("error");
          return;
        }

        setPaymentDetails(data.data);

        switch (data.data.status) {
          case "SUCCESS":
            setStatus("success");
            localStorage.removeItem("pendingPayment");
            break;
          case "CANCELLED":
            setStatus("cancelled");
            break;
          case "FAILED":
            setStatus("failed");
            break;
          default:
            pollTimeoutRef.current = setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setStatus("error");
      }
    };

    checkStatus();
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, [merchantOrderId]);

  return (
    <>
      {showInvoice && paymentDetails && (
        <InvoiceModal
          details={paymentDetails}
          onClose={() => setShowInvoice(false)}
        />
      )}

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
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5 text-left space-y-2 text-sm">
                  {paymentDetails.emailNotification?.recipientName && (
                    <DetailRow label="Name">
                      <span className="font-semibold text-gray-800">
                        {paymentDetails.emailNotification.recipientName}
                      </span>
                    </DetailRow>
                  )}
                  {paymentDetails.courseName && (
                    <DetailRow label="Course">
                      <span className="font-semibold text-gray-800 text-right max-w-[55%]">
                        {paymentDetails.courseName}
                      </span>
                    </DetailRow>
                  )}
                  <DetailRow label="Amount Paid">
                    <span className="font-semibold text-green-700">
                      ₹{(paymentDetails.amount / 100).toFixed(2)}
                    </span>
                  </DetailRow>
                  <DetailRow label="Transaction ID">
                    <span className="font-mono text-xs text-gray-800 break-all text-right max-w-[55%]">
                      {paymentDetails.transactionId ||
                        paymentDetails.merchantOrderId}
                    </span>
                  </DetailRow>
                </div>
              )}

              <div className="space-y-3">
                {paymentDetails && (
                  <button
                    onClick={() => setShowInvoice(true)}
                    className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-gray-500" />
                    Download Invoice
                  </button>
                )}
                <Button
                  onClick={() => router.push("/my-courses")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  View My Courses
                </Button>
              </div>
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
                support.
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
                email or contact support.
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
    </>
  );
}

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
    <div className="flex justify-between items-center gap-2">
      <span className="text-gray-500 shrink-0">{label}:</span>
      {children}
    </div>
  );
}
