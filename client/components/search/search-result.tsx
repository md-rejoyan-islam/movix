"use client";

import Loading from "@/app/loading";
import { useDebouncedCallback } from "@/hooks/use-debounce-callback";
import { useGetSearchedMoviesQuery } from "@/lib/features/movie/movie-api";
import { TopMoviesDetails } from "@/lib/types";
import React, { useCallback } from "react";
import LoadingCard from "../movie-card/loading-card";
import SmallMovieCard from "../movie-card/small-movie-card";

const SearchResult = ({ title }: { title: string }) => {
  const [moviesList, setMoviesList] = React.useState<TopMoviesDetails[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading, refetch, isFetching } = useGetSearchedMoviesQuery({
    query: title,
    page: page,
  });

  React.useEffect(() => {
    if (title) {
      setMoviesList([]); // Reset movies list when title changes
      setPage(1); // Reset page to 1 when title changes
      refetch(); // Refetch data with the new title
    }
  }, [title, refetch]);

  React.useEffect(() => {
    if (data?.results) {
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

  const handleScrollLogic = useCallback(() => {
    const isBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 800;

    if (isBottom && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  const debouncedHandleScroll = useDebouncedCallback(handleScrollLogic, 200);

  React.useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  if (isLoading) return <Loading />;

  return (
    <>
      {moviesList.length === 0 && (
        <div className="text-center text-red-400 py-10 col-span-full  ">
          <h2 className="text-2xl font-semibold">
            No results found for &quot;{title}&quot;
          </h2>
        </div>
      )}

      {moviesList.map((movie) => (
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

      {isFetching &&
        Array.from({ length: 20 }, (_, i) => i).map((val) => (
          <LoadingCard key={val} />
        ))}
    </>
  );
};

export default SearchResult;
