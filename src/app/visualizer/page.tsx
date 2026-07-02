"use client";

import * as React from "react";
import Link from "next/link";
import Controls from "@/components/visualizer/Controls";
import QueuePanel from "@/components/visualizer/QueuePanel";
import Scene3D from "@/components/visualizer/Scene3D";
import { useCamera } from "@/components/visualizer/useCamera";
import { createGrid } from "@/lib/visualizer/createGrid";
import { dijkstra } from "@/lib/visualizer/dijkstra";
import {
  GRID_COLS,
  GRID_ROWS,
  type CellVisual,
  type Grid,
  type PlaybackState,
  type QueueEntry,
} from "@/lib/visualizer/types";

/** Per-step replay delay in ms, indexed by speed - 1 (speed 1 slow … 5 fast). */
const STEP_DELAYS_MS = [240, 180, 120, 60, 25] as const;
/** Stagger between consecutive path cells lighting up. */
const PATH_STAGGER_MS = 40;

type EditMode = "start" | "end" | "walls";

interface QueuePanelData {
  queue: QueueEntry[];
  popped: QueueEntry | null;
  stepIndex: number;
  totalSteps: number;
}

const EMPTY_QUEUE_DATA: QueuePanelData = {
  queue: [],
  popped: null,
  stepIndex: 0,
  totalSteps: 0,
};

function makeEmptyVisuals(): CellVisual[][] {
  return Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, (): CellVisual => ({ dist: null, onPath: false })),
  );
}

