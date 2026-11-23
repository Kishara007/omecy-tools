import MediaOrbitIcon from './MediaOrbitIcon';

interface EngineLoaderProps {
  label: string;
  compact?: boolean;
}

export default function EngineLoader({ label, compact = false }: EngineLoaderProps) {
  if (compact) {
    return (
      <div
        role="status"
        aria-live="polite"
        class="panel-enter flex items-center gap-3 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] px-3.5 py-2.5 dark:border-[#526D82]/60 dark:bg-[#121A26]"
      >
        <MediaOrbitIcon mode="loading" size="sm" />
        <p class="min-w-0 flex-1 truncate text-xs font-semibold text-[#27374D] dark:text-[#DDE6ED]">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      class="panel-enter flex flex-col items-center justify-center gap-3.5 rounded-2xl border border-[#9DB2BF]/60 bg-[#F7F9FB] px-5 py-7 text-center dark:border-[#526D82]/60 dark:bg-[#121A26]"
    >
      <MediaOrbitIcon mode="loading" size="md" />
      <p class="text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">{label}</p>
    </div>
  );
}
