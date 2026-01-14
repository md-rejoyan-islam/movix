"use client";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  WishlistItem,
} from "@/lib/features/auth/auth-slice";
import { imageUrl } from "@/lib/helper";
import { RootState } from "@/lib/store";
import {
  Calendar,
  Film,
  Heart,
  HeartOff,
  Loader2,
  Sparkles,
  Star,
  Trash2,
  Tv,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    movieId: number | null;
    title: string;
  }>({ show: false, movieId: null, title: "" });

  const { data, isLoading, isFetching } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleRemoveClick = (movieId: number, title: string) => {
    setDeleteConfirm({ show: true, movieId, title });
  };

  const handleConfirmRemove = async () => {
    if (deleteConfirm.movieId) {
      try {
        await removeFromWishlist(deleteConfirm.movieId).unwrap();
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
      }
    }
    setDeleteConfirm({ show: false, movieId: null, title: "" });
  };

  const handleCancelRemove = () => {
    setDeleteConfirm({ show: false, movieId: null, title: "" });
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-pink" />
      </div>
    );
  }

  // data is now an array directly
  const wishlist = data || [];

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-container mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink/20 to-orange/20 border border-pink/30 mb-6">
            <Heart className="w-5 h-5 text-pink fill-pink" />
            <span className="text-white font-medium">My Wishlist</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-pink to-orange bg-clip-text text-transparent">
              Favorite
            </span>{" "}
            Collection
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Keep track of all the movies and TV shows you want to watch. Your
            personal collection, always at your fingertips.
          </p>
        </div>

        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-pink mb-4" />
            <p className="text-white/60">Loading your wishlist...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isFetching && wishlist.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-6">
              <HeartOff className="w-12 h-12 text-white/40" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Start exploring and add your favorite movies and TV shows to your
              wishlist.
            </p>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink to-orange text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Explore Movies
            </Link>
          </motion.div>
        )}

        {/* Wishlist Grid */}
        {!isLoading && !isFetching && wishlist.length > 0 && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 text-center">
                <p className="text-3xl font-bold text-white mb-1">
                  {wishlist.length}
                </p>
                <p className="text-white/60 text-sm">Total Items</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 text-center">
                <p className="text-3xl font-bold text-pink mb-1">
                  {wishlist.filter((item) => item.type === "movie").length}
                </p>
                <p className="text-white/60 text-sm">Movies</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 text-center">
                <p className="text-3xl font-bold text-orange mb-1">
                  {wishlist.filter((item) => item.type === "tv").length}
                </p>
                <p className="text-white/60 text-sm">TV Shows</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 text-center">
                <p className="text-3xl font-bold text-yellow-400 mb-1">
                  {wishlist.length > 0
                    ? (
                        wishlist.reduce(
                          (acc, item) => acc + item.vote_average,
                          0
                        ) / wishlist.length
                      ).toFixed(1)
                    : "0"}
                </p>
                <p className="text-white/60 text-sm">Avg Rating</p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              <AnimatePresence>
                {wishlist.map((item: WishlistItem, index: number) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <Link
                      href={`/${
                        item.type === "tv" ? "tv-shows" : "movies"
                      }/details/${item.movieId}`}
                      className="block"
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5">
                        <Image
                          src={imageUrl(item.poster_path)}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Type Badge */}
                        <div className="absolute top-2 left-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                              item.type === "movie"
                                ? "bg-pink/90 text-white"
                                : "bg-orange/90 text-white"
                            }`}
                          >
                            {item.type === "movie" ? (
                              <Film className="w-3 h-3" />
                            ) : (
                              <Tv className="w-3 h-3" />
                            )}
                            {item.type === "movie" ? "Movie" : "TV"}
                          </span>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            {item.vote_average?.toFixed(1)}
                          </span>
                        </div>

                        {/* Info on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                            {item.title}
                          </h3>
                          {item.release_date && (
                            <div className="flex items-center gap-1 text-white/70 text-xs">
                              <Calendar className="w-3 h-3" />
                              {item.release_date.slice(0, 4)}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        handleRemoveClick(item.movieId, item.title)
                      }
                      disabled={isRemoving}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-300 hover:scale-110 z-10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Title below card */}
                    <div className="mt-2">
                      <h3 className="text-white text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-xs">
                        {item.release_date?.slice(0, 4) || "N/A"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm.show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[5000] p-4"
              onClick={handleCancelRemove}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0a1929] rounded-2xl border border-white/10 p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 mb-4">
                    <Trash2 className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Remove from Wishlist?
                  </h3>
                  <p className="text-white/60 mb-6">
                    Are you sure you want to remove{" "}
                    <span className="text-pink font-medium">
                      {deleteConfirm.title}
                    </span>{" "}
                    from your wishlist?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelRemove}
                      className="flex-1 py-3 px-4 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmRemove}
                      disabled={isRemoving}
                      className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      {isRemoving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Removing...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
