export type MediaOrbitMode = 'idle' | 'drag' | 'loading';
export type MediaOrbitSize = 'sm' | 'md' | 'lg';

interface MediaOrbitIconProps {
  mode?: MediaOrbitMode;
  size?: MediaOrbitSize;
}

const SIZE_CLASSES: Record<
  MediaOrbitSize,
  { outer: string; core: string; icon: number }
> = {
  sm: { outer: 'h-12 w-12', core: 'h-8 w-8 rounded-xl', icon: 16 },
  md: { outer: 'h-20 w-20', core: 'h-13 w-13 rounded-2xl', icon: 24 },
  lg: { outer: 'h-24 w-24', core: 'h-15 w-15 rounded-2xl', icon: 28 },
};

export default function MediaOrbitIcon({
  mode = 'idle',
  size = 'lg',
}: MediaOrbitIconProps) {
  const dim = SIZE_CLASSES[size];
  const isLoading = mode === 'loading';
  const isDrag = mode === 'drag';

  return (
    <div
      aria-hidden="true"
      class={`relative inline-flex shrink-0 items-center justify-center ${dim.outer}`}
    >
      {/* Ambient pulsing halo ripple(s) */}
      <span
        class={`pointer-events-none absolute inset-1 rounded-full border border-[#526D82]/35 dark:border-[#9DB2BF]/35 ${
          isLoading ? 'omecy-orbit-ripple-fast' : 'omecy-orbit-ripple'
        }`}
      />
      {isLoading && (
        <span
          class="omecy-orbit-ripple-fast pointer-events-none absolute inset-1 rounded-full border border-[#526D82]/30 dark:border-[#9DB2BF]/30"
          style={{ animationDelay: '0.95s' }}
        />
      )}

      {/* Subtle dashed outer track slowly orbiting */}
      <svg
        viewBox="0 0 96 96"
        fill="none"
        class={`pointer-events-none absolute inset-0 h-full w-full text-[#526D82]/35 dark:text-[#9DB2BF]/35 ${
          isLoading ? 'omecy-orbit-spin-rev' : 'omecy-orbit-spin-slow'
        }`}
      >
        <circle
          cx="48"
          cy="48"
          r="43"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-dasharray="4 7"
        />
      </svg>

      {/* Primary orbital arc + glowing satellite dots */}
      <svg
        viewBox="0 0 96 96"
        fill="none"
        class={`pointer-events-none absolute inset-0 h-full w-full text-[#27374D] dark:text-[#DDE6ED] ${
          isLoading ? 'omecy-orbit-spin-fast' : isDrag ? 'omecy-orbit-spin-fast' : 'omecy-orbit-spin-med'
        }`}
      >
        <circle
          cx="48"
          cy="48"
          r="43"
          stroke="currentColor"
          stroke-width={isLoading ? '2.5' : '2'}
          stroke-linecap="round"
          stroke-dasharray={isLoading ? '74 196' : '42 228'}
          opacity={isLoading ? '0.9' : '0.65'}
        />
        <circle cx="48" cy="5" r={isLoading ? '3.2' : '2.8'} fill="currentColor" />
        <circle
          cx="48"
          cy="91"
          r={isLoading ? '2.4' : '2'}
          fill="currentColor"
          opacity="0.45"
        />
      </svg>

      {/* Center frosted emblem badge */}
      <div
        class={`relative z-10 flex items-center justify-center bg-[#DDE6ED] text-[#27374D] shadow-sm ring-1 ring-[#9DB2BF]/60 transition-transform duration-200 dark:bg-[#27374D] dark:text-[#DDE6ED] dark:ring-[#9DB2BF]/25 ${dim.core} ${
          isDrag
            ? 'scale-110'
            : isLoading
              ? 'omecy-core-breathe'
              : 'group-hover:scale-105'
        }`}
      >
        {isLoading ? (
          /* Local browser-engine loading arrow gliding smoothly into device tray */
          <svg
            width={dim.icon}
            height={dim.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <g class="omecy-arrow-download">
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </g>
          </svg>
        ) : (
          /* Upload emblem with calm floating arrow */
          <svg
            width={dim.icon}
            height={dim.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <g class="omecy-arrow-float">
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
