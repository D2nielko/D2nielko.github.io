import { MinHeap } from "./minHeap";
import type { Cell, DijkstraResult, DijkstraStep, Grid, QueueEntry } from "./types";

const DIRECTIONS = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
] as const;

/**
 * Dijkstra's algorithm over a grid: 4-directional movement, unit edge
 * weights, walls impassable. Records one DijkstraStep per settled node so a
 * UI can replay the search, including a level-order heap snapshot.
 */
export function dijkstra(grid: Grid): DijkstraResult {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const start = findCell(grid, "start");
  const end = findCell(grid, "end");

  const steps: DijkstraStep[] = [];
  if (!start || !end) {
    return { steps, shortestPath: [], found: false };
  }

  const dist: number[][] = grid.map((row) => row.map(() => Infinity));
  const prev: (Cell | null)[][] = grid.map((row) => row.map(() => null));
  const settled: boolean[][] = grid.map((row) => row.map(() => false));

  const heap = new MinHeap();
  dist[start.row][start.col] = 0;
  heap.push({ row: start.row, col: start.col, dist: 0 });

  let found = false;
  while (heap.size > 0) {
    const current = heap.pop() as QueueEntry;
    // Lazy deletion: a node re-pushed with a shorter distance leaves its
    // old entry in the heap; skip entries that are no longer the best.
    if (current.dist > dist[current.row][current.col]) continue;
    settled[current.row][current.col] = true;

    if (current.row === end.row && current.col === end.col) {
      found = true;
      steps.push({ visited: current, queue: heap.toArray() });
      break;
    }

    for (const [dRow, dCol] of DIRECTIONS) {
      const row = current.row + dRow;
      const col = current.col + dCol;
      if (row < 0 || row >= rows || col < 0 || col >= cols) continue;
      if (grid[row][col].kind === "wall" || settled[row][col]) continue;

      const candidate = current.dist + 1;
      if (candidate < dist[row][col]) {
        dist[row][col] = candidate;
        prev[row][col] = grid[current.row][current.col];
        heap.push({ row, col, dist: candidate });
      }
    }

    steps.push({ visited: current, queue: heap.toArray() });
  }

  return {
    steps,
    shortestPath: found ? reconstructPath(prev, start, end) : [],
    found,
  };
}

function findCell(grid: Grid, kind: "start" | "end"): Cell | null {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.kind === kind) return cell;
    }
  }
  return null;
}

/** Walk prev pointers back from the end, returning start -> end inclusive. */
function reconstructPath(
  prev: (Cell | null)[][],
  start: Cell,
  end: Cell,
): { row: number; col: number }[] {
  const path: { row: number; col: number }[] = [];
  let cell: Cell | null = end;
  while (cell) {
    path.push({ row: cell.row, col: cell.col });
    if (cell.row === start.row && cell.col === start.col) break;
    cell = prev[cell.row][cell.col];
  }
  return path.reverse();
}
