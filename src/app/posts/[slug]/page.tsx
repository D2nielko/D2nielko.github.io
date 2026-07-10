import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { CATEGORY_LABELS, getPost, getPosts } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPosts("posts").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("posts", slug);
  if (!post) {
    return {};
  }
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost("posts", slug);

  if (!post) {
    notFound();
  }

  const categoryLabel = post.meta.category
    ? CATEGORY_LABELS[post.meta.category] ?? post.meta.category
    : undefined;

  return (
    <article className="max-w-2xl mx-auto px-6 py-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{post.meta.title}</h1>
        <div className="mt-2 font-mono text-sm text-neutral-500">
          <time dateTime={post.meta.date}>{post.meta.date}</time>
          {categoryLabel ? <> · {categoryLabel}</> : null}
        </div>
      </header>
      <div className="prose prose-neutral dark:prose-invert mt-8">
        <Mdx content={post.content} format={post.format} />
      </div>
    </article>
  );
}
