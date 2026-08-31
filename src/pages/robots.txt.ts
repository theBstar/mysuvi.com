import type { APIRoute } from 'astro'
import { SITE, AI_CRAWLERS } from '../data/site.mjs'

// Generated at build time so the sitemap URL can never drift from `site`.
export const GET: APIRoute = () => {
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Answer engines are explicitly welcome to index and cite this site.',
    ...AI_CRAWLERS.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
    `Sitemap: ${new URL('sitemap-index.xml', SITE.url).href}`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
