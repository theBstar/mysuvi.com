/**
 * Regression check for the AI-smell scorer. Run after touching patterns.ts:
 * narrowing a pattern to kill a false positive must not blind the detector.
 *
 *   npx tsx scripts/check-scorer.ts
 */
import { globSync, readFileSync } from 'node:fs'
import { scoreDeterministic, total } from './lib/score.ts'
import { RISK } from './lib/patterns.ts'

let failed = 0
const check = (name: string, ok: boolean, detail: string) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${name} — ${detail}`)
  if (!ok) failed++
}

const slop = readFileSync(new URL('./fixtures/slop.md', import.meta.url), 'utf8')
const slopFindings = scoreDeterministic(slop)
const slopScore = total(slopFindings)
check('slop control scores high', slopScore > RISK.medium, `score ${slopScore}`)

for (const p of ['chatbot-artifact', 'template-header', 'engagement-bait', 'staccato', 'comparator']) {
  check(`slop control trips ${p}`, slopFindings.some((f) => f.pattern === p), slopScore ? 'found' : 'missing')
}

// The narrowed refusal patterns must still fire, and quoted speech must not.
check(
  'refusal boilerplate still caught',
  scoreDeterministic('I cannot provide that.').some((f) => f.pattern === 'chatbot-artifact'),
  'i cannot provide',
)
check(
  'quoted speech not flagged',
  !scoreDeterministic('The gap was "I cannot see who is messaging her".')
    .some((f) => f.pattern === 'chatbot-artifact'),
  'bare "i cannot"',
)

// Every published article must sit at or below the gate.
for (const f of globSync('src/content/blog/*.md')) {
  const s = total(scoreDeterministic(readFileSync(f, 'utf8')))
  check(`published: ${f.split('/').pop()}`, s <= RISK.low, `score ${s}`)
}

process.exit(failed ? 1 : 0)
