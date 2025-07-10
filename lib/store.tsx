"use client";

import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./features/movie/movie-slice";

export const store = () =>
  configureStore({
    reducer: {
      [movieSlice.reducerPath]: movieSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(movieSlice.middleware),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
