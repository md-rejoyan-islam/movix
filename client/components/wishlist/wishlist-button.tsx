"use client";

import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/lib/features/auth/auth-slice";
import { RootState } from "@/lib/store";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface WishlistButtonProps {
  movieId: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  type: "movie" | "tv";
  variant?: "default" | "icon";
  className?: string;
}

export default function WishlistButton({
  movieId,
  title,
  poster_path,
  vote_average,
  release_date,
  type,
  variant = "default",
  className = "",
}: WishlistButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();

  // wishlistData is now an array directly
  const isInWishlist = wishlistData?.some((item) => item.movieId === movieId);
  const isLoading = isAdding || isRemoving;

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(movieId).unwrap();
      } else {
        await addToWishlist({
          movieId,
          title,
          poster_path,
          vote_average,
          release_date,
          type,
        }).unwrap();
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isInWishlist
            ? "bg-pink text-white"
            : "bg-black/50 backdrop-blur-sm text-white hover:bg-pink"
        } ${className}`}
        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isInWishlist ? "fill-current" : ""
            }`}
          />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
        isInWishlist
          ? "bg-pink text-white border border-pink hover:bg-pink/80"
          : "bg-white/10 text-white border border-white/10 hover:bg-pink hover:border-pink"
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{isInWishlist ? "Removing..." : "Adding..."}</span>
        </>
      ) : (
        <>
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
          <span>{isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
        </>
      )}
    </button>
  );
}
