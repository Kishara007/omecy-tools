import type { ToolUiLabels } from '../../../i18n/types';

interface ApplyBannerProps {
  labels: ToolUiLabels;
  actionLabel?: string;
  disabled?: boolean;
  onApply: () => void;
}

export function ApplyBanner({ labels, actionLabel, disabled = false, onApply }: ApplyBannerProps) {
  return (
    <div
      role="status"
      class="panel-enter flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#27374D]/80 bg-[#DDE6ED]/70 px-4 py-3.5 shadow-sm dark:border-[#DDE6ED]/80 dark:bg-[#27374D]/90"
    >
      <div class="flex min-w-0 flex-1 items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
        <span class="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-amber-500 dark:bg-amber-400" aria-hidden="true" />
        <span>{labels.settingsChangedHint}</span>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onApply}
        class="snap-btn inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#27374D] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#526D82] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 16h5v5" />
        </svg>
        <span>{actionLabel || labels.applyChanges}</span>
      </button>
    </div>
  );
}

interface UpdatedNoticeProps {
  text: string;
}

export function UpdatedNotice({ text }: UpdatedNoticeProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      class="panel-enter inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-950/60 dark:text-emerald-300"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{text}</span>
    </div>
  );
}
