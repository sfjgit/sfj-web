// hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "LEARNER" | "TUTOR" | "ADMIN" | "SUPER_ADMIN";
  avatarUrl?: string;
  bio?: string;
  gender?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  isActive: boolean;
  createdAt: string;
  profilePic?: string;
}

export const useProfile = () => {
  const api = useAxios();

  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<UserProfile> => {
      const response = await api.get("/auth/me");
      const userData =
        response.data?.data?.user || response.data?.user || response.data;

      if (!userData) {
        throw new Error("No user data found");
      }

      return userData;
    },
  });
};

export const useUpdateProfile = () => {
  const api = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: Partial<UserProfile>) => {
      const response = await api.put("/auth/me", updateData);
      return response.data?.data?.user || response.data?.user || response.data;
    },
    onSuccess: (updatedUser) => {
      // Update the cache with new data
      queryClient.setQueryData(["profile"], updatedUser);
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });
};
