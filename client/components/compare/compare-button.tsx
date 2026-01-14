"use client";

import {
  addToCompare,
  CompareMovie,
  removeFromCompare,
} from "@/lib/features/compare/compare-slice";
import { useLazyGetSingleMovieByIdQuery } from "@/lib/features/movie/movie-api";
import { RootState } from "@/lib/store";
import { Check, GitCompareArrows, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CompareButtonProps {
  movieId: number;
  type: "movie" | "tv";
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview?: string;
  className?: string;
}

export default function CompareButton({
  movieId,
  type,
  title,
  poster_path,
  vote_average,
  release_date,
  overview = "",
  className = "",
}: CompareButtonProps) {
  const dispatch = useDispatch();
  const { movies: compareMovies, maxMovies } = useSelector(
    (state: RootState) => state.compare
  );
  const [isLoading, setIsLoading] = useState(false);

  const isAdded = compareMovies.some((m) => m.id === movieId);
  const isFull = compareMovies.length >= maxMovies;

  // Use lazy query for fetching details on demand
  const [triggerGetMovie] = useLazyGetSingleMovieByIdQuery();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdded) {
      dispatch(removeFromCompare(movieId));
      return;
    }

    if (isFull) return;

    setIsLoading(true);
    try {
      const result = await triggerGetMovie(`${type}/${movieId}`).unwrap();

      if (result) {
        const movie: CompareMovie = {
          id: result.id,
          title: result.title || result.name || title,
          poster_path: result.poster_path || poster_path,
          backdrop_path: result.backdrop_path || "",
          vote_average: result.vote_average || vote_average,
          release_date:
            result.release_date || result.first_air_date || release_date,
          runtime: result.runtime ?? undefined,
          genres: result.genres,
          overview: result.overview || overview,
          popularity: result.popularity || 0,
          vote_count: result.vote_count || 0,
          original_language: result.original_language || "en",
          status: result.status,
          budget: result.budget,
          revenue: result.revenue,
          type,
        };

        dispatch(addToCompare(movie));
      }
    } catch (error) {
      console.error("Failed to add movie to compare:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={(!isAdded && isFull) || isLoading}
      title={
        isAdded
          ? "Remove from compare"
          : isFull
          ? "Compare list is full (max 3)"
          : "Add to compare"
      }
      className={`p-2 rounded-full transition-all ${
        isAdded
          ? "bg-green-500/90 hover:bg-red-500/90"
          : isFull
          ? "bg-white/20 cursor-not-allowed opacity-50"
          : "bg-black/50 hover:bg-pink/90"
      } ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-white" />
      ) : isAdded ? (
        <Check className="w-4 h-4 text-white" />
      ) : (
        <GitCompareArrows className="w-4 h-4 text-white" />
      )}
    </button>
  );
}
