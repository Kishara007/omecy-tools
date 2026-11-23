import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { compressImageFile, type ImageOutputFormat } from '../../lib/image-engine';
import {
  downloadAsZip,
  formatBytes,
  getExtension,
  scrollToElement,
  stripExtension,
  triggerDownload,
} from '../../lib/format';
import AddMoreButton from './common/AddMoreButton';
import { ApplyBanner, UpdatedNotice } from './common/ApplyBanner';
import BeforeAfterSlider from './common/BeforeAfterSlider';
import Dropzone from './common/Dropzone';
import SettingsDrawer from './common/SettingsDrawer';
import SizeBadge from './common/SizeBadge';

interface Props {
  labels: ToolUiLabels;
}

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  outputBlob: Blob | null;
  outputUrl: string | null;
  status: 'ready' | 'working' | 'done' | 'error';
  appliedQuality: number | null;
  appliedFormat: ImageOutputFormat | null;
  error?: string;
}

const FORMAT_OPTIONS: Array<{ id: ImageOutputFormat; label?: string }> = [
  { id: 'original' },
  { id: 'image/jpeg', label: 'JPG' },
  { id: 'image/png', label: 'PNG' },
  { id: 'image/webp', label: 'WebP' },
];

function resolveOutputExt(file: File, fmt: ImageOutputFormat): string {
  if (fmt === 'image/jpeg') return 'jpg';
  if (fmt === 'image/png') return 'png';
  if (fmt === 'image/webp') return 'webp';
  const ext = getExtension(file.name, 'jpg');
  return ext === 'jpeg' ? 'jpg' : ext;
}

function buildOutputFilename(file: File, fmt: ImageOutputFormat): string {
  const base = stripExtension(file.name);
  const ext = resolveOutputExt(file, fmt);
  return base.endsWith('-compressed') ? `${base}.${ext}` : `${base}-compressed.${ext}`;
}

function getFormatOptionLabel(fmt: ImageOutputFormat, originalLabel: string): string {
  if (fmt === 'image/jpeg') return 'JPG';
  if (fmt === 'image/png') return 'PNG';
  if (fmt === 'image/webp') return 'WebP';
  return originalLabel;
}

