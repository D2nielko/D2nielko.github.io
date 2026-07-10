---
title: "Introduction to Graph Algorithms"
date: "2024-09-20"
description: "Exploring fundamental graph algorithms including BFS, DFS, and their real-world applications."
topics: ["graphs", "algorithms", "data-structures"]
---

Graphs are one of the most versatile data structures in computer science, capable of modeling relationships between entities in countless real-world scenarios. From social networks to transportation systems, graphs are everywhere.

## What are Graphs?

A graph is a collection of vertices (nodes) connected by edges. Graphs can be:
- **Directed** or **Undirected**
- **Weighted** or **Unweighted**
- **Cyclic** or **Acyclic**

## Graph Representation

### Adjacency List
```python
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
```

### Adjacency Matrix
```python
# For vertices A, B, C, D, E, F (indices 0-5)
matrix = [
    [0, 1, 1, 0, 0, 0],  # A
    [1, 0, 0, 1, 1, 0],  # B
    [1, 0, 0, 0, 0, 1],  # C
    [0, 1, 0, 0, 0, 0],  # D
    [0, 1, 0, 0, 0, 1],  # E
    [0, 0, 1, 0, 1, 0]   # F
]
```

## Breadth-First Search (BFS)

BFS explores the graph level by level, visiting all neighbors before moving to the next level.

```python
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
```

## Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking.

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    result = [start]

    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result
```

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
