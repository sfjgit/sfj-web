/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useMemo, useCallback } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useRouter } from "next/navigation";

// ============================================
// IN-MEMORY TOKEN STORAGE
// ============================================
let accessToken: string | null = null;
let refreshPromise: Promise<boolean> | null = null; // Shared refresh promise

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
  refreshPromise = null;
};

// ============================================
// AXIOS HOOK
// ============================================
interface FailedRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export const useAxios = (): AxiosInstance => {
  const router = useRouter();

  const isRefreshingRef = useRef(false);
  const failedQueueRef = useRef<FailedRequest[]>([]);

  const processQueue = (error: unknown | null, token: string | null = null) => {
    failedQueueRef.current.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    failedQueueRef.current = [];
  };

  const refreshToken = useCallback(async (): Promise<boolean> => {
    // If already refreshing (by rehydrateAuth or another request), wait for it
    if (refreshPromise) {
      console.log("⏳ Refresh already in progress, waiting...");
      return refreshPromise;
    }

    // Start new refresh
    refreshPromise = performTokenRefresh();

    try {
      const result = await refreshPromise;
      return result;
    } finally {
      refreshPromise = null;
    }
  }, []);

  const api = useMemo(() => {
    const instance = axios.create({
      // No baseURL - will be handled where the API is called
      withCredentials: true, // Always send cookies (for refreshToken)
    });

    // ============================================
    // REQUEST INTERCEPTOR - Add Authorization header
    // ============================================
    instance.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // ============================================
    // RESPONSE INTERCEPTOR - Handle 401 & refresh
    // ============================================
    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest: any = error.config;

        // Handle 401 Unauthorized (token expired)
        if (error.response?.status === 401 && !originalRequest?._retry) {
          // If already refreshing, queue this request
          if (isRefreshingRef.current) {
            return new Promise((resolve, reject) => {
              failedQueueRef.current.push({ resolve, reject });
            })
              .then((token) => {
                if (token) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshingRef.current = true;

          try {
            const refreshed = await refreshToken();

            if (!refreshed) {
              // Refresh failed - clear token and redirect to login
              processQueue(new Error("Refresh token expired"), null);
              clearAccessToken();
              router.push("/signin");
              return Promise.reject(error);
            }

            // Refresh succeeded - get new token and retry queued requests
            const newToken = getAccessToken();
            processQueue(null, newToken);

            // Retry original request with new token
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return instance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            clearAccessToken();
            router.push("/signin");
            return Promise.reject(refreshError);
          } finally {
            isRefreshingRef.current = false;
          }
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, [router, refreshToken]);

  return api;
};

// ============================================
// SHARED REFRESH LOGIC (prevents duplicate refresh calls)
// ============================================
const performTokenRefresh = async (retries = 2): Promise<boolean> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Refreshing token (attempt ${attempt + 1})...`);

      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
          timeout: 10000,
        },
      );

      const newAccessToken = response.data?.data?.accessToken;

      if (!newAccessToken) {
        console.error("❌ No accessToken in refresh response");
        return false;
      }

      setAccessToken(newAccessToken);
      console.log("✅ Access token refreshed successfully");

      return true;
    } catch (error: any) {
      const isNetworkError = !error.response;
      const isServerError = error.response?.status >= 500;

      if ((isNetworkError || isServerError) && attempt < retries) {
        console.warn(`⚠️ Refresh attempt ${attempt + 1} failed, retrying...`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1)),
        );
        continue;
      }

      console.error("❌ Token refresh failed:", error);
      clearAccessToken();
      return false;
    }
  }
  return false;
};

// ============================================
// AUTO-REHYDRATE ON PAGE LOAD
// ============================================
export const rehydrateAuth = async (): Promise<boolean> => {
  // If already refreshing, wait for that to complete
  if (refreshPromise) {
    console.log("⏳ Refresh already in progress, waiting...");
    return refreshPromise;
  }

  // Only try if no token in memory
  if (!getAccessToken()) {
    console.log("🔄 Rehydrating auth on page load...");
    refreshPromise = performTokenRefresh();

    try {
      const result = await refreshPromise;
      return result;
    } finally {
      refreshPromise = null;
    }
  }

  return false;
};
export default useAxios;
// ============================================
// USAGE EXAMPLE
// ============================================
/*
// ROOT LAYOUT - Create a Client Component wrapper
// components/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { rehydrateAuth } from "@/hooks/useAxios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    rehydrateAuth(); // Restore auth on mount
  }, []);
  
  return <>{children}</>;
}

// app/layout.tsx (Server Component)
import { AuthProvider } from "@/components/AuthProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// 1. LOGIN - Store accessToken after successful login
import { setAccessToken } from "@/hooks/useAxios";

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/auth/signin', 
      { email, password },
      { withCredentials: true } // This sets refreshToken in httpOnly cookie
    );
    
    // Extract and store accessToken
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }
    
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed', error);
  }
};

// 2. USING THE HOOK - All subsequent API calls
const MyComponent = () => {
  const api = useAxios();
  
  const fetchUserProfile = async () => {
    try {
      // This automatically adds Authorization header with accessToken
      // If 401, it will auto-refresh using httpOnly refreshToken cookie
      const response = await api.get('/users/me');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };
  
  return <button onClick={fetchUserProfile}>Get Profile</button>;
};

// 3. LOGOUT - Clear accessToken
import { clearAccessToken } from "@/hooks/useAxios";

const handleLogout = async () => {
  try {
    await axios.post('/auth/logout', {}, { withCredentials: true });
    clearAccessToken(); // Clear from memory
    router.push('/signin');
  } catch (error) {
    console.error('Logout failed', error);
  }
};
*/
