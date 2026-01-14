import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Forgot Password",
  description:
    "Reset your Movix account password. Enter your email address to receive password reset instructions.",
  path: "/forgot-password",
  noIndex: true,
  keywords: ["forgot password", "reset password", "password recovery"],
});

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
