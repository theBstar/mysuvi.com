/**
 * Front-matter length audit across every locale.
 *
 * The content schema fails the build on a violation, which is the right
 * behaviour but a slow way to find them one at a time — Spanish, Portuguese and
 * German all run 15-25% longer than the English they are translated from, so a
 * batch of translations usually trips this more than once.
 */
import { globSync, readFileSync } from 'node:fs'

const LIMITS = { zh: { t: 36, dMin: 40, dMax: 90 }, _: { t: 70, dMin: 80, dMax: 165 } }
let bad = 0

for (const f of globSync('src/content/blog/**/*.md').sort()) {
  const md = readFileSync(f, 'utf8')
  const get = (k) => md.match(new RegExp(`^${k}:\\s*"(.*)"\\s*$`, 'm'))?.[1] ?? ''
  const lang = md.match(/^lang:\s*"?([\w-]+)"?\s*$/m)?.[1] ?? 'en'
  const lim = LIMITS[lang] ?? LIMITS._
  const t = get('title'), d = get('description')
  const errs = []
  if (t.length > lim.t) errs.push(`title ${t.length}>${lim.t}`)
  if (d.length < lim.dMin || d.length > lim.dMax) errs.push(`description ${d.length} not in ${lim.dMin}-${lim.dMax}`)
  if (errs.length) { bad++; console.log(`FAIL ${f}\n     ${errs.join(', ')}`) }
  else console.log(`ok   ${f.replace('src/content/blog/', '').padEnd(58)} t=${String(t.length).padStart(3)} d=${String(d.length).padStart(3)} (${lang})`)
}

/**
 * CJK paragraphs must not be hard-wrapped. Markdown joins a wrapped line with a
 * space, and between two Chinese characters that space renders and is wrong.
 * Any editor with auto-wrap on will reintroduce this, so it is checked.
 */
const CJK = /[\u3000-\u303f\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/
for (const f of globSync('src/content/blog/zh/*.md').sort()) {
  const body = readFileSync(f, 'utf8').replace(/^---[\s\S]*?\n---\n/, '')
  const lines = body.split('\n')
  const wrapped = []
  for (let i = 0; i < lines.length - 1; i++) {
    const a = lines[i].trimEnd(), b = lines[i + 1].trimStart()
    if (!a || !b) continue
    if (/^(#|>|```|\s*(?:[-*+]|\d+\.)\s)/.test(b)) continue
    if (CJK.test(a.slice(-1)) && CJK.test(b[0])) wrapped.push(i + 1)
  }
  if (wrapped.length) { bad++; console.log(`FAIL ${f}\n     hard-wrapped CJK paragraph at line(s) ${wrapped.slice(0, 5).join(', ')}`) }
  else console.log(`ok   ${f.replace('src/content/blog/', '').padEnd(58)} no wrapped CJK`)
}

process.exit(bad ? 1 : 0)
