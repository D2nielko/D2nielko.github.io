"use client";

import { useEffect, useState } from "react";
import Controls from "@/components/visualizer/Controls";
import QueuePanel from "@/components/visualizer/QueuePanel";
import type { PlaybackState, QueueEntry } from "@/lib/visualizer/types";

// A plausible min-heap in level order ([0] is always the min).
const INITIAL_HEAP: QueueEntry[] = [
  { row: 7, col: 10, dist: 0 },
  { row: 6, col: 10, dist: 1 },
  { row: 7, col: 11, dist: 1 },
  { row: 8, col: 10, dist: 2 },
  { row: 6, col: 11, dist: 2 },
  { row: 7, col: 12, dist: 3 },
  { row: 5, col: 10, dist: 3 },
  { row: 8, col: 11, dist: 4 },
  { row: 6, col: 12, dist: 4 },
  { row: 7, col: 13, dist: 5 },
];

const TOTAL_STEPS = INITIAL_HEAP.length;

interface SimState {
  queue: QueueEntry[];
  popped: QueueEntry | null;
  stepIndex: number;
}

const INITIAL_SIM: SimState = { queue: INITIAL_HEAP, popped: null, stepIndex: 0 };

export default function HudDevPage() {
  const [sim, setSim] = useState<SimState>(INITIAL_SIM);
  const [playback, setPlayback] = useState<PlaybackState>("idle");
  const [speed, setSpeed] = useState(3);

  // Fake stepping: while "running", pop the mock heap head every ~800ms.
  useEffect(() => {
    if (playback !== "running") return;
    const id = setInterval(() => {
      setSim((prev) => {
        if (prev.queue.length === 0) return prev;
        const [head, ...rest] = prev.queue;
        return { queue: rest, popped: head, stepIndex: prev.stepIndex + 1 };
      });
    }, 800);
    return () => clearInterval(id);
  }, [playback]);

  // Flip to "done" once the mock heap runs dry.
  useEffect(() => {
    if (playback === "running" && sim.queue.length === 0) setPlayback("done");
  }, [playback, sim.queue.length]);

  const handleVisualize = () => {
    if (playback === "running") return;
    if (playback === "done") setSim(INITIAL_SIM);
    setPlayback("running");
  };

  const handleReset = () => {
    setPlayback("idle");
    setSim(INITIAL_SIM);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-900 dark:to-slate-800">
      <span className="sr-only">hud-dev</span>
      <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
        HUD dev harness
      </h1>
      <p className="mb-6 max-w-xl text-sm text-slate-600 dark:text-slate-300">
        Hidden playground for the visualizer HUD. Press Visualize to fake-step
        through a mock heap (one pop every ~800ms); drag the queue window by its
        title bar and collapse it to eyeball the states.
      </p>

      <Controls
        playback={playback}
        speed={speed}
        onVisualize={handleVisualize}
        onReset={handleReset}
        onClearWalls={() => console.log("clear walls (mock)")}
        onSpeedChange={setSpeed}
      />

      <QueuePanel
        queue={sim.queue}
        popped={sim.popped}
        stepIndex={sim.stepIndex}
        totalSteps={TOTAL_STEPS}
      />
    </div>
  );
}
