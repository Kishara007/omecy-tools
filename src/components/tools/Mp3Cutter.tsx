import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import {
  decodeAudioFile,
  encodeAudioBufferToMp3,
  encodeAudioBufferToWav,
  extractWaveformPeaks,
  trimAudioBuffer,
} from '../../lib/audio-engine';
import { formatBytes, formatTime, stripExtension, triggerDownload } from '../../lib/format';
import Dropzone from './common/Dropzone';
import ProgressBar from './common/ProgressBar';
import TimelineRuler, { type TimelinePlayMode } from './common/TimelineRuler';

interface Props {
  labels: ToolUiLabels;
}

interface WaveformCanvasProps {
  peaks: number[];
  widthPx: number;
}

function WaveformTrackCanvas({ peaks, widthPx }: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [themeTick, setThemeTick] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeTick((t) => t + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || peaks.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const height = canvas.clientHeight || 128;
    const width = Math.max(252, widthPx);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isDark = document.documentElement.classList.contains('dark');
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    if (isDark) {
      bgGrad.addColorStop(0, '#1B2838');
      bgGrad.addColorStop(1, '#121A26');
    } else {
      bgGrad.addColorStop(0, '#EDF2F7');
      bgGrad.addColorStop(1, '#F8FAFC');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = isDark ? 'rgba(157, 178, 191, 0.16)' : 'rgba(82, 109, 130, 0.14)';
    ctx.fillRect(0, height / 2 - 0.5, width, 1);

    const barWidth = width / peaks.length;
    const gap = Math.max(1, barWidth * 0.28);
    ctx.fillStyle = isDark ? '#9DB2BF' : '#526D82';

    for (let i = 0; i < peaks.length; i++) {
      const peak = peaks[i];
      const barH = Math.max(4, peak * (height - 18));
      const x = i * barWidth;
      const y = (height - barH) / 2;
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(1.5, barWidth - gap), barH, 2);
      ctx.fill();
    }
  }, [peaks, widthPx, themeTick]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${widthPx}px` }}
      class="block h-full"
      aria-label="Audio waveform visualization"
    />
  );
}

export default function Mp3Cutter({ labels }: Props) {
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const playbackSrcRef = useRef<AudioBufferSourceNode | null>(null);
  const outputCardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const playGenRef = useRef(0);

  const [file, setFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [peaks, setPeaks] = useState<number[]>([]);
  const [startSec, setStartSec] = useState(0);
  const [endSec, setEndSec] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playMode, setPlayMode] = useState<TimelinePlayMode>('none');
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [outputFormat, setOutputFormat] = useState<'mp3' | 'wav'>('mp3');
  const [isDecoding, setIsDecoding] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopPlayback = () => {
    playGenRef.current += 1;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    try {
      if (playbackSrcRef.current) {
        playbackSrcRef.current.onended = null;
        playbackSrcRef.current.stop();
      }
    } catch {
      // ignore already stopped
    }
    playbackSrcRef.current = null;
    if (playbackCtxRef.current) {
      void playbackCtxRef.current.close();
      playbackCtxRef.current = null;
    }
    setPlayMode('none');
  };

  useEffect(() => {
    if (outputUrl) {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() => {
        outputCardRef.current?.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'center',
        });
      });
    }
    return () => {
      stopPlayback();
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  const startAudioSegment = (
    buffer: AudioBuffer,
    fromSec: number,
    toSec: number,
    mode: Exclude<TimelinePlayMode, 'none'>,
    applyFades: boolean
  ) => {
    stopPlayback();
    const gen = ++playGenRef.current;
    const safeFrom = Math.max(0, Math.min(fromSec, Math.max(0, buffer.duration - 0.05)));
    const safeTo = Math.max(safeFrom + 0.05, Math.min(toSec, buffer.duration));
    const segmentDuration = safeTo - safeFrom;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const src = ctx.createBufferSource();

    if (applyFades && (fadeIn > 0 || fadeOut > 0)) {
      src.buffer = trimAudioBuffer(buffer, safeFrom, safeTo, fadeIn, fadeOut);
      src.connect(ctx.destination);
      src.start(0);
    } else {
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.start(0, safeFrom, segmentDuration);
    }

    const startedAt = ctx.currentTime;
    playbackCtxRef.current = ctx;
    playbackSrcRef.current = src;
    setPlayMode(mode);
    setCurrentTime(safeFrom);

    src.onended = () => {
      if (playGenRef.current !== gen) return;
      stopPlayback();
      setCurrentTime(mode === 'selection' ? startSec : safeTo >= buffer.duration - 0.05 ? 0 : safeTo);
    };

    const tick = () => {
      if (playGenRef.current !== gen || !playbackCtxRef.current) return;
      const elapsed = playbackCtxRef.current.currentTime - startedAt;
      const nextTime = Math.min(safeTo, safeFrom + elapsed);
      setCurrentTime(nextTime);
      if (elapsed < segmentDuration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleSelect = async (files: File[]) => {
    const picked = files[0];
    if (!picked) return;
    stopPlayback();
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputUrl(null);
    setOutputBlob(null);
    setError(null);
    setFile(picked);
    setIsDecoding(true);

    try {
      const decoded = await decodeAudioFile(picked);
      setAudioBuffer(decoded);
      setPeaks(extractWaveformPeaks(decoded, 260));
      setStartSec(0);
      setEndSec(decoded.duration);
      setCurrentTime(0);
    } catch {
      setError(labels.errorUnsupported);
      setFile(null);
    } finally {
      setIsDecoding(false);
    }
  };

  const handleToggleFullPlay = () => {
    if (!audioBuffer) return;
    if (playMode === 'full') {
      stopPlayback();
      return;
    }
    const startFrom = currentTime >= audioBuffer.duration - 0.08 ? 0 : currentTime;
    startAudioSegment(audioBuffer, startFrom, audioBuffer.duration, 'full', false);
  };

  const handleToggleSelectionPlay = () => {
    if (!audioBuffer) return;
    if (playMode === 'selection') {
      stopPlayback();
      return;
    }
    startAudioSegment(audioBuffer, startSec, endSec, 'selection', true);
  };

  const handleSeek = (t: number) => {
    setCurrentTime(t);
    if (playMode === 'full' && audioBuffer) {
      startAudioSegment(audioBuffer, t, audioBuffer.duration, 'full', false);
    } else if (playMode === 'selection') {
      stopPlayback();
    }
  };

  const handleExport = async () => {
    if (!audioBuffer || !file) return;
    if (endSec <= startSec + 0.05) {
      setError(labels.errorInvalidRange);
      return;
    }
    stopPlayback();
    setError(null);
    setIsExporting(true);
    setProgress(20);

    try {
      const trimmed = trimAudioBuffer(audioBuffer, startSec, endSec, fadeIn, fadeOut);
      const blob =
        outputFormat === 'wav'
          ? encodeAudioBufferToWav(trimmed)
          : await encodeAudioBufferToMp3(trimmed, 192, (p) => setProgress(Math.round(20 + p * 0.8)));

      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputBlob(blob);
      setOutputUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.errorGeneric);
    } finally {
      setIsExporting(false);
    }
  };

  const duration = audioBuffer?.duration ?? 0;
  const outFilename = file ? `${stripExtension(file.name)}-cut.${outputFormat}` : `cut.${outputFormat}`;

  return (
    <div class="space-y-6">
      {!file ? (
        <Dropzone
          accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac"
          formatsLabel="MP3, WAV, M4A, OGG → MP3 / WAV"
          labels={labels}
          onFilesSelected={handleSelect}
        />
      ) : (
        <div class="panel-enter space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
            <div class="min-w-0 flex-1">
              <p class="truncate text-base font-semibold text-[#27374D] dark:text-[#DDE6ED]">{file.name}</p>
              <p class="text-xs font-medium text-[#526D82] dark:text-[#9DB2BF]">
                {formatBytes(file.size)} {duration > 0 ? `• ${formatTime(duration)}` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                stopPlayback();
                setFile(null);
                setAudioBuffer(null);
                setPeaks([]);
                if (outputUrl) URL.revokeObjectURL(outputUrl);
                setOutputUrl(null);
                setOutputBlob(null);
              }}
              class="rounded-lg border border-[#9DB2BF] px-3 py-1.5 text-xs font-semibold text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
            >
              {labels.startOver}
            </button>
          </div>

          {isDecoding && <ProgressBar label={labels.decodingAudio} percent={55} />}

          {audioBuffer && (
            <div class="space-y-4">
              {/* Pro Interactive Waveform Timeline Ruler with Red Playhead & Play/Pause */}
              <TimelineRuler
                duration={duration}
                startSec={startSec}
                endSec={endSec}
                currentTime={currentTime}
                playMode={playMode}
                labels={labels}
                onChangeRange={(nextStart, nextEnd) => {
                  if (playMode === 'selection') stopPlayback();
                  setStartSec(nextStart);
                  setEndSec(nextEnd);
                }}
                onSeek={handleSeek}
                onToggleFullPlay={handleToggleFullPlay}
                onToggleSelectionPlay={handleToggleSelectionPlay}
                renderTrack={(widthPx) => <WaveformTrackCanvas peaks={peaks} widthPx={widthPx} />}
              />

              {/* Fade-In / Fade-Out / Output Format */}
              <div class="grid gap-3.5 sm:grid-cols-3">
                <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-3.5 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                  <div class="flex justify-between text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                    <label for="cut-fadein">{labels.fadeIn}</label>
                    <span class="tabular-nums">
                      {fadeIn.toFixed(1)} {labels.seconds}
                    </span>
                  </div>
                  <input
                    id="cut-fadein"
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={fadeIn}
                    onInput={(e) => setFadeIn(Number((e.currentTarget as HTMLInputElement).value))}
                    class="omecy-slider"
                  />
                </div>

                <div class="space-y-2 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-3.5 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                  <div class="flex justify-between text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                    <label for="cut-fadeout">{labels.fadeOut}</label>
                    <span class="tabular-nums">
                      {fadeOut.toFixed(1)} {labels.seconds}
                    </span>
                  </div>
                  <input
                    id="cut-fadeout"
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={fadeOut}
                    onInput={(e) => setFadeOut(Number((e.currentTarget as HTMLInputElement).value))}
                    class="omecy-slider"
                  />
                </div>

                <div class="space-y-1.5 rounded-xl border border-[#9DB2BF]/50 bg-[#F7F9FB] p-3.5 dark:border-[#526D82]/50 dark:bg-[#121A26]">
                  <label for="cut-format" class="block text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
                    {labels.format}
                  </label>
                  <select
                    id="cut-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat((e.currentTarget as HTMLSelectElement).value as 'mp3' | 'wav')}
                    class="w-full rounded-lg border border-[#9DB2BF] bg-white px-3 py-1.5 text-sm font-medium text-[#27374D] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED]"
                  >
                    <option value="mp3">MP3 (192 kbps)</option>
                    <option value="wav">WAV (Lossless)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                disabled={isExporting}
                onClick={handleExport}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:opacity-60 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {isExporting ? labels.processing : labels.trim}
              </button>
            </div>
          )}

          {isExporting && <ProgressBar label={labels.encodingMp3} percent={progress} />}

          {error && (
            <div role="alert" class="rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          {outputBlob && outputUrl && (
            <div
              ref={outputCardRef}
              class="panel-enter scroll-mt-20 space-y-4 rounded-2xl border border-[#526D82]/50 bg-[#F7F9FB] p-5 dark:bg-[#121A26]"
            >
              <div class="flex min-w-0 flex-wrap items-center justify-between gap-2 text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]">
                <span title={outFilename} class="min-w-0 max-w-full truncate">
                  {labels.done}: {outFilename}
                </span>
                <span class="shrink-0 tabular-nums text-xs font-medium text-[#526D82] dark:text-[#9DB2BF]">
                  {formatBytes(outputBlob.size)}
                </span>
              </div>
              <audio controls src={outputUrl} class="w-full" />
              <button
                type="button"
                onClick={() => triggerDownload(outputBlob, outFilename)}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {labels.download} {outputFormat.toUpperCase()}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
