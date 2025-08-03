import SingleMovie from "@/components/details/single-movie-details";
import { getPosterImageFullPath } from "@/lib/helper";
import { Metadata } from "next";

type Props = {
  readonly params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  // fetch movie information
  const movie = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_KEY!,
    },
  }).then((res) => res.json());

  if (movie.name) {
    return {
      title: movie.original_name,
      description: movie.overview,
      openGraph: {
        title: movie.original_name,
        description: movie.overview,
        url: `https://movix-cinema.vercel.app/tv-shows/details/${id}`,
        images: [
          {
            url: getPosterImageFullPath(movie?.poster_path || ""),
            width: 1200,
            height: 630,
            alt: movie.original_title,
          },
        ],
        siteName: "Movix",
        type: "website",
      },
    };
  }

  return {
    title: "Movie Not Found",
    description: "The movie you are looking for does not exist.",
    openGraph: {
      title: "Movie Not Found",
      description: "The movie you are looking for does not exist.",
      url: `https://movix-cinema.vercel.app/tv-shows/details/${id}`,
      images: [],
      siteName: "Movix",
      type: "website",
    },
  };
}

export default async function Details({ params }: Props) {
  const { id } = await params;

  return (
    <div className="pt-[61px]">
      <SingleMovie href={`tv/${id}`} />
    </div>
  );
}
