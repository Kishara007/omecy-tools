import { useRef, useState } from 'preact/hooks';
import type { ToolUiLabels } from '../../../i18n/types';
import MediaOrbitIcon from './MediaOrbitIcon';

interface DropzoneProps {
  accept: string;
  multiple?: boolean;
  formatsLabel: string;
  labels: ToolUiLabels;
  onFilesSelected: (files: File[]) => void;
  compact?: boolean;
}

export default function Dropzone({
  accept,
  multiple = false,
  formatsLabel,
  labels,
  onFilesSelected,
  compact = false,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    onFilesSelected(multiple ? files : [files[0]]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPicker();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={multiple ? labels.chooseFiles : labels.chooseFile}
      onClick={openPicker}
      onKeyDown={handleKeyDown}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isDragOver) setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setIsDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer?.files ?? null);
      }}
      class={`group dropzone-idle cursor-pointer rounded-2xl border-2 border-dashed text-center select-none ${
        compact ? 'px-6 py-7' : 'px-6 py-14 sm:px-12 sm:py-20'
      } ${
        isDragOver
          ? 'dropzone-active border-[#27374D] bg-[#DDE6ED]/70 dark:border-[#DDE6ED] dark:bg-[#27374D]/80'
          : 'border-[#9DB2BF] bg-[#F7F9FB]/80 hover:border-[#27374D] hover:bg-[#DDE6ED]/40 dark:border-[#526D82] dark:bg-[#121A26]/60 dark:hover:border-[#DDE6ED] dark:hover:bg-[#27374D]/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        class="sr-only"
        tabIndex={-1}
        onChange={(e) => handleFiles((e.currentTarget as HTMLInputElement).files)}
      />

      <div class="mx-auto flex flex-col items-center justify-center gap-4">
        <MediaOrbitIcon mode={isDragOver ? 'drag' : 'idle'} size={compact ? 'sm' : 'lg'} />

        <div class="space-y-1.5">
          <p class={`${compact ? 'text-base' : 'text-lg sm:text-xl'} font-semibold text-[#27374D] dark:text-[#DDE6ED]`}>
            {multiple ? labels.dropFilesHere : labels.dropFileHere}
          </p>
          <p class="text-sm text-[#526D82] dark:text-[#9DB2BF]">{labels.orClickBrowse}</p>
        </div>

        <span class="inline-flex items-center gap-2 rounded-xl bg-[#27374D] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#526D82] dark:bg-[#DDE6ED] dark:text-[#27374D] dark:hover:bg-[#9DB2BF]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {compact ? labels.addMoreFiles : multiple ? labels.chooseFiles : labels.chooseFile}
        </span>

        <div class="flex flex-col items-center justify-center gap-2.5 pt-1.5 text-xs font-medium text-[#526D82] dark:text-[#9DB2BF]">
          <span class="rounded-full bg-[#DDE6ED]/80 px-3.5 py-1 text-[#27374D] dark:bg-[#27374D] dark:text-[#DDE6ED]">
            {formatsLabel}
          </span>
          <span class="inline-flex items-center justify-center gap-1.5 text-center leading-snug">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true" class="shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{labels.privacyBadge}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
