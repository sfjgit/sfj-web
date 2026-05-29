// // app/lms/new-sso/page.tsx
// "use client";
// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import { useAxios } from "@/hooks/useAxios";

// function SSOComponent() {
//   const [status, setStatus] = useState<"processing" | "redirecting" | "error">(
//     "processing",
//   );
//   const [error, setError] = useState("");
//   const searchParams = useSearchParams();
//   const api = useAxios();

//   // const learnerurl =
//   //   process.env.NEXT_PUBLIC_LEARNER_FRONTEND_URL || "http://localhost:3000";

//   useEffect(() => {
//     const handleSSO = async () => {
//       try {
//         const enrollmentId = searchParams.get("enrollmentId");
//         const courseId = searchParams.get("courseId");

//         if (!enrollmentId || !courseId) {
//           setError("Missing enrollment or course information");
//           setStatus("error");
//           return;
//         }

//         // Get refresh token from httpOnly cookie (browser sends automatically)
//         // Call your backend to get a fresh refresh token for SSO
//         // const response = await fetch("/auth/refresh", {
//         //   method: "POST",
//         //   credentials: "include",
//         // });
//         const response = await api.post(
//           "/auth/refresh",
//           {},
//           {
//             withCredentials: true,
//           },
//         );

//         // const data = await response.json();
//         const data = response.data;

//         if (!response.data || !data.success) {
//           setError("Authentication failed");
//           setStatus("error");
//           return;
//         }

//         // Get the refresh token from response (if your backend returns it)
//         const refreshToken = data.data?.refreshToken || data.data?.accessToken;

//         if (!refreshToken) {
//           setError("No authentication token received");
//           setStatus("error");
//           return;
//         }

//         setStatus("redirecting");

//         // Construct LMS SSO URL
//         const lmsBaseUrl =
//           process.env.NEXT_PUBLIC_LEARNER_FRONTEND_URL ||
//           "https://your-lms-domain.com";
//         const ssoUrl = `${lmsBaseUrl}/new-sso?refreshToken=${refreshToken}&enrollmentId=${enrollmentId}&courseId=${courseId}`;

//         // Redirect to LMS
//         window.location.href = ssoUrl;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       } catch (err: any) {
//         console.error("SSO Error:", err);
//         setError(err.message || "SSO failed");
//         setStatus("error");
//       }
//     };

//     handleSSO();
//   }, [searchParams]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
//         {status === "processing" && (
//           <>
//             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Preparing Your Course...
//             </h2>
//             <p className="text-gray-600">Please wait while we set things up</p>
//           </>
//         )}

//         {status === "redirecting" && (
//           <>
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-green-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Redirecting to Course...
//             </h2>
//             <p className="text-gray-600">Taking you to the learning platform</p>
//           </>
//         )}

//         {status === "error" && (
//           <>
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-red-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Something Went Wrong
//             </h2>
//             <p className="text-red-600 mb-4 text-sm">{error}</p>
//             <button
//               onClick={() => (window.location.href = "/lms/dashboard")}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Back to Dashboard
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function SSOPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
//         </div>
//       }
//     >
//       <SSOComponent />
//     </Suspense>
//   );
// }
export default function NewSSOPage() {
  return <div>New SSO Page</div>;
}
