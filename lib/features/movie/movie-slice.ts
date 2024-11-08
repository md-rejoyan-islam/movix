import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieSlice = createApi({
  reducerPath: "movieAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNlMmZlMTk2OWY3NDUzYWIwODczNGQ1YjJkYWU3MiIsIm5iZiI6MTczMTA3MDIxMC40NTM5NjQyLCJzdWIiOiI2NGE1OGJmNmEwYmUyODAxNGZhNzA4OWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vHER5HYShaFZKWg5fY1W6IGOyEoXqUsSLuit-UzjDGs",
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
