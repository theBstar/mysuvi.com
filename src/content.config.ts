import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * Editorial front matter. `sources` is required and must be non-empty: every
 * article that makes a factual claim has to carry its citations, both because
 * the AI-smell gate flags unsourced statistics and because parenting claims
 * get quoted back at you.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(80).max(165),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Bikram Sutar'),
    cluster: z.enum(['first-phone', 'screen-time', 'online-safety', 'digital-literacy', 'family-life']),
    tags: z.array(z.string()).default([]),
    /** The one question this page answers, verbatim. Drives the AEO summary. */
    answers: z.string(),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
