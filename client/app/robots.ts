import { siteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/login",
          "/register",
          "/forgot-password",
          "/wishlist",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/login",
          "/register",
          "/forgot-password",
          "/wishlist",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
