"use client";

import { useTrendingMoviesInTodayQuery } from "@/lib/features/movie/movie-api";
import { getRandomImagePath } from "@/lib/helper";
import Image from "next/image";
import HomeSearch from "./home-search";

export default function Banner() {
  const { data: { results: trendingTodayMovies = [] } = {} } =
    useTrendingMoviesInTodayQuery();

  return (
    <section className="min-h-[450px] md:min-h-[700px] md:h-full  flex items-center relative text-white px-4">
      <div className="h-full absolute  top-0 left-0 opacity-50 overflow-hidden text-transparent  w-full">
        <Image
          src={getRandomImagePath(trendingTodayMovies)}
          className="w-full h-full object-cover  opacity-80 bg-bg_primary object-center  "
          priority
          alt="Banner Image"
          fill
        />

        <div className="opacity-layer"></div>
      </div>
      <div className=" max-w-[800px] mx-auto text-center z-10">
        <h3 className="text-[50px] md:text-[90px] font-semibold p-0 m-0 leading-[50px] md:leading-[90px]">
          Welcome.
        </h3>
        <p className="text-lg md:text-[24px] pt-2 pb-8">
          Millions of movies, TV shows and people to discover. Explore now
        </p>
        <HomeSearch />
      </div>
    </section>
  );
}
