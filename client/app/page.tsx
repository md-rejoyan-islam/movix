import Banner from "@/components/home/banner";
import Popular from "@/components/home/popular";
import TopRated from "@/components/home/top-rated";
import Trending from "@/components/home/trending";
import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Home",
  description:
    "Discover, explore, and track your favorite movies and TV shows. Search through millions of titles, find trending content, see what's popular, and explore top-rated films on Movix.",
  path: "/",
  keywords: [
    "home",
    "discover movies",
    "trending movies",
    "popular tv shows",
    "top rated films",
    "new releases",
    "streaming",
  ],
});

export default function Home() {
  return (
    <>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
}
