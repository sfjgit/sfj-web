// Zustand store with localStorage persistence
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface VerificationStore {
  phoneNumber: string;
  email: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  accessToken: string;
  setPhoneNumber: (phone: string) => void;
  setEmail: (email: string) => void;
  setPhoneVerified: (verified: boolean) => void;
  setEmailVerified: (verified: boolean) => void;
  setAccessToken: (token: string) => void;
  reset: () => void;
}

export const useVerificationStore = create<VerificationStore>()(
  persist(
    (set) => ({
      phoneNumber: "",
      email: "",
      phoneVerified: false,
      emailVerified: false,
      accessToken: "",
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setEmail: (email) => set({ email: email }),
      setPhoneVerified: (verified) => set({ phoneVerified: verified }),
      setEmailVerified: (verified) => set({ emailVerified: verified }),
      setAccessToken: (token) => set({ accessToken: token }),
      reset: () =>
        set({
          phoneNumber: "",
          email: "",
          phoneVerified: false,
          emailVerified: false,
          accessToken: "",
        }),
    }),
    {
      name: "nm-verification",
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
        email: state.email,
        phoneVerified: state.phoneVerified,
        emailVerified: state.emailVerified,
        accessToken: state.accessToken,
      }),
    }
  )
);
