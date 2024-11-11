import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search by id",
  description: "Search for your favorite movies and tv shows by id.",
  openGraph: {
    title: "Search by id",
    description: "Search for your favorite movies and tv shows by id.",
  },
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
