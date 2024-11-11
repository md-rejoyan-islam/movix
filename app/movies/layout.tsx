import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "Find your favorite movies here and can sort them by genres.",
  openGraph: {
    title: "Movies",
    description: "Find your favorite movies here and can sort them by genres.",
  },
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
