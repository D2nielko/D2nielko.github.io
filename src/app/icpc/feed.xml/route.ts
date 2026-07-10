import { buildFeed } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const feed = buildFeed(["icpc"], {
    title: "Daniel Ko — ICPC notes",
    path: "/icpc/feed.xml",
  });

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
