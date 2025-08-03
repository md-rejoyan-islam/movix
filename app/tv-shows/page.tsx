import TvShowsFiltering from "@/components/tv-shows/tv-shows-filtering";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows - Movix",
  description: "Find your favorite TV shows here and can sort them by genres.",
  openGraph: {
    title: "TV Shows",
    description:
      "Find your favorite TV shows here and can sort them by genres.",
  },
};

type Props = {
  readonly searchParams: Promise<{ sort_by: string; with_genres: string }>;
};

async function PopularTvShows({ searchParams }: Props) {
  const { sort_by, with_genres } = await searchParams;

  return (
    <section className="max-w-container pt-[61px] pb-10  px-4">
      <div className="flex gap-8 md:flex-nowrap flex-wrap md:py-10 py-4">
        <TvShowsFiltering
          sort_by={sort_by}
          with_genres={decodeURIComponent(with_genres || "")}
        />
      </div>
    </section>
  );
}

export default PopularTvShows;
