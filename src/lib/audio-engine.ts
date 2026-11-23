/**
 * Native Web Audio API + lazy-loaded @breezystack/lamejs audio processing engine.
 * Supports decoding, waveform extraction, trimming with fade-in/out, multi-track
 * joining with smooth crossfade, WAV export, and MP3 encoding — 100% locally.
 */

export async function decodeAudioFile(file: File): Promise<AudioBuffer> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  try {
    const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
    return decoded;
  } finally {
    await ctx.close();
  }
}

export function extractWaveformPeaks(buffer: AudioBuffer, bars = 160): number[] {
  const channelData = buffer.getChannelData(0);
  const blockSize = Math.max(1, Math.floor(channelData.length / bars));
  const peaks: number[] = [];
  let globalMax = 0.001;

  for (let i = 0; i < bars; i++) {
    const start = i * blockSize;
    const end = Math.min(channelData.length, start + blockSize);
    let maxVal = 0;
    const step = Math.max(1, Math.floor((end - start) / 64));
    for (let j = start; j < end; j += step) {
      const abs = Math.abs(channelData[j]);
      if (abs > maxVal) maxVal = abs;
    }
    if (maxVal > globalMax) globalMax = maxVal;
    peaks.push(maxVal);
  }

  return peaks.map((p) => Math.max(0.06, p / globalMax));
}

export function trimAudioBuffer(
  buffer: AudioBuffer,
  startSec: number,
  endSec: number,
  fadeInSec = 0,
  fadeOutSec = 0
): AudioBuffer {
  const sampleRate = buffer.sampleRate;
  const safeStart = Math.max(0, Math.min(startSec, buffer.duration));
  const safeEnd = Math.max(safeStart + 0.05, Math.min(endSec, buffer.duration));
  const startSample = Math.floor(safeStart * sampleRate);
  const endSample = Math.min(buffer.length, Math.floor(safeEnd * sampleRate));
  const frameCount = Math.max(1, endSample - startSample);

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx({ sampleRate });
  const output = ctx.createBuffer(buffer.numberOfChannels, frameCount, sampleRate);
  void ctx.close();

  const fadeInSamples = Math.min(Math.floor(fadeInSec * sampleRate), Math.floor(frameCount / 2));
  const fadeOutSamples = Math.min(Math.floor(fadeOutSec * sampleRate), Math.floor(frameCount / 2));

  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const src = buffer.getChannelData(ch);
    const dst = output.getChannelData(ch);
    for (let i = 0; i < frameCount; i++) {
      let sample = src[startSample + i] ?? 0;
      if (fadeInSamples > 0 && i < fadeInSamples) {
        sample *= i / fadeInSamples;
      }
      if (fadeOutSamples > 0 && i >= frameCount - fadeOutSamples) {
        const remaining = frameCount - 1 - i;
        sample *= Math.max(0, remaining / fadeOutSamples);
      }
      dst[i] = sample;
    }
  }

  return output;
}

export async function mergeAudioBuffers(
  buffers: AudioBuffer[],
  crossfadeSec = 0
): Promise<AudioBuffer> {
  if (buffers.length === 0) {
    throw new Error('No audio tracks provided.');
  }

  const targetRate = buffers[0].sampleRate;
  const targetChannels = Math.min(2, Math.max(...buffers.map((b) => b.numberOfChannels)));

  // Resample tracks if sample rates differ
  const normalized: AudioBuffer[] = [];
  for (const buf of buffers) {
    if (buf.sampleRate === targetRate && buf.numberOfChannels === targetChannels) {
      normalized.push(buf);
    } else {
      const length = Math.ceil(buf.duration * targetRate);
      const offline = new OfflineAudioContext(targetChannels, Math.max(1, length), targetRate);
      const src = offline.createBufferSource();
      src.buffer = buf;
      src.connect(offline.destination);
      src.start(0);
      normalized.push(await offline.startRendering());
    }
  }

  const requestedOverlap = Math.max(0, crossfadeSec);
  const overlapSamplesPerJoin: number[] = [];
  let totalSamples = normalized[0].length;

  for (let i = 1; i < normalized.length; i++) {
    const prevLen = normalized[i - 1].length;
    const currLen = normalized[i].length;
    const maxOverlap = Math.floor(Math.min(prevLen, currLen) * 0.45);
    const overlap = Math.min(Math.floor(requestedOverlap * targetRate), maxOverlap);
    overlapSamplesPerJoin.push(overlap);
    totalSamples += currLen - overlap;
  }

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx({ sampleRate: targetRate });
  const output = ctx.createBuffer(targetChannels, Math.max(1, totalSamples), targetRate);
  void ctx.close();

  for (let ch = 0; ch < targetChannels; ch++) {
    const out = output.getChannelData(ch);
    let offset = 0;

    for (let t = 0; t < normalized.length; t++) {
      const track = normalized[t];
      const src = track.getChannelData(Math.min(ch, track.numberOfChannels - 1));
      const overlap = t > 0 ? overlapSamplesPerJoin[t - 1] : 0;
      const startPos = offset - overlap;

      for (let i = 0; i < src.length; i++) {
        const idx = startPos + i;
        if (idx < 0 || idx >= out.length) continue;

        if (overlap > 0 && i < overlap) {
          // Equal-power smooth crossfade
          const ratio = i / overlap;
          const fadeOutGain = Math.cos(ratio * Math.PI * 0.5);
          const fadeInGain = Math.sin(ratio * Math.PI * 0.5);
          out[idx] = out[idx] * fadeOutGain + src[i] * fadeInGain;
        } else {
          out[idx] = src[i];
        }
      }

      offset = startPos + src.length;
    }
  }

  return output;
}

