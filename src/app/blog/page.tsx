import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  robots: { index: false },
};

export default function BlogRedirect() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <meta httpEquiv="refresh" content="0; url=/posts/" />
      <p className="text-neutral-600 dark:text-neutral-400">
        This page has moved to <Link href="/posts/" className="underline underline-offset-2">/posts/</Link>.
      </p>
    </div>
  );
}
