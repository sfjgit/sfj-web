import { Suspense } from "react";
import CSRLandingPage from "../_components/HeroSection";
import { TabVisibilityProvider } from "../_components/TabVisibilityContext";

export default function AwsRestartPage() {
  return (
    <TabVisibilityProvider>
      <Suspense fallback={null}>
        <CSRLandingPage />
      </Suspense>
    </TabVisibilityProvider>
  );
}
