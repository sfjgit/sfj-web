/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useAuthStore } from "../../stores/authStore";
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
  CheckCircle,
  Smartphone,
  Download,
  UserPlus,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

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

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  // const { login, setLoading, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);

    try {
      await axios.post("/auth/signup", {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        password: data.password,
        metadata: JSON.stringify({}),
      });
      router.push("/app/dashboard");
      toast.success("Account created successfully! Welcome aboard! 🎉");
      // login(response.data.user, response.data.accessToken);
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setError("root", { message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - LMS Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-12 gap-3 transform rotate-12 scale-150">
              {[...Array(144)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-primary-foreground rounded-full opacity-30"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-primary-foreground">
          <div className="flex items-center mb-8">
            <div className="bg-primary-foreground/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Bskilling LMS</h1>
              <p className="text-primary-foreground/80 text-sm font-medium">
                Learning Management System
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Transform Your Learning Journey
          </h2>
          <p className="text-xl mb-12 text-primary-foreground/90 leading-relaxed">
            Join thousands of learners advancing their careers with our
            comprehensive learning management system.
          </p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mr-5 backdrop-blur-sm">
                <BookOpen className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Comprehensive Courses
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Access to 1000+ courses across various domains and skill
                  levels
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mr-5 backdrop-blur-sm">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Expert Instructors
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Learn from industry professionals and leading academics
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mr-5 backdrop-blur-sm">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Certified Learning
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Earn certificates and digital badges to boost your career
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mr-5 backdrop-blur-sm">
                <Globe className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Global Community</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Connect with learners and professionals worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 right-16 w-24 h-24 bg-primary-foreground/10 rounded-full blur-sm"></div>
        <div className="absolute bottom-32 right-24 w-16 h-16 bg-primary-foreground/15 rounded-full"></div>
        <div className="absolute top-1/3 right-8 w-8 h-8 bg-primary-foreground/20 rounded-full"></div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Card className="border border-border shadow-xl bg-card">
            <CardHeader className="text-center pb-6 pt-8">
              <div className="flex justify-center mb-6 lg:hidden">
                <div className="flex items-center">
                  <div className="bg-primary p-2 rounded-lg mr-3">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      Bskilling LMS
                    </span>
                    <p className="text-xs text-muted-foreground font-medium">
                      LMS
                    </p>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Join our learning community and unlock your potential
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {errors.root && (
                  <Alert
                    variant="destructive"
                    className="border-destructive/50 bg-destructive/10"
                  >
                    <AlertDescription className="text-destructive">
                      {errors.root.message}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={`h-11 transition-all duration-200 bg-input border-border focus:border-ring focus:ring-2 focus:ring-ring/20 ${
                        errors.name
                          ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                          : ""
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-destructive flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@university.edu"
                      className={`h-11 transition-all duration-200 bg-input border-border focus:border-ring focus:ring-2 focus:ring-ring/20 ${
                        errors.email
                          ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                          : ""
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-destructive flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Phone Number{" "}
                      <span className="text-muted-foreground text-xs">
                        (Optional)
                      </span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="h-11 transition-all duration-200 bg-input border-border focus:border-ring focus:ring-2 focus:ring-ring/20"
                      {...register("phone")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={`h-11 pr-12 transition-all duration-200 bg-input border-border focus:border-ring focus:ring-2 focus:ring-ring/20 ${
                          errors.password
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
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
                          <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-destructive flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`h-11 pr-12 transition-all duration-200 bg-input border-border focus:border-ring focus:ring-2 focus:ring-ring/20 ${
                          errors.confirmPassword
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                            : ""
                        }`}
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-destructive flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center mb-4">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-ring border-border rounded"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms-and-conditions"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-primary/40 text-primary-foreground font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.01] disabled:scale-100 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center justify-center">
                      <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Create Account
                    </div>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-medium">
                      Or
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional LMS benefits */}
          <div className="mt-8 text-center">
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Join Bskilling LMS Today
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-primary mr-2" />
                  <span>Free Trial</span>
                </div>
                <div className="flex items-center">
                  <Smartphone className="h-3 w-3 text-primary mr-2" />
                  <span>Mobile App</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-3 w-3 text-primary mr-2" />
                  <span>Offline Access</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-3 w-3 text-primary mr-2" />
                  <span>Certificates</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Start your learning journey with our 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// export default function page() {
//   return <div></div>;
// }
