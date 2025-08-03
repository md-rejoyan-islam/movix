import SearchResult from "@/components/search/search-result";
import { Metadata } from "next";

type Props = {
  readonly searchParams: Promise<{ title: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { title } = await searchParams;

  return {
    title: `Search results for "${title}"`,
    description: `Search results for movies and TV shows related to "${title}".`,
    openGraph: {
      title: `Search results for "${title}"`,
      description: `Search results for movies and TV shows related to "${title}".`,
      url: `https://movix-cinema.vercel.app/search?title=${encodeURIComponent(
        title
      )}`,
      siteName: "Movix",
      type: "website",
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
