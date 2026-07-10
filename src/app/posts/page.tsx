import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Posts",
  description: "Writing on frontier AI, software engineering, and quant.",
};

export default function PostsPage() {
  const posts = getPosts("posts");

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
      <p className="mt-2 text-neutral-500">
        Writing on frontier AI, software engineering, and quant.
      </p>
      <div className="mt-8">
        <PostList posts={posts} hrefBase="/posts" />
      </div>
    </div>
  );
}
