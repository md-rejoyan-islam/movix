"use client";
import Loading from "@/app/loading";
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
import { useDebouncedCallback } from "@/hooks/use-debounce-callback";
import useInfityScroll from "@/hooks/use-infity-scroll";
import {
  useGetGenreListQuery,
  useSortingMoviesQuery,
} from "@/lib/features/movie/movie-api";
import { getGenreNames, sortingOptions } from "@/lib/helper";
import { Genre } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function MoviesFiltering({
  sort_by,
  with_genres,
}: {
  readonly sort_by?: string;
  readonly with_genres?: string;
}) {
  const [sortBy, setSortBy] = useState<string>(sort_by || "");
  const [page, setPage] = useState<number>(1);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    with_genres
      ? with_genres.split(",").map((id) => ({
          id: +id,
          name: "",
        }))
      : []
  );

  const { data, isLoading, isFetching } = useSortingMoviesQuery(
    `discover/movie?page=${page}&sort_by=${sortBy}&with_genres=${selectedGenres.map(
      (genre) => genre.id
    )}`
  );

  const { data: { genres = [] } = {} } = useGetGenreListQuery("/movie/list");

  const { moviesList, setMoviesList } = useInfityScroll({
    page,
    data,
    setPage,
    isFetching,
    isLoading,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
    setMoviesList([]);

    params.delete("sort_by");
    params.append("sort_by", value);
    router.push(`/movies?${params.toString()}`);
  };

  const genresList = genres.map((genre) => ({
    label: genre.name,
    value: genre.id.toString(),
  }));

  const handleGenreChange = useDebouncedCallback(
    (selected: { value: string; label: string }[]) => {
      setSelectedGenres(
        selected.map((genre) => ({
          id: parseInt(genre.value),
          name: genre.label,
        }))
      );
      setPage(1);
      setMoviesList([]);
      params.delete("with_genres");
      if (selected.length > 0) {
        params.append(
          "with_genres",
          selected.map((genre) => genre.value).join(",")
        );
      } else {
        params.delete("with_genres");
      }

      router.push(`/movies?${params.toString()}`);
    },
    500
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex gap-4 md:items-center justify-between flex-wrap md:flex-nowrap flex-col md:flex-row">
        <h2 className="text-[24px] text-white text-nowrap px-2">
          Explore Movies
        </h2>
        <div className="flex gap-3 flex-wrap md:flex-nowrap items-center">
          <Select onValueChange={handleSortChange} defaultValue={sortBy}>
            <SelectTrigger className="min-w-[130px] bg-black/10 text-white border-sky-600  focus:ring-sky-600 focus:ring-offset-0 max-w-[220px] ">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-[#031022] text-white border-sky-700">
              <SelectGroup>
                <SelectLabel>Sorting By</SelectLabel>
                {sortingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <MultipleSelector
            defaultOptions={genresList}
            value={selectedGenres.map((genre) => ({
              label:
                genresList.find((g) => g.value === genre.id.toString())
                  ?.label || "",
              value: genre.id.toString(),
            }))}
            selectFirstItem={false}
            options={genresList}
            placeholder="Select Genres"
            onChange={(selected) => handleGenreChange(selected)}
            className="w-full max-w-[520px]"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-white/90 ">
                no results found.
              </p>
            }
          />
        </div>
      </div>

      <div className="card-items grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2   gap-x-4 gap-y-6 pt-6">
        {/* if movies not found  */}
        {moviesList.length === 0 && !isFetching && (
          <div className="w-full text-center text-white py-8 col-span-full h-[60vh]">
            <h2 className="text-2xl text-red-400">No Movies Found</h2>
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
            href={`/movies/details/${movie.id}`}
            type="movie"
          />
        ))}
        {isFetching &&
          Array.from({ length: 20 }, (_, i) => i).map((val) => (
            <LoadingCard key={val} />
          ))}
      </div>
    </>
  );
}

export default MoviesFiltering;
