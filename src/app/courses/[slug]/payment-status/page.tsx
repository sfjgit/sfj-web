// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";
// import Link from "next/link";

// const LMS_URL = process.env.NEXT_PUBLIC_LMS_COURSE_URL!;

// export default function PaymentStatusPage() {
//   const searchParams = useSearchParams();
//   const params = useParams();
//   const slug = params.slug as string;
//   const merchantOrderId = searchParams.get("merchantOrderId");
//   const [status, setStatus] = useState<"loading" | "success" | "failed">(
//     "loading",
//   );
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     if (!merchantOrderId) return;

//     const poll = async () => {
//       try {
//         const res = await fetch(
//           `${LMS_URL}/payments/status/${merchantOrderId}`,
//         );
//         const json = await res.json();

//         if (json.data?.status === "SUCCESS") {
//           setStatus("success");
//           setData(json.data);
//         } else if (
//           json.data?.status === "FAILED" ||
//           json.data?.status === "CANCELLED"
//         ) {
//           setStatus("failed");
//           setData(json.data);
//         } else {
//           // Still pending — poll again in 3s
//           setTimeout(poll, 3000);
//         }
//       } catch {
//         setTimeout(poll, 3000);
//       }
//     };

//     poll();
//   }, [merchantOrderId]);

//   return (
//     <main className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
//         {status === "loading" && (
//           <>
//             <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
//               <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">
//               Verifying payment...
//             </h2>
//             <p className="text-gray-500 text-sm mt-2">
//               This usually takes a few seconds
//             </p>
//           </>
//         )}

//         {status === "success" && (
//           <>
//             <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-8 h-8 text-emerald-500" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">
//               Payment successful!
//             </h2>
//             <p className="text-gray-500 text-sm mt-2 mb-6">
//               You are now enrolled in <strong>{data?.courseName}</strong>
//             </p>
//             <a
//               href={`${process.env.NEXT_PUBLIC_LMS_URL}/courses/${params.slug}/learn`}
//               className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
//             >
//               Start learning →
//             </a>
//           </>
//         )}

//         {status === "failed" && (
//           <>
//             <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
//               <XCircle className="w-8 h-8 text-red-500" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">Payment failed</h2>
//             <p className="text-gray-500 text-sm mt-2 mb-6">
//               Your payment could not be processed. You have not been charged.
//             </p>
//             <Link
//               href={`/courses/${params.slug}`}
//               className="block w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
//             >
//               Try again
//             </Link>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const LMS_URL = process.env.NEXT_PUBLIC_LMS_COURSE_URL!;

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const slug = params.slug as string;

  const merchantOrderId = searchParams.get("merchantOrderId");

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!merchantOrderId) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `${LMS_URL}/payments/status/${merchantOrderId}`,
        );

        const json = await res.json();

        if (json.data?.status === "SUCCESS") {
          setStatus("success");
          setData(json.data);
        } else if (
          json.data?.status === "FAILED" ||
          json.data?.status === "CANCELLED"
        ) {
          setStatus("failed");
          setData(json.data);
        } else {
          setTimeout(poll, 3000);
        }
      } catch {
        setTimeout(poll, 3000);
      }
    };

    poll();
  }, [merchantOrderId]);

  return (
    <main className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Verifying payment...
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              This usually takes a few seconds
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Payment successful!
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              You are now enrolled in <strong>{data?.courseName}</strong>
            </p>

            <a
              href={`${process.env.NEXT_PUBLIC_LMS_URL}/courses/${slug}/learn`}
              className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              Start learning →
            </a>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">Payment failed</h2>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              Your payment could not be processed.
            </p>

            <Link
              href={`/courses/${slug}`}
              className="block w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
            >
              Try again
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
