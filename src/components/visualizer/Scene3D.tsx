"use client";

import * as React from "react";
import type { CellKind, CellVisual, Scene3DProps } from "@/lib/visualizer/types";
import { GRID_COLS, GRID_ROWS } from "@/lib/visualizer/types";
import styles from "./Scene3D.module.css";

/** Cap for visited-cell extrusion so far tiles don't tower over the board. */
const MAX_RISE_PX = 26;
const BASE_RISE_PX = 5;
/** Distance that maps to the top of the color ramp / height cap. */
const RAMP_SPAN = GRID_ROWS + GRID_COLS - 2;

interface Cell3DProps {
  row: number;
  col: number;
  kind: CellKind;
  dist: number | null;
  onPath: boolean;
  onCellDown: (row: number, col: number) => void;
  onCellEnter: (row: number, col: number) => void;
}

const Cell3D = React.memo(function Cell3D({
  row,
  col,
  kind,
  dist,
  onPath,
  onCellDown,
  onCellEnter,
}: Cell3DProps) {
  const visited = dist !== null;

  const classes = [styles.cell];
  if (kind === "wall") classes.push(styles.wall);
  else if (kind === "start") classes.push(styles.start);
  else if (kind === "end") classes.push(styles.end);
  if (onPath) classes.push(styles.path);
  else if (visited && kind === "empty") classes.push(styles.visited);

  const style: React.CSSProperties = {};
  if (kind !== "wall" && visited) {
    const d = Math.min(dist / RAMP_SPAN, 1);
    (style as Record<string, string | number>)["--d"] = d;
    const rise = Math.min(BASE_RISE_PX + dist * 1.6, MAX_RISE_PX);
    (style as Record<string, string | number>)["--h"] = `${rise.toFixed(1)}px`;
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Left button only; right button belongs to the camera (pan) and middle
    // clicks are ignored. Never preventDefault so the parent's right-drag
    // and contextmenu handling stay intact.
    if (e.button === 0) onCellDown(row, col);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons & 1) onCellEnter(row, col);
  };

  return (
    <div
      className={classes.join(" ")}
      style={style}
      data-row={row}
      data-col={col}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
    >
      <div className={styles.top}>
        {kind === "start" && <span className={`${styles.marker} ${styles.markerStart}`} />}
        {kind === "end" && <span className={`${styles.marker} ${styles.markerEnd}`} />}
      </div>
    </div>
  );
});

const EMPTY_VISUAL: CellVisual = { dist: null, onPath: false };

export default function Scene3D({ grid, visuals, camera, onCellDown, onCellEnter }: Scene3DProps) {
  const cols = grid[0]?.length ?? GRID_COLS;

  const boardStyle: React.CSSProperties = {
    // Camera transform applies immediately — intentionally no transition here
    // so wheel-zoom and right-drag panning track the pointer without lag.
    transform: `translate3d(${camera.panX}px, ${camera.panY}px, 0) rotateX(${camera.rotateX}deg) scale3d(${camera.zoom}, ${camera.zoom}, ${camera.zoom})`,
  };
  (boardStyle as Record<string, string | number>)["--cols"] = cols;

  return (
    <div className={styles.scene}>
      <div className={styles.board} style={boardStyle}>
        {grid.map((rowCells, r) =>
          rowCells.map((cell, c) => {
            const visual = visuals[r]?.[c] ?? EMPTY_VISUAL;
            return (
              <Cell3D
                key={`${r}-${c}`}
                row={r}
                col={c}
                kind={cell.kind}
                dist={visual.dist}
                onPath={visual.onPath}
                onCellDown={onCellDown}
                onCellEnter={onCellEnter}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
