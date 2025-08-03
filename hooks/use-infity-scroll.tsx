"use client";

import { TopMoviesDetails } from "@/lib/types";
import React, { useCallback } from "react";
import { useDebouncedCallback } from "./use-debounce-callback";

const useInfityScroll = ({
  data,
  page,
  setPage,
  isFetching,
  isLoading,
}: {
  data: { results: TopMoviesDetails[] } | undefined;
  isFetching: boolean;
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [moviesList, setMoviesList] = React.useState<TopMoviesDetails[]>([]);

  React.useEffect(() => {
    if (data?.results) {
      setMoviesList((prev) => {
        const combined = page === 1 ? data.results : [...prev, ...data.results];

        const uniqueMovies = Array.from(
          new Map(combined.map((movie) => [movie.id, movie])).values()
        );
        return uniqueMovies;
      });
    }
  }, [data, page]);

  const handleScrollLogic = useCallback(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 800;

      if (isBottom && !isLoading && !isFetching) {
        setPage((prevPage: number) => prevPage + 1);
      }
    }
  }, [isLoading, isFetching, setPage]);

  const debouncedHandleScroll = useDebouncedCallback(handleScrollLogic, 200);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", debouncedHandleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, [debouncedHandleScroll]);

  return {
    moviesList,
    setMoviesList,
  };
};

export default useInfityScroll;
