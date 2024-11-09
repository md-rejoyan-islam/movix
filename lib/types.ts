export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TrendingMovie extends Movie {
  title: string;
  original_title: string;
  media_type: string;
  release_date: string;
  video: boolean;
}

export interface PopularTheaterMovie extends Movie {
  origin_country: string[];
  original_title: string;
  release_date: string;
  name: string;
}
export interface PopularTvMovie extends Movie {
  original_name: string;
  first_air_date: string;
  title: string;
  video: boolean;
}

export interface TopRatedTvMovie extends Movie {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
}

export interface TopRatedMovie extends Movie {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface TrendingMoviesResponse {
  results: TrendingMovie[];
  page: number;
}

export interface PopularTheaterMoviesResponse {
  results: PopularTheaterMovie[];
  page: number;
}
export interface PopularTvMoviesResponse {
  results: PopularTvMovie[];
  page: number;
}

export interface TopRatedTvMoviesResponse {
  results: TopRatedTvMovie[];
  page: number;
}

export interface TopRatedMoviesResponse {
  results: TopRatedMovie[];
  page: number;
}

export interface TopMoviesDetails extends Movie {
  title?: string;
  original_title?: string;
  media_type?: string;
  release_date?: string;
  video?: boolean;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export interface MoviesResponse {
  results: TopMoviesDetails[];
  page: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}
