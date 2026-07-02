import type * as React from "react";

export const GRID_ROWS = 15;
export const GRID_COLS = 21;

export type CellKind = "empty" | "wall" | "start" | "end";

export interface Cell {
  row: number;
  col: number;
  kind: CellKind;
}

export type Grid = Cell[][];

export interface QueueEntry {
  row: number;
  col: number;
  dist: number;
}

export interface DijkstraStep {
  /** The node settled (popped with final distance) at this step. */
  visited: QueueEntry;
  /** Min-heap contents in level order immediately after this step; [0] is the min. */
  queue: QueueEntry[];
}

export interface DijkstraResult {
  steps: DijkstraStep[];
  /** Cells on the shortest path, start -> end inclusive; empty when found is false. */
  shortestPath: { row: number; col: number }[];
  found: boolean;
}

export interface Camera {
  zoom: number;
  panX: number;
  panY: number;
  rotateX: number;
}

export const DEFAULT_CAMERA: Camera = { zoom: 1, panX: 0, panY: 0, rotateX: 55 };
export const MIN_ZOOM = 0.4;
export const MAX_ZOOM = 2.5;

export type PlaybackState = "idle" | "running" | "done";

export interface CellVisual {
  /** Settled distance revealed so far in the replay; null = not yet visited. */
  dist: number | null;
  onPath: boolean;
}

export interface CameraApi {
  camera: Camera;
  /** Attach to the scene wrapper div (non-passive wheel listener is bound via this ref). */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Spread onto the same wrapper div (pointer + context-menu handlers). */
  containerProps: React.HTMLAttributes<HTMLDivElement>;
  reset: () => void;
}

export interface Scene3DProps {
  grid: Grid;
  visuals: CellVisual[][];
  camera: Camera;
  /** Pointer down on a cell (left button only). */
  onCellDown: (row: number, col: number) => void;
  /** Pointer enters a cell while left button held (drag-paint / drag-move). */
  onCellEnter: (row: number, col: number) => void;
}

export interface ControlsProps {
  playback: PlaybackState;
  speed: number; // 1 (slow) .. 5 (fast)
  onVisualize: () => void;
  onReset: () => void;
  onClearWalls: () => void;
  onSpeedChange: (speed: number) => void;
}

export interface QueuePanelProps {
  queue: QueueEntry[];
  /** Most recently settled node, or null before the run starts. */
  popped: QueueEntry | null;
  stepIndex: number;
  totalSteps: number;
}
