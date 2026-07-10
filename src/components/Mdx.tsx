import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import type { PostFormat } from "@/lib/content";

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: true,
} satisfies RehypePrettyCodeOptions;

export function Mdx({ content, format }: { content: string; format: PostFormat }) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          format,
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            rehypeKatex,
            rehypeSlug,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
