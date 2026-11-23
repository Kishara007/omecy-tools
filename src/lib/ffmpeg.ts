import type { FFmpeg } from '@ffmpeg/ffmpeg';

/**
 * Single-threaded FFmpeg.wasm loader.
 *
 * CRITICAL ARCHITECTURE RULES:
 * 1. NEVER imported at top-level of any Astro page or island — always dynamically imported
 *    inside user action handlers so initial page JS ships zero FFmpeg bytes.
 * 2. Uses SINGLE-THREADED @ffmpeg/core ONLY (never @ffmpeg/core-mt) so COOP/COEP headers
 *    are never required, preserving full compatibility with Google AdSense and third-party scripts.
 */

const CORE_CDN_BASES = [
  'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm',
  'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm',
];

let ffmpegInstance: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;

async function fetchAsBlobUrlWithProgress(
  url: string,
  mimeType: string,
  onProgress?: (ratio: number) => void
): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch FFmpeg asset (${response.status}): ${url}`);
  }

  const contentLengthHeader = response.headers.get('content-length');
  const totalBytes = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : 0;

  if (!response.body || !totalBytes) {
    const buffer = await response.arrayBuffer();
    onProgress?.(1);
    return URL.createObjectURL(new Blob([buffer], { type: mimeType }));
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.byteLength;
      onProgress?.(Math.min(1, received / totalBytes));
    }
  }

  const blob = new Blob(chunks as BlobPart[], { type: mimeType });
  return URL.createObjectURL(blob);
}

export async function getFFmpeg(onLoadProgress?: (percent: number) => void): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    onLoadProgress?.(100);
    return ffmpegInstance;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    const { FFmpeg: FFmpegClass } = await import('@ffmpeg/ffmpeg');
    const instance = new FFmpegClass();

    let lastError: unknown;
    for (const base of CORE_CDN_BASES) {
      try {
        onLoadProgress?.(5);
        const coreURL = await fetchAsBlobUrlWithProgress(
          `${base}/ffmpeg-core.js`,
          'text/javascript',
          (r) => onLoadProgress?.(Math.round(5 + r * 15))
        );
        const wasmURL = await fetchAsBlobUrlWithProgress(
          `${base}/ffmpeg-core.wasm`,
          'application/wasm',
          (r) => onLoadProgress?.(Math.round(20 + r * 75))
        );

        await instance.load({ coreURL, wasmURL });
        onLoadProgress?.(100);
        ffmpegInstance = instance;
        return instance;
      } catch (err) {
        lastError = err;
      }
    }

    loadingPromise = null;
    throw lastError ?? new Error('Unable to load FFmpeg WebAssembly engine.');
  })();

  return loadingPromise;
}

export async function runFFmpegJob(options: {
  inputFile: File;
  inputName: string;
  outputName: string;
  args: string[];
  outputMime: string;
  onEngineProgress?: (percent: number) => void;
  onProcessProgress?: (percent: number) => void;
}): Promise<Blob> {
  const { fetchFile } = await import('@ffmpeg/util');
  const ffmpeg = await getFFmpeg(options.onEngineProgress);

  const progressHandler = ({ progress }: { progress: number }) => {
    if (Number.isFinite(progress)) {
      const clamped = Math.max(0, Math.min(100, Math.round(progress * 100)));
      options.onProcessProgress?.(clamped);
    }
  };

  ffmpeg.on('progress', progressHandler);

  try {
    await ffmpeg.writeFile(options.inputName, await fetchFile(options.inputFile));
    const exitCode = await ffmpeg.exec(options.args);
    if (exitCode !== 0) {
      throw new Error(`FFmpeg exited with status code ${exitCode}`);
    }
    const outputData = await ffmpeg.readFile(options.outputName);
    const bytes =
      outputData instanceof Uint8Array
        ? new Uint8Array(outputData)
        : new TextEncoder().encode(outputData);
    options.onProcessProgress?.(100);
    return new Blob([bytes], { type: options.outputMime });
  } finally {
    ffmpeg.off('progress', progressHandler);
    try {
      await ffmpeg.deleteFile(options.inputName);
    } catch {
      // ignore cleanup error
    }
    try {
      await ffmpeg.deleteFile(options.outputName);
    } catch {
      // ignore cleanup error
    }
  }
}
