"use client";

import {
  clearCompare,
  CompareMovie,
  removeFromCompare,
} from "@/lib/features/compare/compare-slice";
import { convertRuntime, formatDate, imageUrl } from "@/lib/helper";
import { RootState } from "@/lib/store";
import { GitCompareArrows, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchMovieModal from "./search-movie-modal";

export default function CompareMovies() {
  const dispatch = useDispatch();
  const { movies, maxMovies } = useSelector(
    (state: RootState) => state.compare
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = (id: number) => {
    dispatch(removeFromCompare(id));
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
  };

  const emptySlots = maxMovies - movies.length;

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink to-orange">
            <GitCompareArrows className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Compare Movies</h1>
            <p className="text-white/60 text-sm">
              Compare up to {maxMovies} movies or TV shows side by side
            </p>
          </div>
        </div>
        {movies.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence mode="popLayout">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <CompareCard movie={movie} onRemove={handleRemove} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty Slots */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <motion.div
            key={`empty-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-dashed border-white/20 rounded-2xl min-h-[500px] flex flex-col items-center justify-center gap-4 hover:border-pink/50 transition-colors cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="p-4 rounded-full bg-white/5 group-hover:bg-pink/20 transition-colors">
              <Plus className="w-8 h-8 text-white/40 group-hover:text-pink transition-colors" />
            </div>
            <p className="text-white/40 group-hover:text-white/60 transition-colors">
              Add movie to compare
            </p>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      {movies.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <GitCompareArrows className="w-5 h-5 text-pink" />
            Detailed Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/60 font-medium">
                    Attribute
                  </th>
                  {movies.map((movie) => (
                    <th
                      key={movie.id}
                      className="text-left py-4 px-4 font-medium"
                    >
                      {movie.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  label="Rating"
                  values={movies.map((m) => (
                    <span
                      key={m.id}
                      className={`font-bold ${
                        m.vote_average >= 7
                          ? "text-green-400"
                          : m.vote_average >= 5
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      ⭐ {m.vote_average.toFixed(1)}
                    </span>
                  ))}
                  highlight={getBestIndex(
                    movies.map((m) => m.vote_average),
                    "max"
                  )}
                />
                <CompareRow
                  label="Release Date"
                  values={movies.map((m) =>
                    m.release_date ? formatDate(m.release_date) : "N/A"
                  )}
                />
                <CompareRow
                  label="Runtime"
                  values={movies.map((m) =>
                    m.runtime ? convertRuntime(m.runtime) : "N/A"
                  )}
                />
                <CompareRow
                  label="Popularity"
                  values={movies.map((m) => m.popularity.toFixed(0))}
                  highlight={getBestIndex(
                    movies.map((m) => m.popularity),
                    "max"
                  )}
                />
                <CompareRow
                  label="Vote Count"
                  values={movies.map((m) => m.vote_count.toLocaleString())}
                  highlight={getBestIndex(
                    movies.map((m) => m.vote_count),
                    "max"
                  )}
                />
                <CompareRow
                  label="Language"
                  values={movies.map((m) => m.original_language.toUpperCase())}
                />
                <CompareRow
                  label="Genres"
                  values={movies.map((m) => (
                    <div key={m.id} className="flex flex-wrap gap-1">
                      {m.genres?.slice(0, 3).map((g) => (
                        <span
                          key={g.id}
                          className="px-2 py-0.5 bg-pink/20 text-pink text-xs rounded-full"
                        >
                          {g.name}
                        </span>
                      )) || "N/A"}
                    </div>
                  ))}
                />
                {movies.some((m) => m.budget) && (
                  <CompareRow
                    label="Budget"
                    values={movies.map((m) =>
                      m.budget ? `$${(m.budget / 1000000).toFixed(0)}M` : "N/A"
                    )}
                  />
                )}
                {movies.some((m) => m.revenue) && (
                  <CompareRow
                    label="Revenue"
                    values={movies.map((m) =>
                      m.revenue
                        ? `$${(m.revenue / 1000000).toFixed(0)}M`
                        : "N/A"
                    )}
                    highlight={getBestIndex(
                      movies.map((m) => m.revenue || 0),
                      "max"
                    )}
                  />
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {movies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex p-6 rounded-full bg-white/5 mb-6">
            <GitCompareArrows className="w-12 h-12 text-white/30" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No movies to compare</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Start by adding movies from the search or browse pages. Click the
            compare button on any movie card to add it here.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/movies"
              className="px-6 py-3 rounded-xl gradient-color font-medium hover:opacity-90 transition-opacity"
            >
              Browse Movies
            </Link>
            <Link
              href="/tv-shows"
              className="px-6 py-3 rounded-xl bg-white/10 font-medium hover:bg-white/20 transition-colors"
            >
              Browse TV Shows
            </Link>
          </div>
        </motion.div>
      )}

      {/* Search Modal */}
      <SearchMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function CompareCard({
  movie,
  onRemove,
}: {
  movie: CompareMovie;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="relative bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-pink/30 transition-colors group">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(movie.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={imageUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg_primary via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              movie.vote_average >= 7
                ? "bg-green-500/90"
                : movie.vote_average >= 5
                ? "bg-yellow-500/90"
                : "bg-red-500/90"
            }`}
          >
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink/90 uppercase">
            {movie.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-white/60 text-sm mb-3">
          {movie.release_date ? formatDate(movie.release_date) : "N/A"}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <p className="text-white/50 text-sm line-clamp-3">{movie.overview}</p>

        {/* View Details */}
        <Link
          href={`/${movie.type === "tv" ? "tv-shows" : "movies"}/details/${
            movie.id
          }?type=${movie.type}`}
          className="mt-4 block text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  values,
  highlight,
}: {
  label: string;
  values: React.ReactNode[];
  highlight?: number;
}) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-4 px-4 text-white/60">{label}</td>
      {values.map((value, index) => (
        <td
          key={index}
          className={`py-4 px-4 ${
            highlight === index ? "text-green-400 font-medium" : ""
          }`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

function getBestIndex(
  values: number[],
  type: "max" | "min"
): number | undefined {
  if (values.length < 2) return undefined;
  const validValues = values.filter((v) => v > 0);
  if (validValues.length < 2) return undefined;

  const best = type === "max" ? Math.max(...values) : Math.min(...values);
  return values.indexOf(best);
}
