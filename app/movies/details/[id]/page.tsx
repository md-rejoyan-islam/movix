"use client";
import SingleMovie from "@/components/details/single-movie-details";
import { useParams } from "next/navigation";

export default function Details() {
  const { id }: { id: string } = useParams();
  return (
    <div className="pt-[61px]">
      <SingleMovie href={`movie/${id}`} />
    </div>
  );
}
