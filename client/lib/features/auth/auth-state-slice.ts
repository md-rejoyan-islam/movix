import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTokens, getAccessToken, setTokens } from "../../api/config";
import type { Tokens, User } from "../../api/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authStateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; tokens: Tokens }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      // Store tokens in localStorage
      setTokens(
        action.payload.tokens.accessToken,
        action.payload.tokens.refreshToken
      );
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      // Remove tokens from localStorage
      clearTokens();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initializeAuth: (state) => {
      // Check for token in localStorage on app load
      const token = getAccessToken();
      if (token) {
        // Token exists, will try to fetch profile
        state.isAuthenticated = true;
      }
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setUser, logout, setLoading, initializeAuth } =
  authStateSlice.actions;
export default authStateSlice.reducer;
