// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext } from "react";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // No-op implementations - do nothing, return empty promises
  const noop = async () => {
    // Does nothing
  };

  const contextValue: AuthContextType = {
    user: null,
    token: null,
    login: noop,
    signup: noop,
    logout: () => {}, // sync noop
    forgotPassword: noop,
    resetPassword: noop,
    changePassword: noop,
    isLoading: false,
    isAuthenticated: false,
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
