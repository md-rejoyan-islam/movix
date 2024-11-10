"use client";
import SingleMovie from "@/components/details/single-movie-details";
import { useParams, useSearchParams } from "next/navigation";

export default function Details() {
  const { id }: { id: string } = useParams();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="pt-[61px]">
      <SingleMovie href={`${type}/${id}`} />
    </div>
  );
}
