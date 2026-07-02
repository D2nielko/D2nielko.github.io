"use client";

import { useCamera } from "@/components/visualizer/useCamera";

const BOARD = 8;

// Static checkerboard; hoisted so pan/zoom re-renders don't rebuild 64 elements.
const cells = Array.from({ length: BOARD * BOARD }, (_, i) => {
  const row = Math.floor(i / BOARD);
  const col = i % BOARD;
  const dark = (row + col) % 2 === 0;
  return (
    <div
      key={i}
      className={
        dark
          ? "bg-slate-700 dark:bg-slate-300"
          : "bg-slate-300 dark:bg-slate-600"
      }
    />
  );
});

export default function CameraDevPage() {
  const { camera, containerRef, containerProps, reset } = useCamera();

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-lg font-semibold">
          camera-dev <span className="font-normal text-slate-500">— useCamera harness</span>
        </h1>

        <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
          <span>zoom: {camera.zoom.toFixed(3)}</span>
          <span>panX: {camera.panX.toFixed(0)}px</span>
          <span>panY: {camera.panY.toFixed(0)}px</span>
          <span>rotateX: {camera.rotateX}deg</span>
          <button
            onClick={reset}
            className="rounded-md bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            reset
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Scroll to zoom, right-click-drag to pan.
        </p>

        <div
          ref={containerRef}
          {...containerProps}
          className="h-[480px] touch-none select-none overflow-hidden rounded-xl border border-slate-300 bg-slate-200 [perspective:900px] dark:border-slate-700 dark:bg-slate-900"
        >
          <div
            className="mx-auto mt-20 grid h-80 w-80 grid-cols-8 [transform-style:preserve-3d]"
            style={{
              transform: `translate3d(${camera.panX}px, ${camera.panY}px, 0) rotateX(${camera.rotateX}deg) scale3d(${camera.zoom}, ${camera.zoom}, ${camera.zoom})`,
            }}
          >
            {cells}
          </div>
        </div>
      </div>
    </main>
  );
}
