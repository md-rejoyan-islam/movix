import { getCastImageFullPath } from "@/lib/helper";
import { CastMember } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import CircleLoader from "../loader/circle-loader";

function CastCard({ cast }: { readonly cast: CastMember }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div className="card w-fit rounded-[6px] min-w-[200px]  text-white">
      <div className="relative">
        <Image
          src={getCastImageFullPath(cast.profile_path ?? "")}
          className="rounded-full w-[180px] h-[180px] object-cover mx-auto"
          width={160}
          height={160}
          alt={cast.name}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div
          className={`${
            isImageLoaded ? "invisible" : "visible"
          } aspect-[1/1] absolute  z-[1000] w-full h-full rounded-full top-0  animate-pulse flex justify-center items-center   bg-[#92358527]`}
        >
          {/* circle border color  loader aminated*/}

          <CircleLoader styles="w-20 h-20" />
        </div>
      </div>
      <div className="pt-2 pb-3 px-3">
        <h4 className="font-semibold text-center text-lg"> {cast.name}</h4>
        <p className="opacity-50 text-center">{cast.original_name}</p>
      </div>
    </div>
  );
}

export default CastCard;
