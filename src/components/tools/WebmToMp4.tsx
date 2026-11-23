import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { formatBytes, scrollToElement, stripExtension, triggerDownload } from '../../lib/format';
import { ApplyBanner, UpdatedNotice } from './common/ApplyBanner';
import Dropzone from './common/Dropzone';
import EngineLoader from './common/EngineLoader';
import ProgressBar from './common/ProgressBar';
import SettingsDrawer from './common/SettingsDrawer';
import SizeBadge from './common/SizeBadge';

interface Props {
  labels: ToolUiLabels;
}

type QualityPreset = 'fast' | 'balanced' | 'high';

const PRESET_MAP: Record<QualityPreset, { crf: string; preset: string; audio: string }> = {
  fast: { crf: '28', preset: 'ultrafast', audio: '128k' },
  balanced: { crf: '23', preset: 'veryfast', audio: '160k' },
  high: { crf: '18', preset: 'fast', audio: '192k' },
};

export default function WebmToMp4({ labels }: Props) {
  const jobRef = useRef(0);
  const outputCardRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<QualityPreset>('balanced');
  const [appliedPreset, setAppliedPreset] = useState<QualityPreset | null>(null);
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

  const runConversion = async (targetFile: File, targetPreset: QualityPreset, isReapply: boolean) => {
    const jobId = ++jobRef.current;
    setError(null);
    setJustUpdated(false);
    setStage('engine');
    setProgress(5);
    const scrolledOnStart = isReapply && Boolean(outputCardRef.current);
    if (scrolledOnStart) scrollToElement(outputCardRef.current);

    try {
      const { runFFmpegJob } = await import('../../lib/ffmpeg');
      const cfg = PRESET_MAP[targetPreset];
      const inputName = 'input.webm';
      const outputName = 'output.mp4';

      const blob = await runFFmpegJob({
        inputFile: targetFile,
        inputName,
        outputName,
        args: [
          '-i',
          inputName,
          '-c:v',
          'libx264',
          '-preset',
          cfg.preset,
          '-crf',
          cfg.crf,
          '-pix_fmt',
          'yuv420p',
          '-c:a',
          'aac',
          '-b:a',
          cfg.audio,
          '-movflags',
          '+faststart',
          outputName,
        ],
        outputMime: 'video/mp4',
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
      setAppliedPreset(targetPreset);
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
    setAppliedPreset(null);
    setJustUpdated(false);
    setFile(picked);
    void runConversion(picked, preset, false);
  };

  const handleClear = () => {
    jobRef.current += 1;
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOutputBlob(null);
    setAppliedPreset(null);
    setJustUpdated(false);
    setFile(null);
    setStage('idle');
    setProgress(0);
    setError(null);
  };

  const isBusy = stage === 'engine' || stage === 'processing';
  const hasPendingChanges = Boolean(file && appliedPreset !== null && preset !== appliedPreset && !isBusy);
  const outFilename = file ? `${stripExtension(file.name)}.mp4` : 'video.mp4';
  const presetOptions: Array<{ id: QualityPreset; label: string }> = [
    { id: 'fast', label: labels.presetFast },
    { id: 'balanced', label: labels.presetBalanced },
    { id: 'high', label: labels.presetHigh },
  ];
  const appliedLabel = presetOptions.find((o) => o.id === appliedPreset)?.label;

  return (
    <div class="space-y-6">
      {!file ? (
        <Dropzone
          accept="video/webm,.webm,video/*"
          formatsLabel="WebM → MP4 (H.264 + AAC)"
          labels={labels}
          onFilesSelected={handleSelect}
        />
      ) : (
        <div class="panel-enter space-y-5">
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

          {stage === 'engine' && <EngineLoader label={labels.loadingEngine} />}
          {stage === 'processing' && (
            <ProgressBar label={labels.processing} percent={progress} />
          )}

          {error && (
            <div role="alert" class="space-y-3 rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              <p>{error}</p>
              {!isBusy && (
                <button
                  type="button"
                  onClick={() => void runConversion(file, preset, Boolean(outputBlob))}
                  class="rounded-lg bg-[#27374D] px-4 py-2 text-xs font-bold text-white hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D]"
                >
                  {labels.convert} → MP4
                </button>
              )}
            </div>
          )}

          {/* Ready MP4 Output Card */}
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
                  {appliedLabel && (
                    <span class="shrink-0 rounded-md bg-[#DDE6ED] px-2 py-0.5 text-[11px] font-bold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                      {appliedLabel}
                    </span>
                  )}
                  {justUpdated && !hasPendingChanges && !isBusy && (
                    <UpdatedNotice text={labels.changesApplied} />
                  )}
                </div>
                <SizeBadge originalBytes={file.size} newBytes={outputBlob.size} labels={labels} />
              </div>

              <video controls src={outputUrl} class="max-h-72 w-full rounded-xl bg-black" />

              <button
                type="button"
                disabled={isBusy}
                onClick={() => triggerDownload(outputBlob, outFilename)}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:opacity-50 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {labels.download} MP4
              </button>
            </div>
          )}

          {/* Collapsible Quality Preset Selector */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={presetOptions.find((o) => o.id === preset)?.label ?? labels.presetBalanced}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="space-y-2.5">
              <label class="block text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {labels.preset}
              </label>
              <div class="grid grid-cols-3 gap-2.5">
                {presetOptions.map((opt) => {
                  const active = preset === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isBusy}
                      onClick={() => {
                        setPreset(opt.id);
                        if (opt.id !== appliedPreset) setJustUpdated(false);
                      }}
                      class={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        active
                          ? 'border-[#27374D] bg-[#27374D] text-white shadow-sm dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                          : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED]/60 dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </SettingsDrawer>

          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              actionLabel={`${labels.convert} → MP4`}
              disabled={isBusy}
              onApply={() => void runConversion(file, preset, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
