import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../../i18n/types';
import type { ContainBgMode, CropRect, ResizeFitMode } from '../../../lib/image-engine';

export function computeCenteredCrop(
  origW: number,
  origH: number,
  targetW: number,
  targetH: number
): CropRect {
  if (origW <= 0 || origH <= 0 || targetW <= 0 || targetH <= 0) {
    return { x: 0, y: 0, w: 1, h: 1 };
  }
  const origAspect = origW / origH;
  const targetAspect = targetW / targetH;
  if (targetAspect > origAspect) {
    const h = Math.max(0.05, Math.min(1, origAspect / targetAspect));
    return { x: 0, y: (1 - h) / 2, w: 1, h };
  }
  const w = Math.max(0.05, Math.min(1, targetAspect / origAspect));
  return { x: (1 - w) / 2, y: 0, w, h: 1 };
}

interface ImageCropPreviewProps {
  previewUrl: string;
  alt: string;
  origW: number;
  origH: number;
  targetW: number;
  targetH: number;
  fitMode: ResizeFitMode;
  onFitModeChange: (mode: ResizeFitMode) => void;
  crop: CropRect;
  onCropChange: (next: CropRect) => void;
  containBg: ContainBgMode;
  onContainBgChange: (bg: ContainBgMode) => void;
  containColor: string;
  onContainColorChange: (color: string) => void;
  supportsTransparency: boolean;
  labels: ToolUiLabels;
}

type DragKind = 'move' | 'nw' | 'ne' | 'sw' | 'se';

