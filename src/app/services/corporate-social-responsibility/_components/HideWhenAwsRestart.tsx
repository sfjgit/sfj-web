"use client";
import React from "react";
import { useTabVisibility } from "./TabVisibilityContext";

export default function HideWhenAwsRestart({ children }: { children: React.ReactNode }) {
  const { isAwsRestartActive } = useTabVisibility();
  if (isAwsRestartActive) return null;
  return <>{children}</>;
}