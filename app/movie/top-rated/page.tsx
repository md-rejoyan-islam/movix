"use client";
import LoadingCard from "@/components/movie-card/loading-card";
import MovieCard from "@/components/movie-card/movie-card";
import MultipleSelector from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSortingMoviesQuery } from "@/lib/features/movie/movie-api";
import { TopMoviesDetails } from "@/lib/types";
import React from "react";

function TopRated() {
  const [sortBy, setSortBy] = React.useState<string>("popularity.desc");
  const [page, setPage] = React.useState<number>(1);
  const [moviesList, setMoviesList] = React.useState<TopMoviesDetails[]>([]);

  const { data, isLoading, isFetching } = useSortingMoviesQuery(
    `discover/tv?page=${page}&sort_by=${sortBy}`
  );

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
    const debounceTimeout = 300; // debounce delay in ms
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

  const options = [
    { value: "popularity.asc", label: "Popularity Ascending" },
    {
      value: "popularity.desc",
      label: "Popularity Descending",
      // disable: true,
    },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },

    {
      value: "first_air_date.asc",
      label: "Release Date Ascending",
    },
    {
      value: "first_air_date.desc",
      label: "Release Date Descending",
    },
  ];

  return (
    <section className="pt-[61px]">
      <div className="max-w-container py-8 md:py-12 px-4">
        <div className="flex gap-4 md:items-center justify-between flex-wrap md:flex-nowrap flex-col md:flex-row">
          <h2 className="text-[24px] text-white text-nowrap px-2">
            Top Rated Movies
          </h2>
          <div className="flex gap-3 flex-wrap md:flex-nowrap items-center">
            <Select
              onValueChange={(value) => {
                setSortBy(value);
                setPage(1);
                setMoviesList([]);
              }}
              defaultValue="popularity.desc"
            >
              <SelectTrigger className="min-w-[130px] bg-black/10 text-white border-sky-600  focus:ring-sky-600 focus:ring-offset-0 max-w-[220px] ">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-[#031022] text-white border-sky-700">
                <SelectGroup>
                  <SelectLabel>Sorting By</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <MultipleSelector
              defaultOptions={options}
              placeholder="Select Genres"
              onChange={(selected) => console.log(selected)}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-white/90 ">
                  no results found.
                </p>
              }
            />
          </div>
        </div>
        {/* <div className="card-items flex flex-wrap justify-between   gap-x-4 gap-y-8 pt-6"> */}
        <div className="card-items grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2   gap-x-4 gap-y-6 pt-6">
          {moviesList.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.name || movie.title || ""}
              image={movie.poster_path}
              date={movie.first_air_date || movie.release_date || ""}
              rating={movie.vote_average}
            />
          ))}
          {isFetching &&
            Array.from({ length: 20 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TopRated;
