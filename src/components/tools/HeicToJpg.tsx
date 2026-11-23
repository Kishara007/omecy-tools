import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { convertHeicToJpg } from '../../lib/image-engine';
import { downloadAsZip, formatBytes, scrollToElement, stripExtension, triggerDownload } from '../../lib/format';
import AddMoreButton from './common/AddMoreButton';
import { ApplyBanner, UpdatedNotice } from './common/ApplyBanner';
import Dropzone from './common/Dropzone';
import EngineLoader from './common/EngineLoader';
import ProgressBar from './common/ProgressBar';
import SettingsDrawer from './common/SettingsDrawer';
import SizeBadge from './common/SizeBadge';

interface Props {
  labels: ToolUiLabels;
}

interface HeicItem {
  id: string;
  file: File;
  outputBlob: Blob | null;
  outputPreviewUrl: string | null;
  status: 'ready' | 'working' | 'done' | 'error';
  appliedQuality: number | null;
  error?: string;
}

export default function HeicToJpg({ labels }: Props) {
  const jobRef = useRef(0);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HeicItem[]>([]);

  const [items, setItems] = useState<HeicItem[]>([]);
  const [quality, setQuality] = useState(90);
  const [isWorking, setIsWorking] = useState(false);
  const [isLoadingEngine, setIsLoadingEngine] = useState(false);
  const [batchDone, setBatchDone] = useState(0);
  const [batchTotal, setBatchTotal] = useState(0);
  const [justUpdated, setJustUpdated] = useState(false);

  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        if (it.outputPreviewUrl) URL.revokeObjectURL(it.outputPreviewUrl);
      });
    };
  }, []);

  const processBatch = async (targetItems: HeicItem[], targetQuality: number, isReapply: boolean) => {
    if (targetItems.length === 0) return;
    const jobId = ++jobRef.current;
    setIsWorking(true);
    setJustUpdated(false);
    setBatchDone(0);
    setBatchTotal(targetItems.length);
    if (isReapply) scrollToElement(outputSectionRef.current, 'start');

    let processed = 0;
    for (const item of targetItems) {
      if (jobRef.current !== jobId) return;
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'working', error: undefined } : it))
      );
      try {
        const blob = await convertHeicToJpg(item.file, targetQuality, (st) => {
          if (jobRef.current !== jobId) return;
          setIsLoadingEngine(st === 'engine');
        });
        if (jobRef.current !== jobId) return;
        const preview = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((it) => {
            if (it.id !== item.id) return it;
            if (it.outputPreviewUrl) URL.revokeObjectURL(it.outputPreviewUrl);
            return {
              ...it,
              status: 'done',
              outputBlob: blob,
              outputPreviewUrl: preview,
              appliedQuality: targetQuality,
            };
          })
        );
      } catch {
        if (jobRef.current !== jobId) return;
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: 'error', error: labels.errorHeic } : it
          )
        );
      }
      processed += 1;
      if (jobRef.current === jobId) {
        setBatchDone(processed);
      }
    }

    if (jobRef.current === jobId) {
      setIsWorking(false);
      setIsLoadingEngine(false);
      if (isReapply) {
        setJustUpdated(true);
      }
    }
  };

  const addFiles = (files: File[]) => {
    const newItems: HeicItem[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      outputBlob: null,
      outputPreviewUrl: null,
      status: 'ready',
      appliedQuality: null,
    }));
    setItems((prev) => [...prev, ...newItems]);
    void processBatch(newItems, quality, false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.outputPreviewUrl) URL.revokeObjectURL(target.outputPreviewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    jobRef.current += 1;
    items.forEach((it) => {
      if (it.outputPreviewUrl) URL.revokeObjectURL(it.outputPreviewUrl);
    });
    setItems([]);
    setBatchDone(0);
    setBatchTotal(0);
    setIsWorking(false);
    setIsLoadingEngine(false);
    setJustUpdated(false);
  };

  const completed = items.filter((it) => it.status === 'done' && it.outputBlob);
  const overallPercent = batchTotal > 0 ? Math.round((batchDone / batchTotal) * 100) : 0;
  const hasPendingChanges = Boolean(
    items.length > 0 &&
      !isWorking &&
      items.some((it) => it.status === 'done' && it.appliedQuality !== quality)
  );

  return (
    <div class="space-y-6">
      {items.length === 0 ? (
        <Dropzone
          accept=".heic,.heif,image/heic,image/heif"
          multiple
          formatsLabel="HEIC, HEIF (iPhone / iOS) → JPG"
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
                accept=".heic,.heif,image/heic,image/heif"
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

          {isWorking &&
            (isLoadingEngine ? (
              <EngineLoader label={labels.loadingEngine} />
            ) : (
              <ProgressBar
                label={`${labels.convertingFile} (${batchDone}/${batchTotal})`}
                percent={Math.max(10, overallPercent)}
              />
            ))}

          <ul class="space-y-3">
            {items.map((item) => {
              const outName = `${stripExtension(item.file.name)}.jpg`;
              const isStale = item.status === 'done' && item.appliedQuality !== quality;
              return (
                <li
                  key={item.id}
                  class={`flex flex-col gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-3.5 transition-opacity sm:flex-row sm:items-center dark:border-[#526D82]/60 dark:bg-[#121A26] ${
                    isStale ? 'opacity-75' : ''
                  }`}
                >
                  {item.outputPreviewUrl ? (
                    <img
                      src={item.outputPreviewUrl}
                      alt={outName}
                      width={56}
                      height={56}
                      class="h-14 w-14 shrink-0 rounded-lg border border-[#9DB2BF]/40 object-cover"
                    />
                  ) : (
                    <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#DDE6ED] text-xs font-bold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                      HEIC
                    </div>
                  )}
                  <div class="min-w-0 flex-1 space-y-1">
                    <div class="flex min-w-0 items-center gap-2">
                      <p title={item.file.name} class="min-w-0 truncate text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                        {item.file.name}
                      </p>
                      {item.appliedQuality !== null && (
                        <span class="shrink-0 rounded bg-[#DDE6ED] px-1.5 py-0.5 text-[10px] font-bold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
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
                        {item.error || labels.errorHeic}
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
                  'omecy-heic-to-jpg.zip'
                )
              }
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
            >
              {labels.downloadAllZip}
            </button>
          )}

          {/* Collapsible Quality Slider */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={`${labels.quality} ${quality}%`}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="space-y-2 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
              <div class="flex items-center justify-between text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                <label for="heic-quality">{labels.quality}</label>
                <span class="tabular-nums">{quality}%</span>
              </div>
              <input
                id="heic-quality"
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
              actionLabel={`${labels.convert} → JPG (${quality}%)`}
              disabled={isWorking}
              onApply={() => void processBatch(items, quality, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
