"use client";
import Slider from "@/components/slider/slider";
import SwitchingTab from "@/components/tab/switching-tab";
import {
  usePopularMoviesInTheatersQuery,
  usePopularMoviesOnTvQuery,
} from "@/lib/features/movie/movie-api";
import { useState } from "react";
import LoadingCard from "../movie-card/loading-card";
import SmallMovieCard from "../movie-card/small-movie-card";

function Popular() {
  const { data: { results: trendingTodayMovies = [] } = {}, isSuccess } =
    usePopularMoviesInTheatersQuery();
  const {
    data: { results: trendingWeekMovies = [] } = {},

    isSuccess: isSuccess2,
  } = usePopularMoviesOnTvQuery();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className=" pb-4 sm:pb-8 md:pb-10  max-w-container px-4">
      <div className="flex items-center justify-between pb-6">
        <p className="md:text-[24px] sm:text-[22px] text-[20px] font-semibold text-white text-nowrap">
          What&apos;s Popular
        </p>
        <SwitchingTab
          left="On Tv"
          right="In Theaters"
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className="overflow-visible pb-10">
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
        <Slider delay={1500}>
          {activeIndex === 0
            ? trendingTodayMovies?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.original_title}
                  date={movie.release_date}
                  image={movie.poster_path}
                  rating={movie.vote_average}
                />
              ))
            : trendingWeekMovies?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.original_name}
                  date={movie.first_air_date}
                  image={movie.poster_path}
                  rating={movie.vote_average}
                />
              ))}
        </Slider>
      </div>
    </section>
  );
}

export default Popular;
