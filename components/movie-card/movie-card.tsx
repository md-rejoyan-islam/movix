import { formatDate, imageUrl } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SmallMovieCardProps {
  image: string;
  title: string;
  date: string;
  rating: number;
  genres: string[];
  href: string;
  type: string;
}

export default function MovieCard({
  image,
  title,
  date,
  rating,
  genres,
  href,
  type,
}: SmallMovieCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      href={{
        pathname: href,
        query: { type: type },
      }}
      className="card  w-full "
    >
      <div className="relative">
        <Image
          src={imageUrl(image)}
          className="rounded-xl absolute top-0 h-full"
          alt="Top Rated Movie"
          width={200}
          height={300}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div
          className={`${
            isImageLoaded ? "invisible" : "visible"
          } aspect-[2/3]  animate-pulse rounded-lg  bg-[#1f467c95]`}
        />
        <div className=" absolute -bottom-[18px] left-3">
          <svg
            className="bg-white rounded-full p-[2px] w-9 h-9 sm:w-11 sm:h-11"
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
              {rating?.toPrecision(2)}
            </text>
          </svg>
        </div>
        <div className="genres  absolute bottom-3 flex justify-end w-full  px-2 ">
          <div className="w-2/3 flex gap-1 flex-wrap justify-end ">
            {genres.map((genre) => (
              <span
                key={genre}
                className="bg-[#da2f68cf] inline-block text-nowrap text-white px-1 py-[2px]  text-[10px]  sm:text-[12px] rounded-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="text-lg sm:text-[20px] text-white">{title}</h2>
        <p className="text-[12px] sm:text-[14px] text-white opacity-50 ">
          {formatDate(date)}
        </p>
      </div>
    </Link>
  );
}