export function encodeAudioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = Math.min(2, buffer.numberOfChannels);
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numFrames * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);

  const channels = Array.from({ length: numChannels }, (_, i) => buffer.getChannelData(i));
  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const clamped = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function floatToInt16(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

export async function encodeAudioBufferToMp3(
  buffer: AudioBuffer,
  kbps = 192,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const { Mp3Encoder } = await import('@breezystack/lamejs');
  const channels = Math.min(2, buffer.numberOfChannels);
  const sampleRate = buffer.sampleRate;
  const encoder = new Mp3Encoder(channels, sampleRate, kbps);

  const left = floatToInt16(buffer.getChannelData(0));
  const right = channels === 2 ? floatToInt16(buffer.getChannelData(1)) : undefined;

  const mp3Chunks: Uint8Array[] = [];
  const blockSize = 1152;
  const yieldEvery = 60;
  const totalBlocks = Math.ceil(left.length / blockSize);

  for (let i = 0, blockIdx = 0; i < left.length; i += blockSize, blockIdx++) {
    const leftChunk = left.subarray(i, i + blockSize);
    const rightChunk = right ? right.subarray(i, i + blockSize) : undefined;
    const encoded = rightChunk
      ? encoder.encodeBuffer(leftChunk, rightChunk)
      : encoder.encodeBuffer(leftChunk);
    if (encoded.length > 0) {
      mp3Chunks.push(new Uint8Array(encoded));
    }

    if (blockIdx % yieldEvery === 0) {
      onProgress?.(Math.min(98, Math.round((blockIdx / Math.max(1, totalBlocks)) * 100)));
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    }
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) {
    mp3Chunks.push(new Uint8Array(flushed));
  }

  onProgress?.(100);
  return new Blob(mp3Chunks as BlobPart[], { type: 'audio/mpeg' });
}

/**
 * Convert an audio file (WAV, M4A, AAC, OGG, etc.) to MP3.
 * Uses ultra-fast native Web Audio API + lazy lamejs first;
 * automatically falls back to lazy single-threaded FFmpeg.wasm if the browser cannot decode a rare codec.
 */
export async function convertAudioFileToMp3(options: {
  file: File;
  bitrate: number;
  onStage?: (stage: 'decode' | 'encode' | 'engine') => void;
  onProgress?: (percent: number) => void;
}): Promise<Blob> {
  try {
    options.onStage?.('decode');
    options.onProgress?.(15);
    const buffer = await decodeAudioFile(options.file);
    options.onStage?.('encode');
    return await encodeAudioBufferToMp3(buffer, options.bitrate, options.onProgress);
  } catch {
    // Graceful fallback to lazy-loaded single-threaded FFmpeg.wasm for uncommon codecs
    const { runFFmpegJob } = await import('./ffmpeg');
    const ext = options.file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'audio';
    const inputName = `in_audio.${ext}`;
    const outputName = 'out_audio.mp3';
    return await runFFmpegJob({
      inputFile: options.file,
      inputName,
      outputName,
      args: ['-i', inputName, '-vn', '-c:a', 'libmp3lame', '-b:a', `${options.bitrate}k`, outputName],
      outputMime: 'audio/mpeg',
      onEngineProgress: (p) => {
        options.onStage?.('engine');
        options.onProgress?.(p);
      },
      onProcessProgress: (p) => {
        options.onStage?.('encode');
        options.onProgress?.(p);
      },
    });
  }
}