interface DragState {
  kind: DragKind;
  startX: number;
  startY: number;
  startCrop: CropRect;
  pointerId: number;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

export default function ImageCropPreview({
  previewUrl,
  alt,
  origW,
  origH,
  targetW,
  targetH,
  fitMode,
  onFitModeChange,
  crop,
  onCropChange,
  containBg,
  onContainBgChange,
  containColor,
  onContainColorChange,
  supportsTransparency,
  labels,
}: ImageCropPreviewProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;
    const prev = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.userSelect = prev;
    };
  }, [isDragging]);

  const origAspect = origW > 0 && origH > 0 ? origW / origH : 1;
  const targetAspect = targetW > 0 && targetH > 0 ? targetW / targetH : 1;
  const ratioNorm = targetAspect / origAspect;

  const defaultCrop = computeCenteredCrop(origW, origH, targetW, targetH);
  const isCustomCrop =
    Math.abs(crop.x - defaultCrop.x) > 0.005 ||
    Math.abs(crop.y - defaultCrop.y) > 0.005 ||
    Math.abs(crop.w - defaultCrop.w) > 0.005 ||
    Math.abs(crop.h - defaultCrop.h) > 0.005;

  const startDrag = (kind: DragKind, e: PointerEvent, initialCrop: CropRect = crop) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    e.stopPropagation();
    stageRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = {
      kind,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: initialCrop,
      pointerId: e.pointerId,
    };
    setIsDragging(true);
  };

  // Clicking on the darkened area outside the crop box recenters the box at the pointer and allows dragging immediately
  const handleStagePointerDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    const centered: CropRect = {
      x: clamp(px - crop.w / 2, 0, Math.max(0, 1 - crop.w)),
      y: clamp(py - crop.h / 2, 0, Math.max(0, 1 - crop.h)),
      w: crop.w,
      h: crop.h,
    };
    onCropChange(centered);
    startDrag('move', e, centered);
  };

  const handleStagePointerMove = (e: PointerEvent) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const { kind, startX, startY, startCrop } = drag;

    if (kind === 'move') {
      const dx = (e.clientX - startX) / rect.width;
      const dy = (e.clientY - startY) / rect.height;
      onCropChange({
        x: clamp(startCrop.x + dx, 0, Math.max(0, 1 - startCrop.w)),
        y: clamp(startCrop.y + dy, 0, Math.max(0, 1 - startCrop.h)),
        w: startCrop.w,
        h: startCrop.h,
      });
      return;
    }

    const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);

    let ax = startCrop.x;
    let ay = startCrop.y;
    let rawW = 0;
    let rawH = 0;
    let maxW = 1;

    if (kind === 'se') {
      ax = startCrop.x;
      ay = startCrop.y;
      rawW = px - ax;
      rawH = py - ay;
      maxW = Math.min(1 - ax, (1 - ay) * ratioNorm);
    } else if (kind === 'sw') {
      ax = startCrop.x + startCrop.w;
      ay = startCrop.y;
      rawW = ax - px;
      rawH = py - ay;
      maxW = Math.min(ax, (1 - ay) * ratioNorm);
    } else if (kind === 'ne') {
      ax = startCrop.x;
      ay = startCrop.y + startCrop.h;
      rawW = px - ax;
      rawH = ay - py;
      maxW = Math.min(1 - ax, ay * ratioNorm);
    } else {
      // 'nw'
      ax = startCrop.x + startCrop.w;
      ay = startCrop.y + startCrop.h;
      rawW = ax - px;
      rawH = ay - py;
      maxW = Math.min(ax, ay * ratioNorm);
    }

    // Orthogonal projection onto the aspect-ratio ray (ratioNorm, 1) for smooth diagonal tracking
    const t = (rawW * ratioNorm + rawH) / (ratioNorm * ratioNorm + 1);
    const desiredW = t * ratioNorm;
    const minW = Math.min(maxW, Math.max(0.12, 0.12 * ratioNorm));
    const nextW = clamp(desiredW, minW, Math.max(minW, maxW));
    const nextH = nextW / ratioNorm;

    let nextX = ax;
    let nextY = ay;
    if (kind === 'sw' || kind === 'nw') nextX = ax - nextW;
    if (kind === 'ne' || kind === 'nw') nextY = ay - nextH;

    onCropChange({
      x: clamp(nextX, 0, Math.max(0, 1 - nextW)),
      y: clamp(nextY, 0, Math.max(0, 1 - nextH)),
      w: nextW,
      h: nextH,
    });
  };

  const handleStagePointerUp = (e: PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsDragging(false);
    try {
      stageRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  const handleCropKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 0.08 : 0.02;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onCropChange({ ...crop, x: clamp(crop.x - step, 0, Math.max(0, 1 - crop.w)) });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onCropChange({ ...crop, x: clamp(crop.x + step, 0, Math.max(0, 1 - crop.w)) });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onCropChange({ ...crop, y: clamp(crop.y - step, 0, Math.max(0, 1 - crop.h)) });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onCropChange({ ...crop, y: clamp(crop.y + step, 0, Math.max(0, 1 - crop.h)) });
    }
  };

  const cropPxW = Math.max(1, Math.round(crop.w * origW));
  const cropPxH = Math.max(1, Math.round(crop.h * origH));

  const previewFrameStyle =
    targetAspect >= 1
      ? {
          aspectRatio: `${targetW} / ${targetH}`,
          width: `${Math.min(440, Math.round(280 * targetAspect))}px`,
          maxWidth: '100%',
        }
      : {
          aspectRatio: `${targetW} / ${targetH}`,
          height: '280px',
          maxWidth: '100%',
        };

  const effectiveContainBg: ContainBgMode =
    !supportsTransparency && containBg === 'transparent' ? 'white' : containBg;

  const fitModes: Array<{ id: ResizeFitMode; label: string }> = [
    { id: 'crop', label: labels.fitModeCrop },
    { id: 'contain', label: labels.fitModeContain },
    { id: 'stretch', label: labels.fitModeStretch },
  ];

  const bgChoices: Array<{ id: ContainBgMode; label: string }> = [
    { id: 'blur', label: labels.bgBlur },
    { id: 'white', label: labels.bgWhite },
    { id: 'black', label: labels.bgBlack },
    ...(supportsTransparency ? [{ id: 'transparent' as const, label: labels.bgTransparent }] : []),
  ];

  return (
    <div class="panel-enter space-y-3 rounded-2xl border border-[#9DB2BF]/65 bg-[#F7F9FB] p-3.5 sm:p-4 dark:border-[#526D82]/65 dark:bg-[#121A26]">
      {/* Mode Switcher + Crop Info */}
      <div class="flex flex-wrap items-center justify-between gap-2.5">
        <div
          role="tablist"
          aria-label="Resize fit mode"
          class="inline-flex rounded-xl border border-[#9DB2BF]/70 bg-white p-1 dark:border-[#526D82] dark:bg-[#1D2A3B]"
        >
          {fitModes.map((m) => {
            const active = fitMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onFitModeChange(m.id)}
                class={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  active
                    ? 'bg-[#27374D] text-white shadow-sm dark:bg-[#DDE6ED] dark:text-[#27374D]'
                    : 'text-[#526D82] hover:text-[#27374D] dark:text-[#9DB2BF] dark:hover:text-[#DDE6ED]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div class="flex flex-wrap items-center gap-2">
          {fitMode === 'crop' && (
            <>
              <span class="rounded-lg bg-[#DDE6ED]/80 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                {cropPxW} × {cropPxH} px
              </span>
              {isCustomCrop && (
                <button
                  type="button"
                  onClick={() => onCropChange(defaultCrop)}
                  class="cursor-pointer rounded-lg border border-[#9DB2BF]/80 px-2.5 py-1 text-[11px] font-semibold text-[#27374D] transition-colors hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
                >
                  {labels.resetTrim}
                </button>
              )}
            </>
          )}
          {fitMode !== 'crop' && (
            <span class="rounded-lg bg-[#DDE6ED]/80 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
              {targetW} × {targetH} px
            </span>
          )}
        </div>
      </div>

      {/* Visual Stage */}
      {fitMode === 'crop' ? (
        <div class="space-y-2">
          <div class="omecy-checkerboard flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#9DB2BF]/55 p-2.5 sm:p-3 dark:border-[#526D82]/55">
            <div
              ref={stageRef}
              onMouseDown={(e) => e.preventDefault()}
              onPointerDown={handleStagePointerDown}
              onPointerMove={handleStagePointerMove}
              onPointerUp={handleStagePointerUp}
              onPointerCancel={handleStagePointerUp}
              class="relative inline-block max-w-full touch-none select-none overflow-hidden rounded-lg shadow-sm"
            >
              <img
                src={previewUrl}
                alt={alt}
                draggable={false}
                class="pointer-events-none block h-auto max-h-[320px] w-auto max-w-full select-none sm:max-h-[360px]"
              />

              {/* Aspect-Locked Interactive Crop Box */}
              <div
                role="region"
                tabIndex={0}
                aria-label={labels.cropHint}
                onKeyDown={handleCropKeyDown}
                onPointerDown={(e) => startDrag('move', e)}
                style={{
                  left: `${crop.x * 100}%`,
                  top: `${crop.y * 100}%`,
                  width: `${crop.w * 100}%`,
                  height: `${crop.h * 100}%`,
                  boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.56)',
                }}
                class="absolute z-10 cursor-move border-2 border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {/* Rule-of-thirds guide grid */}
                <div aria-hidden="true" class="pointer-events-none absolute inset-0">
                  <div class="absolute inset-y-0 left-1/3 w-px bg-white/35" />
                  <div class="absolute inset-y-0 left-2/3 w-px bg-white/35" />
                  <div class="absolute inset-x-0 top-1/3 h-px bg-white/35" />
                  <div class="absolute inset-x-0 top-2/3 h-px bg-white/35" />
                </div>

                {/* Tactile Corner Resize Handles (flush inside frame so never clipped at 0%/100% edges) */}
                <button
                  type="button"
                  aria-label="Resize top-left corner"
                  onPointerDown={(e) => startDrag('nw', e)}
                  class="absolute top-0 left-0 z-20 flex h-8 w-8 cursor-nwse-resize items-start justify-start p-0.5"
                >
                  <span class="h-4 w-4 rounded-tl-[2px] border-t-[3.5px] border-l-[3.5px] border-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]" />
                </button>
                <button
                  type="button"
                  aria-label="Resize top-right corner"
                  onPointerDown={(e) => startDrag('ne', e)}
                  class="absolute top-0 right-0 z-20 flex h-8 w-8 cursor-nesw-resize items-start justify-end p-0.5"
                >
                  <span class="h-4 w-4 rounded-tr-[2px] border-t-[3.5px] border-r-[3.5px] border-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]" />
                </button>
                <button
                  type="button"
                  aria-label="Resize bottom-left corner"
                  onPointerDown={(e) => startDrag('sw', e)}
                  class="absolute bottom-0 left-0 z-20 flex h-8 w-8 cursor-nesw-resize items-end justify-start p-0.5"
                >
                  <span class="h-4 w-4 rounded-bl-[2px] border-b-[3.5px] border-l-[3.5px] border-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]" />
                </button>
                <button
                  type="button"
                  aria-label="Resize bottom-right corner"
                  onPointerDown={(e) => startDrag('se', e)}
                  class="absolute right-0 bottom-0 z-20 flex h-8 w-8 cursor-nwse-resize items-end justify-end p-0.5"
                >
                  <span class="h-4 w-4 rounded-br-[2px] border-r-[3.5px] border-b-[3.5px] border-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]" />
                </button>
              </div>
            </div>
          </div>

          <p class="text-center text-[11px] font-medium text-[#526D82] dark:text-[#9DB2BF]">
            {labels.cropHint}
          </p>
        </div>
      ) : fitMode === 'contain' ? (
        <div class="space-y-3">
          <div class="omecy-checkerboard flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#9DB2BF]/55 p-3 dark:border-[#526D82]/55">
            <div
              style={{
                ...previewFrameStyle,
                backgroundColor:
                  effectiveContainBg === 'white'
                    ? '#FFFFFF'
                    : effectiveContainBg === 'black'
                      ? '#000000'
                      : effectiveContainBg === 'custom'
                        ? containColor
                        : undefined,
              }}
              class={`relative overflow-hidden rounded-lg border border-[#9DB2BF]/60 shadow-sm ${
                effectiveContainBg === 'transparent' ? 'omecy-checkerboard' : ''
              }`}
            >
              {effectiveContainBg === 'blur' && (
                <img
                  src={previewUrl}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  class="pointer-events-none absolute inset-0 h-full w-full scale-115 object-cover blur-md"
                />
              )}
              <img
                src={previewUrl}
                alt={alt}
                draggable={false}
                class="relative z-10 h-full w-full object-contain select-none"
              />
            </div>
          </div>

          {/* Contain Background Options */}
          <div class="flex flex-wrap items-center justify-center gap-2">
            {bgChoices.map((bg) => {
              const active = effectiveContainBg === bg.id;
              return (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => onContainBgChange(bg.id)}
                  class={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                    active
                      ? 'border-[#27374D] bg-[#27374D] text-white dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                      : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED]/70 dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                  }`}
                >
                  {bg.label}
                </button>
              );
            })}
            <label
              class={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs font-semibold transition-colors ${
                effectiveContainBg === 'custom'
                  ? 'border-[#27374D] bg-[#DDE6ED] text-[#27374D] dark:border-[#DDE6ED] dark:bg-[#27374D] dark:text-[#DDE6ED]'
                  : 'border-[#9DB2BF]/70 bg-white text-[#27374D] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED]'
              }`}
            >
              <input
                type="color"
                aria-label={labels.bgColorFill}
                value={containColor}
                onInput={(e) => {
                  onContainColorChange((e.currentTarget as HTMLInputElement).value);
                  onContainBgChange('custom');
                }}
                class="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span class="font-mono text-[11px]">{containColor.toUpperCase()}</span>
            </label>
          </div>
        </div>
      ) : (
        <div class="omecy-checkerboard flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#9DB2BF]/55 p-3 dark:border-[#526D82]/55">
          <div
            style={previewFrameStyle}
            class="overflow-hidden rounded-lg border border-[#9DB2BF]/60 bg-white shadow-sm dark:bg-[#1D2A3B]"
          >
            <img
              src={previewUrl}
              alt={alt}
              draggable={false}
              class="h-full w-full object-fill select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
