"use client";

import { useForgotPasswordMutation } from "@/lib/features/auth/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Forgot password failed:", err);
      // Still show success to not reveal if email exists
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange/20 rounded-full blur-[128px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-secondary/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink to-orange mb-4">
                  <KeyRound className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Forgot Password?
                </h1>
                <p className="text-white/60">
                  No worries! Enter your email and we&apos;ll send you reset
                  instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink to-orange text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">
                  Check Your Email
                </h1>
                <p className="text-white/60 mb-2">
                  We&apos;ve sent a password reset link to:
                </p>
                <p className="text-pink font-medium text-lg mb-6">
                  {submittedEmail}
                </p>
                <p className="text-white/50 text-sm mb-8">
                  Didn&apos;t receive the email? Check your spam folder or try
                  again.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedEmail("");
                    }}
                    className="w-full py-3.5 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    Try Another Email
                  </button>

                  <Link
                    href="/login"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink to-orange text-white font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-white/40 text-sm">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-pink hover:text-orange transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
