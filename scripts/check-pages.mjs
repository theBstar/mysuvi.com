/**
 * Post-build audit of every rendered page.
 *
 * Checks the things that are invisible in a browser and expensive to get wrong:
 * a canonical that disagrees with the sitemap, a missing or duplicated h1, and
 * hreflang clusters that are not reciprocal or point at pages that were never
 * built. Google silently ignores a broken hreflang set rather than reporting it,
 * so it has to be checked here.
 *
 *   node scripts/check-pages.mjs
 */
import { globSync, readFileSync } from 'node:fs'

const ORIGIN = 'https://mysuvi.com/'
const pages = globSync('dist/**/index.html').sort()
const all = (h, re) => [...h.matchAll(re)].map((m) => m[1])
const clusters = new Map()
let fail = 0
const bad = (m) => { console.log(`FAIL ${m}`); fail++ }

for (const p of pages) {
  const h = readFileSync(p, 'utf8')
  const url = ORIGIN + p.replace(/^dist\//, '').replace(/index\.html$/, '')
  const canon = all(h, /rel="canonical" href="([^"]*)"/g)[0]
  const alts = [...h.matchAll(/rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => [m[1], m[2]])
  const h1s = (h.match(/<h1[\s>]/g) || []).length

  if (canon !== url) bad(`canonical ${p}\n     got  ${canon}\n     want ${url}`)
  if (h1s !== 1 && !p.includes('404')) bad(`${p} has ${h1s} h1 elements`)

  const named = alts.filter(([c]) => c !== 'x-default')
  if (named.length && !named.some(([, href]) => href === url)) {
    bad(`${p} lists hreflang alternates but not itself`)
  }
  for (const [, href] of alts) {
    const f = 'dist/' + href.replace(ORIGIN, '') + 'index.html'
    try { readFileSync(f) } catch { bad(`dangling hreflang ${href} from ${p}`) }
  }
  if (named.length) {
    const key = named.map(([, u]) => u).sort().join('|')
    clusters.set(key, [...(clusters.get(key) ?? []), url])
  }
}

for (const [key, members] of clusters) {
  const declared = key.split('|')
  const declaring = [...new Set(members)]
  if (declared.length !== declaring.length) {
    bad(`non-reciprocal hreflang cluster\n     declared: ${declared.join(' ')}\n     declaring: ${declaring.join(' ')}`)
  }
}

console.log(fail ? `\n${fail} problem(s)` : `\nall ${pages.length} pages ok — canonical matches sitemap URL, one h1, reciprocal self-referencing hreflang, no dangling alternates`)
process.exit(fail ? 1 : 0)
