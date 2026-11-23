import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { formatTime, parseTimeInput } from '../../../lib/format';
import type { ToolUiLabels } from '../../../i18n/types';

export type TimelinePlayMode = 'none' | 'full' | 'selection';

interface TimelineRulerProps {
  duration: number;
  startSec: number;
  endSec: number;
  currentTime: number;
  playMode: TimelinePlayMode;
  labels: ToolUiLabels;
  onChangeRange: (start: number, end: number) => void;
  onSeek: (time: number) => void;
  onToggleFullPlay: () => void;
  onToggleSelectionPlay: () => void;
  /** Visual track background rendered inside the zoomed track area (waveform canvas or filmstrip) */
  renderTrack: (widthPx: number) => ComponentChildren;
}

type DragMode = 'start' | 'end' | 'scrub' | null;

function computeRulerStep(visibleDuration: number, trackWidthPx: number): number {
  if (visibleDuration <= 0 || trackWidthPx <= 0) return 5;
  const targetLabels = Math.max(4, Math.floor(trackWidthPx / 88));
  const rawStep = visibleDuration / targetLabels;
  const steps = [0.2, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  for (const s of steps) {
    if (s >= rawStep) return s;
  }
  return Math.ceil(rawStep / 60) * 60;
}

function formatRulerTick(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (seconds < 10 && Math.abs(secs - Math.round(secs)) > 0.05) {
    return `${String(mins).padStart(2, '0')}:${secs.toFixed(1).padStart(4, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(Math.round(secs)).padStart(2, '0')}`;
}

export default function TimelineRuler({
  duration,
  startSec,
  endSec,
  currentTime,
  playMode,
  labels,
  onChangeRange,
  onSeek,
  onToggleFullPlay,
  onToggleSelectionPlay,
  renderTrack,
}: TimelineRulerProps) {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(720);
  const [dragMode, setDragMode] = useState<DragMode>(null);

  // Measure available container width for crisp canvas/ruler rendering
  useEffect(() => {
    const el = scrollWrapRef.current;
    if (!el) return;
    const update = () => {
      if (el.clientWidth > 0) setViewportWidth(el.clientWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const minGap = Math.min(0.2, Math.max(0.05, duration * 0.01));
  const trackWidthPx = Math.max(280, Math.round(viewportWidth * zoom));
  const innerWidthPx = Math.max(252, trackWidthPx - 28);

  const clientXToTime = (clientX: number): number => {
    const el = trackRef.current;
    if (!el || duration <= 0) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / Math.max(1, rect.width);
    return Math.max(0, Math.min(duration, ratio * duration));
  };

  const beginDrag = (mode: DragMode, e: PointerEvent) => {
    if (duration <= 0) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragMode(mode);

    if (mode === 'scrub') {
      onSeek(clientXToTime(e.clientX));
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!dragMode || duration <= 0) return;

    if (dragMode === 'start') {
      const t = clientXToTime(e.clientX);
      const nextStart = Math.max(0, Math.min(t, endSec - minGap));
      onChangeRange(nextStart, endSec);
      onSeek(nextStart);
    } else if (dragMode === 'end') {
      const t = clientXToTime(e.clientX);
      const nextEnd = Math.min(duration, Math.max(t, startSec + minGap));
      onChangeRange(startSec, nextEnd);
      onSeek(nextEnd);
    } else if (dragMode === 'scrub') {
      onSeek(clientXToTime(e.clientX));
    }
  };

  const endDrag = (e: PointerEvent) => {
    if (!dragMode) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore if already released
    }
    setDragMode(null);
  };

  const nudgeHandle = (which: 'start' | 'end' | 'playhead', e: KeyboardEvent) => {
    const step = e.shiftKey ? 1 : 0.1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (which === 'start') {
        const next = Math.max(0, startSec - step);
        onChangeRange(next, endSec);
        onSeek(next);
      } else if (which === 'end') {
        const next = Math.max(startSec + minGap, endSec - step);
        onChangeRange(startSec, next);
        onSeek(next);
      } else {
        onSeek(Math.max(0, currentTime - step));
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (which === 'start') {
        const next = Math.min(endSec - minGap, startSec + step);
        onChangeRange(next, endSec);
        onSeek(next);
      } else if (which === 'end') {
        const next = Math.min(duration, endSec + step);
        onChangeRange(startSec, next);
        onSeek(next);
      } else {
        onSeek(Math.min(duration, currentTime + step));
      }
    }
  };

  const snapStartToCursor = () => {
    if (duration <= 0) return;
    const clamped = Math.max(0, Math.min(currentTime, endSec - minGap));
    onChangeRange(clamped, endSec);
  };

  const snapEndToCursor = () => {
    if (duration <= 0) return;
    const clamped = Math.min(duration, Math.max(currentTime, startSec + minGap));
    onChangeRange(startSec, clamped);
  };

  const startPct = duration > 0 ? (startSec / duration) * 100 : 0;
  const endPct = duration > 0 ? (endSec / duration) * 100 : 100;
  const widthPct = Math.max(0.5, endPct - startPct);
  const cursorPct = duration > 0 ? Math.max(0, Math.min(100, (currentTime / duration) * 100)) : 0;
  const clipDuration = Math.max(0, endSec - startSec);
  const isPlayingAny = playMode !== 'none';

  // Build graduated ruler ticks (major + minor subdivisions)
  const majorStep = computeRulerStep(duration, innerWidthPx);
  const minorStep = majorStep / 5;
  const ticks: Array<{ time: number; pct: number; major: boolean }> = [];
  if (duration > 0) {
    const count = Math.floor(duration / minorStep);
    for (let i = 0; i <= count; i++) {
      const t = i * minorStep;
      if (t > duration + 0.001) break;
      const pct = (Math.min(t, duration) / duration) * 100;
      ticks.push({ time: t, pct, major: i % 5 === 0 });
    }
  }

  return (
    <div class="space-y-3.5 rounded-2xl border border-[#9DB2BF]/65 bg-[#F7F9FB] p-3.5 sm:p-4 dark:border-[#526D82]/70 dark:bg-[#121A26]">
      {/* Top Telemetry Bar: Red Live Cursor, Selected Range, Clip Duration */}
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/35 bg-white px-2.5 py-1 font-mono font-semibold text-[#27374D] dark:border-rose-400/40 dark:bg-[#1D2A3B] dark:text-[#DDE6ED]">
            <span
              class={`h-2 w-2 rounded-full bg-rose-600 dark:bg-rose-400 ${isPlayingAny ? 'animate-pulse' : ''}`}
              aria-hidden="true"
            />
            <span class="font-sans text-[#526D82] dark:text-[#9DB2BF]">{labels.cursor}:</span>
            <span class="tabular-nums text-rose-700 dark:text-rose-300">{formatTime(currentTime)}</span>
          </span>

          <span class="inline-flex items-center gap-1.5 rounded-lg bg-[#DDE6ED]/80 px-2.5 py-1 font-mono font-semibold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
            <span class="tabular-nums">{formatTime(startSec)}</span>
            <span aria-hidden="true" class="opacity-70">→</span>
            <span class="tabular-nums">{formatTime(endSec)}</span>
          </span>
        </div>

        <span class="inline-flex items-center gap-1.5 rounded-lg bg-[#27374D] px-3 py-1 font-semibold text-white dark:bg-[#DDE6ED] dark:text-[#27374D]">
          <span>{labels.duration}:</span>
          <strong class="font-mono tabular-nums">{formatTime(clipDuration)}</strong>
        </span>
      </div>

      {/* Scrollable Ruler + Interactive Waveform / Filmstrip + Full-Height Playhead Needle */}
      <div
        ref={scrollWrapRef}
        class="overflow-x-auto rounded-xl border border-[#9DB2BF]/70 bg-white px-3.5 pt-2.5 pb-3 shadow-inner dark:border-[#526D82]/70 dark:bg-[#1D2A3B]"
      >
        <div
          ref={trackRef}
          style={{ width: `${innerWidthPx}px` }}
          class="relative select-none"
        >
          {/* Graduated Time Ruler Header (click/drag to move playhead) */}
          <div
            onPointerDown={(e) => beginDrag('scrub', e)}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ touchAction: 'none' }}
            class="relative mb-1.5 h-6 cursor-pointer border-b border-[#9DB2BF]/45 dark:border-[#526D82]/50"
          >
            {ticks.map((tick, idx) => (
              <div
                key={idx}
                style={{ left: `${tick.pct}%` }}
                class="pointer-events-none absolute bottom-0"
              >
                <div
                  class={`w-px ${
                    tick.major
                      ? 'h-2.5 bg-[#526D82] dark:bg-[#9DB2BF]'
                      : 'h-1.5 bg-[#9DB2BF]/65 dark:bg-[#526D82]/75'
                  }`}
                />
                {tick.major && tick.pct < 96 && (
                  <span class="absolute bottom-2.5 left-1 font-mono text-[10px] font-medium text-[#526D82] dark:text-[#9DB2BF]">
                    {formatRulerTick(tick.time)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Main Visual Track + Selection Borders + Trim Handles (click/drag track to place playhead) */}
          <div
            onPointerDown={(e) => beginDrag('scrub', e)}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ touchAction: 'none' }}
            class="relative h-28 sm:h-32 w-full cursor-crosshair"
          >
            {/* Clipped background layer (waveform / filmstrip + shaded cut regions) */}
            <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg bg-[#F7F9FB] dark:bg-[#121A26]">
              <div class="absolute inset-0">{renderTrack(innerWidthPx)}</div>

              {/* Dimmed Excluded Left Region */}
              <div
                class="absolute inset-y-0 left-0 bg-[#27374D]/45 backdrop-grayscale-[40%] dark:bg-[#0B1018]/70"
                style={{ width: `${startPct}%` }}
              />

              {/* Dimmed Excluded Right Region */}
              <div
                class="absolute inset-y-0 right-0 bg-[#27374D]/45 backdrop-grayscale-[40%] dark:bg-[#0B1018]/70"
                style={{ width: `${Math.max(0, 100 - endPct)}%` }}
              />
            </div>

            {/* Active Selection Highlight Frame (pointer-events-none so clicks scrub playhead directly) */}
            <div
              style={{ left: `${startPct}%`, width: `${widthPct}%` }}
              class="pointer-events-none absolute inset-y-0 border-y-[3px] border-[#27374D] bg-[#526D82]/10 dark:border-[#DDE6ED] dark:bg-[#DDE6ED]/10"
            />

            {/* Left Start Trim Handle (Tactile Vertical Pill with Grip Bars) */}
            <div
              role="slider"
              tabIndex={0}
              aria-label={labels.startTime}
              aria-valuemin={0}
              aria-valuemax={Number(endSec.toFixed(2))}
              aria-valuenow={Number(startSec.toFixed(2))}
              aria-valuetext={formatTime(startSec)}
              onKeyDown={(e) => nudgeHandle('start', e)}
              onPointerDown={(e) => beginDrag('start', e)}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              style={{ left: `${startPct}%`, touchAction: 'none' }}
              class="group absolute inset-y-0 z-20 flex w-5 -translate-x-1/2 cursor-ew-resize items-center justify-center"
            >
              <div class="absolute inset-y-0 w-[3.5px] bg-[#27374D] dark:bg-[#DDE6ED]" />
              <div class="relative flex h-11 w-4 items-center justify-center rounded-md border border-white/80 bg-[#27374D] text-white shadow-md transition-transform group-hover:scale-110 dark:border-[#121A26] dark:bg-[#DDE6ED] dark:text-[#27374D]">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor" aria-hidden="true">
                  <rect x="1.2" y="2" width="1.6" height="10" rx="0.8" />
                  <rect x="5.2" y="2" width="1.6" height="10" rx="0.8" />
                </svg>
              </div>
            </div>

            {/* Right End Trim Handle (Tactile Vertical Pill with Grip Bars) */}
            <div
              role="slider"
              tabIndex={0}
              aria-label={labels.endTime}
              aria-valuemin={Number(startSec.toFixed(2))}
              aria-valuemax={Number(duration.toFixed(2))}
              aria-valuenow={Number(endSec.toFixed(2))}
              aria-valuetext={formatTime(endSec)}
              onKeyDown={(e) => nudgeHandle('end', e)}
              onPointerDown={(e) => beginDrag('end', e)}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              style={{ left: `${endPct}%`, touchAction: 'none' }}
              class="group absolute inset-y-0 z-20 flex w-5 -translate-x-1/2 cursor-ew-resize items-center justify-center"
            >
              <div class="absolute inset-y-0 w-[3.5px] bg-[#27374D] dark:bg-[#DDE6ED]" />
              <div class="relative flex h-11 w-4 items-center justify-center rounded-md border border-white/80 bg-[#27374D] text-white shadow-md transition-transform group-hover:scale-110 dark:border-[#121A26] dark:bg-[#DDE6ED] dark:text-[#27374D]">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor" aria-hidden="true">
                  <rect x="1.2" y="2" width="1.6" height="10" rx="0.8" />
                  <rect x="5.2" y="2" width="1.6" height="10" rx="0.8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dedicated Full-Height Red Playhead Needle (spans from Ruler top all the way through Track) */}
          <div
            role="slider"
            tabIndex={0}
            aria-label={labels.cursor}
            aria-valuemin={0}
            aria-valuemax={Number(duration.toFixed(2))}
            aria-valuenow={Number(currentTime.toFixed(2))}
            aria-valuetext={formatTime(currentTime)}
            onKeyDown={(e) => nudgeHandle('playhead', e)}
            onPointerDown={(e) => beginDrag('scrub', e)}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ left: `${cursorPct}%`, touchAction: 'none' }}
            class="group absolute top-0 bottom-0 z-30 flex w-5 -translate-x-1/2 cursor-ew-resize flex-col items-center"
          >
            {/* Scrubber Pin Head sitting right on the time ruler */}
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              class="shrink-0 -mt-0.5 text-rose-600 drop-shadow-sm transition-transform group-hover:scale-115 dark:text-rose-500"
              aria-hidden="true"
            >
              <path d="M1 1.5C1 0.67 1.67 0 2.5 0h9C12.33 0 13 0.67 13 1.5v4.2c0 .45-.2.88-.55 1.17L7 11.5 1.55 6.87A1.5 1.5 0 0 1 1 5.7V1.5Z" fill="currentColor" />
            </svg>
            {/* Crisp Vertical Crimson Indicator Line */}
            <div class="w-[2.5px] flex-1 rounded-b-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)] dark:bg-rose-500" />
          </div>
        </div>
      </div>

      {/* Bottom Pro Toolbar: Play/Pause + Preview Selection + Snap-to-Playhead + Precision Inputs + Reset + Zoom */}
      <div class="flex flex-wrap items-center justify-between gap-2.5">
        <div class="flex flex-wrap items-center gap-2">
          {/* Primary Play / Pause Button (moves the red playhead across the full clip) */}
          <button
            type="button"
            onClick={onToggleFullPlay}
            class="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
          >
            {playMode === 'full' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4.5" height="16" rx="1" />
                <rect x="13.5" y="4" width="4.5" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            )}
            <span>{playMode === 'full' ? labels.pause : labels.play}</span>
          </button>

          {/* Preview Selection Button (auditions strictly Start -> End) */}
          <button
            type="button"
            onClick={onToggleSelectionPlay}
            class="inline-flex items-center gap-1.5 rounded-xl bg-[#27374D] px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
          >
            {playMode === 'selection' ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />
              </svg>
            )}
            <span>{playMode === 'selection' ? labels.stop : labels.playSelection}</span>
          </button>

          {/* Precision Start / End Inputs with Tactile Animated Snap-to-Playhead Buttons */}
          <div class="inline-flex items-center gap-1.5 rounded-xl border border-[#9DB2BF]/75 bg-white p-1 text-xs shadow-2xs dark:border-[#526D82] dark:bg-[#1D2A3B]">
            <button
              type="button"
              onClick={snapStartToCursor}
              aria-label={`${labels.startTime}: ${labels.setCurrentStart}`}
              title={`${labels.startTime} ← ${formatTime(currentTime)}`}
              class="snap-btn group inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#9DB2BF]/80 bg-[#DDE6ED] text-[#27374D] shadow-xs hover:border-[#27374D] hover:bg-[#27374D] hover:text-white dark:border-[#526D82] dark:bg-[#27374D] dark:text-[#DDE6ED] dark:hover:border-[#DDE6ED] dark:hover:bg-[#DDE6ED] dark:hover:text-[#27374D]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M11 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
                <path d="M19 12H10" />
                <path d="M13 9l-3 3 3 3" />
              </svg>
            </button>
            <label for="ruler-start-input" class="sr-only">{labels.startTime}</label>
            <input
              id="ruler-start-input"
              type="text"
              value={formatTime(startSec)}
              onChange={(e) => {
                const parsed = parseTimeInput((e.currentTarget as HTMLInputElement).value, startSec);
                const clamped = Math.max(0, Math.min(parsed, endSec - minGap));
                onChangeRange(clamped, endSec);
                onSeek(clamped);
              }}
              class="w-16 bg-transparent text-center font-mono text-xs font-semibold text-[#27374D] focus:outline-none dark:text-[#DDE6ED]"
            />
            <span aria-hidden="true" class="text-[#9DB2BF]">→</span>
            <label for="ruler-end-input" class="sr-only">{labels.endTime}</label>
            <input
              id="ruler-end-input"
              type="text"
              value={formatTime(endSec)}
              onChange={(e) => {
                const parsed = parseTimeInput((e.currentTarget as HTMLInputElement).value, endSec);
                const clamped = Math.min(duration, Math.max(parsed, startSec + minGap));
                onChangeRange(startSec, clamped);
                onSeek(clamped);
              }}
              class="w-16 bg-transparent text-center font-mono text-xs font-semibold text-[#27374D] focus:outline-none dark:text-[#DDE6ED]"
            />
            <button
              type="button"
              onClick={snapEndToCursor}
              aria-label={`${labels.endTime}: ${labels.setCurrentEnd}`}
              title={`${labels.endTime} ← ${formatTime(currentTime)}`}
              class="snap-btn group inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#9DB2BF]/80 bg-[#DDE6ED] text-[#27374D] shadow-xs hover:border-[#27374D] hover:bg-[#27374D] hover:text-white dark:border-[#526D82] dark:bg-[#27374D] dark:text-[#DDE6ED] dark:hover:border-[#DDE6ED] dark:hover:bg-[#DDE6ED] dark:hover:text-[#27374D]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                <path d="M13 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
                <path d="M5 12h9" />
                <path d="M11 9l3 3-3 3" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onChangeRange(0, duration);
              onSeek(0);
              setZoom(1);
            }}
            class="inline-flex items-center gap-1.5 rounded-xl border border-[#9DB2BF]/70 bg-white px-3 py-2 text-xs font-semibold text-[#27374D] transition-colors hover:bg-[#DDE6ED] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>{labels.resetTrim}</span>
          </button>
        </div>

        {/* Zoom Slider (1x – 6x) */}
        <div class="flex items-center gap-2 rounded-xl border border-[#9DB2BF]/60 bg-white px-3 py-1.5 dark:border-[#526D82]/60 dark:bg-[#1D2A3B]">
          <button
            type="button"
            aria-label="Zoom out timeline"
            onClick={() => setZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))))}
            class="text-[#526D82] hover:text-[#27374D] dark:text-[#9DB2BF] dark:hover:text-[#DDE6ED]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <input
            type="range"
            aria-label="Timeline zoom"
            min={1}
            max={6}
            step={0.5}
            value={zoom}
            onInput={(e) => setZoom(Number((e.currentTarget as HTMLInputElement).value))}
            class="omecy-slider w-20 sm:w-24"
          />
          <button
            type="button"
            aria-label="Zoom in timeline"
            onClick={() => setZoom((z) => Math.min(6, Number((z + 0.5).toFixed(1))))}
            class="text-[#526D82] hover:text-[#27374D] dark:text-[#9DB2BF] dark:hover:text-[#DDE6ED]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
