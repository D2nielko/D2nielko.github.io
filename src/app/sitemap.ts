import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const STATIC_ROUTES = ["/", "/posts/", "/icpc/", "/about/", "/visualizer/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
  }));

  const postEntries: MetadataRoute.Sitemap = getPosts("posts").map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  const icpcEntries: MetadataRoute.Sitemap = getPosts("icpc").map((post) => ({
    url: `${siteConfig.url}/icpc/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...postEntries, ...icpcEntries];
}
