import type { APIRoute } from 'astro'
import { SITE } from '../data/site.mjs'
import { getContent } from '../lib/content.mjs'

const FAQ = getContent().faq

/**
 * llms.txt — a plain-text brief for answer engines that would otherwise have to
 * infer the product from rendered marketing copy. Kept generated (not hand-written)
 * so it cannot fall out of sync with the metadata the page actually ships.
 */
export const GET: APIRoute = () => {
  const out = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline}`,
    '',
    SITE.description,
    '',
    '## Links',
    `- [Home](${SITE.url})`,
  ]

  if (FAQ.length) {
    out.push('', '## FAQ', '')
    for (const { q, a } of FAQ) out.push(`### ${q}`, '', a, '')
  }

  return new Response(out.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
