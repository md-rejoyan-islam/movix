import { getCastImageFullPath } from "@/lib/helper";
import { CastMember } from "@/lib/types";
import Image from "next/image";

function CastCard({ cast }: { cast: CastMember }) {
  return (
    <div className="card w-fit rounded-[6px] shadow-md bg-white/5 text-white">
      <Image
        src={getCastImageFullPath(cast.profile_path || "")}
        className="rounded-[6px_6px_0_0] min-w-[140px] h-[170px]"
        width={140}
        height={170}
        alt={cast.name}
      />
      <div className="pt-2 pb-3 px-3">
        <h4 className="font-semibold"> {cast.name}</h4>
        <p className="opacity-60">{cast.original_name}</p>
      </div>
    </div>
  );
}

export default CastCard;
