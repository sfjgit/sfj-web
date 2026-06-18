/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { setAccessToken } from "@/hooks/useAxios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninForm({ onSuccess }: { onSuccess?: () => void }) {
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await axios.post("/auth/signin", data);

      const accessToken = response.data?.data?.accessToken;
      if (!accessToken) throw new Error("No token");

      setAccessToken(accessToken);

      toast.success("Welcome back! 🎉");

      window.dispatchEvent(new Event("auth-changed"));

      // ✅ close modal instead of redirect
      onSuccess?.();

      // optional: still redirect if needed
      //   router.push("/lms/dashboard");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Invalid credentials";

      setErrorMessage(JSON.stringify(error.response?.data || error, null, 2));
      toast.error(msg);
      setError("root", { message: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <Alert>
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
