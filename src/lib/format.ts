export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, idx);
  return `${value >= 100 || idx === 0 ? value.toFixed(0) : value.toFixed(2)} ${units[idx]}`;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00.0';
  const totalTenths = Math.round(seconds * 10);
  const mins = Math.floor(totalTenths / 600);
  const secs = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
}

export function parseTimeInput(value: string, fallback = 0): number {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return Math.max(0, Number.parseFloat(trimmed));
  }
  const parts = trimmed.split(':').map((p) => Number.parseFloat(p));
  if (parts.some((n) => Number.isNaN(n) || n < 0)) return fallback;
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return fallback;
}

export function stripExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot <= 0) return filename;
  return filename.slice(0, lastDot);
}

export function getExtension(filename: string, fallback = 'bin'): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === filename.length - 1) return fallback;
  return filename.slice(lastDot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') || fallback;
}

export function calcSavingsPercent(originalBytes: number, newBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.round(((originalBytes - newBytes) / originalBytes) * 100);
}

export function scrollToElement(
  el: HTMLElement | null,
  block: ScrollLogicalPosition = 'center'
): void {
  if (!el) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

  requestAnimationFrame(() => {
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    const docTop = window.scrollY + rect.top;
    const navOffset = 116; // 64px sticky navbar + card padding & comfortable top breathing room

    if (block === 'start') {
      // When the output section sits cleanly inside the top viewport, frame from the top of the page
      // so the tool heading and rounded card stay cleanly visible instead of scrolling past them.
      if (docTop <= viewH * 0.55 && docTop + Math.min(rect.height, 360) <= viewH) {
        if (window.scrollY > 8) {
          window.scrollTo({ top: 0, behavior });
        }
        return;
      }

      // If already comfortably positioned below the sticky navbar, avoid unnecessary scroll jumps.
      if (rect.top >= navOffset && rect.top <= viewH * 0.45) {
        return;
      }

      const targetY = Math.max(0, docTop - navOffset);
      window.scrollTo({ top: targetY, behavior });
      return;
    }

    // For 'center' (single-output preview cards): skip micro-scroll if already fully visible
    if (rect.top >= 96 && rect.bottom <= viewH - 24) {
      return;
    }

    // If the entire card fits comfortably from the top of the page, glide up to top: 0 cleanly
    if (docTop <= viewH * 0.55 && docTop + rect.height <= viewH - 20) {
      if (window.scrollY > 8) {
        window.scrollTo({ top: 0, behavior });
      }
      return;
    }

    el.scrollIntoView({ behavior, block });
  });
}

export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export async function downloadAsZip(
  items: Array<{ filename: string; blob: Blob }>,
  zipFilename: string
): Promise<void> {
  const JSZipModule = await import('jszip');
  const JSZip = JSZipModule.default;
  const zip = new JSZip();
  const usedNames = new Set<string>();

  for (const item of items) {
    let name = item.filename;
    if (usedNames.has(name)) {
      const base = stripExtension(name);
      const ext = getExtension(name, 'bin');
      let counter = 2;
      while (usedNames.has(`${base}-${counter}.${ext}`)) {
        counter += 1;
      }
      name = `${base}-${counter}.${ext}`;
    }
    usedNames.add(name);
    zip.file(name, item.blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(zipBlob, zipFilename);
}
