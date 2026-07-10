import { buildFeed } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const feed = buildFeed(["posts"], {
    title: "Daniel Ko — Posts",
    path: "/posts/feed.xml",
  });

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
