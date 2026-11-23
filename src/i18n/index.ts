import type { LocaleCode, ToolSlug } from '../config/site';
import type { ToolContent, ToolDictionary, UiDictionary } from './types';
import { uiEn } from './ui/en';
import { uiEs } from './ui/es';
import { uiPt } from './ui/pt';
import { uiDe } from './ui/de';
import { uiFr } from './ui/fr';
import { uiJa } from './ui/ja';
import { uiZhCn } from './ui/zh-cn';
import { uiRu } from './ui/ru';
import { toolsEn } from './tools/en';
import { toolsEs } from './tools/es';
import { toolsPt } from './tools/pt';
import { toolsDe } from './tools/de';
import { toolsFr } from './tools/fr';
import { toolsJa } from './tools/ja';
import { toolsZhCn } from './tools/zh-cn';
import { toolsRu } from './tools/ru';

const UI_BY_LOCALE: Record<LocaleCode, UiDictionary> = {
  en: uiEn,
  es: uiEs,
  pt: uiPt,
  de: uiDe,
  fr: uiFr,
  ja: uiJa,
  'zh-cn': uiZhCn,
  ru: uiRu,
};

const TOOLS_BY_LOCALE: Record<LocaleCode, ToolDictionary> = {
  en: toolsEn,
  es: toolsEs,
  pt: toolsPt,
  de: toolsDe,
  fr: toolsFr,
  ja: toolsJa,
  'zh-cn': toolsZhCn,
  ru: toolsRu,
};

export function getUi(locale: LocaleCode): UiDictionary {
  return UI_BY_LOCALE[locale] ?? UI_BY_LOCALE.en;
}

export function getToolsDictionary(locale: LocaleCode): ToolDictionary {
  return TOOLS_BY_LOCALE[locale] ?? TOOLS_BY_LOCALE.en;
}

export function getToolContent(locale: LocaleCode, slug: ToolSlug): ToolContent {
  return getToolsDictionary(locale)[slug];
}
