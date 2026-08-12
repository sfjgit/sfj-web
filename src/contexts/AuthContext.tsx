// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

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
    phone?: string,
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  hydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 👇 Your backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL || "http://localhost:8080";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // LOGIN
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } finally {
      setIsLoading(false);
    }
  };

  // SIGNUP
  const signup = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const forgotPassword = async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed");
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed");
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed");
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    isLoading,
    isAuthenticated: !!token,
    hydrated: true,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
