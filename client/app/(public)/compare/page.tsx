import CompareMovies from "@/components/compare/compare-movies";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Compare Movies",
  description:
    "Compare up to 3 movies or TV shows side by side. Compare ratings, runtime, genres, release dates, and more to help you decide what to watch next.",
  path: "/compare",
  keywords: [
    "compare movies",
    "movie comparison",
    "compare tv shows",
    "side by side comparison",
    "movie ratings comparison",
    "which movie to watch",
  ],
});

export default function ComparePage() {
  return (
    <section className="pt-[61px] min-h-screen">
      <div className="max-w-container py-8 md:py-12 px-4">
        <CompareMovies />
      </div>
    </section>
  );
}
