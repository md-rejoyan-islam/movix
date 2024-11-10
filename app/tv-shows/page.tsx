"use client";
import CircleLoader from "@/components/loader/circle-loader";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetGenreListQuery,
  useSortingMoviesQuery,
} from "@/lib/features/movie/movie-api";
import { getGenreNames, sortingOptions } from "@/lib/helper";
import { Genre, TopMoviesDetails } from "@/lib/types";
import React from "react";

function PopularTvShows() {
  const [sortBy, setSortBy] = React.useState<string>("popularity.desc");
  const [moviesList, setMoviesList] = React.useState<TopMoviesDetails[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const loaderRef = React.useRef(null);
  const [selectedGenres, setSelectedGenres] = React.useState<Genre[]>([]);

  const { data } = useSortingMoviesQuery(
    `discover/tv?page=${page}&sort_by=${sortBy}&with_genres=${selectedGenres.map(
      (genre) => genre.id
    )}`
  );

  const { data: { genres = [] } = {} } = useGetGenreListQuery("/tv/list");

  // Load data into moviesList when data or page changes
  // React.useEffect(() => {
  //   if (data && data?.results) {
  //     setMoviesList((prev) => {
  //       const combined = page === 1 ? data.results : [...prev, ...data.results];
  //       // Remove duplicates by creating a Map with unique movie IDs
  //       const uniqueMovies = Array.from(
  //         new Map(combined.map((movie) => [movie.id, movie])).values()
  //       );
  //       return uniqueMovies;
  //     });
  //   }
  // }, [data, page]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (data?.results.length === 0) {
        setHasMore(false);
      } else {
        if (data?.results) {
          const combined = [...moviesList, ...data.results];
          // Remove duplicates by creating a Map with unique movie IDs
          const uniqueMovies = Array.from(
            new Map(combined.map((movie) => [movie.id, movie])).values()
          );
          setMoviesList(uniqueMovies);
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const onIntersection = (items: IntersectionObserverEntry[]) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page, data?.results, moviesList]);

  // Infinite scroll handler
  // React.useEffect(() => {
  //   const debounceTimeout = 200; // debounce delay in ms
  //   let timeoutId: NodeJS.Timeout;

  //   const handleScroll = () => {
  //     // Check if the user is within 10 pixels of the bottom of the page
  //     const isBottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 800;

  //     if (isBottom && !isLoading) {
  //       clearTimeout(timeoutId);
  //       timeoutId = setTimeout(() => {
  //         setPage((prevPage) => prevPage + 1);
  //       }, debounceTimeout);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     clearTimeout(timeoutId);
  //   };
  // }, [isLoading]);

  return (
    <>
      <section className="max-w-container pt-[61px] pb-10  px-4">
        <div className="flex gap-8 md:flex-nowrap flex-wrap md:py-10 py-4">
          <div className="min-w-[260px] space-y-4 w-full md:max-w-[280px] text-white md:sticky top-[80px] md:max-h-[572px] md:overflow-auto  md:h-screen">
            <h2 className="text-[24px] text-white text-nowrap px-2 ">
              Explore TV Shows
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3  mb-2"
              defaultValue="item-2"
            >
              <AccordionItem
                value="item-1"
                className="bg-[#173d77] rounded-md border-none"
              >
                <AccordionTrigger className="hover:no-underline py-2 px-3">
                  Sort
                </AccordionTrigger>
                <AccordionContent className="border-t pt-2 px-3 border-[#031022]">
                  <Select
                    onValueChange={(value) => {
                      setSortBy(value);
                      setPage(1);
                      setMoviesList([]);
                    }}
                    defaultValue="popularity.desc"
                  >
                    <SelectTrigger className="min-w-[130px] bg-black/10 text-white border-sky-600  focus:ring-sky-600 w-full  focus:ring-offset-0  ">
                      <SelectValue placeholder="Sorting Tv-Shows" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#031022] text-white border-sky-700">
                      <SelectGroup>
                        <SelectLabel>Sorting By</SelectLabel>
                        {sortingOptions.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-[#173d77] rounded-md border-none "
              >
                <AccordionTrigger className=" hover:no-underline py-2 px-4">
                  Genres
                </AccordionTrigger>
                <AccordionContent className="border-t pt-2 border-[#031022] px-4">
                  <div className="flex gap-2 flex-wrap">
                    {genres.map((genre) => (
                      <div key={genre.id} className=" ">
                        <input
                          type="checkbox"
                          id={genre.name}
                          name={genre.name}
                          className="rounded-sm text-pink hidden"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGenres([
                                ...selectedGenres,
                                {
                                  id: genre.id,
                                  name: genre.name,
                                },
                              ]);
                            } else {
                              setSelectedGenres(
                                selectedGenres.filter(
                                  (item) => item.id !== genre.id
                                )
                              );
                            }
                          }}
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

          <div className="pt-3 w-full ">
            <div className="card-items grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2   gap-x-4 gap-y-7  ">
              {/* {hasMore &&
                Array.from({ length: 30 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))} */}
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
                />
              ))}
            </div>
            {hasMore && (
              <div
                ref={loaderRef}
                className="py-16 flex w-full justify-center items-center"
              >
                <CircleLoader styles="" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PopularTvShows;
