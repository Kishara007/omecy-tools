export const SITE = {
  name: 'OMECY Tools',
  shortName: 'OMECY',
  origin: 'https://omecy.com',
  repoUrl: 'https://github.com/Kishara007/omecy-tools',
  supportUrl: 'https://kisharadilshan.gumroad.com/coffee',
  author: 'Kishara Dilshan',
  license: 'MIT',
  gtmId: 'GTM-T95QDVFZ',
  ga4Id: 'G-RHEMY5PF88',
  ogImage: 'https://omecy.com/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

export const LOCALES = [
  { code: 'en', name: 'English', nativeName: 'English', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', prefix: '', isDefault: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', htmlLang: 'es', hreflang: 'es', ogLocale: 'es_ES', prefix: '/es', isDefault: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', htmlLang: 'pt', hreflang: 'pt', ogLocale: 'pt_BR', prefix: '/pt', isDefault: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', htmlLang: 'de', hreflang: 'de', ogLocale: 'de_DE', prefix: '/de', isDefault: false },
  { code: 'fr', name: 'French', nativeName: 'Français', htmlLang: 'fr', hreflang: 'fr', ogLocale: 'fr_FR', prefix: '/fr', isDefault: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', htmlLang: 'ja', hreflang: 'ja', ogLocale: 'ja_JP', prefix: '/ja', isDefault: false },
  { code: 'zh-cn', name: 'Simplified Chinese', nativeName: '简体中文', htmlLang: 'zh-CN', hreflang: 'zh-CN', ogLocale: 'zh_CN', prefix: '/zh-cn', isDefault: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', htmlLang: 'ru', hreflang: 'ru', ogLocale: 'ru_RU', prefix: '/ru', isDefault: false },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];
export type NonDefaultLocaleCode = Exclude<LocaleCode, 'en'>;

export const NON_DEFAULT_LOCALES: NonDefaultLocaleCode[] = [
  'es',
  'pt',
  'de',
  'fr',
  'ja',
  'zh-cn',
  'ru',
];

export type CategoryId = 'video' | 'audio' | 'image';

export const CATEGORY_HUB_SLUGS: Record<CategoryId, string> = {
  video: 'video-tools',
  audio: 'audio-tools',
  image: 'image-tools',
};

export const HUB_SLUG_TO_CATEGORY: Record<string, CategoryId> = {
  'video-tools': 'video',
  'audio-tools': 'audio',
  'image-tools': 'image',
};

export type ToolSlug =
  | 'video-to-mp3'
  | 'webm-to-mp4'
  | 'video-compressor'
  | 'video-trimmer'
  | 'audio-joiner'
  | 'mp3-cutter'
  | 'wav-to-mp3'
  | 'm4a-to-mp3'
  | 'image-compressor'
  | 'webp-to-jpg'
  | 'heic-to-jpg'
  | 'image-resizer';

export interface ToolRegistryItem {
  slug: ToolSlug;
  category: CategoryId;
  icon:
    | 'music-video'
    | 'film-swap'
    | 'video-compress'
    | 'scissors-video'
    | 'audio-merge'
    | 'waveform-cut'
    | 'wav-mp3'
    | 'm4a-mp3'
    | 'image-compress'
    | 'webp-jpg'
    | 'heic-jpg'
    | 'image-resize';
  usesFfmpeg: boolean;
  related: [ToolSlug, ToolSlug, ToolSlug];
}

export const TOOL_REGISTRY: readonly ToolRegistryItem[] = [
  // Video Tools
  {
    slug: 'video-to-mp3',
    category: 'video',
    icon: 'music-video',
    usesFfmpeg: true,
    related: ['mp3-cutter', 'video-trimmer', 'webm-to-mp4'],
  },
  {
    slug: 'webm-to-mp4',
    category: 'video',
    icon: 'film-swap',
    usesFfmpeg: true,
    related: ['video-compressor', 'video-trimmer', 'video-to-mp3'],
  },
  {
    slug: 'video-compressor',
    category: 'video',
    icon: 'video-compress',
    usesFfmpeg: true,
    related: ['video-trimmer', 'webm-to-mp4', 'image-compressor'],
  },
  {
    slug: 'video-trimmer',
    category: 'video',
    icon: 'scissors-video',
    usesFfmpeg: true,
    related: ['video-compressor', 'video-to-mp3', 'webm-to-mp4'],
  },
  // Audio Tools
  {
    slug: 'audio-joiner',
    category: 'audio',
    icon: 'audio-merge',
    usesFfmpeg: false,
    related: ['mp3-cutter', 'wav-to-mp3', 'm4a-to-mp3'],
  },
  {
    slug: 'mp3-cutter',
    category: 'audio',
    icon: 'waveform-cut',
    usesFfmpeg: false,
    related: ['audio-joiner', 'video-to-mp3', 'wav-to-mp3'],
  },
  {
    slug: 'wav-to-mp3',
    category: 'audio',
    icon: 'wav-mp3',
    usesFfmpeg: false,
    related: ['m4a-to-mp3', 'mp3-cutter', 'audio-joiner'],
  },
  {
    slug: 'm4a-to-mp3',
    category: 'audio',
    icon: 'm4a-mp3',
    usesFfmpeg: false,
    related: ['wav-to-mp3', 'mp3-cutter', 'audio-joiner'],
  },
  // Image Tools
  {
    slug: 'image-compressor',
    category: 'image',
    icon: 'image-compress',
    usesFfmpeg: false,
    related: ['image-resizer', 'webp-to-jpg', 'heic-to-jpg'],
  },
  {
    slug: 'webp-to-jpg',
    category: 'image',
    icon: 'webp-jpg',
    usesFfmpeg: false,
    related: ['heic-to-jpg', 'image-compressor', 'image-resizer'],
  },
  {
    slug: 'heic-to-jpg',
    category: 'image',
    icon: 'heic-jpg',
    usesFfmpeg: false,
    related: ['webp-to-jpg', 'image-compressor', 'image-resizer'],
  },
  {
    slug: 'image-resizer',
    category: 'image',
    icon: 'image-resize',
    usesFfmpeg: false,
    related: ['image-compressor', 'webp-to-jpg', 'heic-to-jpg'],
  },
] as const;

export const TOOL_MAP: Record<ToolSlug, ToolRegistryItem> = Object.fromEntries(
  TOOL_REGISTRY.map((t) => [t.slug, t])
) as Record<ToolSlug, ToolRegistryItem>;

export function getToolsByCategory(category: CategoryId): ToolRegistryItem[] {
  return TOOL_REGISTRY.filter((t) => t.category === category);
}

export function getLocaleMeta(code: LocaleCode) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}
