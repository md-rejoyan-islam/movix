import { Metadata } from "next";

/**
 * SEO Configuration for Movix
 * Centralized SEO settings and utilities
 */

// Get site URL from environment variable
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://movix-cinema.vercel.app";

// Get site name from environment variable
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Movix";

// Default SEO configuration
export const defaultSEO = {
  siteName,
  siteUrl,
  title: "Movix - Discover Movies & TV Shows",
  description:
    "Discover, explore, and track your favorite movies and TV shows. Search through millions of titles, compare films, build your watchlist, and get personalized recommendations.",
  keywords: [
    "movies",
    "tv shows",
    "movie database",
    "movie search",
    "tv show search",
    "movie recommendations",
    "watchlist",
    "film comparison",
    "trending movies",
    "popular tv shows",
    "movie ratings",
    "movie reviews",
    "streaming",
    "entertainment",
    "cinema",
    "movix",
  ],
  author: {
    name: "Md Rejoyan Islam",
    url: "https://rejoyan.me",
  },
  twitter: {
    site: "@rejoyanislam",
    creator: "@rejoyanislam",
  },
  ogImage: "/logo.png",
  logo: "/logo.png",
};

// Helper function to generate page metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const pageUrl = `${siteUrl}${path}`;
  const pageImage = image || defaultSEO.ogImage;
  const allKeywords = [...defaultSEO.keywords, ...keywords];

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: allKeywords,
    authors: [defaultSEO.author],
    creator: defaultSEO.author.name,
    publisher: siteName,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: pageUrl,
      siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      site: defaultSEO.twitter.site,
      creator: defaultSEO.twitter.creator,
      images: [pageImage],
    },
  };
}

// Helper function to generate dynamic metadata for detail pages
export function generateDetailMetadata({
  title,
  description,
  type,
  path,
  image,
  releaseDate,
  rating,
}: {
  title: string;
  description: string;
  type: "movie" | "tv";
  path: string;
  image?: string;
  releaseDate?: string;
  rating?: number;
}): Metadata {
  const pageUrl = `${siteUrl}${path}`;
  const pageImage = image || defaultSEO.ogImage;
  const typeLabel = type === "movie" ? "Movie" : "TV Show";

  const metaDescription =
    description ||
    `Watch ${title} on ${siteName}. Get details, ratings, cast information and more.`;

  return {
    title: `${title} (${typeLabel}) | ${siteName}`,
    description: metaDescription,
    keywords: [
      title.toLowerCase(),
      typeLabel.toLowerCase(),
      "watch",
      "stream",
      ...defaultSEO.keywords,
    ],
    authors: [defaultSEO.author],
    creator: defaultSEO.author.name,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} (${typeLabel})`,
      description: metaDescription,
      url: pageUrl,
      siteName,
      type: "video.movie",
      locale: "en_US",
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteName}`,
        },
      ],
      ...(releaseDate && {
        releaseDate,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} (${typeLabel}) | ${siteName}`,
      description: metaDescription,
      site: defaultSEO.twitter.site,
      creator: defaultSEO.twitter.creator,
      images: [pageImage],
    },
    other: {
      ...(rating && { "og:rating": rating.toString() }),
    },
  };
}

// JSON-LD Schema generators
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultSEO.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?title={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}${defaultSEO.logo}`,
    sameAs: [
      "https://twitter.com/rejoyanislam",
      "https://github.com/rejoyanislam",
    ],
  };
}

export function generateMovieSchema({
  title,
  description,
  image,
  releaseDate,
  rating,
  genres,
  director,
  actors,
  duration,
}: {
  title: string;
  description?: string;
  image?: string;
  releaseDate?: string;
  rating?: number;
  genres?: string[];
  director?: string;
  actors?: string[];
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title,
    description,
    image,
    datePublished: releaseDate,
    aggregateRating: rating
      ? {
          "@type": "AggregateRating",
          ratingValue: rating,
          bestRating: 10,
          worstRating: 0,
        }
      : undefined,
    genre: genres,
    director: director
      ? {
          "@type": "Person",
          name: director,
        }
      : undefined,
    actor: actors?.map((actor) => ({
      "@type": "Person",
      name: actor,
    })),
    duration,
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