export default function ImageCompressor({ labels }: Props) {
  const jobRef = useRef(0);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<ImageItem[]>([]);

  const [items, setItems] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quality, setQuality] = useState(78);
  const [outputFormat, setOutputFormat] = useState<ImageOutputFormat>('original');
  const [isWorking, setIsWorking] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        URL.revokeObjectURL(it.previewUrl);
        if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
      });
    };
  }, []);

  const processBatch = async (
    targetItems: ImageItem[],
    targetQuality: number,
    targetFormat: ImageOutputFormat,
    isReapply: boolean
  ) => {
    if (targetItems.length === 0) return;
    const jobId = ++jobRef.current;
    setIsWorking(true);
    setJustUpdated(false);
    if (isReapply) scrollToElement(outputSectionRef.current, 'start');

    for (const item of targetItems) {
      if (jobRef.current !== jobId) return;
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'working', error: undefined } : it))
      );
      try {
        const blob = await compressImageFile(item.file, targetQuality, undefined, targetFormat);
        if (jobRef.current !== jobId) return;
        const nextUrl = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((it) => {
            if (it.id !== item.id) return it;
            if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
            return {
              ...it,
              status: 'done',
              outputBlob: blob,
              outputUrl: nextUrl,
              appliedQuality: targetQuality,
              appliedFormat: targetFormat,
            };
          })
        );
      } catch (err) {
        if (jobRef.current !== jobId) return;
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: 'error', error: err instanceof Error ? err.message : labels.errorGeneric }
              : it
          )
        );
      }
    }

    if (jobRef.current === jobId) {
      setIsWorking(false);
      if (isReapply) {
        setJustUpdated(true);
      }
    }
  };

  const addFiles = (files: File[]) => {
    const valid: ImageItem[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      outputBlob: null,
      outputUrl: null,
      status: 'ready',
      appliedQuality: null,
      appliedFormat: null,
    }));
    if (valid.length === 0) return;
    setItems((prev) => [...prev, ...valid]);
    setSelectedId((prev) => prev ?? valid[0].id);
    void processBatch(valid, quality, outputFormat, false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.outputUrl) URL.revokeObjectURL(target.outputUrl);
      }
      const next = prev.filter((i) => i.id !== id);
      if (selectedId === id) {
        setSelectedId(next[0]?.id ?? null);
      }
      return next;
    });
  };

  const clearAll = () => {
    jobRef.current += 1;
    items.forEach((it) => {
      URL.revokeObjectURL(it.previewUrl);
      if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
    });
    setItems([]);
    setSelectedId(null);
    setIsWorking(false);
    setJustUpdated(false);
  };

  const completed = items.filter((it) => it.status === 'done' && it.outputBlob && it.outputUrl);
  const totalOriginal = completed.reduce((acc, it) => acc + it.file.size, 0);
  const totalNew = completed.reduce((acc, it) => acc + (it.outputBlob?.size ?? 0), 0);
  const hasPendingChanges = Boolean(
    items.length > 0 &&
      !isWorking &&
      items.some(
        (it) =>
          it.status === 'done' &&
          (it.appliedQuality !== quality || it.appliedFormat !== outputFormat)
      )
  );

  const activeItem =
    items.find((it) => it.id === selectedId) ?? completed[0] ?? items[0] ?? null;
  const activeIndex = activeItem ? items.findIndex((it) => it.id === activeItem.id) : -1;
  const activeAppliedFormat = activeItem?.appliedFormat ?? outputFormat;
  const activeOutExt = activeItem ? resolveOutputExt(activeItem.file, activeAppliedFormat) : 'jpg';
  const activeOutName = activeItem ? buildOutputFilename(activeItem.file, activeAppliedFormat) : '';
  const activeIsStale = Boolean(
    activeItem &&
      activeItem.status === 'done' &&
      (activeItem.appliedQuality !== quality || activeItem.appliedFormat !== outputFormat)
  );

  const selectByOffset = (delta: number) => {
    if (items.length < 2 || activeIndex < 0) return;
    const nextIdx = (activeIndex + delta + items.length) % items.length;
    setSelectedId(items[nextIdx].id);
  };

  const settingsSummary = `${getFormatOptionLabel(outputFormat, labels.original)} • ${quality}%`;

  return (
    <div class="space-y-6">
      {items.length === 0 ? (
        <Dropzone
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          multiple
          formatsLabel="JPG, PNG, WebP (Bulk)"
          labels={labels}
          onFilesSelected={addFiles}
        />
      ) : (
        <div ref={outputSectionRef} class="panel-enter scroll-mt-20 space-y-5">
          {/* Top toolbar */}
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {items.length} {labels.fileCount}
              </span>
              {justUpdated && !hasPendingChanges && !isWorking && (
                <UpdatedNotice text={labels.changesApplied} />
              )}
            </div>
            <div class="flex items-center gap-2">
              <AddMoreButton
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                labels={labels}
                disabled={isWorking}
                onFilesSelected={addFiles}
              />
              <button
                type="button"
                onClick={clearAll}
                class="rounded-lg border border-[#9DB2BF] px-3 py-1.5 text-xs font-semibold text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
              >
                {labels.clearAll}
              </button>
            </div>
          </div>

          {/* Interactive Before / After Output Card */}
          {activeItem && (
            <div
              class={`space-y-4 rounded-2xl border p-4 transition-opacity sm:p-5 ${
                activeIsStale || activeItem.status === 'working'
                  ? 'border-[#9DB2BF]/60 bg-[#F7F9FB]/85 dark:border-[#526D82]/50 dark:bg-[#121A26]/85'
                  : 'border-[#526D82]/60 bg-[#F7F9FB] dark:border-[#526D82]/70 dark:bg-[#121A26]'
              }`}
            >
              {/* Card Header: filename, applied pills, and multi-file pager */}
              <div class="flex min-w-0 flex-wrap items-center justify-between gap-2.5">
                <div class="flex min-w-0 max-w-full flex-1 flex-wrap items-center gap-2">
                  <p
                    title={activeOutName}
                    class="min-w-0 max-w-full truncate text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]"
                  >
                    {activeOutName}
                  </p>
                  <span class="shrink-0 rounded bg-[#DDE6ED] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                    {activeOutExt}
                  </span>
                  {activeItem.appliedQuality !== null && (
                    <span class="shrink-0 rounded bg-[#DDE6ED] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                      {activeItem.appliedQuality}%
                    </span>
                  )}
                </div>

                {items.length > 1 && (
                  <div class="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => selectByOffset(-1)}
                      class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#27374D] transition-colors hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <span class="px-1 text-xs font-semibold tabular-nums text-[#526D82] dark:text-[#9DB2BF]">
                      {activeIndex + 1} / {items.length}
                    </span>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => selectByOffset(1)}
                      class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#27374D] transition-colors hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Before / After Slider OR initial processing placeholder */}
              {activeItem.status === 'done' && activeItem.outputBlob && activeItem.outputUrl ? (
                <BeforeAfterSlider
                  beforeUrl={activeItem.previewUrl}
                  afterUrl={activeItem.outputUrl}
                  beforeLabel={labels.before}
                  afterLabel={labels.after}
                  beforeMeta={formatBytes(activeItem.file.size)}
                  afterMeta={formatBytes(activeItem.outputBlob.size)}
                  alt={activeItem.file.name}
                  isUpdating={isWorking || activeIsStale}
                />
              ) : activeItem.status === 'error' ? (
                <div role="alert" class="rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
                  {activeItem.error || labels.errorGeneric}
                </div>
              ) : (
                <div class="omecy-checkerboard relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-[#9DB2BF]/55 p-3 dark:border-[#526D82]/55">
                  <img
                    src={activeItem.previewUrl}
                    alt={activeItem.file.name}
                    class="max-h-[340px] w-auto max-w-full rounded-lg opacity-55"
                  />
                  <span class="absolute rounded-full bg-[#27374D]/85 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                    {labels.processing}
                  </span>
                </div>
              )}

              {/* Card Footer: size stats + primary Download button */}
              {activeItem.status === 'done' && activeItem.outputBlob && (
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <SizeBadge
                    originalBytes={activeItem.file.size}
                    newBytes={activeItem.outputBlob.size}
                    labels={labels}
                  />
                  <button
                    type="button"
                    disabled={isWorking}
                    onClick={() => triggerDownload(activeItem.outputBlob!, activeOutName)}
                    class="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#27374D] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:opacity-50 sm:w-auto dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
                  >
                    {labels.download} {activeOutExt.toUpperCase()}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Multi-file summary + clickable batch list (shown when 2+ images are uploaded) */}
          {items.length > 1 && (
            <div class="space-y-3">
              {completed.length > 1 && (
                <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#526D82]/50 bg-[#DDE6ED]/50 p-3.5 dark:bg-[#27374D]/60">
                  <span class="text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]">{labels.done}</span>
                  <SizeBadge originalBytes={totalOriginal} newBytes={totalNew} labels={labels} />
                </div>
              )}

              <ul class="space-y-2.5">
                {items.map((item) => {
                  const itemFormat = item.appliedFormat ?? outputFormat;
                  const itemExt = resolveOutputExt(item.file, itemFormat);
                  const outName = buildOutputFilename(item.file, itemFormat);
                  const isStale =
                    item.status === 'done' &&
                    (item.appliedQuality !== quality || item.appliedFormat !== outputFormat);
                  const isSelected = activeItem?.id === item.id;

                  return (
                    <li
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      class={`flex cursor-pointer flex-col gap-3 rounded-xl border p-3 transition-all sm:flex-row sm:items-center ${
                        isSelected
                          ? 'border-[#27374D] bg-[#DDE6ED]/45 ring-1 ring-[#27374D]/25 dark:border-[#DDE6ED] dark:bg-[#27374D]/55 dark:ring-[#DDE6ED]/25'
                          : 'border-[#9DB2BF]/60 bg-[#F7F9FB] hover:border-[#526D82] dark:border-[#526D82]/60 dark:bg-[#121A26] dark:hover:border-[#9DB2BF]'
                      } ${isStale ? 'opacity-75' : ''}`}
                    >
                      <img
                        src={item.outputUrl ?? item.previewUrl}
                        alt={item.file.name}
                        width={48}
                        height={48}
                        class="h-12 w-12 shrink-0 rounded-lg border border-[#9DB2BF]/40 object-cover"
                      />
                      <div class="min-w-0 flex-1 space-y-1">
                        <div class="flex min-w-0 items-center gap-1.5">
                          <p
                            title={outName}
                            class="min-w-0 truncate text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]"
                          >
                            {outName}
                          </p>
                          <span class="shrink-0 rounded bg-[#DDE6ED] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                            {itemExt}
                          </span>
                          {item.appliedQuality !== null && (
                            <span class="shrink-0 rounded bg-[#DDE6ED] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                              {item.appliedQuality}%
                            </span>
                          )}
                        </div>
                        {item.status === 'done' && item.outputBlob ? (
                          <SizeBadge originalBytes={item.file.size} newBytes={item.outputBlob.size} labels={labels} />
                        ) : (
                          <p class="text-xs text-[#526D82] dark:text-[#9DB2BF]">
                            {formatBytes(item.file.size)}
                            {item.status === 'working' ? ` • ${labels.processing}` : ''}
                          </p>
                        )}
                        {item.status === 'error' && (
                          <p role="alert" class="text-xs text-red-700 dark:text-red-300">
                            {item.error || labels.errorGeneric}
                          </p>
                        )}
                      </div>
                      <div class="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {item.status === 'done' && item.outputBlob && (
                          <button
                            type="button"
                            onClick={() => triggerDownload(item.outputBlob!, outName)}
                            class="rounded-lg bg-[#27374D] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
                          >
                            {labels.download}
                          </button>
                        )}
                        <button
                          type="button"
                          aria-label={labels.remove}
                          disabled={isWorking}
                          onClick={() => removeItem(item.id)}
                          class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#526D82] hover:text-red-600 disabled:opacity-35 dark:border-[#526D82] dark:text-[#9DB2BF]"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {completed.length > 1 && !isWorking && (
                <button
                  type="button"
                  onClick={() =>
                    void downloadAsZip(
                      completed.map((c) => ({
                        filename: buildOutputFilename(c.file, c.appliedFormat ?? outputFormat),
                        blob: c.outputBlob!,
                      })),
                      'omecy-compressed-images.zip'
                    )
                  }
                  class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
                >
                  {labels.downloadAllZip}
                </button>
              )}
            </div>
          )}

          {/* Collapsible Output Format & Quality Settings */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={settingsSummary}
            hasPendingChanges={hasPendingChanges}
          >
            {/* Output File Type */}
            <div class="space-y-2 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
              <p class="text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {labels.format}
              </p>
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {FORMAT_OPTIONS.map((opt) => {
                  const active = outputFormat === opt.id;
                  const text = opt.label ?? labels.original;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isWorking}
                      onClick={() => {
                        setOutputFormat(opt.id);
                        setJustUpdated(false);
                      }}
                      class={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all disabled:opacity-50 sm:text-sm ${
                        active
                          ? 'border-[#27374D] bg-[#27374D] text-white shadow-sm dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                          : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED]/70 dark:border-[#526D82]/70 dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                      }`}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Slider */}
            <div class="space-y-2 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
              <div class="flex items-center justify-between text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                <label for="img-comp-quality">{labels.quality}</label>
                <span class="tabular-nums">{quality}%</span>
              </div>
              <input
                id="img-comp-quality"
                type="range"
                min={10}
                max={100}
                value={quality}
                disabled={isWorking}
                onInput={(e) => {
                  setQuality(Number((e.currentTarget as HTMLInputElement).value));
                  setJustUpdated(false);
                }}
                class="omecy-slider"
              />
            </div>
          </SettingsDrawer>

          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              disabled={isWorking}
              onApply={() => void processBatch(items, quality, outputFormat, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
