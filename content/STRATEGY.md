# Suvi content strategy — SEO / AEO

## The risk in the brief, stated once

The plan was 5 articles/day for 7 days (35 posts) on a domain registered days ago
with no backlinks and no ranking history. That publishing shape is the exact
fingerprint Google's **scaled content abuse** policy looks for. Google's own
guidance (updated 21 May 2025): "Using generative AI tools to create many pages
without adding value for users may violate our spam policy on scaled content
abuse." Enforcement since June 2025 has been *manual actions* — removal from the
index, not a ranking dip.

The policy is not about AI. It is about thin pages produced at a rate no
editorial process could support. Thirty-five posts in seven days from a
zero-authority domain is indistinguishable from that, from the outside.

**Recommendation: same 35 articles, 5 weeks instead of 1 week.** One a day, each
with real sources and a named position. Costs five weeks; removes the single
biggest risk to the entire goal. The pipeline and the articles are identical —
only `pubDate` changes.

If you want the 7-day cadence anyway, it's your call and the work is built to
support it. Publish in clusters, not a flat dump, and expect to earn links fast.

## Who we're up against

Ranking pages for the money terms are affiliate comparison posts, not brand blogs:

| Site | Why it ranks |
|---|---|
| SafeWise | Surveyed 1,000 parents, hands-on tested 11 phones |
| Protect Young Eyes | Named reviewer, long-standing topical authority |
| Smart Social | Feature-by-feature comparison tables |
| Family Tech Zone | Tested how easily a child bypasses each control |
| Kitchen Stewardship | Parent voice, personal testing |

What they all have and we don't: **first-hand testing and a named human**. What
none of them have: a point of view on *why* restriction fails. That gap is the
wedge — they review devices, nobody argues the pedagogy.

**We do not compete on "best phones for kids" in month one.** That SERP is owned
by affiliate sites with years of authority. We compete on the questions those
posts don't answer.

## Five clusters

Each cluster is a hub plus spokes, internally linked. Cluster names match the
`cluster` field in the content collection schema.

| Cluster | Intent we serve | Example spokes |
|---|---|---|
| `first-phone` | The buying decision | What age, what to agree first, dumb phone vs launcher |
| `screen-time` | The daily fight | Why caps fail, earning vs limiting, bedtime |
| `online-safety` | Fear-driven search | What controls miss, scams, strangers, what to do after |
| `digital-literacy` | The long game | Teaching scam-spotting, questioning AI, fact-checking |
| `family-life` | Household dynamics | Sibling rules, divorced households, grandparents |

## AEO: how these pages get quoted

Answer engines lift self-contained passages. Every article therefore carries:

1. **`answers`** in front matter — the question, answered in 2-3 sentences,
   rendered in a "Short answer" box at the top. Quotable with no surrounding
   context.
2. **`sources[]`** — required by the schema, minimum one, rendered as a numbered
   list. Unsourced statistics fail the AI-smell gate.
3. **`BlogPosting` + `BreadcrumbList` JSON-LD** per article, publisher
   cross-referenced by `@id` to the Organization already in the site graph.
4. **Descriptive H2s** that name the actual content, never "Why this matters".
5. **One question per page.** Two questions is two pages.

`llms.txt` already carries the product summary; it should grow a Writing section
once there are enough articles to be worth listing.

## House style — what makes it not read like AI

Enforced by `scripts/score-cli.ts`, which scores against the taxonomy in
`scripts/lib/patterns.ts`. **The gate is `low` (score ≤ 5). Nothing publishes above it.**

Hard rules:

- No template headers ("Why this matters", "Key takeaways", "Final thoughts")
- No engagement-bait openers ("What if I told you", "Picture this")
- No "It's not about X, it's about Y" — state the point
- No three consecutive short declarative sentences
- Vary sentence length deliberately; uniformity is scored
- Every statistic names its source in the sentence
- No invented personal anecdotes (see below)

### On first-person experience

The obvious way to sound human is a parenting anecdote. **We don't invent them.**
A fabricated "my daughter turned nine in March" is a lie in the byline, and if
anyone checks, it's an E-E-A-T liability worse than sounding a bit corporate.

Where a concrete scenario helps, it's framed as a pattern ("a common thing
parents describe") rather than a memory. Real anecdotes require real parent
interviews — worth doing, and the fastest way to beat the affiliate sites on
the one axis where they're strong.

## Publishing gate

```bash
npx tsx scripts/check-scorer.ts                       # scorer regression, then every article
npx tsx scripts/score-cli.ts src/content/blog/*.md    # exits 1 above "low"
npm run build                                          # schema validation
```

`check-scorer.ts` guards the detector itself. Three false positives have already
been fixed by narrowing a pattern, and narrowing can silently blind a check — the
fixture in `scripts/fixtures/slop.md` must keep scoring `high`, and the refusal
boilerplate must keep firing, or the gate is decorative.

The content schema fails the build on a missing `answers`, an empty `sources`,
a description outside 80-165 chars, or a title over 70.

## Comparison and landscape articles

Parents research this category by brand name, so pages that map the whole market
are high-intent and heavily searched. Two rules make them worth publishing rather
than embarrassing:

**Name every option, including the free ones and the competitors.** A landscape
piece that omits Family Link and Screen Time is an advertisement. Both are free,
both are good, and a family that stops there was never going to convert anyway.

**Disclose our own category in the body, at the point of relevance** — not in a
footer, not in a disclaimer nobody reads. The line in the launcher section of
`every-kind-of-parental-control-software.md` is the pattern: state that Suvi is in
this category, say what we think it is good for, and name the case where a reader
should use something else instead.

**No per-vendor pricing tables.** Prices in this market change constantly, several
vendors block automated fetches so the numbers cannot be re-verified on a
schedule, and a stale price is a credibility problem that outlives the traffic.
Link the vendor's own pricing page and say so. Where a specific figure earns its
place, it comes from the vendor's own site and is dated in the sentence.

That SERP is owned by affiliate sites, and the one thing they structurally cannot
do is recommend the free option. That is the opening.
