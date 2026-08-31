# Suvi distribution plan — newsletters, APAC, translation

## The brief, and where it holds up

Three claims in the ask. Two are right.

**"Newsletters drive crazy traffic."** True, and under-rated. A feature in a
newsletter a parent actually reads outperforms months of cold SEO on a
three-week-old domain, and the link is editorial, which is the only kind that
compounds.

**"It is easy to feature in APAC."** Also true. It is easy for a reason that
matters: the outlets with no editorial bar are the ones with no readers. Getting
into them is easy and worth close to nothing. The APAC opportunity is real, but
it is not the easy end of it.

**"Translations for all major languages."** This one is out of order rather than
wrong — see the sequencing section.

The gap in all three is the same: **we have nothing a good editor wants yet.**
Editors do not feature blog posts. They feature data, tools, and people. Fixing
that is most of this plan.

## The blocker: there is no human on this site

Every journalist-request platform — the mechanism behind most real editorial
placements — requires a named source with a title and a bio. Articles here are
bylined "Suvi", and `[...slug].astro` emits `author: { '@type': 'Organization' }`
in the JSON-LD.

That single fact disqualifies us from the highest-ROI channel available, and it
is simultaneously the biggest E-E-A-T weakness against SafeWise and Protect Young
Eyes, both of which put a named tester on every review.

**Fix first, before any outreach:** a real name and title on the articles, an
`/about` page with a bio and a photo, `@type: Person` in the article JSON-LD with
`sameAs` pointing at LinkedIn. Half a day of work. Nothing else in this document
starts until it is done.

## Track 1 — Become quotable (free, start immediately)

Journalists writing about kids and phones need a source on deadline every week.
Answering them is free, produces genuine editorial links from real publications,
and breaks no policy.

HARO shut down as Connectively on 9 December 2024. The replacements:

| Platform | Cost | Note |
|---|---|---|
| Source of Sources | Free | Launched by Peter Shankman, who built the original HARO |
| HARO | Free | Revived by Featured.com in April 2025, sponsorship-funded |
| Featured | Freemium | Question-led, good for evergreen expert answers |
| Qwoted | Freemium | Verifies both sides, higher-quality requests |

Budget 20 minutes a day. Answer only where we have a genuine position — the
"restriction versus capability" argument is ours and nobody else in this niche is
making it.

## Track 2 — Build something worth featuring (weeks 2–8)

Two assets, in priority order.

**Original survey data.** Nobody links a blog post. Everybody links "we surveyed
500 parents and found X." A panel survey of 300–500 parents on first-phone
decisions runs roughly $500–1,500 through Prolific or a similar panel. It gives
us a citable number, a press hook, a reason for every newsletter in the space to
mention us, and it fixes the E-E-A-T gap in one move — SafeWise ranks partly
because it surveyed 1,000 parents.

**A free tool.** Newsletters feature tools far more readily than essays. The
landscape article already contains the logic for a "which category of parental
control fits my household" chooser. Building it as a page costs days, not weeks,
and it is linkable by people who would never link a product page.

## Track 3 — The launch moment (when the product ships)

Newsletter attention is a one-shot resource. We can be new to any given editor
exactly once, and spending that on a waitlist for software nobody can install yet
converts to a signup that goes cold before the product arrives.

Sequence, per the standard launch playbook:

1. **Peerlist Launchpad now.** Free, weekly: the window opens Monday 00:00 UTC and
   the launch runs all week, so it is not a single-day scramble. Needs a verified
   *personal* profile — company accounts cannot launch — and a project filled in
   to 100%. Strong Indian developer audience. Asking for upvotes is a bannable
   offence, so don't.

   **BetaList is no longer free.** Checked 1 September 2026: "All submissions are
   paid. There is no free submission option," with an automatic refund if the
   startup isn't selected. Still the right *fit* for a pre-launch product — it
   just now costs money, so treat it as a small paid experiment rather than the
   default first move.
