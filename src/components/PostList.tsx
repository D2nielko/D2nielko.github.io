import Link from "next/link";
import { CATEGORY_LABELS, type PostMeta } from "@/lib/content";

export function PostList({ posts, hrefBase }: { posts: PostMeta[]; hrefBase: string }) {
  return (
    <ul>
      {posts.map((post) => {
        const categoryLabel = post.category
          ? CATEGORY_LABELS[post.category] ?? post.category
          : undefined;
        const topicsLabel = post.topics?.length ? post.topics.join(", ") : undefined;
        const metaLabel = [categoryLabel, topicsLabel].filter(Boolean).join(" · ");

        return (
          <li key={post.slug}>
            <Link
              href={`${hrefBase}/${post.slug}/`}
              className="group flex flex-col sm:flex-row gap-1 sm:gap-4 py-3"
            >
              <time
                dateTime={post.date}
                className="font-mono text-sm text-neutral-500 sm:w-28 shrink-0"
              >
                {post.date}
              </time>
              <div>
                <div className="font-medium group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                  {post.title}
                </div>
                {post.description ? (
                  <p className="text-sm text-neutral-500">{post.description}</p>
                ) : null}
                {metaLabel ? (
                  <p className="text-xs text-neutral-400 font-mono">{metaLabel}</p>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
