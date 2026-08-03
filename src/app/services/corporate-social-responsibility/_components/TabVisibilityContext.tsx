"use client";
import React, { createContext, useContext, useState } from "react";

type TabVisibilityContextType = {
  isAwsRestartActive: boolean;
  setIsAwsRestartActive: (value: boolean) => void;
};

const TabVisibilityContext = createContext<
  TabVisibilityContextType | undefined
>(undefined);

export const TabVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAwsRestartActive, setIsAwsRestartActive] = useState(false);
  return (
    <TabVisibilityContext.Provider
      value={{ isAwsRestartActive, setIsAwsRestartActive }}
    >
      {children}
    </TabVisibilityContext.Provider>
  );
};

export const useTabVisibility = () => {
  const ctx = useContext(TabVisibilityContext);
  if (!ctx)
    throw new Error(
      "useTabVisibility must be used inside TabVisibilityProvider",
    );
  return ctx;
};
