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

type CompressPreset = 'whatsapp' | 'discord' | 'email' | 'web' | 'custom';
type ScaleOption = 'original' | '1080' | '720' | '480';

interface AppliedConfig {
  preset: CompressPreset;
  crf: number;
  scale: ScaleOption;
}

const PRESET_SETTINGS: Record<Exclude<CompressPreset, 'custom'>, { crf: number; scale: ScaleOption; audio: string }> = {
  whatsapp: { crf: 30, scale: '720', audio: '96k' },
  discord: { crf: 32, scale: '720', audio: '96k' },
  email: { crf: 34, scale: '480', audio: '96k' },
  web: { crf: 26, scale: '1080', audio: '128k' },
};

export default function VideoCompressor({ labels }: Props) {
  const jobRef = useRef(0);
  const outputCardRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<CompressPreset>('web');
  const [crf, setCrf] = useState<number>(26);
  const [scale, setScale] = useState<ScaleOption>('1080');
  const [appliedConfig, setAppliedConfig] = useState<AppliedConfig | null>(null);
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

  const runCompression = async (targetFile: File, cfg: AppliedConfig, isReapply: boolean) => {
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
      const outputName = 'compressed.mp4';
      const audioBitrate = cfg.preset === 'custom' ? '128k' : PRESET_SETTINGS[cfg.preset].audio;

      const args = ['-i', inputName];
      if (cfg.scale !== 'original') {
        args.push('-vf', `scale=-2:min(${cfg.scale}\\,ih)`);
      }
      args.push(
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-crf',
        String(cfg.crf),
        '-pix_fmt',
        'yuv420p',
        '-c:a',
        'aac',
        '-b:a',
        audioBitrate,
        '-movflags',
        '+faststart',
        outputName
      );

      const blob = await runFFmpegJob({
        inputFile: targetFile,
        inputName,
        outputName,
        args,
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
      setAppliedConfig(cfg);
      setStage('done');
      setJustUpdated(isReapply);
      if (isReapply && !scrolledOnStart) scrollToElement(outputCardRef.current);
    } catch (err) {
      if (jobRef.current !== jobId) return;
      setError(err instanceof Error ? err.message : labels.errorGeneric);
      setStage(outputBlob ? 'done' : 'idle');
    }
  };

  const applyPreset = (p: CompressPreset) => {
    setPreset(p);
    setJustUpdated(false);
    if (p !== 'custom') {
      setCrf(PRESET_SETTINGS[p].crf);
      setScale(PRESET_SETTINGS[p].scale);
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
    setAppliedConfig(null);
    setJustUpdated(false);
    setFile(picked);
    void runCompression(picked, { preset, crf, scale }, false);
  };

  const handleClear = () => {
    jobRef.current += 1;
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOutputBlob(null);
    setAppliedConfig(null);
    setJustUpdated(false);
    setFile(null);
    setStage('idle');
    setProgress(0);
    setError(null);
  };

  const isBusy = stage === 'engine' || stage === 'processing';
  const hasPendingChanges = Boolean(
    file &&
      appliedConfig &&
      !isBusy &&
      (appliedConfig.crf !== crf || appliedConfig.scale !== scale || appliedConfig.preset !== preset)
  );
  const outFilename = file ? `${stripExtension(file.name)}-compressed.mp4` : 'compressed.mp4';
  const presetList: Array<{ id: CompressPreset; label: string }> = [
    { id: 'whatsapp', label: labels.presetWhatsapp },
    { id: 'discord', label: labels.presetDiscord },
    { id: 'email', label: labels.presetEmail },
    { id: 'web', label: labels.presetWeb },
    { id: 'custom', label: labels.presetCustom },
  ];

  const qualityDisplay = Math.round(((40 - crf) / (40 - 18)) * 80 + 20);

  return (
    <div class="space-y-6">
      {!file ? (
        <Dropzone
          accept="video/*,.mp4,.mov,.webm,.mkv,.avi"
          formatsLabel="MP4, MOV, WebM, MKV → MP4"
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
                  onClick={() => void runCompression(file, { preset, crf, scale }, Boolean(outputBlob))}
                  class="rounded-lg bg-[#27374D] px-4 py-2 text-xs font-bold text-white hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D]"
                >
                  {labels.compress}
                </button>
              )}
            </div>
          )}

          {/* Ready Compressed Video Card */}
          {outputBlob && outputUrl && (
            <div
              ref={outputCardRef}
              class={`panel-enter scroll-mt-20 space-y-4 rounded-2xl border p-5 transition-opacity ${
                hasPendingChanges || isBusy
                  ? 'border-[#9DB2BF]/60 bg-[#F7F9FB]/70 opacity-75 dark:border-[#526D82]/50 dark:bg-[#121A26]/70'
                  : 'border-[#526D82]/60 bg-[#F7F9FB] dark:bg-[#121A26]'
              }`}
            >
              <div class="flex flex-wrap items-center justify-between gap-2.5">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]">{labels.done}</span>
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

          {/* Collapsible Presets, Quality & Resolution */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={`${presetList.find((p) => p.id === preset)?.label ?? labels.presetWeb} • ${
              scale === 'original' ? labels.original : `${scale}p`
            }`}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="space-y-2.5">
              <label class="block text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                {labels.preset}
              </label>
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {presetList.map((item) => {
                  const active = preset === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isBusy}
                      onClick={() => applyPreset(item.id)}
                      class={`rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                        active
                          ? 'border-[#27374D] bg-[#27374D] text-white dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                          : 'border-[#9DB2BF]/70 bg-white text-[#27374D] hover:bg-[#DDE6ED]/60 dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                <div class="flex items-center justify-between text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  <label for="video-crf-slider">{labels.quality}</label>
                  <span class="tabular-nums">{qualityDisplay}% (CRF {crf})</span>
                </div>
                <input
                  id="video-crf-slider"
                  type="range"
                  min={18}
                  max={40}
                  value={crf}
                  disabled={isBusy}
                  onInput={(e) => {
                    setPreset('custom');
                    setJustUpdated(false);
                    setCrf(Number((e.currentTarget as HTMLInputElement).value));
                  }}
                  class="omecy-slider"
                />
              </div>

              <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                <label for="video-res-select" class="block text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  {labels.resolution}
                </label>
                <select
                  id="video-res-select"
                  value={scale}
                  disabled={isBusy}
                  onChange={(e) => {
                    setPreset('custom');
                    setJustUpdated(false);
                    setScale((e.currentTarget as HTMLSelectElement).value as ScaleOption);
                  }}
                  class="w-full rounded-lg border border-[#9DB2BF] bg-white px-3 py-2 text-sm font-medium text-[#27374D] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED]"
                >
                  <option value="original">{labels.original}</option>
                  <option value="1080">1080p HD</option>
                  <option value="720">720p HD</option>
                  <option value="480">480p SD</option>
                </select>
              </div>
            </div>
          </SettingsDrawer>

          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              actionLabel={labels.compress}
              disabled={isBusy}
              onApply={() => void runCompression(file, { preset, crf, scale }, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
