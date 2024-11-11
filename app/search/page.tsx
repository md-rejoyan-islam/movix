"use client";
import SmallMovieCard from "@/components/movie-card/small-movie-card";
import useSearch from "@/hooks/search/useSearch";
import { TopMoviesDetails } from "@/lib/types";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import Loading from "../loading";

export default function Search() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "sonic";

  const [moviesList, setMoviesList] = React.useState<TopMoviesDetails[]>([]);

  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = useSearch({
    title: title,
    page,
  });

  // Load data into moviesList when data or page changes
  React.useEffect(() => {
    if (data && data?.results) {
      setMoviesList((prev) => {
        const combined = page === 1 ? data.results : [...prev, ...data.results];
        // Remove duplicates by creating a Map with unique movie IDs
        const uniqueMovies = Array.from(
          new Map(combined.map((movie) => [movie.id, movie])).values()
        );
        return uniqueMovies;
      });
    }
  }, [data, page]);

  // Infinite scroll handler
  React.useEffect(() => {
    const debounceTimeout = 200; // debounce delay in ms
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Check if the user is within 10 pixels of the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 800;

      if (isBottom && !isLoading) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
        }, debounceTimeout);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  if (data?.results?.length === 0) notFound();

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-container pt-[61px] pb-10  px-4 ">
      <div className="w-full  text-white pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold  md:text-left text-center ">
          Search results for &quot;{title}&quot;
        </h1>
      </div>
      <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pt-5">
        {/* <SingleMovie /> */}
        {moviesList?.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            title={movie.name || movie.title || ""}
            date={movie.first_air_date || movie.release_date || ""}
            rating={movie.vote_average || 0}
            image={movie.poster_path}
            href={`/movies/details/${movie.id}`}
            type={movie.media_type || "movie"}
          />
        ))}
      </div>
    </section>
  );
}
