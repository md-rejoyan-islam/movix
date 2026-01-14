// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5050/api/v1";

// Token storage keys
export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

// Cookie options
const COOKIE_MAX_AGE_ACCESS = 15 * 60; // 15 minutes in seconds
const COOKIE_MAX_AGE_REFRESH = 7 * 24 * 60 * 60; // 7 days in seconds

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

// Helper to set cookie
const setCookie = (name: string, value: string, maxAge: number): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

// Helper to delete cookie
const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};

// Token helpers
export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, COOKIE_MAX_AGE_ACCESS);
  setCookie(REFRESH_TOKEN_KEY, refreshToken, COOKIE_MAX_AGE_REFRESH);
};

export const clearTokens = (): void => {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
};

// Refresh tokens using refresh token
export const refreshTokens = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return false;
    }

    const data = await response.json();
    if (data.tokens) {
      setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    clearTokens();
    return false;
  }
};
