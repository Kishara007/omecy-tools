import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { convertWebpToJpg } from '../../lib/image-engine';
import { downloadAsZip, formatBytes, scrollToElement, stripExtension, triggerDownload } from '../../lib/format';
import AddMoreButton from './common/AddMoreButton';
import { ApplyBanner, UpdatedNotice } from './common/ApplyBanner';
import Dropzone from './common/Dropzone';
import SettingsDrawer from './common/SettingsDrawer';
import SizeBadge from './common/SizeBadge';

interface Props {
  labels: ToolUiLabels;
}

interface WebpItem {
  id: string;
  file: File;
  previewUrl: string;
  outputPreviewUrl: string | null;
  outputBlob: Blob | null;
  status: 'ready' | 'working' | 'done' | 'error';
  appliedSig: string | null;
  error?: string;
}

export default function WebpToJpg({ labels }: Props) {
  const jobRef = useRef(0);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<WebpItem[]>([]);

  const [items, setItems] = useState<WebpItem[]>([]);
  const [quality, setQuality] = useState(90);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [isWorking, setIsWorking] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        URL.revokeObjectURL(it.previewUrl);
        if (it.outputPreviewUrl) URL.revokeObjectURL(it.outputPreviewUrl);
      });
    };
  }, []);

  const currentSig = `${quality}::${bgColor.toUpperCase()}`;

  const processBatch = async (
    targetItems: WebpItem[],
    targetQuality: number,
    targetBg: string,
    isReapply: boolean
  ) => {
    if (targetItems.length === 0) return;
    const jobId = ++jobRef.current;
    const sig = `${targetQuality}::${targetBg.toUpperCase()}`;
    setIsWorking(true);
    setJustUpdated(false);
    if (isReapply) scrollToElement(outputSectionRef.current, 'start');

    for (const item of targetItems) {
      if (jobRef.current !== jobId) return;
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'working', error: undefined } : it))
      );
      try {
        const blob = await convertWebpToJpg(item.file, targetQuality, targetBg);
        if (jobRef.current !== jobId) return;
        const outUrl = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((it) => {
            if (it.id !== item.id) return it;
            if (it.outputPreviewUrl) URL.revokeObjectURL(it.outputPreviewUrl);
            return {
              ...it,
              status: 'done',
              outputBlob: blob,
              outputPreviewUrl: outUrl,
              appliedSig: sig,
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
    const newItems: WebpItem[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      outputPreviewUrl: null,
      outputBlob: null,
      status: 'ready',
      appliedSig: null,
    }));
    setItems((prev) => [...prev, ...newItems]);
    void processBatch(newItems, quality, bgColor, false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.outputPreviewUrl) URL.revokeObjectURL(target.outputPreviewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    jobRef.current += 1;
    items.forEach((it) => {
      URL.revokeObjectURL(it.previewUrl);
      if (it.outputPreviewUrl) URL.revokeObjectURL(it.outputPreviewUrl);
    });
    setItems([]);
    setIsWorking(false);
    setJustUpdated(false);
  };

  const completed = items.filter((it) => it.status === 'done' && it.outputBlob);
  const hasPendingChanges = Boolean(
    items.length > 0 &&
      !isWorking &&
      items.some((it) => it.status === 'done' && it.appliedSig !== currentSig)
  );

  return (
    <div class="space-y-6">
      {items.length === 0 ? (
        <Dropzone
          accept="image/webp,.webp,image/*"
          multiple
          formatsLabel="WebP → JPG (Bulk)"
          labels={labels}
          onFilesSelected={addFiles}
        />
      ) : (
        <div ref={outputSectionRef} class="panel-enter scroll-mt-20 space-y-5">
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
                accept="image/webp,.webp,image/*"
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

          <ul class="space-y-3">
            {items.map((item) => {
              const outName = `${stripExtension(item.file.name)}.jpg`;
              const isStale = item.status === 'done' && item.appliedSig !== currentSig;
              return (
                <li
                  key={item.id}
                  class={`flex flex-col gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-3.5 transition-opacity sm:flex-row sm:items-center dark:border-[#526D82]/60 dark:bg-[#121A26] ${
                    isStale ? 'opacity-75' : ''
                  }`}
                >
                  <img
                    src={item.outputPreviewUrl || item.previewUrl}
                    alt={outName}
                    width={56}
                    height={56}
                    class="h-14 w-14 shrink-0 rounded-lg border border-[#9DB2BF]/40 object-cover"
                  />
                  <div class="min-w-0 flex-1 space-y-1">
                    <p class="truncate text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                      {item.file.name}
                    </p>
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
                  <div class="flex items-center gap-2">
                    {item.status === 'done' && item.outputBlob && (
                      <button
                        type="button"
                        onClick={() => triggerDownload(item.outputBlob!, outName)}
                        class="rounded-lg bg-[#27374D] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
                      >
                        {labels.download} JPG
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label={labels.remove}
                      disabled={isWorking}
                      onClick={() => removeItem(item.id)}
                      class="rounded-lg border border-[#9DB2BF]/70 p-2 text-[#526D82] hover:text-red-600 disabled:opacity-35 dark:border-[#526D82] dark:text-[#9DB2BF]"
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
                    filename: `${stripExtension(c.file.name)}.jpg`,
                    blob: c.outputBlob!,
                  })),
                  'omecy-webp-to-jpg.zip'
                )
              }
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
            >
              {labels.downloadAllZip}
            </button>
          )}

          {/* Collapsible Quality & Background Fill */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={`${quality}% • ${bgColor.toUpperCase()}`}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
                <div class="flex items-center justify-between text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  <label for="webp-quality">{labels.quality}</label>
                  <span class="tabular-nums">{quality}%</span>
                </div>
                <input
                  id="webp-quality"
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

              <div class="flex items-center justify-between gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
                <label for="webp-bg-color" class="text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  {labels.bgColorFill}
                </label>
                <div class="flex items-center gap-2">
                  <input
                    id="webp-bg-color"
                    type="color"
                    value={bgColor}
                    disabled={isWorking}
                    onInput={(e) => {
                      setBgColor((e.currentTarget as HTMLInputElement).value);
                      setJustUpdated(false);
                    }}
                    class="h-9 w-12 cursor-pointer rounded border border-[#9DB2BF] bg-transparent p-0.5"
                  />
                  <span class="font-mono text-xs font-semibold text-[#526D82] dark:text-[#9DB2BF] uppercase">
                    {bgColor}
                  </span>
                </div>
              </div>
            </div>
          </SettingsDrawer>

          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              actionLabel={`${labels.convert} → JPG`}
              disabled={isWorking}
              onApply={() => void processBatch(items, quality, bgColor, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
