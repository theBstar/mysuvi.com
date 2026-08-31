import { DEFAULT_LOCALE, LOCALES } from '../data/locales.mjs'

/**
 * Landing-page copy, resolved per locale.
 *
 * Every locale file is merged over English, so a translation that covers the
 * hero and skips the FAQ renders a translated hero and an English FAQ rather
 * than blanks. That makes a partial translation publishable, which is the
 * difference between "translation ready" and "translated".
 */
const modules = import.meta.glob('../data/content/*.mjs', { eager: true })

// Only filenames that name a registered locale count. A stray file in this
// directory should be a mistake to fix, not a language the site claims to speak.
const byLocale = Object.fromEntries(
  Object.entries(modules)
    .map(([path, mod]) => [path.split('/').pop().replace(/\.mjs$/, ''), mod.default])
    .filter(([code]) => code in LOCALES),
)

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

/**
 * Arrays are replaced wholesale, never merged element-wise. A translated `steps`
 * array with two entries must produce two steps, not two translated entries
 * followed by a stray English third.
 */
function merge(base, override) {
  if (override === undefined) return base
  if (!isPlainObject(base) || !isPlainObject(override)) return override
  const out = { ...base }
  for (const [k, v] of Object.entries(override)) out[k] = merge(base[k], v)
  return out
}

/** Locale codes that have a content file, default first. */
export const contentLocales = Object.keys(byLocale).sort((a, b) =>
  a === DEFAULT_LOCALE ? -1 : b === DEFAULT_LOCALE ? 1 : a.localeCompare(b),
)

export const hasContent = (locale) => Boolean(byLocale[locale])

export function getContent(locale = DEFAULT_LOCALE) {
  const base = byLocale[DEFAULT_LOCALE]
  return locale === DEFAULT_LOCALE ? base : merge(base, byLocale[locale] ?? {})
}
