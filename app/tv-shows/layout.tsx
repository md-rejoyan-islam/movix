import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Find your favorite TV shows here and can sort them by genres.",
  openGraph: {
    title: "TV Shows",
    description:
      "Find your favorite TV shows here and can sort them by genres.",
  },
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
