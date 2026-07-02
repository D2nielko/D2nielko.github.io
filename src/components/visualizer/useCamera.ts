"use client";

import * as React from "react";
import {
  DEFAULT_CAMERA,
  MAX_ZOOM,
  MIN_ZOOM,
  type Camera,
  type CameraApi,
} from "@/lib/visualizer/types";

/**
 * Pure zoom math: multiplicative zoom from a wheel deltaY, clamped to
 * [MIN_ZOOM, MAX_ZOOM]. Other camera fields pass through unchanged.
 */
export function applyZoom(camera: Camera, deltaY: number): Camera {
  const zoom = Math.min(
    MAX_ZOOM,
    Math.max(MIN_ZOOM, camera.zoom * Math.exp(-deltaY * 0.0015)),
  );
  return { ...camera, zoom };
}

/**
 * Pure pan math: accumulate a pointer movement (px) into panX/panY.
 * Other camera fields pass through unchanged.
 */
export function applyPan(camera: Camera, dx: number, dy: number): Camera {
  return { ...camera, panX: camera.panX + dx, panY: camera.panY + dy };
}

/**
 * Camera controls for the 3D scene:
 * - scroll wheel = zoom (non-passive native listener bound via containerRef,
 *   so preventDefault reliably stops the page from scrolling over the scene)
 * - right-click-drag = pan (pointer capture; left-button events pass through
 *   untouched so siblings can use left-click for grid editing)
 */
export function useCamera(): CameraApi {
  const [camera, setCamera] = React.useState<Camera>(DEFAULT_CAMERA);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const panPointerId = React.useRef<number | null>(null);
  const lastPos = React.useRef({ x: 0, y: 0 });

  // No dependency array: re-check the ref after every render so the listener
  // is (re)bound even when the container mounts after the hook's first commit
  // (e.g. a conditionally rendered scene). Binding is cheap and symmetric.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCamera((c) => applyZoom(c, e.deltaY));
    };

    // React's onWheel can be passive on some targets; bind natively so
    // preventDefault always works.
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const reset = React.useCallback(() => setCamera(DEFAULT_CAMERA), []);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only the right button starts a pan; leave everything else untouched
      // (left-click is used by siblings for editing the grid).
      if (e.button !== 2) return;
      panPointerId.current = e.pointerId;
      lastPos.current = { x: e.clientX, y: e.clientY };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (panPointerId.current !== e.pointerId) return;
      // With chorded buttons (left pressed mid-drag), releasing the right
      // button arrives as a pointermove, not a pointerup — end the pan as
      // soon as the right button is no longer held.
      if ((e.buttons & 2) === 0) {
        panPointerId.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        return;
      }
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setCamera((c) => applyPan(c, dx, dy));
    },
    [],
  );

  const endPan = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (panPointerId.current !== e.pointerId) return;
      panPointerId.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [],
  );

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Right-click is pan, not a context menu, while over the scene.
      e.preventDefault();
    },
    [],
  );

  const containerProps = React.useMemo<React.HTMLAttributes<HTMLDivElement>>(
    () => ({
      onPointerDown,
      onPointerMove,
      onPointerUp: endPan,
      onPointerCancel: endPan,
      onContextMenu,
    }),
    [onPointerDown, onPointerMove, endPan, onContextMenu],
  );

  return { camera, containerRef, containerProps, reset };
}
