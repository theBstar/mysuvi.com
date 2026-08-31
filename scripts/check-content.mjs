/**
 * Validate landing-page locale files.
 *
 * The dangerous failure here is silent: `questions[].question` and
 * `options[].value` are what getwaitlist matches answers against, so a
 * translator who "helpfully" translates them breaks answer association on list
 * 21636 with no error anywhere. Everything else is a fallback and degrades
 * safely, so this checks the things that do not.
 *
 *   node scripts/check-content.mjs
 */
import { globSync } from 'node:fs'
import { basename } from 'node:path'
import { LOCALES } from '../src/data/locales.mjs'

const files = globSync('src/data/content/*.mjs').sort()
const en = (await import('../src/data/content/en.mjs')).default
let bad = 0
const fail = (m) => { console.log(`FAIL ${m}`); bad++ }

for (const f of files) {
  const code = basename(f, '.mjs')
  if (!(code in LOCALES)) {
    fail(`${f}\n     "${code}" is not a locale in src/data/locales.mjs — it will be ignored`)
    continue
  }
  const c = (await import(`../${f}`)).default
  if (code === 'en') { console.log(`ok   ${f} (source of truth)`); continue }

  const items = c.questions?.items
  if (items) {
    items.forEach((q, i) => {
      const ref = en.questions.items[i]
      if (!ref) return fail(`${f}\n     questions.items[${i}] has no English counterpart`)
      if (q.question !== undefined && q.question !== ref.question) {
        fail(`${f}\n     questions.items[${i}].question was translated. It is the getwaitlist key and must stay "${ref.question}". Translate \`label\` instead.`)
      }
      q.options?.forEach((o, k) => {
        const r = ref.options?.[k]
        if (r && o.value !== undefined && o.value !== r.value) {
          fail(`${f}\n     questions.items[${i}].options[${k}].value was translated. Stored answers must stay "${r.value}". Translate \`label\`.`)
        }
      })
    })
  }

  const plans = c.pricing?.plans
  if (plans && c.pricing.currency === undefined && plans.some((p) => p?.price !== undefined)) {
    fail(`${f}\n     pricing.plans overrides a price but not pricing.currency — the Offer schema would advertise the new number in USD`)
  }

  console.log(`ok   ${f} (${LOCALES[code].nativeName})`)
}

console.log(bad ? `\n${bad} problem(s)` : `\n${files.length} locale file(s) ok`)
process.exit(bad ? 1 : 0)
