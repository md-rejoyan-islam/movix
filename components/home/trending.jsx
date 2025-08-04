"use client";

import Loading from "@/app/loading";
import Slider from "@/components/slider/slider";
import SwitchingTab from "@/components/tab/switching-tab";
import {
  useTrendingMoviesInTodayQuery,
  useTrendingMoviesInWeekQuery,
} from "@/lib/features/movie/movie-api";
import { useState } from "react";
import LoadingCard from "../movie-card/loading-card";
import SmallMovieCard from "../movie-card/small-movie-card";

function Trending() {
  const {
    data: { results: trendingTodayMovies = [] } = {},
    isSuccess,
    isLoading,
  } = useTrendingMoviesInTodayQuery();
  const {
    data: { results: trendingWeekMovies = [] } = {},
    isSuccess: isSuccess2,
  } = useTrendingMoviesInWeekQuery();

  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) return <Loading />;

  return (
    <section className="pb-4 sm:pb-8 md:pb-10 max-w-container  px-4">
      <div className="flex items-center justify-between pb-6">
        <p className="md:text-[24px] sm:text-[22px] text-[20px] font-semibold text-white">
          Trending
        </p>
        <SwitchingTab
          left="Today"
          right="This Week"
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className="overflow-hidden pb-10">
        <Slider delay={1700}>
          {!isSuccess || !isSuccess2
            ? Array.from({ length: 20 }, (_, index) => index).map((value) => (
                <LoadingCard key={value} />
              ))
            : activeIndex === 0
            ? trendingTodayMovies?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.original_title}
                  date={movie.release_date}
                  image={movie.poster_path}
                  rating={movie.vote_average}
                  href={`/movies/details/${movie.id}`}
                  type="movie"
                />
              ))
            : trendingWeekMovies?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.original_title}
                  date={movie.release_date}
                  image={movie.poster_path}
                  rating={movie.vote_average}
                  href={`/movies/details/${movie.id}`}
                  type="movie"
                />
              ))}
        </Slider>
      </div>
    </section>
  );
}

export default Trending;
