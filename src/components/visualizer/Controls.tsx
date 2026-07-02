"use client";

import type { ControlsProps } from "@/lib/visualizer/types";

export default function Controls({
  playback,
  speed,
  onVisualize,
  onReset,
  onClearWalls,
  onSpeedChange,
}: ControlsProps) {
  const running = playback === "running";

  const secondaryButton =
    "rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:disabled:hover:bg-transparent";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
      <button
        type="button"
        onClick={onVisualize}
        disabled={running}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
      >
        {running ? "Running…" : "Visualize"}
      </button>

      <button type="button" onClick={onReset} className={secondaryButton}>
        Reset
      </button>

      <button
        type="button"
        onClick={onClearWalls}
        disabled={running}
        className={secondaryButton}
      >
        Clear Walls
      </button>

      <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium">Speed</span>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="h-2 w-28 cursor-pointer accent-blue-600"
          aria-label="Animation speed"
        />
        <span className="w-8 font-mono text-xs text-slate-500 dark:text-slate-400">
          {speed}/5
        </span>
      </label>

      {playback === "done" && (
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Done
        </span>
      )}
    </div>
  );
}
