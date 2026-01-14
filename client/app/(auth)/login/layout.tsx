import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Login",
  description:
    "Sign in to your Movix account to access your watchlist, save favorites, and get personalized movie recommendations.",
  path: "/login",
  noIndex: true,
  keywords: ["login", "sign in", "account", "authentication"],
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