2. **Product Hunt at ship, not before.** It is a six-week project. Successful
   launches draw the majority of day-one traffic from a pre-built waitlist and
   need roughly 200 supporters queued for the first hour. Our waitlist is the
   ammunition for that day.
3. **Newsletter pitches timed to the launch.** Personal, one at a time, naming
   the specific piece we think fits their readers.

## APAC: the real opportunity and the real prerequisite

The strongest argument for this product anywhere in the world is APAC Android
share. StatCounter puts Android at 95.21% in India and 86.8% in Indonesia. A
launcher that runs on the phone a family already owns is a far better fit there
than a $200 dedicated handset, which is the entire US competitive set.

**The prerequisite is pricing.** The site currently prices at $8/month USD. In
India that is not a low price, and no amount of traffic converts against it.
Local pricing is a precondition for APAC distribution, not a follow-up.

Targets worth real effort:

- **theAsianparent** (The Parentinc) — the single most valuable APAC placement.
  Raised $22M led by East Ventures, operates across Singapore, Bangkok, Jakarta,
  Kuala Lumpur, Manila, Ho Chi Minh City and Mumbai. Their readership is exactly
  our reader.
- **Regional tech press** — YourStory, Tech in Asia, e27 for the launch story.
- **School and PTA channels** — unglamorous, zero competition, and the audience
  converts better than any newsletter.

**Paid newswire is not a strategy.** Media OutReach and similar APAC wire
services will place a release widely and cheaply. Google requires links in press
releases to be marked `nofollow` or `sponsored`, so they pass no ranking value,
and the referral traffic is modest. One release at launch, for the record. Not a
channel.

## Translation: right idea, wrong position in the queue

Google has softened here. The guidance about blocking auto-translated content has
been removed from the multilingual documentation, and Reddit now runs machine
translation across roughly 22 languages with rankings that have gone up rather
than down. Translation is no longer disqualifying on its own.

The constraint is ours, not Google's. **Translating the site before the product
speaks the language builds a bounce machine.** A parent who reads a fluent Hindi
article, clicks through, and lands on an English app with USD pricing has been
wasted, and they were the most expensive visitor we will ever acquire.

Correct order:

1. Product UI localised
2. Pricing localised
3. Landing page translated
4. Articles translated

And start with **one** language, human-reviewed, measured for a month before the
second. Six articles multiplied across ten languages is sixty machine-translated
pages on a domain with no history — which is the scaled-content shape regardless
of how Google's stance on translation specifically has moved. Bahasa Indonesia
and Hindi are the strongest first candidates on Android share alone.

## What we are not doing

- **Auto-syndication and paid guest-post networks.** Mass-placed identical
  content across many domains is a link scheme. Google has taken manual action
  against guest-posting networks before, and many of the directories that used to
  carry this traffic are now deindexed — a link from them is a liability.
- **Volume placement in low-bar APAC outlets.** Easy, cheap, and read by nobody.
- **Buying links in any form.**

## Sequence

| When | What |
|---|---|
| Week 1 | Named author, `/about` page, `Person` JSON-LD. Register on the four source platforms. Submit to BetaList. |
| Weeks 2–4 | Answer journalist requests daily. Commission the parent survey. Google Search Console. |
| Weeks 4–6 | Publish survey results as the flagship piece. Build the chooser tool. First personal newsletter pitches. |
| Weeks 6–10 | APAC pricing decision. If yes, one language, human-reviewed. theAsianparent pitch. |
| At ship | Product Hunt, timed newsletter round, one wire release. |

## Open question

"Automated newsletters" reads two ways. If it means RSS-fed automatic digests,
those have near-zero readership and the links carry no weight — skip them. If it
means the curated newsletters that publish on a regular automated schedule, that
is Track 1 and Track 3 above and it is where the value is. Worth confirming which
was meant before week 4.
