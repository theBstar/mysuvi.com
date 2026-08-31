import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { localeCodes } from './data/locales.mjs'

/**
 * Editorial front matter. `sources` is required and must be non-empty: every
 * article that makes a factual claim has to carry its citations, both because
 * the AI-smell gate flags unsourced statistics and because parenting claims
 * get quoted back at you.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Bikram Sutar'),
    cluster: z.enum(['first-phone', 'screen-time', 'online-safety', 'digital-literacy', 'family-life']),
    tags: z.array(z.string()).default([]),
    /** The one question this page answers, verbatim. Drives the AEO summary. */
    answers: z.string(),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
    draft: z.boolean().default(false),
    /**
     * Locale. Translations live at `src/content/blog/<lang>/<slug>.md`; the
     * English originals sit at the root of that directory.
     */
    lang: z.enum(localeCodes as [string, ...string[]]).default('en'),
    /**
     * Slug of the English original. Required on every translation: it is what
     * pairs the versions together for `hreflang`, and a translation that does
     * not resolve to an original is an orphan Google cannot cluster.
     */
    translationOf: z.string().optional(),
  })
    /**
     * Title and description limits are what Google will render without
     * truncating, and they are script-dependent: a Chinese character carries
     * roughly twice the information of a Latin one, so the Latin-script floor of
     * 80 would force padding rather than a tighter line. Checked here rather
     * than on the field so the rule can see `lang`.
     */
    .superRefine((d, ctx) => {
      const cjk = d.lang === 'zh'
      const [tMax, dMin, dMax] = cjk ? [36, 40, 90] : [70, 80, 165]
      if (d.title.length > tMax) {
        ctx.addIssue({ code: 'custom', path: ['title'], message: `title ${d.title.length} chars, max ${tMax} for lang "${d.lang}"` })
      }
      if (d.description.length < dMin || d.description.length > dMax) {
        ctx.addIssue({ code: 'custom', path: ['description'], message: `description ${d.description.length} chars, want ${dMin}-${dMax} for lang "${d.lang}"` })
      }
      if (d.lang !== 'en' && !d.translationOf) {
        ctx.addIssue({ code: 'custom', path: ['translationOf'], message: 'translations must name the English original' })
      }
    }),
})

export const collections = { blog }
