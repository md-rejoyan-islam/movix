"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth-slice";
import authReducer from "./features/auth/auth-state-slice";
import compareReducer from "./features/compare/compare-slice";
import { movieSlice } from "./features/movie/movie-slice";

export const store = () =>
  configureStore({
    reducer: {
      [movieSlice.reducerPath]: movieSlice.reducer,
      [authSlice.reducerPath]: authSlice.reducer,
      compare: compareReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(movieSlice.middleware)
        .concat(authSlice.middleware),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
