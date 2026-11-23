import { useRef } from 'preact/hooks';
import type { ToolUiLabels } from '../../../i18n/types';

interface AddMoreButtonProps {
  accept: string;
  labels: ToolUiLabels;
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export default function AddMoreButton({
  accept,
  labels,
  onFilesSelected,
  disabled = false,
}: AddMoreButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      onFilesSelected(Array.from(input.files));
      input.value = '';
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        disabled={disabled}
        class="sr-only"
        tabIndex={-1}
        onChange={handleChange}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        class="inline-flex items-center gap-1.5 rounded-lg bg-[#27374D] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#526D82] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>{labels.addMoreFiles}</span>
      </button>
    </>
  );
}
