import {
  PopularTheaterMoviesResponse,
  PopularTvMoviesResponse,
  TopRatedMoviesResponse,
  TopRatedTvMoviesResponse,
  TrendingMoviesResponse,
} from "@/lib/types";
import { movieSlice } from "./movie-slice";

const movieAPI = movieSlice.injectEndpoints({
  endpoints: (builder) => ({
    trendingMoviesInToday: builder.query<TrendingMoviesResponse, void>({
      query: () => ({
        url: "/trending/movie/day",
        method: "GET",
      }),
    }),
    trendingMoviesInWeek: builder.query<TrendingMoviesResponse, void>({
      query: () => ({
        url: "/trending/movie/week",
        method: "GET",
      }),
    }),
    popularMoviesOnTv: builder.query<PopularTvMoviesResponse, void>({
      query: () => ({
        url: "/tv/popular",
        method: "GET",
      }),
    }),
    popularMoviesInTheaters: builder.query<PopularTheaterMoviesResponse, void>({
      query: () => ({
        url: "/movie/now_playing",
        method: "GET",
      }),
    }),
    TopRatedMovies: builder.query<TopRatedMoviesResponse, void>({
      query: () => ({
        url: "/movie/top_rated",
        method: "GET",
      }),
      providesTags: ["Top_Rated_Movies"],
    }),
    TopRatedTVShows: builder.query<TopRatedTvMoviesResponse, void>({
      query: () => ({
        url: "/tv/top_rated",
        method: "GET",
      }),
      providesTags: ["Top_Rated_TV_Shows"],
    }),
  }),
});

export const {
  useTrendingMoviesInTodayQuery,
  useTrendingMoviesInWeekQuery,
  usePopularMoviesOnTvQuery,
  usePopularMoviesInTheatersQuery,
  useTopRatedMoviesQuery,
  useTopRatedTVShowsQuery,
} = movieAPI;
