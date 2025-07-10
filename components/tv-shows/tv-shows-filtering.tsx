"use client";
import Loading from "@/app/loading";
import LoadingCard from "@/components/movie-card/loading-card";
import MovieCard from "@/components/movie-card/movie-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "@/hooks/use-debounce-callback";
import useInfityScroll from "@/hooks/use-infity-scroll";
import {
  useGetGenreListQuery,
  useSortingMoviesQuery,
} from "@/lib/features/movie/movie-api";
import { getGenreNames, sortingOptions } from "@/lib/helper";
import { Genre } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function TvShowsFiltering({
  sort_by,
  with_genres,
}: {
  sort_by?: string;
  with_genres?: string;
}) {
  const [sortBy, setSortBy] = React.useState<string>(sort_by || "");
  const [page, setPage] = React.useState<number>(1);
  //   const [moviesList, setMoviesList] = React.useState<TopMoviesDetails[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    with_genres
      ? with_genres.split(",").map((id) => ({
          id: +id,
          name: "",
        }))
      : []
  );

  const { data, isLoading, isFetching } = useSortingMoviesQuery(
    `discover/tv?page=${page}&sort_by=${sortBy}&with_genres=${selectedGenres.map(
      (genre) => genre.id
    )}`
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
    // setMoviesList([]);

    params.delete("sort_by");
    params.append("sort_by", value);
    router.push(`/tv-shows?${params.toString()}`);
  };

  const { data: { genres = [] } = {} } = useGetGenreListQuery("/tv/list");

  const { moviesList, setMoviesList } = useInfityScroll({
    data,
    isFetching,
    isLoading,
    page,
    setPage,
  });

  const handleGenreChange = useDebouncedCallback(
    (
      checked: boolean,
      genre: {
        id: number;
        name: string;
      }
    ) => {
      setPage(1);
      setMoviesList([]);
      if (checked) {
        setSelectedGenres([
          ...selectedGenres,
          {
            id: genre.id,
            name: genre.name,
          },
        ]);
        if (params.has("with_genres")) {
          const existingGenres = params.get("with_genres")?.split(",");
          if (existingGenres) {
            existingGenres.push(genre.id.toString());
            params.set("with_genres", existingGenres.join(","));
          }
        } else {
          params.append("with_genres", genre.id.toString());
        }
      } else {
        const existingGenres = params.get("with_genres")?.split(",");
        if (existingGenres) {
          const updatedGenres = existingGenres.filter(
            (id) => id !== genre.id.toString()
          );
          if (updatedGenres.length > 0) {
            params.set("with_genres", updatedGenres.join(","));
          } else {
            params.delete("with_genres");
          }
        }
        setSelectedGenres(
          selectedGenres.filter((item) => item.id !== genre.id)
        );
      }
      router.push(`/tv-shows?${params.toString()}`);
    },
    500
  );

  // Load data into moviesList when data or page changes
  //   React.useEffect(() => {
  //     if (data && data?.results) {
  //       setMoviesList((prev) => {
  //         const combined = page === 1 ? data.results : [...prev, ...data.results];
  //         // Remove duplicates by creating a Map with unique movie IDs
  //         const uniqueMovies = Array.from(
  //           new Map(combined.map((movie) => [movie.id, movie])).values()
  //         );
  //         return uniqueMovies;
  //       });
  //     }
  //   }, [data, page]);

  //   const handleScrollLogic = useCallback(() => {
  //     if (typeof window !== "undefined" && typeof document !== "undefined") {
  //       const isBottom =
  //         window.innerHeight + window.scrollY >=
  //         document.documentElement.scrollHeight - 800;

  //       if (isBottom && !isLoading && !isFetching) {
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     }
  //   }, [isLoading, isFetching]);

  //   const debouncedHandleScroll = useDebouncedCallback(handleScrollLogic, 200);

  //   React.useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       window.addEventListener("scroll", debouncedHandleScroll);
  //     }
  //     return () => {
  //       if (typeof window !== "undefined") {
  //         window.removeEventListener("scroll", debouncedHandleScroll);
  //       }
  //     };
  //   }, [debouncedHandleScroll]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="min-w-[260px] space-y-4 w-full md:max-w-[280px] text-white md:sticky top-[80px] md:max-h-[572px] md:overflow-auto  md:h-screen">
        <h1 className="text-[24px] text-white text-nowrap px-2 ">
          Explore TV Shows
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-3  mb-2"
          defaultValue="item-2"
        >
          <AccordionItem
            value="item-1"
            className="bg-[#113a78c1] rounded-md border-none"
          >
            <AccordionTrigger className="hover:no-underline py-2 px-3">
              Sort
            </AccordionTrigger>
            <AccordionContent className="border-t pt-2 px-3 border-[#031022]">
              <Select
                onValueChange={(value) => handleSortChange(value)}
                defaultValue={sortBy}
              >
                <SelectTrigger className="min-w-[130px] bg-black/40 text-white border-sky-600/60  focus:ring-sky-600/40 w-full  focus:ring-offset-0  ">
                  <SelectValue placeholder="Sorting Tv-Shows" />
                </SelectTrigger>
                <SelectContent className="bg-[#04152cf1] text-white border-sky-600/40 ">
                  {sortingOptions.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="bg-[#113a78c1] rounded-md border-none "
          >
            <AccordionTrigger className=" hover:no-underline py-2 px-4">
              Genres
            </AccordionTrigger>
            <AccordionContent className="border-t pt-2 border-[#031022] px-4">
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => (
                  <div key={genre.id} className="inline-block">
                    <input
                      type="checkbox"
                      id={genre.name}
                      name={genre.name}
                      className="rounded-sm text-pink hidden"
                      onChange={(e) =>
                        handleGenreChange(e.target.checked, genre)
                      }
                      checked={selectedGenres.some(
                        (selected) => selected.id === genre.id
                      )}
                    />
                    <label
                      htmlFor={genre.name}
                      className={`${
                        selectedGenres.find(
                          (selected) => selected.id === genre.id
                        )
                          ? "bg-pink border-none"
                          : ""
                      }  text-[12px] cursor-pointer text-white border border-bg_primary inline-block px-4 rounded-full py-1`}
                    >
                      {genre.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="card-items flex-1 grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2  pt-3 gap-x-4 gap-y-7  ">
        {/* if movies not found  */}
        {moviesList.length === 0 && !isFetching && (
          <div className="w-full text-center text-white py-8 col-span-full">
            <h2 className="text-2xl text-red-400">No Tv Shows Found</h2>
          </div>
        )}
        {moviesList.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.name || movie.title || ""}
            image={movie.poster_path}
            date={movie.first_air_date || movie.release_date || ""}
            rating={movie.vote_average}
            genres={
              getGenreNames(movie, genres).filter(
                (genre) => genre !== undefined
              ) as string[]
            }
            href={`/tv-shows/details/${movie.id}`}
            type="tv"
          />
        ))}
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
      </div>
    </>
  );
}

export default TvShowsFiltering;
