import { GRID_COLS, GRID_ROWS, type CellKind, type Grid } from "./types";

export const START_POSITION = { row: 7, col: 3 } as const;
export const END_POSITION = { row: 7, col: 17 } as const;

/** Fresh GRID_ROWS x GRID_COLS grid of empty cells with default start/end. */
export function createGrid(): Grid {
  return Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: GRID_COLS }, (_, col) => {
      const isStart = row === START_POSITION.row && col === START_POSITION.col;
      const isEnd = row === END_POSITION.row && col === END_POSITION.col;
      const kind: CellKind = isStart ? "start" : isEnd ? "end" : "empty";
      return { row, col, kind };
    }),
  );
}
