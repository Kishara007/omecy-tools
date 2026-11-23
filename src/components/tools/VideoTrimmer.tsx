import { useEffect, useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../i18n/types';
import { formatBytes, formatTime, getExtension, stripExtension, triggerDownload } from '../../lib/format';
import Dropzone from './common/Dropzone';
import EngineLoader from './common/EngineLoader';
import ProgressBar from './common/ProgressBar';
import SizeBadge from './common/SizeBadge';
import TimelineRuler, { type TimelinePlayMode } from './common/TimelineRuler';

interface Props {
  labels: ToolUiLabels;
}

async function extractVideoFilmstrip(videoUrl: string, count = 10): Promise<string[]> {
  return new Promise((resolve) => {
    const vid = document.createElement('video');
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    vid.src = videoUrl;

    const frames: string[] = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const cleanup = () => {
      vid.pause();
      vid.removeAttribute('src');
      vid.load();
    };

    vid.onerror = () => {
      cleanup();
      resolve([]);
    };

    vid.onloadedmetadata = async () => {
      if (!ctx || !Number.isFinite(vid.duration) || vid.duration <= 0) {
        cleanup();
        resolve([]);
        return;
      }

      const thumbH = 96;
      const aspect = vid.videoWidth > 0 && vid.videoHeight > 0 ? vid.videoWidth / vid.videoHeight : 16 / 9;
      const thumbW = Math.max(64, Math.min(200, Math.round(thumbH * aspect)));
      canvas.width = thumbW;
      canvas.height = thumbH;

      const seekTo = (time: number) =>
        new Promise<void>((res) => {
          const timer = window.setTimeout(() => res(), 1200);
          vid.onseeked = () => {
            window.clearTimeout(timer);
            res();
          };
          vid.currentTime = Math.max(0, Math.min(vid.duration - 0.05, time));
        });

      for (let i = 0; i < count; i++) {
        const sampleTime = (vid.duration * (i + 0.5)) / count;
        await seekTo(sampleTime);
        try {
          ctx.drawImage(vid, 0, 0, thumbW, thumbH);
          frames.push(canvas.toDataURL('image/jpeg', 0.65));
        } catch {
          break;
        }
      }

      cleanup();
      resolve(frames);
    };
  });
}

export default function VideoTrimmer({ labels }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const outputCardRef = useRef<HTMLDivElement>(null);
  const previewLoopRef = useRef<number | null>(null);
  const previewStopAtRef = useRef<number | null>(null);
  const startSecRef = useRef(0);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [filmstrip, setFilmstrip] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);
  const [startSec, setStartSec] = useState(0);
  const [endSec, setEndSec] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playMode, setPlayMode] = useState<TimelinePlayMode>('none');
  // Default to frame-accurate re-encoding so the exported clip matches the exact previewed selection
  const [mode, setMode] = useState<'accurate' | 'copy'>('accurate');
  const [stage, setStage] = useState<'idle' | 'engine' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  startSecRef.current = startSec;

  const stopRaf = () => {
    if (previewLoopRef.current !== null) {
      cancelAnimationFrame(previewLoopRef.current);
      previewLoopRef.current = null;
    }
  };

  const pauseVideo = () => {
    const vid = videoRef.current;
    if (vid && !vid.paused) vid.pause();
    previewStopAtRef.current = null;
    setPlayMode('none');
    stopRaf();
  };

  useEffect(() => {
    return () => {
      stopRaf();
    };
  }, []);

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

  useEffect(() => {
    if (stage === 'done' && outputUrl) {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() => {
        outputCardRef.current?.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'center',
        });
      });
    }
  }, [stage, outputUrl]);

  useEffect(() => {
    if (!previewUrl) {
      setFilmstrip([]);
      return;
    }
    let cancelled = false;
    setFilmstrip([]);
    void extractVideoFilmstrip(previewUrl, 10).then((frames) => {
      if (!cancelled) setFilmstrip(frames);
    });
    return () => {
      cancelled = true;
    };
  }, [previewUrl]);

  const startPlayheadLoop = () => {
    stopRaf();
    const trackPlayhead = () => {
      const v = videoRef.current;
      if (!v || v.paused) {
        setPlayMode('none');
        stopRaf();
        return;
      }
      setCurrentTime(v.currentTime);
      if (previewStopAtRef.current !== null && v.currentTime >= previewStopAtRef.current) {
        v.pause();
        v.currentTime = startSecRef.current;
        setCurrentTime(startSecRef.current);
        previewStopAtRef.current = null;
        setPlayMode('none');
        stopRaf();
        return;
      }
      previewLoopRef.current = requestAnimationFrame(trackPlayhead);
    };
    previewLoopRef.current = requestAnimationFrame(trackPlayhead);
  };

  const handleSelect = (files: File[]) => {
    const picked = files[0];
    if (!picked) return;
    stopRaf();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setOutputBlob(null);
    setOutputUrl(null);
    setDuration(0);
    setStartSec(0);
    setEndSec(0);
    setCurrentTime(0);
    setPlayMode('none');
    setStage('idle');
    setError(null);
  };

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid || !Number.isFinite(vid.duration)) return;
    setDuration(vid.duration);
    setStartSec(0);
    setEndSec(vid.duration);
    setCurrentTime(0);
  };

  const handleSeek = (time: number) => {
    const vid = videoRef.current;
    setCurrentTime(time);
    if (vid && Number.isFinite(time)) {
      vid.currentTime = time;
    }
  };

  const handleToggleFullPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (playMode === 'full' && !vid.paused) {
      pauseVideo();
      return;
    }

    if (vid.currentTime >= duration - 0.1) {
      vid.currentTime = 0;
    }
    previewStopAtRef.current = null;
    setPlayMode('full');
    void vid.play();
    startPlayheadLoop();
  };

  const handleToggleSelectionPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (playMode === 'selection' && !vid.paused) {
      pauseVideo();
      return;
    }

    vid.currentTime = startSec;
    setCurrentTime(startSec);
    previewStopAtRef.current = endSec;
    setPlayMode('selection');
    void vid.play();
    startPlayheadLoop();
  };

  const handleTrim = async () => {
    if (!file) return;
    if (endSec <= startSec + 0.1) {
      setError(labels.errorInvalidRange);
      return;
    }
    pauseVideo();
    setError(null);
    setStage('engine');
    setProgress(5);

    try {
      const { runFFmpegJob } = await import('../../lib/ffmpeg');
      const ext = getExtension(file.name, 'mp4');
      const inputName = `input.${ext}`;
      const outputExt = mode === 'copy' && ['mp4', 'webm', 'mov', 'mkv'].includes(ext) ? ext : 'mp4';
      const outputName = `trimmed.${outputExt}`;
      const outputMime = outputExt === 'webm' ? 'video/webm' : 'video/mp4';
      const exactStart = Math.max(0, startSec);
      const exactDuration = Math.max(0.1, endSec - exactStart);
      const clipDuration = exactDuration.toFixed(3);

      let args: string[];
      if (mode === 'copy') {
        args = [
          '-ss',
          exactStart.toFixed(3),
          '-i',
          inputName,
          '-t',
          clipDuration,
          '-map',
          '0:v:0',
          '-map',
          '0:a?',
          '-c',
          'copy',
          '-avoid_negative_ts',
          'make_zero',
          outputName,
        ];
      } else if (exactStart <= 10) {
        // Output-side seeking (-ss after -i) decodes from 0 for guaranteed frame-exact cuts on short clips
        args = [
          '-i',
          inputName,
          '-ss',
          exactStart.toFixed(3),
          '-t',
          clipDuration,
          '-map',
          '0:v:0',
          '-map',
          '0:a?',
          '-c:v',
          'libx264',
          '-preset',
          'veryfast',
          '-crf',
          '20',
          '-pix_fmt',
          'yuv420p',
          '-c:a',
          'aac',
          '-b:a',
          '160k',
          '-movflags',
          '+faststart',
          outputName,
        ];
      } else {
        // Two-stage hybrid seek for long videos: fast coarse seek + exact frame-accurate output seek
        const coarseSeek = Math.max(0, exactStart - 5);
        const fineSeek = exactStart - coarseSeek;
        args = [
          '-ss',
          coarseSeek.toFixed(3),
          '-i',
          inputName,
          '-ss',
          fineSeek.toFixed(3),
          '-t',
          clipDuration,
          '-map',
          '0:v:0',
          '-map',
          '0:a?',
          '-c:v',
          'libx264',
          '-preset',
          'veryfast',
          '-crf',
          '20',
          '-pix_fmt',
          'yuv420p',
          '-c:a',
          'aac',
          '-b:a',
          '160k',
          '-movflags',
          '+faststart',
          outputName,
        ];
      }

      const blob = await runFFmpegJob({
        inputFile: file,
        inputName,
        outputName,
        args,
        outputMime,
        onEngineProgress: (p) => {
          setStage('engine');
          setProgress(p);
        },
        onProcessProgress: (p) => {
          setStage('processing');
          setProgress(p);
        },
      });

      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputBlob(blob);
      setOutputUrl(URL.createObjectURL(blob));
      setStage('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.errorGeneric);
      setStage('idle');
    }
  };

  const outExt = file && mode === 'copy' && getExtension(file.name) === 'webm' ? 'webm' : 'mp4';
  const outFilename = file ? `${stripExtension(file.name)}-trimmed.${outExt}` : 'trimmed.mp4';

  return (
    <div class="space-y-6">
      {!file ? (
        <Dropzone
          accept="video/*,.mp4,.mov,.webm,.mkv"
          formatsLabel="MP4, MOV, WebM, MKV"
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
                pauseVideo();
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                if (outputUrl) URL.revokeObjectURL(outputUrl);
                setFile(null);
                setPreviewUrl(null);
                setOutputBlob(null);
                setOutputUrl(null);
                setFilmstrip([]);
                setStage('idle');
              }}
              class="rounded-lg border border-[#9DB2BF] px-3 py-1.5 text-xs font-semibold text-[#27374D] transition-colors hover:bg-[#DDE6ED] dark:border-[#526D82] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]"
            >
              {labels.startOver}
            </button>
          </div>

          {previewUrl && (
            <video
              ref={videoRef}
              controls
              src={previewUrl}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onPlay={() => {
                if (playMode === 'none') {
                  previewStopAtRef.current = null;
                  setPlayMode('full');
                }
                startPlayheadLoop();
              }}
              onPause={() => {
                setPlayMode('none');
                stopRaf();
              }}
              class="max-h-72 w-full rounded-2xl bg-black"
            />
          )}

          {duration > 0 && (
            <div class="space-y-4">
              {/* Pro Interactive Video Filmstrip Timeline Ruler with Red Playhead & Play/Pause */}
              <TimelineRuler
                duration={duration}
                startSec={startSec}
                endSec={endSec}
                currentTime={currentTime}
                playMode={playMode}
                labels={labels}
                onChangeRange={(nextStart, nextEnd) => {
                  setStartSec(nextStart);
                  setEndSec(nextEnd);
                }}
                onSeek={handleSeek}
                onToggleFullPlay={handleToggleFullPlay}
                onToggleSelectionPlay={handleToggleSelectionPlay}
                renderTrack={() =>
                  filmstrip.length > 0 ? (
                    <div class="flex h-full w-full overflow-hidden">
                      {filmstrip.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt=""
                          width={160}
                          height={96}
                          draggable={false}
                          class="h-full min-w-0 flex-1 object-cover"
                        />
                      ))}
                    </div>
                  ) : (
                    <div class="flex h-full w-full items-center justify-around bg-gradient-to-b from-[#DDE6ED]/70 to-[#F7F9FB] px-3 dark:from-[#27374D]/80 dark:to-[#121A26]">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          class="mx-0.5 h-14 w-full rounded bg-[#9DB2BF]/25 dark:bg-[#526D82]/30"
                        />
                      ))}
                    </div>
                  )
                }
              />

              {/* Accurate Re-encode (Default, Frame-Exact) vs. Fast Lossless Copy toggle */}
              <div class="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMode('accurate')}
                  class={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    mode === 'accurate'
                      ? 'border-[#27374D] bg-[#27374D] text-white dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                      : 'border-[#9DB2BF] bg-white text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                  }`}
                >
                  {labels.accurateMode}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('copy')}
                  class={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    mode === 'copy'
                      ? 'border-[#27374D] bg-[#27374D] text-white dark:border-[#DDE6ED] dark:bg-[#DDE6ED] dark:text-[#27374D]'
                      : 'border-[#9DB2BF] bg-white text-[#27374D] hover:bg-[#DDE6ED] dark:border-[#526D82] dark:bg-[#1D2A3B] dark:text-[#DDE6ED] dark:hover:bg-[#27374D]'
                  }`}
                >
                  {labels.fastCopyMode}
                </button>
              </div>
            </div>
          )}

          {stage === 'engine' && <EngineLoader label={labels.loadingEngine} />}
          {stage === 'processing' && (
            <ProgressBar label={labels.processing} percent={progress} />
          )}

          {error && (
            <div role="alert" class="rounded-xl border border-red-400/60 bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={stage === 'engine' || stage === 'processing' || duration <= 0}
            onClick={handleTrim}
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
          >
            {stage === 'engine' || stage === 'processing' ? labels.processing : labels.trim}
          </button>

          {stage === 'done' && outputBlob && outputUrl && (
            <div
              ref={outputCardRef}
              class="panel-enter scroll-mt-20 space-y-4 rounded-2xl border border-[#526D82]/50 bg-[#F7F9FB] p-5 dark:bg-[#121A26]"
            >
              <div class="space-y-2.5">
                <p
                  title={outFilename}
                  class="min-w-0 max-w-full truncate text-sm font-bold text-[#27374D] dark:text-[#DDE6ED]"
                >
                  {labels.outputPreview}: {outFilename}
                </p>
                <SizeBadge originalBytes={file.size} newBytes={outputBlob.size} labels={labels} />
              </div>

              <video controls src={outputUrl} class="max-h-72 w-full rounded-xl bg-black" />

              <button
                type="button"
                onClick={() => triggerDownload(outputBlob, outFilename)}
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#27374D] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
              >
                {labels.download}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
