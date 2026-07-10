import Link from "next/link";
import { PostList } from "@/components/PostList";
import { getPosts } from "@/lib/content";

export default function Home() {
  const posts = getPosts("posts").slice(0, 5);
  const icpcNotes = getPosts("icpc").slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Daniel Ko</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        I&apos;m a CS student at UBC writing about frontier AI, software engineering, and quant.
        I also keep a separate set of ICPC prep notes as I work through algorithms and contest
        technique. More on the{" "}
        <Link href="/about/" className="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100">
          about
        </Link>{" "}
        page.
      </p>

      <h2 className="text-xl font-semibold tracking-tight mt-12">Recent posts</h2>
      <div className="mt-4">
        <PostList posts={posts} hrefBase="/posts" />
      </div>
      <Link
        href="/posts/"
        className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        All posts →
      </Link>

      <h2 className="text-xl font-semibold tracking-tight mt-12">ICPC notes</h2>
      <div className="mt-4">
        <PostList posts={icpcNotes} hrefBase="/icpc" />
      </div>
      <Link
        href="/icpc/"
        className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        All notes →
      </Link>
    </div>
  );
}
