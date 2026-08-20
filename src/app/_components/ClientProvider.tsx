"use client";

import React, { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import Navigation from "@/components/Navigation";
import CTAWithFooter from "./CTAWithFooter";
import SFJContactForm from "./SFJContactForm";
import CookieBanner from "@/components/CookieBanner";
import PushNotificationButton from "@/components/PushNotificationButton";
import { AuthProvider } from "@/contexts/AuthContext";
import { rehydrateAuth } from "@/hooks/useAxios";
import AnnouncementTicker from "@/components/AnnouncementTicker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // queryClient.clear();
    rehydrateAuth();
  }, []);

  // ✅ detect NM page
  const isNMPage =
    pathname?.includes("/nm") ||
    pathname === "/android-privacy-policy" ||
    pathname.split("/").includes("test");
  // pathname.split("/").includes("jobs");

  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  const hideLayout = isNMPage || isAuthPage;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {!hideLayout && (
          <>
            {/* The fallback used to be a bare `<div>Loading...</div>`, which
                painted as the very first visible element on every page — the
                word "Loading…" in unstyled 16px black on white, above the
                header, then reflowed when the real header replaced it. That
                is a direct CLS contributor and it was the first thing a
                visitor (or a social preview bot) saw on the homepage (P0-09,
                PF-04). A fixed-height skeleton matching the header's
                dimensions reserves the same space, so nothing shifts. */}
            <AnnouncementTicker />
            <Suspense
              fallback={
                <div
                  aria-hidden="true"
                  className="h-[60px] w-full border-b border-gray-200 bg-white sm:h-[100px]"
                />
              }
            >
              <Navigation />
            </Suspense>
          </>
        )}

        {children}

        {!hideLayout && (
          <>
            {/* Same CTA + footer on every page, home included. */}
            <CTAWithFooter />
            <SFJContactForm />
            <CookieBanner />
            <div className="p-4 bg-gray-100">
              <PushNotificationButton />
            </div>
          </>
        )}
      </QueryClientProvider>
    </AuthProvider>
  );
}
