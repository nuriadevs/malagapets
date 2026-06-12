// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const isPreview = process.env.VERCEL_ENV === "preview";
const isDev = process.env.NODE_ENV === "development";
const blockIndexing = isPreview || isDev;

const DISALLOWED_PATHS = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  if (blockIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot"],
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
        crawlDelay: 1,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
