import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search by title",
  description: "Search for your favorite movies and tv shows.",
  openGraph: {
    title: "Search",
    description: "Search for your favorite movies and tv shows.",
  },
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
