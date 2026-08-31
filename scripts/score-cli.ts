/** Score one or more markdown files for AI-writing patterns. */
import { readFileSync } from 'node:fs'
import { langOf, scoreDeterministic, total } from './lib/score.ts'
import { riskOf } from './lib/patterns.ts'

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error('usage: tsx scripts/score-cli.ts <file.md> [...]')
  process.exit(2)
}

let worst = 0
for (const f of files) {
  const md = readFileSync(f, 'utf8')
  // The taxonomy is English-only. Scoring a translation measures nothing.
  const lang = langOf(md)
  if (lang !== 'en') {
    console.log(`\n${f}  →  skipped (lang: ${lang})`)
    continue
  }
  const findings = scoreDeterministic(md)
  const score = total(findings)
  worst = Math.max(worst, score)
  console.log(`\n${f}  →  score ${score} (${riskOf(score)})`)
  if (findings.length === 0) console.log('  no deterministic findings')
  for (const x of findings.sort((a, b) => b.weight - a.weight)) {
    console.log(`  +${x.weight}  ${x.pattern.padEnd(22)} ${x.evidence}`)
  }
}
// Gate: anything above "low" fails.
process.exit(worst > 5 ? 1 : 0)
