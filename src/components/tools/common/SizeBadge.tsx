import { calcSavingsPercent, formatBytes } from '../../../lib/format';
import type { ToolUiLabels } from '../../../i18n/types';

interface SizeBadgeProps {
  originalBytes: number;
  newBytes: number;
  labels: ToolUiLabels;
}

export default function SizeBadge({ originalBytes, newBytes, labels }: SizeBadgeProps) {
  const savings = calcSavingsPercent(originalBytes, newBytes);
  return (
    <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      <span class="rounded-lg bg-[#DDE6ED]/70 px-2.5 py-1 font-medium text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
        {labels.originalSize}: <strong class="tabular-nums">{formatBytes(originalBytes)}</strong>
      </span>
      <span aria-hidden="true" class="text-[#526D82] dark:text-[#9DB2BF]">→</span>
      <span class="rounded-lg bg-[#DDE6ED]/70 px-2.5 py-1 font-medium text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
        {labels.newSize}: <strong class="tabular-nums">{formatBytes(newBytes)}</strong>
      </span>
      {savings > 0 && (
        <span class="rounded-lg bg-[#27374D] px-2.5 py-1 font-semibold text-white dark:bg-[#DDE6ED] dark:text-[#27374D]">
          -{savings}% {labels.saved}
        </span>
      )}
    </div>
  );
}
