// User types
export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt?: string;
}

// Token types
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// Auth response types
export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

export interface ProfileResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageResponse {
  message: string;
}

// Auth request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
}

// Wishlist types
export interface WishlistItem {
  _id: string;
  movieId: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  type: "movie" | "tv";
  createdAt: string;
}

export interface AddToWishlistRequest {
  movieId: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  type: "movie" | "tv";
}

export interface WishlistCheckResponse {
  isInWishlist: boolean;
}

// Error response
export interface ApiError {
  message: string;
  error?: string;
  statusCode: number;
}
