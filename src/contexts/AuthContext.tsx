/* eslint-disable @typescript-eslint/no-explicit-any */
// contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL || "http://localhost:3001/api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  hydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // hydrated flag prevents SSR/client mismatch
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Only runs client-side — safe to access localStorage
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setHydrated(true);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string, phone?: string) => {
      try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
          name,
          email,
          password,
          phone,
        });
        const { token: t, user: u } = response.data.data;
        localStorage.setItem("token", t);
        localStorage.setItem("user", JSON.stringify(u));
        setToken(t);
        setUser(u);
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Signup failed");
      }
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token: t, user: u } = response.data.data;
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
      setToken(t);
      setUser(u);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Failed to send reset email"
      );
    }
  }, []);

  const resetPassword = useCallback(
    async (resetToken: string, newPassword: string) => {
      try {
        await axios.post(`${API_URL}/auth/reset-password`, {
          token: resetToken,
          newPassword,
        });
      } catch (error: any) {
        throw new Error(
          error.response?.data?.error || "Failed to reset password"
        );
      }
    },
    []
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        await axios.post(
          `${API_URL}/auth/change-password`,
          { currentPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error: any) {
        throw new Error(
          error.response?.data?.error || "Failed to change password"
        );
      }
    },
    [token]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        changePassword,
        isLoading,
        isAuthenticated: !!user && !!token,
        hydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
