import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieSlice = createApi({
  reducerPath: "movieAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_KEY || "",
    },
  }),
  tagTypes: [
    "Movie",
    "TV_Show",
    "Trending",
    "Popular_TV_Shows",
    "Popular_Movies",
    "Top_Rated_Movies",
    "Top_Rated_TV_Shows",
  ],
  endpoints: () => ({}),
});
