"use client";

import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SFJContactForm from "./SFJContactForm";
import CookieBanner from "@/components/CookieBanner";
import PushNotificationButton from "@/components/PushNotificationButton";
import { AuthProvider } from "@/contexts/AuthContext";

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

  // ✅ detect NM page
  const isNMPage = pathname?.includes("/nm");

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {!isNMPage && (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <Navigation />
            </Suspense>
          </>
        )}

        {children}

        {!isNMPage && (
          <>
            <Footer />
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
