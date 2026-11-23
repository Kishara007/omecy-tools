import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { formatBytes, getExtension, scrollToElement, stripExtension, triggerDownload } from '../../lib/format';
import { ApplyBanner, UpdatedNotice } from './common/ApplyBanner';
import Dropzone from './common/Dropzone';
import EngineLoader from './common/EngineLoader';
import ProgressBar from './common/ProgressBar';
import SettingsDrawer from './common/SettingsDrawer';
import SizeBadge from './common/SizeBadge';

interface Props {
  labels: ToolUiLabels;
}

const BITRATES = [128, 192, 256, 320] as const;

export default function VideoToMp3({ labels }: Props) {
  const jobRef = useRef(0);
  const outputCardRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [bitrate, setBitrate] = useState<number>(192);
  const [appliedBitrate, setAppliedBitrate] = useState<number | null>(null);
  const [stage, setStage] = useState<'idle' | 'engine' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [justUpdated, setJustUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  const runExtraction = async (targetFile: File, targetBitrate: number, isReapply: boolean) => {
    const jobId = ++jobRef.current;
    setError(null);
    setJustUpdated(false);
    setStage('engine');
    setProgress(5);
    const scrolledOnStart = isReapply && Boolean(outputCardRef.current);
    if (scrolledOnStart) scrollToElement(outputCardRef.current);

    try {
      const { runFFmpegJob } = await import('../../lib/ffmpeg');
      const ext = getExtension(targetFile.name, 'mp4');
      const inputName = `input.${ext}`;
      const outputName = 'output.mp3';

      const blob = await runFFmpegJob({
        inputFile: targetFile,
        inputName,
        outputName,
        args: ['-i', inputName, '-vn', '-c:a', 'libmp3lame', '-b:a', `${targetBitrate}k`, '-ar', '44100', outputName],
        outputMime: 'audio/mpeg',
        onEngineProgress: (p) => {
          if (jobRef.current !== jobId) return;
          setStage('engine');
          setProgress(p);
        },
        onProcessProgress: (p) => {
          if (jobRef.current !== jobId) return;
          setStage('processing');
          setProgress(p);
        },
      });

      if (jobRef.current !== jobId) return;
      const url = URL.createObjectURL(blob);
      setOutputUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setOutputBlob(blob);
      setAppliedBitrate(targetBitrate);
      setStage('done');
      setJustUpdated(isReapply);
      if (isReapply && !scrolledOnStart) scrollToElement(outputCardRef.current);
    } catch (err) {
      if (jobRef.current !== jobId) return;
      setError(err instanceof Error ? err.message : labels.errorGeneric);
      setStage(outputBlob ? 'done' : 'idle');
    }
  };

  const handleSelect = (files: File[]) => {
    const picked = files[0];
    if (!picked) return;
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOutputBlob(null);
    setAppliedBitrate(null);
    setJustUpdated(false);
    setFile(picked);
    void runExtraction(picked, bitrate, false);
  };

  const handleClear = () => {
    jobRef.current += 1;
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOutputBlob(null);
    setAppliedBitrate(null);
    setJustUpdated(false);
    setFile(null);
    setStage('idle');
    setProgress(0);
    setError(null);
  };

  const isBusy = stage === 'engine' || stage === 'processing';
  const hasPendingChanges = Boolean(file && appliedBitrate !== null && bitrate !== appliedBitrate && !isBusy);
  const outFilename = file ? `${stripExtension(file.name)}.mp3` : 'audio.mp3';

  return (
    <div class="space-y-6">
      {!file ? (
        <Dropzone
          accept="video/*,.mp4,.mov,.webm,.mkv,.avi,.m4v"
          formatsLabel="MP4, MOV, WebM, MKV, AVI → MP3"
          labels={labels}
          onFilesSelected={handleSelect}
        />
      ) : (
        <div class="panel-enter space-y-5">
          {/* Selected file bar */}
          <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
            <div class="min-w-0 flex-1">
              <p class="truncate text-base font-semibold text-[#27374D] dark:text-[#DDE6ED]">{file.name}</p>
              <p class="text-xs font-medium text-[#526D82] dark:text-[#9DB2BF]">{formatBytes(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              class="rounded-lg border border-[#9DB2BF] px-3 py-1.5 text-xs font-semibold text-[#27374D] transition-colors hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
            >
              {labels.startOver}
            </button>
          </div>

          {/* Smooth orbital loader while browser engine downloads; live progress bar during processing */}
          {stage === 'engine' && <EngineLoader label={labels.loadingEngine} />}
          {stage === 'processing' && (
            <ProgressBar label={labels.processing} percent={progress} />
          )}

          {/* Error */}
          {error && (
            <div role="alert" class="space-y-3 rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              <p>{error}</p>
              {!isBusy && (
                <button
                  type="button"
                  onClick={() => void runExtraction(file, bitrate, Boolean(outputBlob))}
                  class="rounded-lg bg-[#27374D] px-4 py-2 text-xs font-bold text-white hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D]"
                >
                  {labels.extractAudio}
                </button>
              )}
            </div>
          )}

          {/* Ready Output Card (shown immediately once auto-extraction finishes) */}
          {outputBlob && outputUrl && (
            <div
              ref={outputCardRef}
              class={`panel-enter scroll-mt-20 space-y-4 rounded-2xl border p-5 transition-opacity ${
                hasPendingChanges || isBusy
                  ? 'border-[#9DB2BF]/60 bg-[#F7F9FB]/70 opacity-75 dark:border-[#526D82]/50 dark:bg-[#121A26]/70'
                  : 'border-[#526D82]/60 bg-[#F7F9FB] dark:bg-[#121A26]'
              }`}
            >
              <div class="space-y-2.5">
                <div class="flex min-w-0 flex-wrap items-center gap-2">
                  <span
                    title={outFilename}
                    class="min-w-0 max-w-full truncate text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]"
                  >
                    {labels.done}: {outFilename}
                  </span>
                  {appliedBitrate && (
                    <span class="shrink-0 rounded-md bg-[#DDE6ED] px-2 py-0.5 text-[11px] font-bold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                      {appliedBitrate} kbps
                    </span>
                  )}
                  {justUpdated && !hasPendingChanges && !isBusy && (
                    <UpdatedNotice text={labels.changesApplied} />
                  )}
                </div>
                <SizeBadge originalBytes={file.size} newBytes={outputBlob.size} labels={labels} />
              </div>

              <audio controls src={outputUrl} class="w-full" />

              <button
                type="button"
                disabled={isBusy}
                onClick={() => triggerDownload(outputBlob, outFilename)}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:opacity-50 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {labels.download} MP3
              </button>
            </div>
          )}

          {/* Collapsible Bitrate Settings */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={`${bitrate} kbps`}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="space-y-2.5">
              <label class="block text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {labels.bitrate}
              </label>
              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {BITRATES.map((rate) => {
                  const active = bitrate === rate;
                  return (
                    <button
                      key={rate}
                      type="button"
                      disabled={isBusy}
                      onClick={() => {
                        setBitrate(rate);
                        if (rate !== appliedBitrate) setJustUpdated(false);
                      }}
                      class={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        active
                          ? 'border-[#27374D] bg-[#27374D] text-white shadow-sm dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                          : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED]/60 dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                      }`}
                    >
                      {rate} kbps
                    </button>
                  );
                })}
              </div>
            </div>
          </SettingsDrawer>

          {/* Highlighted Apply Banner when user changes bitrate */}
          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              actionLabel={`${labels.applyChanges} (${bitrate} kbps)`}
              disabled={isBusy}
              onApply={() => void runExtraction(file, bitrate, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
