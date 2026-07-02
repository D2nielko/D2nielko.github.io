import Link from "next/link";
import { notFound } from "next/navigation";

const blogPosts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}> = {
  "binary-search-deep-dive": {
    title: "Binary Search: A Deep Dive",
    date: "2024-09-28",
    readTime: "5 min read",
    tags: ["Algorithms", "Search", "Data Structures"],
    content: `
Binary search is one of the most fundamental algorithms in computer science. It's an efficient algorithm for finding an item from a sorted list of items by repeatedly dividing the search interval in half.

## How Binary Search Works

The basic idea is simple:
1. Compare the target value to the middle element of the array
2. If they match, we're done
3. If the target is less than the middle element, search the left half
4. If the target is greater than the middle element, search the right half
5. Repeat until found or the search space is empty

## Implementation

Here's a classic implementation in Python:

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Target not found
\`\`\`

## Time Complexity

Binary search has a time complexity of **O(log n)**, which makes it incredibly efficient for large datasets. Each comparison eliminates half of the remaining elements.

## Applications

Binary search isn't just for finding elements in arrays. It's used in:
- Finding insertion points
- Square root approximation
- Peak finding in arrays
- Search in rotated sorted arrays

## Conclusion

Understanding binary search is crucial for any computer science student. It demonstrates the power of divide-and-conquer algorithms and forms the foundation for many more complex algorithms.
`
  },
  "time-complexity-explained": {
    title: "Time Complexity Explained",
    date: "2024-09-25",
    readTime: "8 min read",
    tags: ["Algorithms", "Big O", "Analysis"],
    content: `
Time complexity is a fundamental concept in computer science that helps us analyze and compare the efficiency of algorithms. Understanding Big O notation is essential for writing efficient code and making informed decisions about algorithm selection.

## What is Time Complexity?

Time complexity describes how the runtime of an algorithm grows as the input size increases. It's expressed using Big O notation, which provides an upper bound on the growth rate.

## Common Time Complexities

### O(1) - Constant Time
Operations that take the same amount of time regardless of input size.

\`\`\`python
def get_first_element(arr):
    return arr[0]  # Always takes the same time
\`\`\`

### O(log n) - Logarithmic Time
Time increases logarithmically with input size. Binary search is a classic example.

### O(n) - Linear Time
Time increases linearly with input size.

\`\`\`python
def find_max(arr):
    max_val = arr[0]
    for num in arr:  # Must check every element
        if num > max_val:
            max_val = num
    return max_val
\`\`\`

### O(n²) - Quadratic Time
Time increases quadratically with input size. Nested loops often result in quadratic time.

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):      # Outer loop: n iterations
        for j in range(n-1): # Inner loop: n-1 iterations
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
\`\`\`

## Best, Average, and Worst Case

Algorithms can have different time complexities depending on the input:
- **Best case**: The input that causes the algorithm to run fastest
- **Average case**: The expected runtime for random input
- **Worst case**: The input that causes the algorithm to run slowest

## Why It Matters

Understanding time complexity helps you:
1. Choose the right algorithm for your problem
2. Optimize existing code
3. Predict how your program will scale
4. Pass technical interviews

## Practical Tips

1. Always consider the worst-case scenario when analyzing algorithms
2. Focus on the dominant term (ignore constants and lower-order terms)
3. Practice analyzing the time complexity of your own code
4. Remember that space complexity is equally important

Time complexity analysis is a skill that improves with practice. Start by analyzing simple algorithms and gradually work your way up to more complex ones.
`
  },
  "graph-algorithms-intro": {
    title: "Introduction to Graph Algorithms",
    date: "2024-09-20",
    readTime: "10 min read",
    tags: ["Graphs", "Algorithms", "Data Structures"],
    content: `
Graphs are one of the most versatile data structures in computer science, capable of modeling relationships between entities in countless real-world scenarios. From social networks to transportation systems, graphs are everywhere.

## What are Graphs?

A graph is a collection of vertices (nodes) connected by edges. Graphs can be:
- **Directed** or **Undirected**
- **Weighted** or **Unweighted**
- **Cyclic** or **Acyclic**

## Graph Representation

### Adjacency List
\`\`\`python
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
\`\`\`

### Adjacency Matrix
\`\`\`python
# For vertices A, B, C, D, E, F (indices 0-5)
matrix = [
    [0, 1, 1, 0, 0, 0],  # A
    [1, 0, 0, 1, 1, 0],  # B
    [1, 0, 0, 0, 0, 1],  # C
    [0, 1, 0, 0, 0, 0],  # D
    [0, 1, 0, 0, 0, 1],  # E
    [0, 0, 1, 0, 1, 0]   # F
]
\`\`\`

## Breadth-First Search (BFS)

BFS explores the graph level by level, visiting all neighbors before moving to the next level.

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    result = []

    while queue:
        vertex = queue.popleft()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)

            # Add unvisited neighbors to queue
            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return result
\`\`\`

## Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking.

\`\`\`python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    result = [start]

    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result
\`\`\`

## Applications

### BFS Applications:
- Shortest path in unweighted graphs
- Level-order traversal
- Finding connected components
- Bipartite graph detection

### DFS Applications:
- Topological sorting
- Cycle detection
- Path finding
- Maze solving

## Time and Space Complexity

Both BFS and DFS have:
- **Time Complexity**: O(V + E) where V is vertices and E is edges
- **Space Complexity**: O(V) for the visited set and recursion stack (DFS) or queue (BFS)

## Advanced Graph Algorithms

Once you master BFS and DFS, you can explore:
- Dijkstra's shortest path algorithm
- Minimum spanning trees (Kruskal's, Prim's)
- Network flow algorithms
- Strongly connected components

## Conclusion

Graph algorithms form the backbone of many computer science applications. Understanding BFS and DFS provides a solid foundation for tackling more complex graph problems. Practice implementing these algorithms and try to identify graph structures in real-world problems you encounter.
`
  }
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

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
              <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <Link href="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-8 transition-colors">
            <svg className="mr-2 w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Back to Blog
          </Link>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
              <time dateTime={post.date} className="mr-4">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Article content */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 lg:p-12">
            <div
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map(line => {
                    // Convert markdown-style headers
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white">${line.slice(4)}</h3>`;
                    }

                    // Convert code blocks
                    if (line.startsWith('```')) {
                      const lang = line.slice(3);
                      return line.includes('```') && line.length > 3 ?
                        `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto"><code class="language-${lang}">` :
                        `</code></pre>`;
                    }

                    // Convert inline code
                    line = line.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-sm">$1</code>');

                    // Convert bold text
                    line = line.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>');

                    // Regular paragraphs
                    if (line.trim() && !line.startsWith('<')) {
                      return `<p class="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">${line}</p>`;
                    }

                    return line;
                  })
                  .join('')
              }}
            />
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 Daniel Ko. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}