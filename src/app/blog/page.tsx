import Link from "next/link";

const blogPosts = [
  {
    id: "binary-search-deep-dive",
    title: "Binary Search: A Deep Dive",
    excerpt: "Understanding the fundamentals of binary search algorithm and its applications in computer science.",
    date: "2024-09-28",
    readTime: "5 min read",
    tags: ["Algorithms", "Search", "Data Structures"]
  },
  {
    id: "time-complexity-explained",
    title: "Time Complexity Explained",
    excerpt: "A comprehensive guide to understanding Big O notation and analyzing algorithm efficiency.",
    date: "2024-09-25",
    readTime: "8 min read",
    tags: ["Algorithms", "Big O", "Analysis"]
  },
  {
    id: "graph-algorithms-intro",
    title: "Introduction to Graph Algorithms",
    excerpt: "Exploring fundamental graph algorithms including BFS, DFS, and their real-world applications.",
    date: "2024-09-20",
    readTime: "10 min read",
    tags: ["Graphs", "Algorithms", "Data Structures"]
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Daniel Ko
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 font-medium">Blog</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Algorithms & CS Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Exploring algorithms, data structures, and computer science concepts through detailed explanations and practical examples.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      Read more
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 Daniel Ko. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}