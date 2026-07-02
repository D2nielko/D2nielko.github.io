"use client";

import { useRef, useState } from "react";
import type { QueuePanelProps } from "@/lib/visualizer/types";
import styles from "./QueuePanel.module.css";

const VIEWPORT_MARGIN = 8;

interface DragState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startLeft: number;
  startTop: number;
  width: number;
  height: number;
}

export default function QueuePanel({
  queue,
  popped,
  stepIndex,
  totalSteps,
}: QueuePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  // null = default (top-right) position until the user drags the panel.
  const [position, setPosition] = useState<{ left: number; top: number } | null>(
    null
  );
  const [collapsed, setCollapsed] = useState(false);

  const handleTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore clicks on the collapse button and non-primary buttons.
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    dragRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startLeft: rect.left,
      startTop: rect.top,
      width: rect.width,
      height: rect.height,
    };
    // Anchor to fixed coordinates from here on.
    setPosition({ left: rect.left, top: rect.top });
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handleTitlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const maxLeft = Math.max(
      VIEWPORT_MARGIN,
      window.innerWidth - drag.width - VIEWPORT_MARGIN
    );
    const maxTop = Math.max(
      VIEWPORT_MARGIN,
      window.innerHeight - drag.height - VIEWPORT_MARGIN
    );
    const left = Math.min(
      Math.max(drag.startLeft + (e.clientX - drag.startClientX), VIEWPORT_MARGIN),
      maxLeft
    );
    const top = Math.min(
      Math.max(drag.startTop + (e.clientY - drag.startClientY), VIEWPORT_MARGIN),
      maxTop
    );
    setPosition({ left, top });
  };

  const handleTitlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={panelRef}
      className={`z-40 w-64 select-none overflow-hidden rounded-xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 ${
        position ? "fixed" : "absolute right-4 top-4"
      }`}
      style={position ? { left: position.left, top: position.top } : undefined}
      role="dialog"
      aria-label="Priority queue window"
    >
      {/* Title bar */}
      <div
        className="flex cursor-grab touch-none items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-2 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800/80"
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerEnd}
        onPointerCancel={handleTitlePointerEnd}
      >
        <svg
          className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="7" cy="5" r="1.5" />
          <circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
        </svg>
        <span className="flex-1 text-sm font-semibold text-slate-900 dark:text-white">
          Priority Queue
        </span>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand panel" : "Collapse panel"}
          className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
        >
          <svg
            className={`h-4 w-4 transition-transform ${collapsed ? "-rotate-90" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="max-h-48 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white/90 backdrop-blur-md dark:bg-slate-900/90">
                <tr className="text-slate-500 dark:text-slate-400">
                  <th className="py-1 pr-2 font-medium">#</th>
                  <th className="py-1 pr-2 font-medium">Node</th>
                  <th className="py-1 font-medium">Dist</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {queue.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-2 text-center font-sans text-slate-500 dark:text-slate-400"
                    >
                      Queue is empty
                    </td>
                  </tr>
                ) : (
                  queue.map((entry, i) => {
                    const isMin = i === 0;
                    return (
                      <tr
                        key={
                          isMin
                            ? `min-${entry.row}-${entry.col}-${entry.dist}`
                            : i
                        }
                        className={
                          isMin
                            ? `${styles.flash} bg-blue-100/70 font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300`
                            : "text-slate-700 dark:text-slate-300"
                        }
                      >
                        <td className="py-0.5 pr-2">{i}</td>
                        <td className="py-0.5 pr-2">
                          ({entry.row},{entry.col})
                          {isMin && (
                            <span className="ml-1 font-sans text-[10px] font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">
                              min
                            </span>
                          )}
                        </td>
                        <td className="py-0.5">{entry.dist}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-2 border-t border-slate-200 pt-2 text-xs dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300">
              {popped ? (
                <>
                  last popped:{" "}
                  <span className="font-mono">
                    ({popped.row},{popped.col})
                  </span>{" "}
                  dist=<span className="font-mono">{popped.dist}</span>
                </>
              ) : (
                <span className="italic text-slate-400 dark:text-slate-500">
                  last popped: — (run not started)
                </span>
              )}
            </p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              step{" "}
              <span className="font-mono">
                {stepIndex} / {totalSteps}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
