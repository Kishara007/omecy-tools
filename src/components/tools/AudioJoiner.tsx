import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import {
  decodeAudioFile,
  encodeAudioBufferToMp3,
  encodeAudioBufferToWav,
  extractWaveformPeaks,
  mergeAudioBuffers,
} from '../../lib/audio-engine';
import { formatBytes, formatTime, scrollToElement, triggerDownload } from '../../lib/format';
import AddMoreButton from './common/AddMoreButton';
import { ApplyBanner, UpdatedNotice } from './common/ApplyBanner';
import Dropzone from './common/Dropzone';
import ProgressBar from './common/ProgressBar';
import SettingsDrawer from './common/SettingsDrawer';

interface Props {
  labels: ToolUiLabels;
}

interface TrackItem {
  id: string;
  file: File;
  buffer: AudioBuffer;
  peaks: number[];
  duration: number;
}

function buildSignature(
  list: TrackItem[],
  crossfade: number,
  format: 'mp3' | 'wav',
  bitrate: number
): string {
  return `${list.map((t) => t.id).join('|')}::${crossfade}::${format}::${format === 'mp3' ? bitrate : 'wav'}`;
}

export default function AudioJoiner({ labels }: Props) {
  const jobRef = useRef(0);
  const outputCardRef = useRef<HTMLDivElement>(null);

  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const [crossfade, setCrossfade] = useState(0);
  const [outputFormat, setOutputFormat] = useState<'mp3' | 'wav'>('mp3');
  const [bitrate, setBitrate] = useState(192);
  const [appliedSig, setAppliedSig] = useState<string | null>(null);
  const [appliedFormat, setAppliedFormat] = useState<'mp3' | 'wav'>('mp3');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
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

  const runMerge = async (
    targetTracks: TrackItem[],
    targetCrossfade: number,
    targetFormat: 'mp3' | 'wav',
    targetBitrate: number,
    isReapply: boolean
  ) => {
    if (targetTracks.length < 2) return;
    const jobId = ++jobRef.current;
    setError(null);
    setJustUpdated(false);
    setIsMerging(true);
    setProgress(15);
    const scrolledOnStart = isReapply && Boolean(outputCardRef.current);
    if (scrolledOnStart) scrollToElement(outputCardRef.current);

    try {
      const merged = await mergeAudioBuffers(
        targetTracks.map((t) => t.buffer),
        targetCrossfade
      );
      if (jobRef.current !== jobId) return;
      setProgress(40);

      let blob: Blob;
      if (targetFormat === 'wav') {
        blob = encodeAudioBufferToWav(merged);
        setProgress(100);
      } else {
        blob = await encodeAudioBufferToMp3(merged, targetBitrate, (p) => {
          if (jobRef.current !== jobId) return;
          setProgress(Math.round(40 + p * 0.6));
        });
      }

      if (jobRef.current !== jobId) return;
      const url = URL.createObjectURL(blob);
      setOutputUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setOutputBlob(blob);
      setAppliedFormat(targetFormat);
      setAppliedSig(buildSignature(targetTracks, targetCrossfade, targetFormat, targetBitrate));
      setJustUpdated(isReapply);
      if (isReapply && !scrolledOnStart) scrollToElement(outputCardRef.current);
    } catch (err) {
      if (jobRef.current !== jobId) return;
      setError(err instanceof Error ? err.message : labels.errorGeneric);
    } finally {
      if (jobRef.current === jobId) {
        setIsMerging(false);
      }
    }
  };

  const handleAddFiles = async (files: File[]) => {
    setError(null);
    setIsLoadingFiles(true);
    try {
      const decodedTracks: TrackItem[] = [];
      for (const file of files) {
        const buffer = await decodeAudioFile(file);
        decodedTracks.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          buffer,
          peaks: extractWaveformPeaks(buffer, 64),
          duration: buffer.duration,
        });
      }
      const nextTracks = [...tracks, ...decodedTracks];
      const hadOutput = Boolean(outputBlob);
      setTracks(nextTracks);

      if (nextTracks.length >= 2) {
        void runMerge(nextTracks, crossfade, outputFormat, bitrate, hadOutput);
      }
    } catch {
      setError(labels.errorUnsupported);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const moveTrack = (from: number, to: number) => {
    if (to < 0 || to >= tracks.length || from === to) return;
    setJustUpdated(false);
    setTracks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const removeTrack = (id: string) => {
    const nextTracks = tracks.filter((t) => t.id !== id);
    setJustUpdated(false);
    setTracks(nextTracks);
    if (nextTracks.length < 2) {
      jobRef.current += 1;
      setOutputUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setOutputBlob(null);
      setAppliedSig(null);
    }
  };

  const handleClearAll = () => {
    jobRef.current += 1;
    setTracks([]);
    setOutputUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOutputBlob(null);
    setAppliedSig(null);
    setJustUpdated(false);
    setError(null);
    setIsMerging(false);
  };

  const currentSig = buildSignature(tracks, crossfade, outputFormat, bitrate);
  const hasPendingChanges = Boolean(tracks.length >= 2 && appliedSig !== null && currentSig !== appliedSig && !isMerging && !isLoadingFiles);
  const totalDuration = Math.max(
    0,
    tracks.reduce((sum, t) => sum + t.duration, 0) - Math.max(0, tracks.length - 1) * crossfade
  );
  const outFilename = `omecy-merged.${appliedFormat}`;

  return (
    <div class="space-y-6">
      {tracks.length === 0 && (
        <Dropzone
          accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac"
          multiple
          formatsLabel="MP3, WAV, M4A, OGG → MP3 / WAV"
          labels={labels}
          onFilesSelected={handleAddFiles}
        />
      )}

      {isLoadingFiles && <ProgressBar label={labels.decodingAudio} percent={50} />}

      {tracks.length > 0 && (
        <div class="panel-enter space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
              {tracks.length} {labels.fileCount} • {formatTime(totalDuration)}
            </span>
            <div class="flex items-center gap-2">
              <AddMoreButton
                accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac"
                labels={labels}
                disabled={isLoadingFiles || isMerging}
                onFilesSelected={handleAddFiles}
              />
              <button
                type="button"
                onClick={handleClearAll}
                class="rounded-lg border border-[#9DB2BF] px-3 py-1.5 text-xs font-semibold text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
              >
                {labels.clearAll}
              </button>
            </div>
          </div>

          {tracks.length === 1 && !isLoadingFiles && (
            <p class="rounded-xl border border-[#9DB2BF]/60 bg-[#DDE6ED]/40 px-4 py-3 text-xs sm:text-sm font-medium text-[#27374D] dark:border-[#526D82]/60 dark:bg-[#27374D]/50 dark:text-[#DDE6ED]">
              {labels.errorMinTwoFiles}
            </p>
          )}

          {isMerging && <ProgressBar label={labels.encodingMp3} percent={progress} />}

          {error && (
            <div role="alert" class="rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          {/* Ready Merged Audio Card */}
          {outputBlob && outputUrl && tracks.length >= 2 && (
            <div
              ref={outputCardRef}
              class={`panel-enter scroll-mt-20 space-y-4 rounded-2xl border p-5 transition-opacity ${
                hasPendingChanges || isMerging
                  ? 'border-[#9DB2BF]/60 bg-[#F7F9FB]/70 opacity-75 dark:border-[#526D82]/50 dark:bg-[#121A26]/70'
                  : 'border-[#526D82]/60 bg-[#F7F9FB] dark:bg-[#121A26]'
              }`}
            >
              <div class="flex min-w-0 flex-wrap items-center justify-between gap-2 text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]">
                <div class="flex min-w-0 max-w-full flex-wrap items-center gap-2">
                  <span title={outFilename} class="min-w-0 max-w-full truncate">
                    {labels.done}: {outFilename}
                  </span>
                  {justUpdated && !hasPendingChanges && !isMerging && (
                    <UpdatedNotice text={labels.changesApplied} />
                  )}
                </div>
                <span class="shrink-0 tabular-nums text-xs font-medium text-[#526D82] dark:text-[#9DB2BF]">
                  {formatBytes(outputBlob.size)}
                </span>
              </div>
              <audio controls src={outputUrl} class="w-full" />
              <button
                type="button"
                disabled={isMerging}
                onClick={() => triggerDownload(outputBlob, outFilename)}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:opacity-50 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {labels.download} {appliedFormat.toUpperCase()}
              </button>
            </div>
          )}

          {/* Track List (drag & button reorder) */}
          <ul class="space-y-2.5">
            {tracks.map((track, idx) => (
              <li
                key={track.id}
                draggable
                onDragStart={() => setDragIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null) moveTrack(dragIndex, idx);
                  setDragIndex(null);
                }}
                class="flex flex-col gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-3.5 transition-shadow hover:shadow-sm sm:flex-row sm:items-center dark:border-[#526D82]/60 dark:bg-[#121A26]"
              >
                <div class="flex min-w-0 flex-1 items-center gap-3">
                  <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#DDE6ED] text-xs font-bold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
                    {idx + 1}
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                      {track.file.name}
                    </p>
                    <p class="text-xs text-[#526D82] dark:text-[#9DB2BF]">
                      {formatTime(track.duration)} • {formatBytes(track.file.size)}
                    </p>
                  </div>
                </div>

                <div class="flex h-8 flex-1 items-center gap-[2px] overflow-hidden px-1" aria-hidden="true">
                  {track.peaks.map((peak, pIdx) => (
                    <span
                      key={pIdx}
                      class="w-full rounded-full bg-[#526D82] dark:bg-[#9DB2BF]"
                      style={{ height: `${Math.round(peak * 100)}%` }}
                    />
                  ))}
                </div>

                <div class="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    aria-label={labels.moveUp}
                    title={labels.moveUp}
                    disabled={idx === 0 || isMerging}
                    onClick={() => moveTrack(idx, idx - 1)}
                    class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#27374D] hover:bg-[#DDE6ED] disabled:opacity-35 dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={labels.moveDown}
                    title={labels.moveDown}
                    disabled={idx === tracks.length - 1 || isMerging}
                    onClick={() => moveTrack(idx, idx + 1)}
                    class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#27374D] hover:bg-[#DDE6ED] disabled:opacity-35 dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={labels.remove}
                    title={labels.remove}
                    disabled={isMerging}
                    onClick={() => removeTrack(track.id)}
                    class="rounded-lg border border-[#9DB2BF]/70 p-1.5 text-[#526D82] hover:bg-red-50 hover:text-red-700 disabled:opacity-35 dark:border-[#526D82] dark:text-[#9DB2BF] dark:hover:bg-red-950/40 dark:hover:text-red-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Collapsible Audio Join Settings */}
          <SettingsDrawer
            label={labels.moreSettings}
            summary={`${outputFormat.toUpperCase()}${outputFormat === 'mp3' ? ` • ${bitrate} kbps` : ''}${
              crossfade > 0 ? ` • ${crossfade.toFixed(1)}${labels.seconds}` : ''
            }`}
            hasPendingChanges={hasPendingChanges}
          >
            <div class="grid gap-4 sm:grid-cols-3">
              <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                <div class="flex items-center justify-between text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  <label for="crossfade-slider">{labels.crossfade}</label>
                  <span class="tabular-nums">{crossfade.toFixed(1)} {labels.seconds}</span>
                </div>
                <input
                  id="crossfade-slider"
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={crossfade}
                  disabled={isMerging}
                  onInput={(e) => {
                    setJustUpdated(false);
                    setCrossfade(Number((e.currentTarget as HTMLInputElement).value));
                  }}
                  class="omecy-slider"
                />
              </div>

              <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                <label for="join-format" class="block text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                  {labels.format}
                </label>
                <select
                  id="join-format"
                  value={outputFormat}
                  disabled={isMerging}
                  onChange={(e) => {
                    setJustUpdated(false);
                    setOutputFormat((e.currentTarget as HTMLSelectElement).value as 'mp3' | 'wav');
                  }}
                  class="w-full rounded-lg border border-[#9DB2BF] bg-white px-3 py-1.5 text-sm font-medium text-[#27374D] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED]"
                >
                  <option value="mp3">MP3</option>
                  <option value="wav">WAV (Lossless)</option>
                </select>
              </div>

              {outputFormat === 'mp3' && (
                <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-4 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                  <label for="join-bitrate" class="block text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                    {labels.bitrate}
                  </label>
                  <select
                    id="join-bitrate"
                    value={bitrate}
                    disabled={isMerging}
                    onChange={(e) => {
                      setJustUpdated(false);
                      setBitrate(Number((e.currentTarget as HTMLSelectElement).value));
                    }}
                    class="w-full rounded-lg border border-[#9DB2BF] bg-white px-3 py-1.5 text-sm font-medium text-[#27374D] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED]"
                  >
                    <option value={128}>128 kbps</option>
                    <option value={192}>192 kbps</option>
                    <option value={256}>256 kbps</option>
                    <option value={320}>320 kbps</option>
                  </select>
                </div>
              )}
            </div>
          </SettingsDrawer>

          {hasPendingChanges && (
            <ApplyBanner
              labels={labels}
              actionLabel={labels.merge}
              disabled={isMerging}
              onApply={() => void runMerge(tracks, crossfade, outputFormat, bitrate, true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
