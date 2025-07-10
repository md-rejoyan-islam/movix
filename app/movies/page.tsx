import MoviesFiltering from "@/components/movies/movies-filtering";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies - Movix",
  description: "Find your favorite movies here and can sort them by genres.",
  openGraph: {
    title: "Movies",
    description: "Find your favorite movies here and can sort them by genres.",
  },
};

type Props = {
  searchParams: Promise<{ sort_by: string; with_genres: string }>;
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
