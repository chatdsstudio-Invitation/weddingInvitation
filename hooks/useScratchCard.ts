"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseScratchCardOptions {
  threshold?: number; // fraction (0-1) of area scratched before auto-reveal
  brushSize?: number;
}

// A real scratch needs some dragging, not just a single tap. Below this
// cumulative pointer-travel distance (in CSS px), we don't let the area
// check auto-reveal the card even if it happens to cross the threshold.
const MIN_SCRATCH_DISTANCE = 260;

// Same heart path as the revealed <HeartOutline> SVG (viewBox 0 0 200 200),
// so the scratchable glitter heart is pixel-identical in shape to the
// heart it's covering.
const HEART_PATH_UNITS = 200;
function traceHeartPath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(100, 176);
  ctx.bezierCurveTo(100, 176, 20, 128, 20, 74);
  ctx.bezierCurveTo(20, 46, 42, 26, 68, 26);
  ctx.bezierCurveTo(82, 26, 94, 34, 100, 46);
  ctx.bezierCurveTo(106, 34, 118, 26, 132, 26);
  ctx.bezierCurveTo(158, 26, 180, 46, 180, 74);
  ctx.bezierCurveTo(180, 128, 100, 176, 100, 176);
  ctx.closePath();
}

// Matches the Tailwind classes on the revealed heart: h-52 w-52 (13rem =
// 208px) below the `sm` breakpoint, h-60 w-60 (15rem = 240px) at/above it.
function heartBoxCssSize() {
  return typeof window !== "undefined" && window.innerWidth >= 640 ? 240 : 208;
}

interface HeartBounds {
  originX: number;
  originY: number;
  boxPx: number;
}

/**
 * Drives a canvas "scratch card" cover: draws a heart-shaped glitter layer
 * — sized and shaped to match the revealed heart underneath exactly —
 * erases it under the pointer/touch, and reports when enough of the heart
 * has been genuinely scratched away so the caller can trigger a full reveal.
 */
export function useScratchCard({ threshold = 0.55, brushSize = 46 }: UseScratchCardOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPointerDown = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const dirty = useRef(false);
  const traveledDistance = useRef(0);
  const heartBounds = useRef<HeartBounds | null>(null);

  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const drawCover = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    if (width < 2 || height < 2) return; // not laid out yet — a later resize will retry
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const boxPx = heartBoxCssSize() * dpr;
    const originX = width / 2 - boxPx / 2;
    const originY = height / 2 - boxPx / 2;
    heartBounds.current = { originX, originY, boxPx };

    const scale = boxPx / HEART_PATH_UNITS;
    ctx.save();
    ctx.translate(originX, originY);
    ctx.scale(scale, scale);

    // Glossy glitter-bead fill: a soft highlight near the upper-left,
    // deepening to a rosy maroon at the edges — matches the brand palette.
    // Coordinates here are in the same 0-200 unit space as the heart path,
    // so they scale/translate along with it automatically.
    const gradient = ctx.createRadialGradient(70, 60, 8, 100, 110, 150);
    gradient.addColorStop(0, "#f9dbe3");
    gradient.addColorStop(0.35, "#e8a7ba");
    gradient.addColorStop(0.7, "#c4536e");
    gradient.addColorStop(1, "#8f2e46");
    ctx.fillStyle = gradient;

    traceHeartPath(ctx);
    ctx.fill();

    // Clip further drawing to the heart so speckles/rim stay inside it.
    ctx.save();
    traceHeartPath(ctx);
    ctx.clip();

    // subtle sparkle speckles for a glitter feel
    for (let i = 0; i < 160; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 78;
      const px = 100 + Math.cos(angle) * r;
      const py = 100 + Math.sin(angle) * r * 0.95;
      const brightness = Math.random();
      ctx.fillStyle = `rgba(255,255,255,${0.15 + brightness * 0.5})`;
      ctx.beginPath();
      ctx.arc(px, py, Math.random() * 1.6 + 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Thin rim so the heart edge stays crisp — same 1.5 stroke-width as
    // the revealed SVG's own outline, in the same coordinate units.
    ctx.strokeStyle = "rgba(143,46,70,0.55)";
    ctx.lineWidth = 1.5;
    traceHeartPath(ctx);
    ctx.stroke();

    ctx.restore();
  }, []);

  // Size canvas to container (with DPR) and (re)draw the cover layer.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return; // container not laid out yet
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (!revealed) drawCover(canvas);
    };

    resize();
    // Guard against a mount-time race where the container briefly reports
    // zero size (fonts/layout still settling) — retry a couple of times.
    const retry1 = window.setTimeout(resize, 60);
    const retry2 = window.setTimeout(resize, 300);
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => {
      observer.disconnect();
      window.clearTimeout(retry1);
      window.clearTimeout(retry2);
      window.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
    };
  }, [drawCover, revealed]);

  const getPoint = useCallback((e: PointerEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }, []);

  const scratchAt = useCallback(
    (canvas: HTMLCanvasElement, from: { x: number; y: number } | null, to: { x: number; y: number }) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const radius = (brushSize / 2) * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = radius * 2;

      ctx.beginPath();
      if (from) {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        traveledDistance.current += Math.hypot(to.x - from.x, to.y - from.y) / dpr;
      } else {
        ctx.arc(to.x, to.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      dirty.current = true;
    },
    [brushSize]
  );

  const checkRevealProgress = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (!dirty.current) return;
      dirty.current = false;
      // Require an actual scratching gesture — not just a single tap —
      // before the area check is even allowed to fire the full reveal.
      if (traveledDistance.current < MIN_SCRATCH_DISTANCE) return;

      const bounds = heartBounds.current;
      if (!bounds) return;

      const sampleSize = 48;
      const off = document.createElement("canvas");
      off.width = sampleSize;
      off.height = sampleSize;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      // Sample only the heart's own bounding box, not the whole canvas —
      // otherwise the transparent area *around* the heart would count
      // toward "scratched" progress and trigger an instant false reveal.
      offCtx.drawImage(
        canvas,
        bounds.originX,
        bounds.originY,
        bounds.boxPx,
        bounds.boxPx,
        0,
        0,
        sampleSize,
        sampleSize
      );
      const data = offCtx.getImageData(0, 0, sampleSize, sampleSize).data;

      let transparent = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4) {
        total++;
        if (data[i] < 40) transparent++;
      }
      if (total > 0 && transparent / total >= threshold) {
        setRevealed(true);
      }
    },
    [threshold]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const handleDown = (e: PointerEvent) => {
      isPointerDown.current = true;
      setStarted(true);
      const p = getPoint(e, canvas);
      lastPoint.current = p;
      scratchAt(canvas, null, p);
    };
    const handleMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;
      const p = getPoint(e, canvas);
      scratchAt(canvas, lastPoint.current, p);
      lastPoint.current = p;
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        checkRevealProgress(canvas);
        rafId.current = null;
      });
    };
    const handleUp = () => {
      isPointerDown.current = false;
      lastPoint.current = null;
    };

    canvas.addEventListener("pointerdown", handleDown);
    canvas.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    return () => {
      canvas.removeEventListener("pointerdown", handleDown);
      canvas.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [getPoint, scratchAt, checkRevealProgress, revealed]);

  return { canvasRef, containerRef, revealed, started, setRevealed };
}
