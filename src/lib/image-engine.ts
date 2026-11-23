/**
 * 100% Client-Side Image Processing Engine
 * Uses HTML5 Canvas API, createImageBitmap, lazy browser-image-compression, and lazy heic2any.
 */

export interface ImageDimensions {
  width: number;
  height: number;
}

export async function loadImageElement(file: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not decode image file.'));
    };
    img.src = url;
  });
}

export async function getImageDimensions(file: Blob): Promise<ImageDimensions> {
  if ('createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      const dims = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      return dims;
    } catch {
      // Fallback to HTMLImageElement
    }
  }
  const img = await loadImageElement(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to export image canvas.'));
      },
      mime,
      quality
    );
  });
}

export type ImageOutputFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';

export async function compressImageFile(
  file: File,
  qualityPercent: number,
  maxWidthOrHeight?: number,
  outputFormat: ImageOutputFormat = 'original'
): Promise<Blob> {
  const quality = Math.max(0.1, Math.min(1, qualityPercent / 100));
  const sourceMime =
    file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg'
      ? file.type
      : 'image/jpeg';
  const mime = outputFormat === 'original' ? sourceMime : outputFormat;

  // For PNG output or explicit downscaling, try browser-image-compression first
  if (mime === 'image/png' || (maxWidthOrHeight && maxWidthOrHeight > 0)) {
    try {
      const { default: imageCompression } = await import('browser-image-compression');
      const compressed = await imageCompression(file, {
        maxWidthOrHeight: maxWidthOrHeight || undefined,
        initialQuality: quality,
        useWebWorker: false,
        fileType: mime,
        alwaysKeepResolution: !maxWidthOrHeight,
      });
      // Only return directly when the output genuinely matches requested PNG MIME
      // (browser-image-compression can return the original file untouched if PNG is larger)
      if (mime === 'image/png' && compressed.type === 'image/png') {
        return compressed;
      }
    } catch {
      // Fall through cleanly to Canvas encoding
    }
  }

  const img = await loadImageElement(file);
  let targetW = img.naturalWidth;
  let targetH = img.naturalHeight;

  if (maxWidthOrHeight && (targetW > maxWidthOrHeight || targetH > maxWidthOrHeight)) {
    const ratio = Math.min(maxWidthOrHeight / targetW, maxWidthOrHeight / targetH);
    targetW = Math.max(1, Math.round(targetW * ratio));
    targetH = Math.max(1, Math.round(targetH * ratio));
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable.');

  if (mime === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetW, targetH);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, targetW, targetH);

  return await canvasToBlob(canvas, mime, quality);
}

export async function convertWebpToJpg(
  file: File,
  qualityPercent: number,
  bgColor = '#FFFFFF'
): Promise<Blob> {
  const img = await loadImageElement(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable.');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  return await canvasToBlob(canvas, 'image/jpeg', Math.max(0.1, Math.min(1, qualityPercent / 100)));
}

let heicDecoderLoaded = false;

export async function convertHeicToJpg(
  file: File,
  qualityPercent: number,
  onStage?: (stage: 'engine' | 'convert') => void
): Promise<Blob> {
  if (!heicDecoderLoaded) {
    onStage?.('engine');
  }
  const heic2anyModule = await import('heic2any');
  heicDecoderLoaded = true;
  onStage?.('convert');
  const heic2any = heic2anyModule.default;
  const quality = Math.max(0.1, Math.min(1, qualityPercent / 100));

  const result = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality,
  });

  if (Array.isArray(result)) {
    return result[0];
  }
  return result;
}

export type ResizeFitMode = 'crop' | 'contain' | 'stretch';
export type ContainBgMode = 'blur' | 'white' | 'black' | 'transparent' | 'custom';

export interface CropRect {
  x: number; // 0..1 normalized left
  y: number; // 0..1 normalized top
  w: number; // 0..1 normalized width
  h: number; // 0..1 normalized height
}

export interface ResizeOptions {
  fitMode?: ResizeFitMode;
  cropRect?: CropRect;
  containBg?: ContainBgMode;
  containColor?: string;
}

export async function resizeImageFile(
  file: File,
  width: number,
  height: number,
  outputMime: 'image/jpeg' | 'image/png' | 'image/webp',
  qualityPercent: number,
  options: ResizeOptions = {}
): Promise<Blob> {
  const img = await loadImageElement(file);
  const targetW = Math.max(1, Math.round(width));
  const targetH = Math.max(1, Math.round(height));
  const { fitMode = 'stretch', cropRect, containBg = 'blur', containColor = '#FFFFFF' } = options;

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable.');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (fitMode === 'crop' && cropRect) {
    if (outputMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
    }
    const sx = Math.max(0, Math.min(img.naturalWidth - 1, Math.round(cropRect.x * img.naturalWidth)));
    const sy = Math.max(0, Math.min(img.naturalHeight - 1, Math.round(cropRect.y * img.naturalHeight)));
    const sw = Math.max(1, Math.min(img.naturalWidth - sx, Math.round(cropRect.w * img.naturalWidth)));
    const sh = Math.max(1, Math.min(img.naturalHeight - sy, Math.round(cropRect.h * img.naturalHeight)));
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
  } else if (fitMode === 'contain') {
    const effectiveBg: ContainBgMode =
      outputMime === 'image/jpeg' && containBg === 'transparent' ? 'white' : containBg;

    if (effectiveBg === 'blur') {
      // Draw cover-scaled blurred backdrop so zero hard bars appear
      ctx.fillStyle = '#121A26';
      ctx.fillRect(0, 0, targetW, targetH);
      const coverScale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight) * 1.14;
      const bw = img.naturalWidth * coverScale;
      const bh = img.naturalHeight * coverScale;
      const bx = (targetW - bw) / 2;
      const by = (targetH - bh) / 2;
      const blurPx = Math.max(16, Math.round(Math.min(targetW, targetH) * 0.035));
      ctx.save();
      ctx.filter = `blur(${blurPx}px)`;
      ctx.drawImage(img, bx, by, bw, bh);
      ctx.restore();
    } else if (effectiveBg === 'white') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
    } else if (effectiveBg === 'black') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, targetW, targetH);
    } else if (effectiveBg === 'custom') {
      ctx.fillStyle = containColor || '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
    }

    const fitScale = Math.min(targetW / img.naturalWidth, targetH / img.naturalHeight);
    const dw = Math.round(img.naturalWidth * fitScale);
    const dh = Math.round(img.naturalHeight * fitScale);
    const dx = Math.round((targetW - dw) / 2);
    const dy = Math.round((targetH - dh) / 2);
    ctx.drawImage(img, dx, dy, dw, dh);
  } else {
    if (outputMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
    }
    ctx.drawImage(img, 0, 0, targetW, targetH);
  }

  return await canvasToBlob(canvas, outputMime, Math.max(0.1, Math.min(1, qualityPercent / 100)));
}
