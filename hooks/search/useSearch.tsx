import { useGetSearchedMoviesQuery } from "@/lib/features/movie/movie-api";
import React from "react";

export default function useSearch({
  title,
  page = 1,
}: {
  title?: string;
  page?: number;
}) {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>(title || "");

  const { data, isLoading, refetch } = useGetSearchedMoviesQuery({
    query,
    page: page,
  });

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

  // if title changed, reset page to 1 and refetch
  React.useEffect(() => {
    if (title) {
      setQuery(title);
    }
  }, [title]);

  return {
    searchValue,
    handleSearch,
    data,
    handleClearSearch,
    isLoading,
    refetch,
  };
}
