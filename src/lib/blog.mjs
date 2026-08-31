import { getCollection } from 'astro:content'
import { AUTHOR, SITE } from '../data/site.mjs'
import { DEFAULT_LOCALE, LOCALES, UI, articlePath, blogPath } from '../data/locales.mjs'

/**
 * The English slug an entry belongs to. Translations live at
 * `blog/<lang>/<slug>.md`, so their collection id carries the locale prefix;
 * `translationOf` is the authoritative link and the path is only a fallback.
 */
export const baseSlug = (post) =>
  post.data.lang === DEFAULT_LOCALE
    ? post.id
    : (post.data.translationOf ?? post.id.split('/').slice(1).join('/'))

export const published = ({ data }) => !data.draft

/** Published posts in one locale, newest first. */
export async function postsIn(locale) {
  const posts = await getCollection('blog', (p) => published(p) && p.data.lang === locale)
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
}

/** `{ [englishSlug]: { [locale]: post } }` across every locale. */
export async function translationIndex() {
  const posts = await getCollection('blog', published)
  const index = {}
  for (const post of posts) {
    const slug = baseSlug(post)
    ;(index[slug] ??= {})[post.data.lang] = post
  }
  return index
}

/**
 * hreflang alternates for one article. Every version lists every version
 * including itself — a non-reciprocal set gets dropped by Google — and the
 * default locale leads so `x-default` resolves to the English original.
 */
export function alternatesFor(index, slug) {
  const byLocale = index[slug] ?? {}
  return Object.keys(LOCALES)
    .filter((code) => byLocale[code])
    .map((code) => ({ code, path: articlePath(code, slug) }))
}

/** Absolute URL of an article in one locale. */
export const articleUrl = (locale, slug) => new URL(articlePath(locale, slug), SITE.url).href

/**
 * BlogPosting + BreadcrumbList for one article.
 *
 * Lives here rather than in `Article.astro` because Astro does not forward a
 * named slot through a nested component — the `<script slot="head">` has to be
 * a direct child of the layout, so the route renders it.
 */
export function articleJsonLd(post, locale, slug) {
  const d = post.data
  const url = articleUrl(locale, slug)
  const t = UI[locale]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: d.title,
        description: d.description,
        datePublished: d.pubDate.toISOString(),
        ...(d.updatedDate && { dateModified: d.updatedDate.toISOString() }),
        author: {
          '@type': 'Person',
          name: d.author,
          url: AUTHOR.url,
          jobTitle: AUTHOR.role,
          ...(AUTHOR.sameAs.length && { sameAs: AUTHOR.sameAs }),
        },
        publisher: { '@id': `${SITE.url}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        inLanguage: LOCALES[locale].htmlLang,
        keywords: d.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.home, item: SITE.url },
          { '@type': 'ListItem', position: 2, name: t.blog, item: `${SITE.url}${blogPath(locale)}` },
          { '@type': 'ListItem', position: 3, name: d.title, item: url },
        ],
      },
    ],
  }
}

/** Locales that actually have at least one published post, default first. */
export async function localesWithPosts() {
  const posts = await getCollection('blog', published)
  const present = new Set(posts.map((p) => p.data.lang))
  return Object.keys(LOCALES).filter((code) => present.has(code))
}
