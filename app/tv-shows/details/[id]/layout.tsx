import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Show Details",
  description: "Find your favorite TV shows details here.",
  openGraph: {
    title: "TV Show Details",
    description: "Find your favorite TV shows details here.",
  },
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
