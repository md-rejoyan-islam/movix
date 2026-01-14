import TvShowsFiltering from "@/components/tv-shows/tv-shows-filtering";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "TV Shows",
  description:
    "Explore and discover popular TV shows and series. Filter by genre, sort by popularity, rating, or air date. Find your next binge-worthy show on Movix.",
  path: "/tv-shows",
  keywords: [
    "tv shows",
    "tv series",
    "browse tv shows",
    "popular series",
    "streaming shows",
    "drama series",
    "comedy series",
    "thriller series",
    "documentary series",
  ],
});

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
