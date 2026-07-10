import { Feed } from "feed";
import { getPosts, type Section } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const MAX_ITEMS = 20;

export function buildFeed(
  sections: Section[],
  opts: { title: string; path: string }
): Feed {
  const feed = new Feed({
    id: `${siteConfig.url}/`,
    link: `${siteConfig.url}/`,
    title: opts.title,
    description: siteConfig.description,
    language: "en",
    copyright: `© ${new Date().getFullYear()} Daniel Ko`,
    feedLinks: {
      rss: `${siteConfig.url}${opts.path}`,
    },
  });

  const items = sections
    .flatMap((section) =>
      getPosts(section).map((post) => ({
        title: post.title,
        id: `${siteConfig.url}/${section}/${post.slug}/`,
        link: `${siteConfig.url}/${section}/${post.slug}/`,
        description: post.description,
        date: new Date(post.date),
      }))
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, MAX_ITEMS);

  for (const item of items) {
    feed.addItem(item);
  }

  return feed;
}
