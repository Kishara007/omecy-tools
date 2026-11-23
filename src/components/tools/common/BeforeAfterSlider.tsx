import { useEffect, useRef, useState } from 'preact/hooks';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  beforeMeta?: string;
  afterMeta?: string;
  alt: string;
  isUpdating?: boolean;
}

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel,
  afterLabel,
  beforeMeta,
  afterMeta,
  alt,
  isUpdating = false,
}: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Reset split to 50% only when inspecting a different source image;
  // preserve current split position when re-applying quality/format settings on the same photo.
  useEffect(() => {
    setPosition(50);
  }, [beforeUrl]);

  // Prevent accidental page text selection while dragging quickly past the image edge
  useEffect(() => {
    if (!isDragging) return;
    const prev = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.userSelect = prev;
    };
  }, [isDragging]);

  const updateFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div class="omecy-checkerboard relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#9DB2BF]/55 p-2 sm:p-3 dark:border-[#526D82]/55">
      <div
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onMouseDown={(e) => e.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDblClick={() => setPosition(50)}
        onKeyDown={handleKeyDown}
        class="omecy-checkerboard group relative inline-block max-w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526D82] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9DB2BF] dark:focus-visible:ring-offset-[#121A26]"
      >
        {/* Base layer: Compressed / After image (sizes the frame tightly to exact image aspect ratio) */}
        <img
          src={afterUrl}
          alt={`${alt} — ${afterLabel}`}
          draggable={false}
          class={`pointer-events-none block h-auto max-h-[340px] w-auto max-w-full select-none transition-opacity duration-200 sm:max-h-[420px] ${
            isUpdating ? 'opacity-65' : 'opacity-100'
          }`}
        />

        {/* Clipped overlay: Original / Before image */}
        <img
          src={beforeUrl}
          alt={`${alt} — ${beforeLabel}`}
          draggable={false}
          class="pointer-events-none absolute inset-0 h-full w-full select-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        {/* Top-left Before badge */}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-md bg-[#27374D]/82 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md transition-opacity duration-150"
          style={{ opacity: position < 15 ? 0 : 1 }}
        >
          <span>{beforeLabel}</span>
          {beforeMeta && (
            <span class="hidden text-white/80 tabular-nums sm:inline">• {beforeMeta}</span>
          )}
        </div>

        {/* Top-right After badge */}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-md bg-[#27374D]/82 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md transition-opacity duration-150"
          style={{ opacity: position > 85 ? 0 : 1 }}
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{afterLabel}</span>
          {afterMeta && (
            <span class="hidden text-white/80 tabular-nums sm:inline">• {afterMeta}</span>
          )}
        </div>

        {/* Full-height crisp divider line + tactile drag handle */}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-y-0 z-20 -translate-x-1/2"
          style={{ left: `${position}%` }}
        >
          <div class="h-full w-[2px] bg-white shadow-[0_0_8px_rgba(15,23,42,0.65)]" />
          <div
            class={`absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#27374D]/92 text-white shadow-[0_4px_14px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-transform duration-150 sm:h-10 sm:w-10 ${
              isDragging ? 'scale-110 ring-4 ring-white/30' : 'group-hover:scale-105'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l-6-6 6-6" />
              <path d="M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
