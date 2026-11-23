import { LOCALES, SITE, type LocaleCode } from '../config/site';

/**
 * Build a localized relative path respecting trailingSlash: 'never'.
 * - ('en', '') => '/'
 * - ('es', '') => '/es'
 * - ('en', 'video-to-mp3') => '/video-to-mp3'
 * - ('es', 'video-to-mp3') => '/es/video-to-mp3'
 */
export function localizePath(locale: LocaleCode, slug = ''): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (locale === 'en') {
    return cleanSlug ? `/${cleanSlug}` : '/';
  }
  return cleanSlug ? `/${locale}/${cleanSlug}` : `/${locale}`;
}

/**
 * Build an absolute canonical URL on https://omecy.com
 */
export function buildCanonicalUrl(locale: LocaleCode, slug = ''): string {
  const path = localizePath(locale, slug);
  return `${SITE.origin}${path}`;
}

/**
 * Generate full bidirectional hreflang entries + x-default for a given route slug.
 */
export function buildHreflangLinks(slug = ''): Array<{ hreflang: string; href: string }> {
  const links: Array<{ hreflang: string; href: string }> = LOCALES.map((loc) => ({
    hreflang: loc.hreflang,
    href: buildCanonicalUrl(loc.code, slug),
  }));
  links.push({
    hreflang: 'x-default',
    href: buildCanonicalUrl('en', slug),
  });
  return links;
}

/**
 * Validate whether a string is a supported locale code.
 */
export function isLocaleCode(value: string): value is LocaleCode {
  return LOCALES.some((l) => l.code === value);
}
