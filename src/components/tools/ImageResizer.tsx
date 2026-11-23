import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import {
  getImageDimensions,
  resizeImageFile,
  type ContainBgMode,
  type CropRect,
  type ResizeFitMode,
} from '../../lib/image-engine';
import { formatBytes, scrollToElement, stripExtension, triggerDownload } from '../../lib/format';
import Dropzone from './common/Dropzone';
import ImageCropPreview, { computeCenteredCrop } from './common/ImageCropPreview';
import SizeBadge from './common/SizeBadge';

interface Props {
  labels: ToolUiLabels;
}

const SOCIAL_PRESETS = [
  { name: 'Instagram Square', w: 1080, h: 1080 },
  { name: 'Instagram Portrait', w: 1080, h: 1350 },
  { name: 'Story / Reels', w: 1080, h: 1920 },
  { name: 'YouTube Thumbnail', w: 1280, h: 720 },
  { name: 'Open Graph / Blog', w: 1200, h: 630 },
  { name: 'Web Full HD', w: 1920, h: 1080 },
] as const;

export default function ImageResizer({ labels }: Props) {
  const outputCardRef = useRef<HTMLDivElement>(null);
  const lastAspectRef = useRef<number>(0);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [unit, setUnit] = useState<'px' | 'percent'>('px');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percent, setPercent] = useState(100);
  const [lockRatio, setLockRatio] = useState(true);
  const [fitMode, setFitMode] = useState<ResizeFitMode>('crop');
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 1, h: 1 });
  const [containBg, setContainBg] = useState<ContainBgMode>('blur');
  const [containColor, setContainColor] = useState('#FFFFFF');
  const [outputMime, setOutputMime] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState(90);
  const [isWorking, setIsWorking] = useState(false);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputDims, setOutputDims] = useState<{ w: number; h: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (outputUrl) {
      scrollToElement(outputCardRef.current);
    }
  }, [outputUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  // Recompute centered aspect-locked crop box whenever the target aspect ratio changes
  useEffect(() => {
    if (origW <= 0 || origH <= 0 || width <= 0 || height <= 0) return;
    const nextAspect = width / height;
    if (
      lastAspectRef.current === 0 ||
      Math.abs(nextAspect - lastAspectRef.current) / lastAspectRef.current > 0.005
    ) {
      lastAspectRef.current = nextAspect;
      setCrop(computeCenteredCrop(origW, origH, width, height));
    }
  }, [origW, origH, width, height]);

  const handleSelect = async (files: File[]) => {
    const picked = files[0];
    if (!picked) return;
    setOutputBlob(null);
    setOutputUrl(null);
    setOutputDims(null);
    setError(null);
    lastAspectRef.current = 0;

    try {
      const dims = await getImageDimensions(picked);
      setFile(picked);
      setPreviewUrl(URL.createObjectURL(picked));
      setOrigW(dims.width);
      setOrigH(dims.height);
      setWidth(dims.width);
      setHeight(dims.height);
      setPercent(100);
      setLockRatio(true);
      setFitMode('crop');
      setCrop({ x: 0, y: 0, w: 1, h: 1 });
      if (picked.type === 'image/png' || picked.type === 'image/webp' || picked.type === 'image/jpeg') {
        setOutputMime(picked.type);
      } else {
        setOutputMime('image/jpeg');
      }
    } catch {
      setError(labels.errorUnsupported);
    }
  };

  const handleWidthChange = (nextW: number) => {
    const cleanW = Math.max(1, Math.min(16000, Math.round(nextW || 1)));
    setWidth(cleanW);
    if (lockRatio && origW > 0) {
      setHeight(Math.max(1, Math.round((cleanW / origW) * origH)));
    }
  };

  const handleHeightChange = (nextH: number) => {
    const cleanH = Math.max(1, Math.min(16000, Math.round(nextH || 1)));
    setHeight(cleanH);
    if (lockRatio && origH > 0) {
      setWidth(Math.max(1, Math.round((cleanH / origH) * origW)));
    }
  };

  const handlePercentChange = (nextPct: number) => {
    const cleanPct = Math.max(5, Math.min(400, Math.round(nextPct)));
    setPercent(cleanPct);
    if (origW > 0 && origH > 0) {
      setWidth(Math.max(1, Math.round((origW * cleanPct) / 100)));
      setHeight(Math.max(1, Math.round((origH * cleanPct) / 100)));
    }
  };

  const handleLockRatioChange = (checked: boolean) => {
    setLockRatio(checked);
    if (checked && origW > 0 && origH > 0 && width > 0) {
      setHeight(Math.max(1, Math.round((width / origW) * origH)));
    }
  };

  const applySocialPreset = (w: number, h: number) => {
    setUnit('px');
    setLockRatio(false);
    setWidth(w);
    setHeight(h);
  };

  const origAspect = origW > 0 && origH > 0 ? origW / origH : 1;
  const targetAspect = width > 0 && height > 0 ? width / height : 1;
  const isAspectChanged =
    origW > 0 &&
    origH > 0 &&
    width > 0 &&
    height > 0 &&
    Math.abs(targetAspect - origAspect) / origAspect > 0.015;

  const handleResize = async () => {
    if (!file || width <= 0 || height <= 0) return;
    setIsWorking(true);
    setError(null);

    try {
      const blob = await resizeImageFile(
        file,
        width,
        height,
        outputMime,
        quality,
        isAspectChanged
          ? {
              fitMode,
              cropRect: crop,
              containBg,
              containColor,
            }
          : { fitMode: 'stretch' }
      );
      setOutputBlob(blob);
      setOutputDims({ w: width, h: height });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.errorGeneric);
    } finally {
      setIsWorking(false);
    }
  };

  const ext = outputMime === 'image/png' ? 'png' : outputMime === 'image/webp' ? 'webp' : 'jpg';
  const outW = outputDims?.w ?? width;
  const outH = outputDims?.h ?? height;
  const outFilename = file ? `${stripExtension(file.name)}-${outW}x${outH}.${ext}` : `resized.${ext}`;

  return (
    <div class="space-y-6">
      {!file ? (
        <Dropzone
          accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp"
          formatsLabel="JPG, PNG, WebP → Custom px / %"
          labels={labels}
          onFilesSelected={handleSelect}
        />
      ) : (
        <div class="panel-enter space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
            <div class="flex min-w-0 flex-1 items-center gap-3">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={file.name}
                  width={52}
                  height={52}
                  class="h-13 w-13 shrink-0 rounded-lg border border-[#9DB2BF]/40 object-cover"
                />
              )}
              <div class="min-w-0 flex-1">
                <p title={file.name} class="truncate text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  {file.name}
                </p>
                <p class="text-xs font-medium text-[#526D82] tabular-nums dark:text-[#9DB2BF]">
                  {origW} × {origH} px • {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                lastAspectRef.current = 0;
                setFile(null);
                setPreviewUrl(null);
                setOutputBlob(null);
                setOutputUrl(null);
                setOutputDims(null);
              }}
              class="rounded-lg border border-[#9DB2BF] px-3 py-1.5 text-xs font-semibold text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
            >
              {labels.startOver}
            </button>
          </div>

          {/* Unit Tabs + Aspect Ratio Toggle */}
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="inline-flex rounded-xl border border-[#9DB2BF]/70 bg-[#F7F9FB] p-1 dark:border-[#526D82] dark:bg-[#121A26]">
              <button
                type="button"
                onClick={() => setUnit('px')}
                class={`rounded-lg px-4 py-1.5 text-xs font-bold transition-colors ${
                  unit === 'px'
                    ? 'bg-[#27374D] text-white dark:bg-[#DDE6ED] dark:text-[#27374D]'
                    : 'text-[#526D82] dark:text-[#9DB2BF]'
                }`}
              >
                {labels.pixels}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUnit('percent');
                  setLockRatio(true);
                  handlePercentChange(percent);
                }}
                class={`rounded-lg px-4 py-1.5 text-xs font-bold transition-colors ${
                  unit === 'percent'
                    ? 'bg-[#27374D] text-white dark:bg-[#DDE6ED] dark:text-[#27374D]'
                    : 'text-[#526D82] dark:text-[#9DB2BF]'
                }`}
              >
                {labels.percentage}
              </button>
            </div>

            {unit === 'px' && (
              <label class="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                <input
                  type="checkbox"
                  checked={lockRatio}
                  onChange={(e) => handleLockRatioChange((e.currentTarget as HTMLInputElement).checked)}
                  class="h-4 w-4 accent-[#27374D]"
                />
                {labels.lockAspectRatio}
              </label>
            )}
          </div>

          {/* Dimensions Inputs */}
          {unit === 'px' ? (
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label for="resize-w" class="block text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  {labels.width} (px)
                </label>
                <input
                  id="resize-w"
                  type="number"
                  min={1}
                  max={16000}
                  value={width}
                  onInput={(e) => handleWidthChange(Number((e.currentTarget as HTMLInputElement).value))}
                  class="w-full rounded-xl border border-[#9DB2BF] bg-white px-3.5 py-2.5 text-sm font-semibold tabular-nums text-[#27374D] dark:border-[#526D82] dark:bg-[#121A26] dark:text-[#DDE6ED]"
                />
              </div>
              <div class="space-y-1.5">
                <label for="resize-h" class="block text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  {labels.height} (px)
                </label>
                <input
                  id="resize-h"
                  type="number"
                  min={1}
                  max={16000}
                  value={height}
                  onInput={(e) => handleHeightChange(Number((e.currentTarget as HTMLInputElement).value))}
                  class="w-full rounded-xl border border-[#9DB2BF] bg-white px-3.5 py-2.5 text-sm font-semibold tabular-nums text-[#27374D] dark:border-[#526D82] dark:bg-[#121A26] dark:text-[#DDE6ED]"
                />
              </div>
            </div>
          ) : (
            <div class="space-y-2 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
              <div class="flex items-center justify-between text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                <label for="resize-pct">{labels.percentage}</label>
                <span class="tabular-nums">
                  {percent}% ({width} × {height} px)
                </span>
              </div>
              <input
                id="resize-pct"
                type="range"
                min={10}
                max={200}
                step={5}
                value={percent}
                onInput={(e) => handlePercentChange(Number((e.currentTarget as HTMLInputElement).value))}
                class="omecy-slider"
              />
            </div>
          )}

          {/* Social Presets */}
          <div class="space-y-2">
            <span class="block text-xs font-semibold text-[#526D82] dark:text-[#9DB2BF]">
              {labels.socialPresets}
            </span>
            <div class="flex flex-wrap gap-2">
              {SOCIAL_PRESETS.map((p) => {
                const isActive = unit === 'px' && width === p.w && height === p.h;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applySocialPreset(p.w, p.h)}
                    class={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'border-[#27374D] bg-[#27374D] text-white shadow-sm dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                        : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                    }`}
                  >
                    {p.name} ({p.w}×{p.h})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Aspect Framing Preview (automatically appears when target aspect differs from original) */}
          {isAspectChanged && previewUrl && (
            <ImageCropPreview
              previewUrl={previewUrl}
              alt={file.name}
              origW={origW}
              origH={origH}
              targetW={width}
              targetH={height}
              fitMode={fitMode}
              onFitModeChange={setFitMode}
              crop={crop}
              onCropChange={setCrop}
              containBg={containBg}
              onContainBgChange={setContainBg}
              containColor={containColor}
              onContainColorChange={setContainColor}
              supportsTransparency={outputMime !== 'image/jpeg'}
              labels={labels}
            />
          )}

          {/* Output Format & Quality */}
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-1.5 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
              <label for="resize-fmt" class="block text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {labels.format}
              </label>
              <select
                id="resize-fmt"
                value={outputMime}
                onChange={(e) =>
                  setOutputMime((e.currentTarget as HTMLSelectElement).value as 'image/jpeg' | 'image/png' | 'image/webp')
                }
                class="w-full rounded-lg border border-[#9DB2BF] bg-white px-3 py-2 text-sm font-medium text-[#27374D] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED]"
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            {outputMime !== 'image/png' && (
              <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                <div class="flex justify-between text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  <label for="resize-qual">{labels.quality}</label>
                  <span class="tabular-nums">{quality}%</span>
                </div>
                <input
                  id="resize-qual"
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onInput={(e) => setQuality(Number((e.currentTarget as HTMLInputElement).value))}
                  class="omecy-slider"
                />
              </div>
            )}
          </div>

          {error && (
            <div role="alert" class="rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={isWorking}
            onClick={handleResize}
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:opacity-60 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
          >
            {isWorking ? labels.processing : `${labels.resize} (${width} × ${height})`}
          </button>

          {outputBlob && outputUrl && (
            <div
              ref={outputCardRef}
              class="panel-enter scroll-mt-20 space-y-4 rounded-2xl border border-[#526D82]/50 bg-[#F7F9FB] p-5 dark:bg-[#121A26]"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <span class="text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]">
                  {labels.done}: {outW} × {outH} px
                </span>
                <SizeBadge originalBytes={file.size} newBytes={outputBlob.size} labels={labels} />
              </div>

              <div class="omecy-checkerboard flex justify-center overflow-hidden rounded-xl border border-[#9DB2BF]/40 p-2">
                <img
                  src={outputUrl}
                  alt={outFilename}
                  width={outW}
                  height={outH}
                  class="max-h-72 h-auto w-auto rounded-lg object-contain shadow-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => triggerDownload(outputBlob, outFilename)}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {labels.download} {ext.toUpperCase()}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
