"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompareMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
  overview: string;
  popularity: number;
  vote_count: number;
  original_language: string;
  status?: string;
  budget?: number;
  revenue?: number;
  type: "movie" | "tv";
}

interface CompareState {
  movies: CompareMovie[];
  maxMovies: number;
}

const initialState: CompareState = {
  movies: [],
  maxMovies: 3,
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<CompareMovie>) => {
      if (state.movies.length < state.maxMovies) {
        const exists = state.movies.find((m) => m.id === action.payload.id);
        if (!exists) {
          state.movies.push(action.payload);
        }
      }
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },
    clearCompare: (state) => {
      state.movies = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
