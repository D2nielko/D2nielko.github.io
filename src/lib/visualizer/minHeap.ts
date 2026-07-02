import type { QueueEntry } from "./types";

/**
 * Binary min-heap over QueueEntry, ordered by `dist`.
 * Stored as a level-order array: children of index i live at 2i+1 and 2i+2.
 */
export class MinHeap {
  private entries: QueueEntry[] = [];

  get size(): number {
    return this.entries.length;
  }

  peek(): QueueEntry | undefined {
    return this.entries[0];
  }

  push(entry: QueueEntry): void {
    this.entries.push(entry);
    this.siftUp(this.entries.length - 1);
  }

  pop(): QueueEntry | undefined {
    const min = this.entries[0];
    const last = this.entries.pop();
    if (this.entries.length > 0 && last !== undefined) {
      // Move the last leaf to the root, then restore the heap order.
      this.entries[0] = last;
      this.siftDown(0);
    }
    return min;
  }

  /** Copy of the heap contents in level order; index 0 is the minimum. */
  toArray(): QueueEntry[] {
    return [...this.entries];
  }

  private siftUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.entries[parent].dist <= this.entries[index].dist) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  private siftDown(index: number): void {
    const count = this.entries.length;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;
      if (left < count && this.entries[left].dist < this.entries[smallest].dist) {
        smallest = left;
      }
      if (right < count && this.entries[right].dist < this.entries[smallest].dist) {
        smallest = right;
      }
      if (smallest === index) break;
      this.swap(smallest, index);
      index = smallest;
    }
  }

  private swap(a: number, b: number): void {
    [this.entries[a], this.entries[b]] = [this.entries[b], this.entries[a]];
  }
}
