import type { CategoryId, ToolSlug } from '../config/site';

export interface SeoMeta {
  title: string; // Strictly 50-60 characters
  description: string; // Strictly 130-155 characters
  h1: string;
  subtitle: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolContent {
  name: string;
  shortName: string;
  cardDesc: string;
  meta: SeoMeta;
  howToTitle: string;
  howToSteps: [string, string, string];
  whyLocalTitle: string;
  whyLocalPoints: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string }
  ];
  aboutTitle: string;
  aboutParagraphs: [string, string];
  faqTitle: string;
  faqs: FaqItem[];
  relatedTitle: string;
}

export interface CategoryHubContent {
  name: string;
  navLabel: string;
  badge: string;
  meta: SeoMeta;
  introHeading: string;
  introBody: string;
  benefitsHeading: string;
  benefits: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string }
  ];
}

export interface PrivacySection {
  heading: string;
  body: string;
}

export interface ToolUiLabels {
  dropFilesHere: string;
  dropFileHere: string;
  orClickBrowse: string;
  chooseFile: string;
  chooseFiles: string;
  addMoreFiles: string;
  privacyBadge: string;
  clearAll: string;
  remove: string;
  processing: string;
  loadingEngine: string;
  loadingEngineHint: string;
  convert: string;
  compress: string;
  trim: string;
  merge: string;
  resize: string;
  extractAudio: string;
  download: string;
  downloadAllZip: string;
  startOver: string;
  originalSize: string;
  newSize: string;
  saved: string;
  quality: string;
  bitrate: string;
  format: string;
  preset: string;
  presetFast: string;
  presetBalanced: string;
  presetHigh: string;
  presetWhatsapp: string;
  presetDiscord: string;
  presetEmail: string;
  presetWeb: string;
  presetCustom: string;
  resolution: string;
  original: string;
  startTime: string;
  endTime: string;
  duration: string;
  setCurrentStart: string;
  setCurrentEnd: string;
  fastCopyMode: string;
  accurateMode: string;
  crossfade: string;
  fadeIn: string;
  fadeOut: string;
  seconds: string;
  playSelection: string;
  stop: string;
  moveUp: string;
  moveDown: string;
  width: string;
  height: string;
  percentage: string;
  pixels: string;
  lockAspectRatio: string;
  bgColorFill: string;
  ready: string;
  done: string;
  errorGeneric: string;
  errorUnsupported: string;
  errorMinTwoFiles: string;
  errorInvalidRange: string;
  errorHeic: string;
  fileCount: string;
  convertingFile: string;
  encodingMp3: string;
  decodingAudio: string;
  preparingZip: string;
  outputPreview: string;
  socialPresets: string;
  noFileSelected: string;
  resetTrim: string;
  cursor: string;
  play: string;
  pause: string;
  applyChanges: string;
  settingsChangedHint: string;
  changesApplied: string;
  moreSettings: string;
  before: string;
  after: string;
  fitModeCrop: string;
  fitModeContain: string;
  fitModeStretch: string;
  cropHint: string;
  bgBlur: string;
  bgWhite: string;
  bgBlack: string;
  bgTransparent: string;
}

export interface UiDictionary {
  nav: {
    home: string;
    video: string;
    audio: string;
    image: string;
    privacy: string;
    support: string;
    supportAria: string;
    githubAria: string;
    languageAria: string;
    languageLabel: string;
    themeToggleAria: string;
    darkMode: string;
    lightMode: string;
    breadcrumbAria: string;
    mainNavAria: string;
    skipToMain: string;
  };
  footer: {
    tagline: string;
    videoHeading: string;
    audioHeading: string;
    imageHeading: string;
    projectHeading: string;
    privacyLink: string;
    githubLink: string;
    supportLink: string;
    copyright: string;
    localGuarantee: string;
  };
  home: {
    meta: SeoMeta;
    badge: string;
    exploreVideo: string;
    exploreAudio: string;
    exploreImage: string;
    allToolsHeading: string;
    allToolsSubheading: string;
    whyHeading: string;
    whySubheading: string;
    pillars: [
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string }
    ];
    openTool: string;
    viewAllCategory: string;
  };
  categories: Record<CategoryId, CategoryHubContent>;
  privacy: {
    meta: SeoMeta;
    lastUpdated: string;
    sections: PrivacySection[];
  };
  toolUi: ToolUiLabels;
}

export type ToolDictionary = Record<ToolSlug, ToolContent>;
