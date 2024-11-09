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

// Define interfaces for cast and crew members
export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

// Main interface that includes cast and crew arrays
export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Interface for production company items
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Interface for production country items
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Interface for spoken language items
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Main interface for the movie details
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | Record<string, any>; // Adjust if collection details are known
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  first_air_date?: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MoviePoster {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieImagesResponse {
  id: number;
  backdrops: MoviePoster[];
  posters: MoviePoster[];
  logos: MoviePoster[];
}
