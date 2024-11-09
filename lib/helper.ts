// image url

import { Genre, Movie } from "./types";

export const imageUrl = (path?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const defaultImage =
    process.env.NEXT_PUBLIC_DEFAULT_IMAGE ||
    "https://image.tmdb.org/t/p/w500/AgBNLcHFEXCRFZuKv0H8RWMxNAJ.jpg";
  return path ? baseUrl + path : defaultImage;
};

// date 2024-06-28 to Jun 15, 2024
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getRandomImagePath = (data: Movie[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const defaultImage =
    process.env.NEXT_PUBLIC_DEFAULT_IMAGE ||
    "https://image.tmdb.org/t/p/w500/AgBNLcHFEXCRFZuKv0H8RWMxNAJ.jpg";
  const imagePath = data[Math.ceil(Math.random() * data.length)]?.backdrop_path;

  return data.length ? baseUrl + imagePath : defaultImage;
};

// sorting
export const sortingOptions = [
  { value: "popularity.asc", label: "Popularity Ascending" },
  {
    value: "popularity.desc",
    label: "Popularity Descending",
    // disable: true,
  },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },

  {
    value: "first_air_date.asc",
    label: "Release Date Ascending",
  },
  {
    value: "first_air_date.desc",
    label: "Release Date Descending",
  },
];

// get genre name by id
export const getGenreNames = (movie: Movie, genres: Genre[]) => {
  return movie.genre_ids.map(
    (id) => genres.find((genre) => genre.id === id)?.name
  );
};

// get backdrop image full path
export const getBackdropImageFullPath = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_ORIGINAL_IMAGE_BASE_URL || "";
  console.log(baseUrl + path);

  return baseUrl + path;
};

// get poster image full path
export const getPosterImageFullPath = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_ORIGINAL_IMAGE_BASE_URL || "";
  return baseUrl + path;
};

// get cast image full path
export const getCastImageFullPath = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  return path ? baseUrl + path : "/user.png";
};
