import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Create Account",
  description:
    "Create a free Movix account to build your watchlist, save favorite movies and TV shows, and get personalized recommendations.",
  path: "/register",
  noIndex: true,
  keywords: ["register", "sign up", "create account", "join", "free account"],
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
