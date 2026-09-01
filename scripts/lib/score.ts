/**
 * Deterministic half of the AI-smell check.
 *
 * Everything here is regex/statistics — no model call, no cost, no variance.
 * The LLM reviewer (review.ts) handles only what genuinely needs judgment:
 * the horoscope test, manufactured personality, self-promotional framing, and
 * whether a statistic is actually sourced. Splitting it this way means the
 * cheap checks run on every draft and the expensive ones stay defensible.
 */
import {
  TIER1, TIER2, TIER3, ENGAGEMENT_BAIT, TEMPLATE_HEADERS,
  CHATBOT_ARTIFACTS, WEIGHTS,
} from './patterns.ts'

export interface Finding {
  pattern: string
  weight: number
  evidence: string
  line?: number
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const wordRe = (p: string) => new RegExp(`\\b${escape(p)}\\b`, 'gi')

/** Strip fenced code and inline code so snippets don't trip prose rules. */
const stripCode = (md: string) =>
  md.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')

/** Body prose only: drop front matter, headings, list markers, links. */
export function prose(md: string): string {
  return stripCode(md)
    .replace(/^---[\s\S]*?^---/m, '')
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
}

/**
 * Prose with list items removed entirely.
 *
 * The rhythm checks (staccato, uniformity) measure how paragraphs read. A
 * bulleted list of short items is normal writing, not fragment spam — flattening
 * bullets into the sentence stream made every list look like staccato.
 */
export function proseNoLists(md: string): string {
  const src = stripCode(md)
    .replace(/^---[\s\S]*?^---/m, '')
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')

  // Drop each list item AND its wrapped continuation lines. Matching only the
  // marker line left the rest of a wrapped bullet in the sentence stream, which
  // is what made ordinary lists look like fragment spam.
  const out: string[] = []
  let inItem = false
  for (const line of src.split('\n')) {
    if (/^\s*(?:[-*+]|\d+\.)\s+/.test(line)) { inItem = true; continue }
    if (inItem && /^\s+\S/.test(line)) continue   // indented continuation
    inItem = false
    out.push(line)
  }
  return out.join('\n')
}

export function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

/**
 * Locale of a markdown file, from its front matter. The pattern taxonomy is
 * English-only — running it over Spanish or Chinese prose produces noise, not
 * findings — so every caller must skip anything but `en`.
 */
export function langOf(md: string): string {
  return md.match(/^lang:\s*["']?([\w-]+)["']?\s*$/m)?.[1] ?? 'en'
}

export function scoreDeterministic(md: string): Finding[] {
  const out: Finding[] = []
  const body = prose(md)
  const lower = body.toLowerCase()
  const sents = sentences(body)
  // Rhythm checks ignore lists; lexical checks still see them.
  const rhythmSents = sentences(proseNoLists(md))

  // --- Tier 1: density, not blocklist -------------------------------------
  const t1Hits = TIER1.filter((p) => wordRe(p).test(lower))
  if (t1Hits.length >= 3) {
    out.push({
      pattern: 'tier1-cluster',
      weight: WEIGHTS.tier1Cluster,
      evidence: `${t1Hits.length} AI-vocabulary tells clustered: ${t1Hits.slice(0, 6).join(', ')}`,
    })
  } else {
    for (const p of t1Hits) {
      out.push({ pattern: 'tier1-isolated', weight: WEIGHTS.tier1Isolated, evidence: p })
    }
  }

  // --- Tier 2: only counts when repeated ----------------------------------
  for (const p of TIER2) {
    const n = (lower.match(wordRe(p)) ?? []).length
    if (n >= 2) {
      out.push({ pattern: 'tier2-repeated', weight: WEIGHTS.tier2Repeated, evidence: `"${p}" x${n}` })
    }
  }

  // --- Tier 3: clusters only ----------------------------------------------
  const t3 = TIER3.filter((p) => wordRe(p).test(lower))
  if (t3.length >= 3) {
    out.push({ pattern: 'tier3-cluster', weight: WEIGHTS.tier3Cluster, evidence: t3.join(', ') })
  }

  // --- Hard fails ---------------------------------------------------------
  for (const p of CHATBOT_ARTIFACTS) {
    if (lower.includes(p)) {
      out.push({ pattern: 'chatbot-artifact', weight: WEIGHTS.chatbotArtifact, evidence: p })
    }
  }
  for (const p of ENGAGEMENT_BAIT) {
    if (lower.includes(p)) {
      out.push({ pattern: 'engagement-bait', weight: WEIGHTS.engagementBait, evidence: p })
    }
  }

  // --- Template headers ----------------------------------------------------
  for (const h of md.match(/^#{1,6}\s+(.*)$/gm) ?? []) {
    const text = h.replace(/^#{1,6}\s+/, '').toLowerCase().trim()
    if (TEMPLATE_HEADERS.some((t) => text === t || text.startsWith(t))) {
      out.push({ pattern: 'template-header', weight: WEIGHTS.templateHeader, evidence: h.trim() })
    }
  }

  // --- Staccato fragment spam: 3+ consecutive short declaratives ----------
  // Per paragraph: a run that spans a paragraph break is not fragment spam.
  for (const para of proseNoLists(md).split(/\n\s*\n/)) {
    let run = 0
    for (const s of sentences(para)) {
      const words = s.split(/\s+/).length
      if (words > 0 && words < 10 && !/[?!]$/.test(s)) {
        run++
        if (run === 3) {
          out.push({ pattern: 'staccato', weight: WEIGHTS.staccato, evidence: s.replace(/\s+/g, ' ').slice(0, 70) })
        }
      } else run = 0
    }
  }

  // --- Sentence uniformity: low variance in length is a rhythm tell -------
  if (rhythmSents.length >= 8) {
    const lens = rhythmSents.map((s) => s.split(/\s+/).length)
    const mean = lens.reduce((a, b) => a + b, 0) / lens.length
    const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length)
    if (sd < 5 && mean > 8) {
      out.push({
        pattern: 'sentence-uniformity',
        weight: WEIGHTS.uniformity,
        evidence: `mean ${mean.toFixed(1)} words, sd ${sd.toFixed(1)} — too even`,
      })
    }
  }

  // --- Negative parallelism / comparator sentences ------------------------
  const comparator =
    /\b(?:it'?s|this is|that'?s)\s+not\s+(?:just\s+)?(?:about\s+)?[^.!?]{2,60}?,?\s+(?:it'?s|but)\b/gi
  for (const m of body.match(comparator) ?? []) {
    out.push({ pattern: 'comparator', weight: WEIGHTS.comparator, evidence: m.trim().slice(0, 70) })
  }

  // --- Inline-header vertical lists: "**The problem:** ..." ---------------
  const inlineHeaders = (md.match(/^\s*[-*]\s+\*\*[^*]{2,40}:\*\*/gm) ?? []).length
  if (inlineHeaders >= 3) {
    out.push({
      pattern: 'inline-header-list',
      weight: WEIGHTS.inlineHeaderList,
      evidence: `${inlineHeaders} bolded-lead bullets`,
    })
  }

  // --- Em dash overuse ----------------------------------------------------
  const emDashes = (body.match(/—/g) ?? []).length
  const per1k = (emDashes / Math.max(body.split(/\s+/).length, 1)) * 1000
  if (per1k > 6) {
    out.push({
      pattern: 'em-dash-overuse',
      weight: WEIGHTS.emDashOveruse,
      evidence: `${emDashes} em dashes (${per1k.toFixed(1)}/1k words)`,
    })
  }

  // --- Vague attribution: "studies show 73%" with nobody named ------------
  // Parenting claims get quoted back at you. A stat needs a real source, not
  // an appeal to an unnamed authority.
  const hedge = /\b(?:studies show|research shows?|experts?\s+(?:say|believe|agree)|studies suggest|research suggests?|it is widely (?:believed|accepted)|many (?:experts|parents|studies))\b/i
  for (const s of sents) {
    if (!hedge.test(s)) continue
    const named = /\b(?:19|20)\d{2}\b/.test(s) || /\b[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]+)*\b/.test(s.replace(/^[^a-z]*/, ''))
    if (!named) {
      out.push({ pattern: 'vague-attribution', weight: WEIGHTS.vagueAttribution, evidence: s.trim().slice(0, 90) })
    }
  }

  // --- Fabricated precision: a hard stat with no nearby citation ----------
  for (const s of sents) {
    // No trailing \b: '%' and the following space are both non-word chars,
    // so a boundary never matches there and every percentage was missed.
    const hasStat = /\b\d+(?:\.\d+)?\s?(?:%|percent\b|x\b)/i.test(s)
    // A named organisation plus an attributing verb counts as a source:
    // "Google asks for at least 70%" is attributed, "73% of parents" is not.
    const namedSource =
      /\b[A-Z][A-Za-z&.'’-]*(?:\s+(?:of|for|and|the)?\s*[A-Z][A-Za-z&.'’-]*)*(?:'s|’s)?\s+(?:says?|said|states?|asks?|advises?|recommends?|requires?|reports?|found|puts?|notes?|specifies)\b/.test(s)
    const hasSource =
      /\b(?:according to|sources?|stud(?:y|ies)|surveys?|reports?|research|found by|\[\d+\]|per )\b/i.test(s) ||
      namedSource
    if (hasStat && !hasSource) {
      out.push({
        pattern: 'fabricated-precision',
        weight: WEIGHTS.fabricatedPrecision,
        evidence: s.trim().slice(0, 90),
      })
    }
  }

  return out
}

export const total = (f: Finding[]) => f.reduce((a, b) => a + b.weight, 0)
