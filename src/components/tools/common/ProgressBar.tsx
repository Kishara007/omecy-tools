interface ProgressBarProps {
  label: string;
  hint?: string;
  percent: number;
}

export default function ProgressBar({ label, hint, percent }: ProgressBarProps) {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div class="panel-enter space-y-2.5 rounded-xl border border-[#9DB2BF]/60 bg-[#F7F9FB] p-4 dark:border-[#526D82]/60 dark:bg-[#121A26]">
      <div class="flex items-center justify-between gap-3 text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
        <span>{label}</span>
        <span class="tabular-nums">{safePercent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={safePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        class="h-3 w-full overflow-hidden rounded-full bg-[#DDE6ED] dark:bg-[#27374D]"
      >
        <div
          class="progress-bar-animated h-full rounded-full"
          style={{ width: `${Math.max(4, safePercent)}%` }}
        />
      </div>
      {hint && <p class="text-xs text-[#526D82] dark:text-[#9DB2BF]">{hint}</p>}
    </div>
  );
}
