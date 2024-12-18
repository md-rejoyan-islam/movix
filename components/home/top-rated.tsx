"use client";
import Slider from "@/components/slider/slider";
import SwitchingTab from "@/components/tab/switching-tab";
import {
  useTopRatedMoviesQuery,
  useTopRatedTVShowsQuery,
} from "@/lib/features/movie/movie-api";
import { useState } from "react";
import LoadingCard from "../movie-card/loading-card";
import SmallMovieCard from "../movie-card/small-movie-card";
function TopRated() {
  const { data: { results: topRatedMovies = [] } = {}, isSuccess } =
    useTopRatedMoviesQuery();
  const { data: { results: topRatedTvShow = [] } = {}, isSuccess: isSuccess2 } =
    useTopRatedTVShowsQuery();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pb-4 sm:pb-8 md:pb-10 max-w-container px-4">
      <div className="flex items-center justify-between pb-6">
        <p className="md:text-[24px] sm:text-[22px] text-[20px] font-semibold text-white text-nowrap">
          Top Rated
        </p>
        <SwitchingTab
          left="Movies"
          right="Tv Show"
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className="overflow-hidden pb-10">
        <div
          className={`
          ${isSuccess || isSuccess2 ? "hidden" : ""}
          `}
        >
          <Slider delay={1000}>
            {Array.from({ length: 20 })
              .fill(null)
              .map((_, index) => (
                <LoadingCard key={index} />
              ))}
          </Slider>
        </div>

        <Slider delay={1700}>
          {activeIndex === 0
            ? topRatedMovies?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.title}
                  date={movie.release_date}
                  image={movie.poster_path}
                  rating={movie.vote_average}
                  href={`/movies/details/${movie.id}`}
                  type="movie"
                />
              ))
            : topRatedTvShow?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.original_name}
                  date={movie.first_air_date}
                  image={movie.poster_path}
                  rating={movie.vote_average}
                  href={`/movies/details/${movie.id}`}
                  type="tv"
                />
              ))}
        </Slider>
      </div>
    </section>
  );
}

export default TopRated;
