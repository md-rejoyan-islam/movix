"use client";

import Loading from "@/app/loading";
import { useTrendingMoviesInTodayQuery } from "@/lib/features/movie/movie-api";
import { getRandomImagePath } from "@/lib/helper";
import Image from "next/image";

export default function Banner() {
  const { data: { results: trendingTodayMovies = [] } = {}, isLoading } =
    useTrendingMoviesInTodayQuery();

  if (isLoading) return <Loading />;

  return (
    <section className="min-h-[450px] md:min-h-[700px] md:h-full  flex items-center relative text-white px-4">
      <div className="h-full absolute  top-0 left-0 opacity-50 overflow-hidden text-transparent  w-full">
        <Image
          src={getRandomImagePath(trendingTodayMovies)}
          className="w-full h-full object-cover  opacity-80 bg-bg_primary object-center  "
          alt="Banner Image"
          width={1920}
          priority
          height={1080}
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
        <div className="flex items-center w-full bg-white rounded-[30px]">
          <input
            type="text"
            className="h-[50px] md:h-[60px] text-sm md:text-[20px] py-0 px-[15px] md:px-[30px] w-[calc(100%-100px)] md:w-[calc(100%-150px)] rounded-[30px_0_0_30px] border-none outline-none text-black"
            placeholder="Search for a movie or tv show...."
          />
          {/* linear-gradient(98.37deg, #f89e00 .99%, #da2f68 100%) */}
          <button className="h-[50px] md:h-[60px] w-[100px] md:w-[150px] text-base md:text-xl text-white bg-gradient-to-r from-[#f89e00] from-99% to-[#da2f68] to-100% rounded-[0_30px_30px_0]">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
