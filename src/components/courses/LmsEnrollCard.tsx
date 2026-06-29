/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import LmsEnrollModal from "@/components/courses/LmsEnrollModal";
import { ILmsCourse } from "./LmsCurriculumAccordion";
import { getAccessToken, rehydrateAuth, useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import LmsEnrollSignupModal from "./LMSEnrollSignupModal";
import env from "@/config/env";

// ── Icons ─────────────────────────────────────────────────────────────────────
function BookIcon() {
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
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-gray-600">
      <span className="text-gray-400 w-4 shrink-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface LmsEnrollCardProps {
  course: ILmsCourse;
  isFree: boolean;
  lowestPlan: ILmsCourse["pricingPlans"][0] | null;
  highestPlan: ILmsCourse["pricingPlans"][0] | null;
}

export default function LmsEnrollCard({
  course,
  isFree,
  lowestPlan,
  highestPlan,
}: LmsEnrollCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    ILmsCourse["pricingPlans"][0] | null
  >(lowestPlan);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const axios = useAxios();

  const openModal = (
    plan: ILmsCourse["pricingPlans"][0] | null,
    signup = false,
  ) => {
    if (!plan) return;

    setSelectedPlan(plan);
    setShowSignup(signup);
    setModalOpen(true);
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     await rehydrateAuth();
  //     setIsLoggedIn(!!getAccessToken());
  //   };

  //   checkAuth();

  //   const handleAuthChange = () => {
  //     setIsLoggedIn(!!getAccessToken());
  //   };

  //   window.addEventListener("auth-changed", handleAuthChange);

  //   return () => {
  //     window.removeEventListener("auth-changed", handleAuthChange);
  //   };
  // }, []);

  useEffect(() => {
    const checkAuthAndEnrollment = async () => {
      await rehydrateAuth();

      const loggedIn = !!getAccessToken();
      setIsLoggedIn(loggedIn);

      if (!loggedIn) return;

      try {
        setCheckingEnrollment(true);

        const response = await axios.get(
          `${env.NEXT_PUBLIC_LMS_COURSE_URL}/courses/${course.id}/check-enrollment`,
        );

        setIsEnrolled(response.data.data);
      } catch (error) {
        console.error("Enrollment check failed", error);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkAuthAndEnrollment();

    const handleAuthChange = () => {
      checkAuthAndEnrollment();
    };

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  // const router = useRouter();

  // const handleBuyNow = async () => {
  //   try {
  //     if (!lowestPlan) return;

  //     await axios.post(`${env.NEXT_PUBLIC_LMS_COURSE_URL}/payments/initiate`, {
  //       courseId: course.id,
  //       pricingPlanId: lowestPlan.id,
  //     });

  //     // optional redirect if api returns payment url
  //     // window.location.href = response.data.paymentUrl;
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Unable to initiate payment");
  //   }
  // };
  const handleBuyNow = async () => {
    try {
      if (!lowestPlan) return;

      const response = await axios.post(
        `${env.NEXT_PUBLIC_LMS_COURSE_URL}/payments/initiate`,
        {
          courseId: course.id,
          pricingPlanId: lowestPlan.id,
        },
      );

      const paymentData = response.data;

      console.log("paymentData", paymentData);

      if (!paymentData.success) {
        toast.error(paymentData.error || "Unable to initiate payment");
        return;
      }

      // Free course
      if (paymentData.data?.type === "free") {
        window.location.href = `/lms/dashboard`;
        return;
      }

      // Redirect to payment gateway
      if (paymentData.data?.paymentUrl) {
        window.location.href = paymentData.data.paymentUrl;
        return;
      }

      toast.error("Payment URL not received");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Unable to initiate payment",
      );
    }
  };

  const formatPrice = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <>
      {selectedPlan &&
        (showSignup ? (
          <LmsEnrollSignupModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSwitchToSignin={() => setShowSignup(false)}
            course={{
              id: course.id,
              title: course.title,
              slug: course.slug,
            }}
            plan={selectedPlan}
          />
        ) : (
          <LmsEnrollModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSwitchToSignup={() => setShowSignup(true)}
            course={{
              id: course.id,
              title: course.title,
              slug: course.slug,
            }}
            plan={selectedPlan}
          />
        ))}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
        {course.thumbnailUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-bold text-gray-900">
              {isFree || !lowestPlan
                ? "Free"
                : formatPrice(lowestPlan.price, lowestPlan.currency)}
            </span>
            {lowestPlan?.originalPrice &&
              lowestPlan.originalPrice > lowestPlan.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(lowestPlan.originalPrice, lowestPlan.currency)}
                  </span>
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {Math.round(
                      (1 - lowestPlan.price / lowestPlan.originalPrice) * 100,
                    )}
                    % off
                  </span>
                </>
              )}
            {/* Price range hint when multiple plans */}
            {highestPlan && lowestPlan && highestPlan.id !== lowestPlan.id && (
              <span className="text-xs text-gray-400">
                — up to {formatPrice(highestPlan.price, highestPlan.currency)}
              </span>
            )}
          </div>

          {/* Multiple plans hint */}
          {course.pricingPlans.length > 1 && (
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
              {course.pricingPlans.length} plans available · see below to
              compare
            </p>
          )}

          {/* Primary CTA */}
          {/* <button
            onClick={() => openModal(lowestPlan)}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm text-center rounded-xl transition-colors"
          >
            {isFree ? "Enroll for free" : "Enroll now"}
          </button> */}
          {/* <button
            onClick={() => router.push(`/signin`)}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm text-center rounded-xl transition-colors"
          >
            {isFree ? "Enroll for free" : "Enroll now"}
          </button> */}
          {/* <button
            onClick={() => {
              if (isLoggedIn) {
                openModal(lowestPlan);
              }
              handleBuyNow();
            }}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm text-center rounded-xl transition-colors"
          >
            {isLoggedIn ? "Buy Now" : "Enroll Now"}
          </button> */}

          {/* <button
            onClick={() => {
              if (isLoggedIn) {
                handleBuyNow(); // only initiate api
              } else {
                openModal(lowestPlan); // only open modal
              }
            }}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm text-center rounded-xl transition-colors"
          >
            {isLoggedIn ? "Buy Now" : "Enroll Now"}
          </button> */}

          <button
            disabled={checkingEnrollment || isEnrolled}
            onClick={() => {
              if (!isLoggedIn) {
                openModal(lowestPlan);
                return;
              }

              if (!isEnrolled) {
                handleBuyNow();
              }
            }}
            className={`w-full py-3 px-4 text-white font-semibold text-sm rounded-xl transition-colors
    ${
      isEnrolled
        ? "bg-green-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
          >
            {checkingEnrollment
              ? "Checking..."
              : !isLoggedIn
                ? "Enroll Now"
                : isEnrolled
                  ? "Paid"
                  : "Buy Now"}
          </button>

          {/* <SigninModal open={open} onOpenChange={setOpen} /> */}

          {/* Per-plan buttons if multiple */}
          {course.pricingPlans.length > 1 && (
            <div className="space-y-2">
              {course.pricingPlans.map((plan: any) => (
                <button
                  key={plan.id}
                  onClick={() => openModal(plan)}
                  className="flex items-center justify-between w-full py-2.5 px-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl transition-colors text-sm"
                >
                  <span className="font-medium text-gray-800">{plan.name}</span>
                  <span className="text-gray-900 font-semibold">
                    {plan.price === 0
                      ? "Free"
                      : formatPrice(plan.price, plan.currency)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Quick stats */}
          <div className="space-y-2 pt-1 border-t border-gray-100">
            {course.modulesCount > 0 && (
              <InfoRow
                icon={<BookIcon />}
                label={`${course.modulesCount} modules`}
              />
            )}
            {course.totalLessons > 0 && (
              <InfoRow
                icon={<BookIcon />}
                label={`${course.totalLessons} lessons`}
              />
            )}
            {course.duration && (
              <InfoRow icon={<ClockIcon />} label={course.duration} />
            )}
            {course.certificateEnabled && (
              <InfoRow icon={<BadgeIcon />} label="Certificate on completion" />
            )}
            {course.enrollmentsCount > 0 && (
              <InfoRow
                icon={<UsersIcon />}
                label={`${course.enrollmentsCount} learners enrolled`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
