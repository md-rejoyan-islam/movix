import SearchResult from "@/components/search/search-result";
import { siteName, siteUrl } from "@/lib/seo";
import { Metadata } from "next";

type Props = {
  readonly searchParams: Promise<{ title: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { title } = await searchParams;
  const searchQuery = title || "movies and TV shows";

  return {
    title: `Search: "${searchQuery}"`,
    description: `Search results for "${searchQuery}" - Find movies, TV shows, and more matching your search on ${siteName}.`,
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `Search: "${searchQuery}" | ${siteName}`,
      description: `Search results for "${searchQuery}" - Find movies, TV shows, and more matching your search.`,
      url: `${siteUrl}/search?title=${encodeURIComponent(searchQuery)}`,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Search: "${searchQuery}" | ${siteName}`,
      description: `Search results for "${searchQuery}" - Find movies, TV shows, and more.`,
    },
  };
}

export default async function Search({ searchParams }: Props) {
  const { title } = await searchParams;

  return (
    <section className="max-w-container pt-[61px] min-h-[calc(100vh-238px)] pb-10  px-4 ">
      <div className="w-full  text-white pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold  md:text-left text-center ">
          Search results for &quot;{title}&quot;
        </h1>
      </div>
      <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pt-5">
        {/* <SingleMovie /> */}
        <SearchResult title={title} />
      </div>
    </section>
  );
}
