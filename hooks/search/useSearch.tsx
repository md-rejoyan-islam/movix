import { useGetSearchedMoviesQuery } from "@/lib/features/movie/movie-api";
import React from "react";

export default function useSearch() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");

  const { data } = useGetSearchedMoviesQuery(query);

  // debounce search
  const timeoutId = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Clear the existing timeout to reset the debounce timer
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const debounceTimeout = 700; // debounce delay in ms
    timeoutId.current = setTimeout(() => {
      setQuery(value);
    }, debounceTimeout);
  };

  // clear search
  const handleClearSearch = () => {
    setQuery("");
    setSearchValue("");
  };

  return { searchValue, handleSearch, data, handleClearSearch };
}
