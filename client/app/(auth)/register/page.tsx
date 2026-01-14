"use client";

import { useRegisterMutation } from "@/lib/features/auth/auth-slice";
import { setCredentials } from "@/lib/features/auth/auth-state-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

// Zod validation schema
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// Helper to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return "Registration failed. Please try again.";
};

const passwordRequirements = [
  { label: "At least 8 characters", regex: /.{8,}/ },
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One number", regex: /[0-9]/ },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  // Get typed error message
  const errorMessage = error ? getErrorMessage(error) : null;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser({
        fullName: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ user: result.user, tokens: result.tokens }));
      router.push("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink/20 rounded-full blur-[128px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-secondary/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange to-pink mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-white/60">
              Join Movix and discover amazing content
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.name ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-white/40 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/50 transition-all`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-white/40 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/50 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border ${
                    errors.password ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-white/40 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/50 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}

              {/* Password Requirements */}
              {watchPassword && (
                <div className="mt-3 space-y-1.5">
                  {passwordRequirements.map((req, index) => {
                    const isValid = req.regex.test(watchPassword);
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-2 text-xs ${
                          isValid ? "text-green-400" : "text-white/40"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isValid ? "opacity-100" : "opacity-40"
                          }`}
                        />
                        <span>{req.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/10"
                  } text-white placeholder:text-white/40 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/50 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange to-pink text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-secondary text-white/40">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="w-full py-3.5 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
          >
            Sign In Instead
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-white/40 text-sm">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="text-pink hover:text-orange transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-pink hover:text-orange transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
