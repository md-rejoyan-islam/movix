import {
  GenresResponse,
  MovieCredits,
  MovieDetails,
  MovieImagesResponse,
  MoviesResponse,
  MovieVideosResponse,
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
    sortingMovies: builder.query<MoviesResponse, string>({
      query: (query: string) => ({
        url: `/${query}`,
        method: "GET",
      }),
    }),
    getGenreList: builder.query<GenresResponse, string>({
      query: (query: string) => ({
        url: `/genre/${query}`,
        method: "GET",
      }),
    }),
    getSingleMovieById: builder.query<MovieDetails, string>({
      query: (query: string) => ({
        url: `/${query}`,
        method: "GET",
      }),
    }),
    getMovieCredits: builder.query<MovieCredits, string>({
      query: (query: string) => ({
        url: `/${query}/credits`,
        method: "GET",
      }),
    }),
    getRecommendationsMovies: builder.query<MoviesResponse, string>({
      query: (query: string) => ({
        url: `/${query}/recommendations`,
        method: "GET",
      }),
    }),
    getSimilarMovies: builder.query<MoviesResponse, string>({
      query: (query: string) => ({
        url: `/${query}/similar`,
        method: "GET",
      }),
    }),
    getMovieAllImages: builder.query<MovieImagesResponse, string>({
      query: (query: string) => ({
        url: `/${query}/images`,
        method: "GET",
      }),
    }),
    getMovieAllVideos: builder.query<MovieVideosResponse, string>({
      query: (query: string) => ({
        url: `/${query}/videos`,
        method: "GET",
      }),
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
  useSortingMoviesQuery,
  useGetGenreListQuery,
  useGetSingleMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetRecommendationsMoviesQuery,
  useGetSimilarMoviesQuery,
  useGetMovieAllImagesQuery,
  useGetMovieAllVideosQuery,
} = movieAPI;
