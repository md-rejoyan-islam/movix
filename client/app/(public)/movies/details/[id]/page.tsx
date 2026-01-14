import SingleMovie from "@/components/details/single-movie-details";
import { getPosterImageFullPath } from "@/lib/helper";
import { defaultSEO, siteName, siteUrl } from "@/lib/seo";
import { Metadata } from "next";

type Props = {
  readonly params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  // fetch post information
  const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_KEY!,
    },
  }).then((res) => res.json());

  if (movie.title) {
    const posterImage = getPosterImageFullPath(movie.poster_path || "");
    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : "";
    const title = releaseYear ? `${movie.title} (${releaseYear})` : movie.title;
    const description =
      movie.overview ||
      `Watch ${movie.title} on ${siteName}. Get details, ratings, cast information and more.`;

    return {
      title,
      description,
      keywords: [
        movie.title.toLowerCase(),
        "movie",
        "watch online",
        "streaming",
        ...(movie.genres?.map((g: { name: string }) => g.name.toLowerCase()) ||
          []),
        ...defaultSEO.keywords,
      ],
      alternates: {
        canonical: `${siteUrl}/movies/details/${id}`,
      },
      openGraph: {
        title: `${title} | ${siteName}`,
        description,
        url: `${siteUrl}/movies/details/${id}`,
        images: [
          {
            url: posterImage,
            width: 500,
            height: 750,
            alt: movie.title,
          },
        ],
        siteName,
        type: "video.movie",
        ...(movie.release_date && { releaseDate: movie.release_date }),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${siteName}`,
        description,
        images: [posterImage],
        site: defaultSEO.twitter.site,
        creator: defaultSEO.twitter.creator,
      },
      other: {
        ...(movie.vote_average && {
          "og:rating": movie.vote_average.toFixed(1),
        }),
      },
    };
  }

  return {
    title: "Movie Not Found",
    description:
      "The movie you are looking for does not exist or has been removed.",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `Movie Not Found | ${siteName}`,
      description:
        "The movie you are looking for does not exist or has been removed.",
      url: `${siteUrl}/movies/details/${id}`,
      siteName,
      type: "website",
    },
  };
}

export default async function Details({ params }: Props) {
  const { id } = await params;
  return (
    <div className="pt-[61px]">
      <SingleMovie href={`movie/${id}`} />
    </div>
  );
}
