"use client";
import { AppStore, store } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import AuthProvider from "./auth-provider";

export default function StoreProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <Provider store={storeRef.current}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
