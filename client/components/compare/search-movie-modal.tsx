"use client";

import {
  addToCompare,
  CompareMovie,
} from "@/lib/features/compare/compare-slice";
import {
  useGetSearchedMoviesQuery,
  useLazyGetSingleMovieByIdQuery,
} from "@/lib/features/movie/movie-api";
import { imageUrl } from "@/lib/helper";
import { RootState } from "@/lib/store";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Check, Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SearchMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchMovieModal({
  isOpen,
  onClose,
}: SearchMovieModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loadingMovieId, setLoadingMovieId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const { movies: compareMovies, maxMovies } = useSelector(
    (state: RootState) => state.compare
  );

  const { data, isLoading } = useGetSearchedMoviesQuery(
    { query: debouncedQuery, page: 1 },
    { skip: debouncedQuery.length < 2 }
  );

  // Use lazy query for fetching movie details on demand
  const [triggerGetMovie] = useLazyGetSingleMovieByIdQuery();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Debounce
    setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);
  };

  const handleAddMovie = async (movieId: number, type: "movie" | "tv") => {
    if (compareMovies.length >= maxMovies) return;
    if (compareMovies.find((m) => m.id === movieId)) return;

    setLoadingMovieId(movieId);

    try {
      // Fetch the full movie details
      const result = await triggerGetMovie(`${type}/${movieId}`).unwrap();

      if (result) {
        const movie: CompareMovie = {
          id: result.id,
          title: result.title || result.name || "",
          poster_path: result.poster_path || "",
          backdrop_path: result.backdrop_path || "",
          vote_average: result.vote_average,
          release_date: result.release_date || result.first_air_date || "",
          runtime: result.runtime ?? undefined,
          genres: result.genres,
          overview: result.overview,
          popularity: result.popularity,
          vote_count: result.vote_count,
          original_language: result.original_language,
          status: result.status,
          budget: result.budget,
          revenue: result.revenue,
          type: type,
        };

        dispatch(addToCompare(movie));
      }
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    } finally {
      setLoadingMovieId(null);
    }
  };

  const isAlreadyAdded = (id: number) => compareMovies.some((m) => m.id === id);
  const isFull = compareMovies.length >= maxMovies;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[5000]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-secondary border border-white/10 p-6 shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Add Movie to Compare
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for movies or TV shows..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-pink/50 transition-colors"
                    autoFocus
                  />
                </div>

                {/* Results */}
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {isLoading && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-pink" />
                    </div>
                  )}

                  {!isLoading &&
                    debouncedQuery.length >= 2 &&
                    data?.results?.length === 0 && (
                      <div className="text-center py-8 text-white/60">
                        No results found for &quot;{debouncedQuery}&quot;
                      </div>
                    )}

                  {!isLoading &&
                    data?.results
                      ?.filter((m) => m.poster_path)
                      .slice(0, 10)
                      .map((movie) => {
                        const added = isAlreadyAdded(movie.id);
                        const type = movie.media_type === "tv" ? "tv" : "movie";

                        return (
                          <button
                            key={movie.id}
                            onClick={() =>
                              !added &&
                              !isFull &&
                              handleAddMovie(movie.id, type as "movie" | "tv")
                            }
                            disabled={
                              added || isFull || loadingMovieId === movie.id
                            }
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors ${
                              added
                                ? "bg-green-500/10 border border-green-500/30"
                                : isFull
                                ? "opacity-50 cursor-not-allowed bg-white/5"
                                : "bg-white/5 hover:bg-white/10 border border-transparent hover:border-pink/30"
                            }`}
                          >
                            <Image
                              src={imageUrl(movie.poster_path)}
                              alt={movie.name || movie.title || "Movie"}
                              width={50}
                              height={75}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1 text-left">
                              <h3 className="font-medium text-white line-clamp-1">
                                {movie.name || movie.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-white/60">
                                <span className="px-2 py-0.5 bg-pink/20 text-pink text-xs rounded uppercase">
                                  {type}
                                </span>
                                <span>
                                  {movie.first_air_date?.slice(0, 4) ||
                                    movie.release_date?.slice(0, 4) ||
                                    "N/A"}
                                </span>
                                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                              </div>
                            </div>
                            {added && (
                              <div className="flex items-center gap-1 text-green-400">
                                <Check className="w-4 h-4" />
                                <span className="text-sm">Added</span>
                              </div>
                            )}
                            {loadingMovieId === movie.id && (
                              <Loader2 className="w-5 h-5 animate-spin text-pink" />
                            )}
                          </button>
                        );
                      })}

                  {debouncedQuery.length < 2 && (
                    <div className="text-center py-8 text-white/60">
                      Type at least 2 characters to search
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-sm text-white/60">
                    {compareMovies.length} / {maxMovies} movies selected
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
