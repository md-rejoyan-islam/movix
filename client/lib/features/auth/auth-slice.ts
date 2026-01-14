import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  API_BASE_URL,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "../../api/config";
import type {
  AddToWishlistRequest,
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  MessageResponse,
  ProfileResponse,
  RegisterRequest,
  ResetPasswordRequest,
  Tokens,
  UpdateProfileRequest,
  WishlistCheckResponse,
  WishlistItem,
} from "../../api/types";

// Re-export types for backwards compatibility
export type { AddToWishlistRequest, WishlistItem };

// Custom base query with token refresh
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401, try to refresh the token
  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      // Try to get a new token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as { tokens: Tokens };
        // Store the new tokens
        setTokens(data.tokens.accessToken, data.tokens.refreshToken);

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, clear tokens
        clearTokens();
      }
    }
  }

  return result;
};

// Auth API slice
export const authSlice = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Wishlist"],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get current user profile
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),

    // Update profile
    updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Deactivate account
    deactivateAccount: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/auth/account",
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Wishlist"],
    }),

    // Forgot password
    forgotPassword: builder.mutation<
      MessageResponse & { resetToken?: string },
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Refresh token
    refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: (data) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: data,
      }),
    }),

    // Get wishlist
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),

    // Add to wishlist
    addToWishlist: builder.mutation<WishlistItem, AddToWishlistRequest>({
      query: (item) => ({
        url: "/wishlist",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // Remove from wishlist
    removeFromWishlist: builder.mutation<MessageResponse, number>({
      query: (movieId) => ({
        url: `/wishlist/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // Check if in wishlist
    checkWishlist: builder.query<WishlistCheckResponse, number>({
      query: (movieId) => `/wishlist/check/${movieId}`,
      providesTags: ["Wishlist"],
    }),

    // Clear wishlist
    clearWishlist: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/wishlist",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useDeactivateAccountMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useCheckWishlistQuery,
  useClearWishlistMutation,
} = authSlice;
