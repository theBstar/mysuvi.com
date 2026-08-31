import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { SITE } from './src/data/site.mjs'

// Fully static output. Every route is prerendered to HTML at build time.
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto', format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  compressHTML: true,
})
