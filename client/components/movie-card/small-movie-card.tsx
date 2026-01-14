"use client";

import { formatDate, imageUrl } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CompareButton from "../compare/compare-button";
import WishlistButton from "../wishlist/wishlist-button";

interface SmallMovieCardProps {
  image: string;
  title: string;
  date: string;
  rating: number;
  styles?: string;
  href: string;
  type: string;
  movieId?: number;
}

export default function SmallMovieCard({
  image,
  title,
  date,
  rating,
  styles,
  href,
  type,
  movieId,
}: SmallMovieCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Extract movie ID from href if not provided
  const id = movieId || parseInt(href.split("/").pop() || "0");

  return (
    <div
      className={`movie-card z-[2000] relative cursor-pointer group ${styles}`}
    >
      <Link
        href={{
          pathname: href,
          query: { type: type },
        }}
        className="block"
      >
        <div className="relative">
          <Image
            src={imageUrl(image)}
            className="rounded-xl absolute top-0 h-full aspect-[2/3] w-full text-white opacity-70"
            alt={title || "Movie Image"}
            width={180}
            height={240}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div
            className={`${
              isImageLoaded ? "invisible" : "visible"
            } aspect-[2/3]  animate-pulse rounded-lg  bg-[#1f467c95]`}
          />
          <div className=" absolute -bottom-[18px] left-3">
            <svg
              className="bg-white rounded-full p-[2px] w-9 sm:w-10     h-9 sm:h-10"
              viewBox="0 0 100 100"
              data-test-id="CircularProgressbar"
            >
              <path
                className="CircularProgressbar-trail mx-auto"
                style={{
                  strokeDasharray: "289.027px, 289.027px",

                  strokeDashoffset: "-45px",
                }}
                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92 "
                strokeWidth={8}
                fillOpacity={0}
              />
              <path
                className=" stroke-green-600 "
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
                className="text-4xl absolute top-0 left-0 font-semibold"
                x={50}
                y={50}
                style={{
                  dominantBaseline: "middle",
                  textAnchor: "middle",
                }}
              >
                {rating.toPrecision(2)}
              </text>
            </svg>
          </div>
          <div className="genres  absolute bottom-3 flex justify-end w-full  px-2 ">
            <div className="w-1/2 flex gap-1 flex-wrap justify-end ">
              <span className="bg-pink text-white px-1 py-[2px]  text-[9px] rounded-sm">
                Animation
              </span>
              <span className="bg-pink text-white px-1 py-[2px]  text-[9px] rounded-sm">
                Family
              </span>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <h2 className="text-base sm:text-lg  text-white">{title}</h2>
          <p className="text-[12px] sm:text-sm  text-white opacity-50 ">
            {formatDate(date)}
          </p>
        </div>
      </Link>
      {/* Action Buttons - Always visible on mobile, hover on desktop */}
      <div className="absolute top-1 right-1 md:top-2 md:right-2 flex flex-row gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
        <WishlistButton
          movieId={id}
          type={type as "movie" | "tv"}
          title={title}
          poster_path={image}
          vote_average={rating}
          release_date={date}
          variant="icon"
          className="!w-6 !h-6 md:!w-8 md:!h-8"
        />
        <CompareButton
          movieId={id}
          type={type as "movie" | "tv"}
          title={title}
          poster_path={image}
          vote_average={rating}
          release_date={date}
          className="!w-6 !h-6 md:!w-8 md:!h-8 flex items-center justify-center"
        />
      </div>
    </div>
  );
}
