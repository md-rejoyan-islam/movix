import Banner from "@/components/home/banner";
import Popular from "@/components/home/popular";
import TopRated from "@/components/home/top-rated";
import Trending from "@/components/home/trending";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Movix",
  description:
    "Find your favorite movies and TV shows. Search, discover, and explore a vast collection of movies and TV shows with Movix.",
};

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