export default function VisualizerPage() {
  const [grid, setGrid] = React.useState<Grid>(() => createGrid());
  const [visuals, setVisuals] = React.useState<CellVisual[][]>(makeEmptyVisuals);
  const [playback, setPlayback] = React.useState<PlaybackState>("idle");
  const [speed, setSpeed] = React.useState(3);
  const [queueData, setQueueData] = React.useState<QueuePanelData>(EMPTY_QUEUE_DATA);
  const [notice, setNotice] = React.useState<string | null>(null);

  const cam = useCamera();

  // Refs so the (stable) cell handlers and timer chain always see fresh state.
  const gridRef = React.useRef(grid);
  gridRef.current = grid;
  const playbackRef = React.useRef(playback);
  playbackRef.current = playback;
  const speedRef = React.useRef(speed);
  speedRef.current = speed;

  // Active edit gesture: what pointer-down armed, until the button is released.
  const editModeRef = React.useRef<EditMode | null>(null);
  // While painting walls: true = lay walls, false = erase them.
  const paintWallsRef = React.useRef(true);

  // Pending replay timers; cleared on Reset / re-Visualize / unmount.
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = React.useCallback(() => {
    for (const id of timersRef.current) clearTimeout(id);
    timersRef.current = [];
  }, []);

  React.useEffect(() => clearTimers, [clearTimers]);

  // End the edit gesture whenever the (left) button is released anywhere.
  React.useEffect(() => {
    const end = () => {
      editModeRef.current = null;
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);

  const clearRunVisuals = React.useCallback(() => {
    setVisuals(makeEmptyVisuals());
    setQueueData(EMPTY_QUEUE_DATA);
    setNotice(null);
  }, []);

  /** Editing a finished board discards the stale search overlay. */
  const beginEdit = React.useCallback(() => {
    if (playbackRef.current === "done") {
      clearRunVisuals();
      setPlayback("idle");
      playbackRef.current = "idle";
    }
  }, [clearRunVisuals]);

  const applyWall = React.useCallback((row: number, col: number, makeWall: boolean) => {
    setGrid((g) => {
      const cell = g[row][col];
      if (cell.kind === "start" || cell.kind === "end") return g;
      const kind = makeWall ? "wall" : "empty";
      if (cell.kind === kind) return g;
      return g.map((cells, r) =>
        r === row ? cells.map((c2, c) => (c === col ? { ...c2, kind } : c2)) : cells,
      );
    });
  }, []);

  const moveEndpoint = React.useCallback((endpoint: "start" | "end", row: number, col: number) => {
    setGrid((g) => {
      const target = g[row][col];
      // Never onto a wall or the other endpoint (or itself).
      if (target.kind !== "empty") return g;
      return g.map((cells) =>
        cells.map((cell) => {
          if (cell.kind === endpoint) return { ...cell, kind: "empty" as const };
          if (cell.row === row && cell.col === col) return { ...cell, kind: endpoint };
          return cell;
        }),
      );
    });
  }, []);

  const handleCellDown = React.useCallback(
    (row: number, col: number) => {
      const pb = playbackRef.current;
      if (pb !== "idle" && pb !== "done") return;
      beginEdit();

      const kind = gridRef.current[row][col].kind;
      if (kind === "start" || kind === "end") {
        editModeRef.current = kind;
        return;
      }
      editModeRef.current = "walls";
      paintWallsRef.current = kind !== "wall";
      applyWall(row, col, paintWallsRef.current);
    },
    [applyWall, beginEdit],
  );

  const handleCellEnter = React.useCallback(
    (row: number, col: number) => {
      const mode = editModeRef.current;
      if (!mode) return;
      const pb = playbackRef.current;
      if (pb !== "idle" && pb !== "done") return;

      if (mode === "walls") applyWall(row, col, paintWallsRef.current);
      else moveEndpoint(mode, row, col);
    },
    [applyWall, moveEndpoint],
  );

  const stepDelay = React.useCallback(
    () => STEP_DELAYS_MS[Math.min(Math.max(speedRef.current, 1), 5) - 1],
    [],
  );

  const schedule = React.useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  /** Patch a single cell's visual, cloning only the touched row. */
  const patchVisual = React.useCallback(
    (row: number, col: number, patch: Partial<CellVisual>) => {
      setVisuals((v) =>
        v.map((cells, r) =>
          r === row
            ? cells.map((vis, c) => (c === col ? { ...vis, ...patch } : vis))
            : cells,
        ),
      );
    },
    [],
  );

  const handleVisualize = React.useCallback(() => {
    if (playbackRef.current === "running") return;
    clearTimers();
    clearRunVisuals();
    editModeRef.current = null;

    const result = dijkstra(gridRef.current);
    const { steps, shortestPath, found } = result;
    const totalSteps = steps.length;

    setPlayback("running");

    const finish = () => {
      if (found) {
        // found implies a non-empty path (start -> end inclusive).
        shortestPath.forEach((cell, i) => {
          schedule(() => {
            patchVisual(cell.row, cell.col, { onPath: true });
            if (i === shortestPath.length - 1) setPlayback("done");
          }, (i + 1) * PATH_STAGGER_MS);
        });
      } else {
        setNotice("No path found — the end is walled off.");
        setPlayback("done");
      }
    };

    if (totalSteps === 0) {
      finish();
      return;
    }

    const runStep = (i: number) => {
      const step = steps[i];
      const { row, col, dist } = step.visited;
      patchVisual(row, col, { dist });
      setQueueData({
        queue: step.queue,
        popped: step.visited,
        stepIndex: i + 1,
        totalSteps,
      });
      if (i + 1 < totalSteps) schedule(() => runStep(i + 1), stepDelay());
      else finish();
    };

    schedule(() => runStep(0), stepDelay());
  }, [clearRunVisuals, clearTimers, patchVisual, schedule, stepDelay]);

  const handleReset = React.useCallback(() => {
    clearTimers();
    clearRunVisuals();
    editModeRef.current = null;
    setPlayback("idle");
  }, [clearRunVisuals, clearTimers]);

  const handleClearWalls = React.useCallback(() => {
    handleReset();
    setGrid((g) =>
      g.map((cells) =>
        cells.map((cell) => (cell.kind === "wall" ? { ...cell, kind: "empty" as const } : cell)),
      ),
    );
  }, [handleReset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              Daniel Ko
            </Link>
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Dijkstra&apos;s Algorithm — 3D Visualizer
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Left-drag: draw walls / move endpoints · Scroll: zoom · Right-drag: pan
          </p>

          <div className="mb-4">
            <Controls
              playback={playback}
              speed={speed}
              onVisualize={handleVisualize}
              onReset={handleReset}
              onClearWalls={handleClearWalls}
              onSpeedChange={setSpeed}
            />
          </div>

          <div
            ref={cam.containerRef}
            {...cam.containerProps}
            className="relative h-[70vh] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg"
          >
            <Scene3D
              grid={grid}
              visuals={visuals}
              camera={cam.camera}
              onCellDown={handleCellDown}
              onCellEnter={handleCellEnter}
            />

            <QueuePanel
              queue={queueData.queue}
              popped={queueData.popped}
              stepIndex={queueData.stepIndex}
              totalSteps={queueData.totalSteps}
            />

            <button
              type="button"
              onClick={cam.reset}
              className="absolute left-4 top-4 z-30 rounded-lg border border-slate-300 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow backdrop-blur-md transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Reset view
            </button>

            {notice && (
              <div
                role="status"
                className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-lg border border-amber-300 bg-amber-50/90 px-4 py-2 text-sm font-medium text-amber-800 shadow backdrop-blur-md dark:border-amber-700 dark:bg-amber-950/80 dark:text-amber-200"
              >
                {notice}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
