/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  BarChart3,
  CheckCircle,
  Smartphone,
  Download,
  AlertCircle,
  X,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/hooks/useAxios";
// import { setAccessToken } from "@/hooks/useAxios";

// Icons component
const Icons = {
  spinner: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  ),
};

// Custom Error Toast Component
const ErrorToast = ({
  errorMessage,
  onClose,
}: {
  errorMessage: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-2xl w-full animate-slide-in">
      <div className="bg-card border-2 border-destructive rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg">Sign In Failed</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 transition-all hover:rotate-90 duration-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 bg-destructive/5 max-h-96 overflow-auto">
          <pre className="text-foreground font-mono text-sm whitespace-pre-wrap break-words">
            {errorMessage}
          </pre>
        </div>

        <div className="p-4 bg-muted/50 border-t border-destructive/10">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all font-medium transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Dismiss
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      const response = await axios.post("/auth/signin", {
        email: data.email,
        password: data.password,
      });

      const accessToken = response.data?.data?.accessToken;
      if (accessToken) {
        setAccessToken(accessToken);
        console.log(
          "✅ Access token stored:",
          accessToken.substring(0, 20) + "...",
        );
      } else {
        throw new Error("No access token in response");
      }

      router.push("/lms/dashboard");
      toast.success("Welcome back! Successfully signed in! 🎉");
    } catch (error: any) {
      console.log(error);

      // Get the ENTIRE error response and save it
      const fullErrorResponse = JSON.stringify(
        error.response?.data || error,
        null,
        2,
      );
      setErrorMessage(fullErrorResponse);

      const errorMsg =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      toast.error(errorMsg);
      setError("root", { message: errorMsg });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Error Toast */}
      {errorMessage && (
        <ErrorToast
          errorMessage={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {/* Left side - Modern Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center relative z-10">
        <div className="max-w-xl mx-auto">
          {/* Logo */}
          <div className="flex items-center mb-12 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 opacity-60"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Bskilling
              </h1>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Learning Platform
              </p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Learning Journey
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Continue where you left off and unlock new knowledge every day
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  50K+
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Students
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <BookOpen className="h-6 w-6 text-indigo-600 mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  200+
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Courses
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Award className="h-6 w-6 text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  95%
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Success
                </div>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized learning experience",
              },
              {
                icon: Users,
                title: "Collaborative",
                desc: "Learn together with peers",
              },
              {
                icon: BarChart3,
                title: "Track Progress",
                desc: "Detailed analytics dashboard",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Modern Signin Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-60"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Bskilling
                </span>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl relative overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 dark:from-blue-600/10 dark:to-indigo-600/10"></div>

            <CardHeader className="text-center pb-6 pt-8 relative z-10">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                Sign in to continue your learning adventure
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8 relative z-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {errors.root && (
                  <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 backdrop-blur-sm">
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      {errors.root.message}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`h-12 pr-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                          errors.password
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : ""
                        }`}
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded transition-all"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    {/* This linked to /forgot-password, a route that does not
                        exist — a dead end at the exact moment a locked-out
                        user needs help. The reset flow lives in AuthModal
                        (ForgotView / useAuth().forgotPassword); until it has
                        its own route, point people somewhere a human answers. */}
                    <Link
                      href="/contact?type=general"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Icons.spinner className="h-5 w-5 animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In to Dashboard
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer Features */}
          <div className="mt-6 text-center">
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-4 shadow-lg">
              <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  <CheckCircle className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile App</span>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  <Download className="h-4 w-4" />
                  <span>Offline Mode</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              By signing in, you agree to our{" "}
              <Link
                href="/terms-and-conditions"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
