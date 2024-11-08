"use client";

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
  const { data: { results: trendingTodayMovies = [] } = {}, isSuccess } =
    useTrendingMoviesInTodayQuery();
  const {
    data: { results: trendingWeekMovies = [] } = {},
    isSuccess: isSuccess2,
  } = useTrendingMoviesInWeekQuery();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 max-w-container  px-4">
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
        <div
          className={`
          ${isSuccess || isSuccess2 ? "hidden" : ""}
          `}
        >
          <Slider delay={100}>
            {Array.from({ length: 10 })
              .fill(null)
              .map((index) => (
                <LoadingCard key={index} />
              ))}
          </Slider>
        </div>

        {isSuccess && isSuccess2 && (
          <Slider delay={1750}>
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
                    title={movie.original_title}
                    date={movie.release_date}
                    image={movie.poster_path}
                    rating={movie.vote_average}
                  />
                ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Trending;
