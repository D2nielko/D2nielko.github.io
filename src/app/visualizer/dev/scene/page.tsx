"use client";

import * as React from "react";
import Scene3D from "@/components/visualizer/Scene3D";
import {
  DEFAULT_CAMERA,
  GRID_COLS,
  GRID_ROWS,
  type CellKind,
  type CellVisual,
  type Grid,
} from "@/lib/visualizer/types";

const START = { row: 7, col: 3 };
const END = { row: 7, col: 17 };

/** Mock grid built inline — the real createGrid lives in a sibling module. */
function buildMockGrid(): Grid {
  const grid: Grid = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = [];
    for (let c = 0; c < GRID_COLS; c++) {
      let kind: CellKind = "empty";
      // Two vertical wall ribs with gaps, forcing a path detour.
      if (c === 8 && r !== 2 && r !== 3) kind = "wall";
      if (c === 12 && r !== 11 && r !== 12) kind = "wall";
      // A short horizontal ledge.
      if (r === 5 && c >= 14 && c <= 16) kind = "wall";
      if (r === START.row && c === START.col) kind = "start";
      if (r === END.row && c === END.col) kind = "end";
      row.push({ row: r, col: c, kind });
    }
    grid.push(row);
  }
  return grid;
}

/** Diamond of visited cells radiating from start, plus a fake path. */
function buildMockVisuals(grid: Grid): CellVisual[][] {
  const visuals: CellVisual[][] = grid.map((row) =>
    row.map((cell) => {
      const dist = Math.abs(cell.row - START.row) + Math.abs(cell.col - START.col);
      return {
        dist: cell.kind !== "wall" && dist <= 9 ? dist : null,
        onPath: false,
      };
    }),
  );

  // Fake path: out of start, up through the first gap, back down, east to end.
  const path: [number, number][] = [];
  for (let c = START.col; c <= 7; c++) path.push([7, c]);
  for (let r = 7; r >= 3; r--) path.push([r, 7]);
  path.push([3, 8]);
  for (let c = 9; c <= 11; c++) path.push([3, c]);
  for (let r = 3; r <= 11; r++) path.push([r, 11]);
  path.push([11, 12]);
  for (let c = 13; c <= END.col; c++) path.push([11, c]);
  for (let r = 11; r >= END.row; r--) path.push([r, END.col]);
  for (const [r, c] of path) {
    visuals[r][c].onPath = true;
    if (visuals[r][c].dist === null) visuals[r][c].dist = 9;
  }

  return visuals;
}

export default function SceneDevPage() {
  const grid = React.useMemo(buildMockGrid, []);
  const visuals = React.useMemo(() => buildMockVisuals(grid), [grid]);
  const [rotateX, setRotateX] = React.useState(DEFAULT_CAMERA.rotateX);
  const [zoom, setZoom] = React.useState(DEFAULT_CAMERA.zoom);

  const camera = { ...DEFAULT_CAMERA, rotateX, zoom };

  return (
    <main className="flex min-h-screen flex-col gap-4 bg-slate-100 p-6 dark:bg-slate-950">
      <header className="flex flex-wrap items-center gap-6">
        <h1 className="font-mono text-sm text-slate-500 dark:text-slate-400">
          scene-dev — Scene3D harness
        </h1>
        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          rotateX {rotateX}°
          <input
            type="range"
            min={0}
            max={80}
            value={rotateX}
            onChange={(e) => setRotateX(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          zoom {zoom.toFixed(2)}
          <input
            type="range"
            min={0.4}
            max={2.5}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </label>
      </header>
      <div className="min-h-[560px] flex-1 overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800">
        <Scene3D
          grid={grid}
          visuals={visuals}
          camera={camera}
          onCellDown={(r, c) => console.log("cell down", r, c)}
          onCellEnter={(r, c) => console.log("cell enter", r, c)}
        />
      </div>
    </main>
  );
}
