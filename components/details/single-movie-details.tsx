"use client";
import { useState } from "react";

import Loading from "@/app/loading";
import {
  useGetMovieAllImagesQuery,
  useGetMovieAllVideosQuery,
  useGetMovieCreditsQuery,
  useGetRecommendationsMoviesQuery,
  useGetSimilarMoviesQuery,
  useGetSingleMovieByIdQuery,
} from "@/lib/features/movie/movie-api";
import {
  formatDate,
  getBackdropImageFullPath,
  getPosterImageFullPath,
} from "@/lib/helper";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import SmallMovieCard from "../movie-card/small-movie-card";
import CastCard from "./cast-card";
import TabItem from "./tab";

function SingleMovie({ href }: { href: string }) {
  const { id }: { id: string } = useParams();

  const { data: movie, isLoading } = useGetSingleMovieByIdQuery(href);
  const { data: credits } = useGetMovieCreditsQuery(href);
  const { data: { results: recommendationsMovies = [] } = {} } =
    useGetRecommendationsMoviesQuery(href);
  const { data: movieAllPosters } = useGetMovieAllImagesQuery(`movie/${id}`);
  const { data: { results: movieAllVideos = [] } = {} } =
    useGetMovieAllVideosQuery(`movie/${id}`);

  const { data: { results: similarMovies = [] } = {} } =
    useGetSimilarMoviesQuery(href);

  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  if (!isLoading && !movie) notFound();

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="max-w-container px-6  text-white">
        <div className="banner absolute top-0 left-0 opacity-20">
          <Image
            src={getBackdropImageFullPath(movie?.backdrop_path || "")}
            alt={movie?.title || movie?.name || ""}
            width={1920}
            height={1080}
            className=" w-screen h-full object-cover  filter brightness-50  bg-blue-400 "
          />
          <div className="opacity-layer"></div>
        </div>
        <div className="details-banner opacity-[.99] md:flex gap-x-10 text-white h-full py-10 ">
          <figure>
            <Image
              src={getPosterImageFullPath(movie?.poster_path || "")}
              alt={movie?.title || movie?.name || ""}
              width={350}
              height={525}
              className=" w-full md:min-w-[350px] md:max-w-[350px] rounded-[12px] h-full object-cover "
            />
          </figure>

          <div>
            <h1 className="text-[28px] md:text-[34px] font-semibold">
              {movie?.title || movie?.name || ""}
            </h1>
            <h3 className="text-base opacity-50 md:text-xl">
              No one can stop the reign.
            </h3>
            <div className="flex flex-wrap gap-4 py-2">
              {movie?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="py-[3px] px-[4px] text-[12px] bg-pink rounded-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex gap-x-6 items-center cursor-pointer py-4">
              <svg
                className="bg-secondary-black  fill-white  rounded-full p-[2px] w-16 md:w-20 h-16 md:h-20"
                viewBox="0 0 100 100"
                data-test-id="CircularProgressbar"
              >
                <path
                  className=" mx-auto"
                  style={{
                    strokeDasharray: "289.027px, 289.027px",
                    strokeDashoffset: "-45px",
                  }}
                  d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92 "
                  strokeWidth={8}
                  fillOpacity={0}
                />
                <path
                  className="stroke-orange "
                  style={{
                    strokeDasharray: "289.027px, 289.027px",
                    strokeDashoffset: "72.2566px",
                    strokeLinecap: "round",
                  }}
                  d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                  strokeWidth={8}
                  fillOpacity={0}
                />
                <text
                  className="text-4xl absolute top-0 left-0 font-semibold "
                  x={50}
                  y={50}
                  style={{
                    dominantBaseline: "middle",
                    textAnchor: "middle",
                  }}
                >
                  7.5
                </text>
              </svg>
              <div
                className="flex gap-x-8 items-center play-movie-btn"
                onClick={open}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  className="w-16 md:w-[70px] h-16 md:h-[70px] text-white fill-white"
                  y="0px"
                  width="80px"
                  height="80px"
                  viewBox="0 0 213.7 213.7"
                  enableBackground="new 0 0 213.7 213.7"
                >
                  <polygon
                    className="triangle stroke-white   cursor-pointer"
                    fill="none"
                    strokeWidth="7"
                    strokeDasharray="240"
                    strokeDashoffset="480"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="73.5,62.5 148.5,105.8 73.5,149.1 "
                  ></polygon>
                  <circle
                    className="circle stroke-white  cursor-pointer"
                    fill="none"
                    strokeWidth="7"
                    strokeDasharray="650"
                    strokeDashoffset="1300"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    cx="106.8"
                    cy="106.8"
                    r="103.3"
                  ></circle>
                </svg>
                <span className="text-xl font-semibold">Watch Trailer</span>
              </div>
            </div>
            <div className="pt-7">
              <h3 className="text-xl md:text-[24px]">Overview</h3>
              <p className="pt-1 opacity-60">
                {movie?.overview || "Not Available"}
              </p>
            </div>
            <div className="flex gap-x-8 py-6 border-b border-[rgba(255,255,255,.1)]">
              <div className="flex gap-3">
                <h4>Status:</h4>
                <p className="opacity-50">{movie?.status || "Not Available"}</p>
              </div>
              <div className="flex gap-3">
                <h4>Release Date:</h4>
                <p className="opacity-50">
                  {movie?.release_date || movie?.first_air_date
                    ? formatDate(
                        movie?.release_date || movie?.first_air_date || ""
                      )
                    : "Not Available"}
                </p>
              </div>
              <div className="flex gap-3">
                <h4>Release Date:</h4>

                <p className="opacity-50">2h 25m</p>
              </div>
            </div>
            <div className="py-3 border-b border-[rgba(236,191,191,0.1)] flex gap-3">
              <h4>Director: </h4>
              <p className="opacity-50">
                {credits?.crew.find((crew) => crew.job === "Director")?.name ||
                  "Not Found"}
              </p>{" "}
            </div>
            <div className="py-3 border-b border-[rgba(255,255,255,.1)] flex gap-3">
              <h4>Writer: </h4>
              <p className="opacity-50">
                {credits?.crew.find(
                  (crew) =>
                    crew.job === "Writer" || crew.department === "Writing"
                )?.name || "Not Found"}
              </p>{" "}
            </div>
          </div>
        </div>
        {/* top billing cast  */}

        <div className="cast py-6  relative">
          <h3 className="font-semibold text-xl md:text-2xl ">
            Top Billed Cast
          </h3>
          <div className="flex gap-x-5 overflow-x-auto pt-3 pb-5">
            {credits?.cast?.length ? (
              credits?.cast
                .slice(0, 20)
                .map((cast) => <CastCard key={cast.id} cast={cast} />)
            ) : (
              <p className="text-white opacity-60 py-2">No Cast Found</p>
            )}
          </div>
        </div>

        <div className="cast py-6  relative">
          <h3 className="font-semibold text-xl md:text-2xl ">Media</h3>
          <TabItem
            movieAllPosters={movieAllPosters?.posters || []}
            movieAllVideos={movieAllVideos}
          />
        </div>
        {/* Similar Movies */}
        <div className="cast py-6">
          <h3 className="font-semibold text-xl md:text-2xl ">Similar Movies</h3>
          <div className="flex gap-x-5 overflow-x-auto pt-3 pb-5">
            {similarMovies.length ? (
              similarMovies?.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.name || movie.title || ""}
                  image={movie.poster_path}
                  date={movie.first_air_date || movie.release_date || ""}
                  rating={movie.vote_average}
                  styles="min-w-[180px]"
                  href={`/movies/details/${movie.id}`}
                  type={movie.media_type || "movie"}
                />
              ))
            ) : (
              <p className="text-white opacity-60 py-2">No Similar Movies</p>
            )}
          </div>
        </div>

        {/* Recommendations movies  */}
        <div className="cast py-6">
          <h3 className="font-semibold text-xl md:text-2xl ">
            Recommendations Movies
          </h3>
          <div className="flex gap-x-5 overflow-x-auto pt-3 pb-5">
            {recommendationsMovies.length ? (
              recommendationsMovies.map((movie) => (
                <SmallMovieCard
                  key={movie.id}
                  title={movie.name || movie.title || ""}
                  image={movie.poster_path}
                  date={movie.first_air_date || movie.release_date || ""}
                  rating={movie.vote_average}
                  styles="min-w-[180px]"
                  href={`/movies/details/${movie.id}`}
                  type={movie.media_type || "movie"}
                />
              ))
            ) : (
              <p className="text-white opacity-60 py-2">
                No Recommendations Movies
              </p>
            )}
          </div>
        </div>
      </section>

      {/* open Trailer  */}
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={close}
        >
          <div className="fixed bg-[#00000081]  backdrop-blur-sm inset-0  w-screen overflow-y-auto">
            <div className="flex    min-h-full items-center justify-center   overflow-hidden ">
              <div className="overflow-hidden relative py-4">
                <button
                  className="absolute -top-[5px] right-8 md:right-0 "
                  onClick={close}
                >
                  <RxCross2 className="text-white hover:text-pink text-lg" />
                </button>
                <div className=" h-fit overflow-hidden mx-8 md:mx-0">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-fit overflow-hidden rounded-lg bg-white/5 backdrop-blur-2xl">
                      <iframe
                        className="w-[calc(100vw)] h-[calc(100vw*0.5625)] md:w-[calc(0.7*100vw)] md:h-[calc(0.7*100vw*0.5625)]  rounded-lg "
                        src={`//www.youtube.com/embed/${
                          movieAllVideos[0]?.key || ""
                        }`}
                      ></iframe>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SingleMovie;
