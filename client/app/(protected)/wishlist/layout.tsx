import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "My Wishlist",
  description:
    "View and manage your personal movie and TV show wishlist. Keep track of everything you want to watch on Movix.",
  path: "/wishlist",
  noIndex: true,
  keywords: [
    "wishlist",
    "watchlist",
    "saved movies",
    "saved tv shows",
    "favorites",
  ],
});

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
