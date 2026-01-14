"use client";

import { RootState } from "@/lib/store";
import { GitCompareArrows } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CompareIndicator() {
  const { movies } = useSelector((state: RootState) => state.compare);

  if (movies.length === 0) return null;

  return (
    <Link
      href="/compare"
      className="relative inline-flex p-2 rounded-full bg-pink/20 hover:bg-pink/30 transition-colors"
      title={`Compare ${movies.length} movies`}
    >
      <GitCompareArrows className="w-5 h-5 text-pink" />
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-pink text-white text-xs flex items-center justify-center font-medium z-10">
        {movies.length}
      </span>
    </Link>
  );
}
