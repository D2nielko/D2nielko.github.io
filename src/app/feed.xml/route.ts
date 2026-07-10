import { buildFeed } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const feed = buildFeed(["posts", "icpc"], {
    title: "Daniel Ko",
    path: "/feed.xml",
  });

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
