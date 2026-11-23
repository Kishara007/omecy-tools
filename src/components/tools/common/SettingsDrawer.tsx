import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

interface SettingsDrawerProps {
  label: string;
  summary: string;
  hasPendingChanges?: boolean;
  children: ComponentChildren;
}

export default function SettingsDrawer({
  label,
  summary,
  hasPendingChanges = false,
  children,
}: SettingsDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div class="overflow-hidden rounded-2xl border border-[#9DB2BF]/65 bg-[#F7F9FB]/85 transition-colors dark:border-[#526D82]/65 dark:bg-[#121A26]/85">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        class="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#DDE6ED]/55 dark:hover:bg-[#1D2A3B]"
      >
        <span class="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-[#27374D] dark:text-[#DDE6ED]">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="shrink-0 text-[#526D82] dark:text-[#9DB2BF]"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          <span>{label}</span>
          {hasPendingChanges && (
            <span class="h-2 w-2 shrink-0 animate-pulse rounded-full bg-amber-500 dark:bg-amber-400" aria-hidden="true" />
          )}
        </span>

        <span class="flex shrink-0 items-center gap-2">
          <span class="rounded-lg bg-[#DDE6ED]/85 px-2.5 py-0.5 text-xs font-semibold text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
            {summary}
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class={`text-[#526D82] transition-transform duration-200 dark:text-[#9DB2BF] ${
              open ? 'rotate-180' : ''
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div class="panel-enter space-y-4 border-t border-[#9DB2BF]/45 bg-white/70 p-4 dark:border-[#526D82]/45 dark:bg-[#1D2A3B]/50">
          {children}
        </div>
      )}
    </div>
  );
}
