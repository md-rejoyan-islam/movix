"use client";

import {
  getAccessToken,
  getRefreshToken,
  refreshTokens,
} from "@/lib/api/config";
import { useLazyGetProfileQuery } from "@/lib/features/auth/auth-slice";
import {
  initializeAuth,
  logout,
  setLoading,
  setUser,
} from "@/lib/features/auth/auth-state-slice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export default function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [getProfile] = useLazyGetProfileQuery();
  const initialized = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      if (initialized.current) return;
      initialized.current = true;

      let token = getAccessToken();

      // If no access token but refresh token exists, try to refresh
      if (!token && getRefreshToken()) {
        dispatch(setLoading(true));
        const refreshed = await refreshTokens();
        if (refreshed) {
          token = getAccessToken();
        }
      }

      if (token) {
        try {
          dispatch(setLoading(true));
          const profile = await getProfile().unwrap();
          dispatch(
            setUser({
              id: profile.id,
              email: profile.email,
              fullName: profile.fullName,
              isActive: profile.isActive,
              lastLogin: profile.lastLogin,
              createdAt: profile.createdAt,
              updatedAt: profile.updatedAt,
            })
          );
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          dispatch(logout());
        }
      } else {
        dispatch(initializeAuth());
      }
    };

    initAuth();
  }, [dispatch, getProfile]);

  return <>{children}</>;
}
