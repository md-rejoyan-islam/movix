// image url

export const imageUrl = (path?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
  const defaultImage =
    process.env.NEXT_PUBLIC_DEFAULT_IMAGE ||
    "https://image.tmdb.org/t/p/w500/AgBNLcHFEXCRFZuKv0H8RWMxNAJ.jpg";
  return path ? baseUrl + path : defaultImage;
};

// date 2024-06-28 to Jun 15, 2024
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
