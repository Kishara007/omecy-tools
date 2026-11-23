import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { convertAudioFileToMp3 } from '../../lib/audio-engine';
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

interface ConvertedItem {
  id: string;
  file: File;
  outputBlob: Blob | null;
  outputUrl: string | null;
  status: 'ready' | 'working' | 'done' | 'error';
  progress: number;
  appliedBitrate: number | null;
  error?: string;
}

const BITRATES = [128, 192, 256, 320] as const;

export default function WavToMp3({ labels }: Props) {
  const jobRef = useRef(0);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<ConvertedItem[]>([]);

  const [items, setItems] = useState<ConvertedItem[]>([]);
  const [bitrate, setBitrate] = useState<number>(192);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stageLabel, setStageLabel] = useState('');
  const [justUpdated, setJustUpdated] = useState(false);

  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
      });
    };
  }, []);

  const processBatch = async (
    targetItems: ConvertedItem[],
    targetBitrate: number,
    isReapply: boolean
  ) => {
    if (targetItems.length === 0) return;
    const jobId = ++jobRef.current;
    setIsProcessing(true);
    setJustUpdated(false);
    if (isReapply) scrollToElement(outputSectionRef.current, 'start');

    for (const item of targetItems) {
      if (jobRef.current !== jobId) return;
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'working', progress: 5, error: undefined } : it))
      );

      try {
        const blob = await convertAudioFileToMp3({
          file: item.file,
          bitrate: targetBitrate,
          onStage: (st) => {
            if (jobRef.current !== jobId) return;
            if (st === 'decode') setStageLabel(labels.decodingAudio);
            else if (st === 'engine') setStageLabel(labels.loadingEngine);
            else setStageLabel(labels.encodingMp3);
          },
          onProgress: (p) => {
            if (jobRef.current !== jobId) return;
            setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, progress: p } : it)));
          },
        });

        if (jobRef.current !== jobId) return;
        const url = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((it) => {
            if (it.id !== item.id) return it;
            if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
            return {
              ...it,
              status: 'done',
              progress: 100,
              outputBlob: blob,
              outputUrl: url,
              appliedBitrate: targetBitrate,
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
      setIsProcessing(false);
      if (isReapply) {
        setJustUpdated(true);
      }
    }
  };

  const addFiles = (files: File[]) => {
    const newItems: ConvertedItem[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file,
      outputBlob: null,
      outputUrl: null,
      status: 'ready',
      progress: 0,
      appliedBitrate: null,
    }));
    setItems((prev) => [...prev, ...newItems]);
    void processBatch(newItems, bitrate, false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.outputUrl) URL.revokeObjectURL(target.outputUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    jobRef.current += 1;
    items.forEach((it) => {
      if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
    });
    setItems([]);
    setIsProcessing(false);
    setJustUpdated(false);
  };

  const completed = items.filter((it) => it.status === 'done' && it.outputBlob);
  const hasPendingChanges = Boolean(
    items.length > 0 &&
      !isProcessing &&
      items.some((it) => it.status === 'done' && it.appliedBitrate !== bitrate)
  );

  return (
    <div class="space-y-6">
      {items.length === 0 ? (
        <Dropzone
          accept="audio/wav,audio/x-wav,.wav"
          multiple
          formatsLabel="WAV → MP3 (128–320 kbps)"
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
              {justUpdated && !hasPendingChanges && !isProcessing && (
                <UpdatedNotice text={labels.changesApplied} />
              )}
            </div>
            <div class="flex items-center gap-2">
              <AddMoreButton
                accept="audio/wav,audio/x-wav,.wav"
                labels={labels}
                disabled={isProcessing}
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
              const outName = `${stripExtension(item.file.name)}.mp3`;
              const isStale = item.status === 'done' && item.appliedBitrate !== bitrate;
              return (
                <li
                  key={item.id}
                  class={`space-y-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 transition-opacity dark:border-[#526D82]/60 dark:bg-[#121A26] ${
                    isStale ? 'opacity-75' : ''
                  }`}
                >
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <div class="flex min-w-0 items-center gap-2">
                        <p title={item.file.name} class="min-w-0 truncate text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                          {item.file.name}
                        </p>
                        {item.appliedBitrate && (
                          <span class="shrink-0 rounded bg-[#DDE6ED] px-1.5 py-0.5 text-[10px] font-bold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                            {item.appliedBitrate} kbps
                          </span>
                        )}
                      </div>
                      <p class="text-xs text-[#526D82] dark:text-[#9DB2BF]">{formatBytes(item.file.size)}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      {item.status === 'done' && item.outputBlob && (
                        <button
                          type="button"
                          onClick={() => triggerDownload(item.outputBlob!, outName)}
                          class="rounded-lg bg-[#27374D] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
                        >
                          {labels.download} MP3
                        </button>
                      )}
                      <button
                        type="button"
                        aria-label={labels.remove}
                        disabled={isProcessing}
                        onClick={() => removeItem(item.id)}
                        class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#526D82] hover:text-red-600 disabled:opacity-35 dark:border-[#526D82] dark:text-[#9DB2BF]"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {item.status === 'working' &&
                    (stageLabel === labels.loadingEngine ? (
                      <EngineLoader compact label={labels.loadingEngine} />
                    ) : (
                      <ProgressBar label={stageLabel || labels.encodingMp3} percent={item.progress} />
                    ))}

                  {item.status === 'done' && item.outputBlob && item.outputUrl && (
                    <div class="space-y-2.5 pt-1">
                      <SizeBadge originalBytes={item.file.size} newBytes={item.outputBlob.size} labels={labels} />
                      <audio controls src={item.outputUrl} class="w-full" />
                    </div>
                  )}

                  {item.status === 'error' && (
                    <p role="alert" class="text-xs font-medium text-red-700 dark:text-red-300">
                      {item.error || labels.errorGeneric}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {completed.length > 1 && !isProcessing && (
            <button
              type="button"
              onClick={() =>
                void downloadAsZip(
                  completed.map((c) => ({
                    filename: `${stripExtension(c.file.name)}.mp3`,
                    blob: c.outputBlob!,
                  })),
                  'omecy-wav-to-mp3.zip'
                )
              }
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
            >
              {labels.downloadAllZip}
            </button>
          )}

          {/* Collapsible Bitrate Selector */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={`${bitrate} kbps`}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {labels.bitrate}
              </label>
              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {BITRATES.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    disabled={isProcessing}
                    onClick={() => {
                      setBitrate(rate);
                      setJustUpdated(false);
                    }}
                    class={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                      bitrate === rate
                        ? 'border-[#27374D] bg-[#27374D] text-white dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                        : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED]/60 dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                    }`}
                  >
                    {rate} kbps
                  </button>
                ))}
              </div>
            </div>
          </SettingsDrawer>

          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              actionLabel={`${labels.applyChanges} (${bitrate} kbps)`}
              disabled={isProcessing}
              onApply={() => void processBatch(items, bitrate, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
