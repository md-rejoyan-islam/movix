import SingleMovie from "@/components/details/single-movie-details";
import { getPosterImageFullPath } from "@/lib/helper";
import { defaultSEO, siteName, siteUrl } from "@/lib/seo";
import { Metadata } from "next";

type Props = {
  readonly params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  // fetch TV show information
  const tvShow = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_KEY!,
    },
  }).then((res) => res.json());

  if (tvShow.name) {
    const posterImage = getPosterImageFullPath(tvShow.poster_path || "");
    const firstAirYear = tvShow.first_air_date
      ? new Date(tvShow.first_air_date).getFullYear()
      : "";
    const title = firstAirYear
      ? `${tvShow.name} (${firstAirYear})`
      : tvShow.name;
    const description =
      tvShow.overview ||
      `Watch ${tvShow.name} on ${siteName}. Get details, ratings, cast information and more.`;

    return {
      title: `${title} - TV Show`,
      description,
      keywords: [
        tvShow.name.toLowerCase(),
        "tv show",
        "series",
        "watch online",
        "streaming",
        ...(tvShow.genres?.map((g: { name: string }) => g.name.toLowerCase()) ||
          []),
        ...defaultSEO.keywords,
      ],
      alternates: {
        canonical: `${siteUrl}/tv-shows/details/${id}`,
      },
      openGraph: {
        title: `${title} (TV Show) | ${siteName}`,
        description,
        url: `${siteUrl}/tv-shows/details/${id}`,
        images: [
          {
            url: posterImage,
            width: 500,
            height: 750,
            alt: tvShow.name,
          },
        ],
        siteName,
        type: "video.tv_show",
        ...(tvShow.first_air_date && { releaseDate: tvShow.first_air_date }),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} (TV Show) | ${siteName}`,
        description,
        images: [posterImage],
        site: defaultSEO.twitter.site,
        creator: defaultSEO.twitter.creator,
      },
      other: {
        ...(tvShow.vote_average && {
          "og:rating": tvShow.vote_average.toFixed(1),
        }),
        ...(tvShow.number_of_seasons && {
          "og:seasons": tvShow.number_of_seasons.toString(),
        }),
      },
    };
  }

  return {
    title: "TV Show Not Found",
    description:
      "The TV show you are looking for does not exist or has been removed.",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `TV Show Not Found | ${siteName}`,
      description:
        "The TV show you are looking for does not exist or has been removed.",
      url: `${siteUrl}/tv-shows/details/${id}`,
      siteName,
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
