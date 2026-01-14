import MoviesFiltering from "@/components/movies/movies-filtering";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Movies",
  description:
    "Browse and discover thousands of movies. Filter by genre, sort by popularity, rating, or release date. Find your next favorite film on Movix.",
  path: "/movies",
  keywords: [
    "browse movies",
    "movie list",
    "filter movies",
    "movie genres",
    "action movies",
    "comedy movies",
    "drama movies",
    "horror movies",
    "sci-fi movies",
  ],
});

type Props = {
  readonly searchParams: Promise<{ sort_by: string; with_genres: string }>;
};

async function Movies({ searchParams }: Props) {
  const { sort_by, with_genres } = await searchParams;
  return (
    <section className="pt-[61px]">
      <div className="max-w-container py-8 md:py-12 px-4">
        <MoviesFiltering
          sort_by={sort_by}
          with_genres={decodeURIComponent(with_genres || "")}
        />
      </div>
    </section>
  );
}

export default Movies;
