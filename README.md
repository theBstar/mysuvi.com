# mysuvi.com

Landing page for **Suvi** — a safe phone interface for kids that grows with them.
Astro 5, `output: 'static'`: every route is prerendered at build time. The only
JavaScript on the page is the Google Analytics tag and the consent banner —
every component, the FAQ accordion and the scroll animations are pure HTML
and CSS.

```bash
npm install
npm run dev      # dev server
npm run build    # -> dist/
npm run preview  # serve dist/
```

## Source of truth

Built from the approved design, `Suvi Landing.dc.html` (Claude Design project
`64feec2d`), including the copy bound through its `renderVals()` block. Brand
assets are the exported SVGs, in [`public/brand/`](public/brand/).

Suvi is launching **software first** — an Android launcher that runs on a phone
the family already owns. Nothing from the earlier SafePhone *device* page
survives here: no hardware framing, no deposit, no rupee pricing. Don't
reintroduce it.

### The reward model (diverges from the design)

The design said children earn **screen time**. They don't. Positive usage —
reading, a learning app, time outdoors, chores — earns **points**, and points go
toward a real-world reward the child chooses and the parent agrees to, such as
bicycle gear. Points are never redeemed for more screen time; that contrast is
the point and it is stated explicitly in the copy.

Screen time is still budgeted by the parent, and *feature* unlocks (messaging, a
browser) are still earned through demonstrated responsibility. Three separate
currencies — don't collapse them when editing copy.

## Content model

All copy and metadata live in [`src/data/site.mjs`](src/data/site.mjs). Editing
it updates the page, every meta tag, the JSON-LD graph, the sitemap,
`robots.txt` and `llms.txt` together.

| Export | Drives |
|---|---|
| `SITE` | Title, description, canonical, OG/Twitter, theme colour, platform note |
| `WAITLIST` | Both waitlist forms — see [Waitlist](#waitlist) |
| `HERO`, `PROOF_POINTS`, `STEPS`, `KID`, `PARENT`, `SAFETY`, `CLOSER` | Page sections |
| `SOCIAL` | Footer icons **and** `Organization.sameAs` — add a profile once, both update |
| `ANALYTICS` | GA4 measurement ID. Set to `''` to remove the tag entirely |
| `PRICING` | Plan cards **and** `SoftwareApplication.offers` |
| `FAQ` | Visible `<details>` **and** `FAQPage` schema |
| `AI_CRAWLERS` | `robots.txt` allowlist |

## ⚠️ Before launch

Outstanding: `SITE.contactEmail` and `SITE.foundingDate`.

**There is no privacy policy.** The footer link was removed before Google
Analytics went in; the site is no longer collecting nothing, so that reasoning
has expired. GA sets cookies and collects IP-derived location, which
under GDPR/UK-GDPR needs disclosure and, for EU/UK visitors, a consent banner
before the tag fires. It is doubly required once the waitlist collects email
addresses, and a published policy is a hard requirement at launch since Suvi is
directed at children (COPPA in the US, the GDPR children's provisions in
Europe). Treat it as a launch blocker, not a nice-to-have.

## Waitlist

Both forms post to **getwaitlist.com list 21636** — the same list the
kidli.club landing page feeds.

`website.kidli` embeds getwaitlist's drop-in `WIDGET_1`, which ships its own
stylesheet and markup. This page posts to the API directly instead (the pattern
`gethoply/frontend/src/hooks/useWaitlist.ts` uses), so the two forms keep the
approved design:

```
POST https://api.getwaitlist.com/api/v1/signup
{ email, first_name, last_name, waitlist_id: 21636, referral_link }
```

### Names

List 21636 requires first and last name. Probed against the live API:

| Payload | Result |
|---|---|
| `email` | `400 KEY_MISSING first_name` |
| `email` + `first_name` | `400 KEY_MISSING last_name` |
| `email` + `first_name` + `last_name` | **`200`** |

The design has a single email field, so
[`src/lib/names.mjs`](src/lib/names.mjs) puts the **whole address** in
`first_name` and a literal `-` in `last_name`. Nothing is inferred, so no row in
the export can be mistaken for a name the visitor actually gave. Set
`WAITLIST.collectName: true` to ask for real names instead — the inputs, their
validation and the payload all come back from that one flag.

### The questionnaire modal

List 21636 already has three optional questions configured. They are mirrored in
`QUESTIONS` in [`src/data/site.mjs`](src/data/site.mjs), and each `question`
string **must match the list's `question_value` byte-for-byte** or the answer is
silently dropped.

**Answers can only be set when the waiter is created.** This is the constraint
that shapes the whole flow, established against the live API:

| Attempt | Result |
|---|---|
| `POST /signup` with `answers` (new email) | `200`, answers stored and echoed back |
| `POST /signup` with `answers` (existing email) | `200`, **answers silently ignored** — idempotent |
| `PUT`/`POST /waiter`, `PUT /signup` | `405` / `400 KEY_MISSING` |
| `PATCH /waiter` | `400 UNAUTHORIZED` — needs a private key |
| `PATCH /waiter` with the public widget key `R30AOA` | `400 UNAUTHORIZED` in all four auth shapes |

So "sign up, then update with answers" is not possible from a static page: the
only endpoint that could update a waiter needs a privileged key, and shipping
that in client JS would let anyone edit the list.

The modal therefore asks **before** the signup POST, and submits once with
whatever was answered. **Dismissing never costs the signup** — Skip, Escape and
a scrim click all submit the address immediately with no answers. The only way
to lose an email is closing the tab mid-modal.

Verified end to end: Finish sends all three answers and the API echoes them
back; Skip and Escape send the address alone; the hero and closing forms each
update only themselves; focus moves into the modal, is trapped, and returns on
close.

A successful signup also fires a `waitlist_signup` GA event — which only reaches
Google if the visitor accepted analytics.

## Analytics

`ANALYTICS.gaMeasurementId` in [`src/data/site.mjs`](src/data/site.mjs) drives
[`Analytics.astro`](src/components/Analytics.astro). Two things to know:

- **Dev is excluded.** The tag is gated on `import.meta.env.PROD`, so `npm run
  dev` never reaches the GA property. `npm run preview` serves a production
  build and *does* send real hits — don't leave it open.
- **`gtag` is attached to `window` explicitly.** Astro's `define:vars` wraps an
  inline script in an IIFE, so the stock Google snippet's `function gtag(){}`
  would not be global and later `gtag('event', ...)` calls would throw.

### Consent Mode v2

[`ConsentBanner.astro`](src/components/ConsentBanner.astro) plus the
`consent default` block in `Analytics.astro`. Every storage type starts
**denied worldwide**, not just in the EEA. Google's `region` parameter could
narrow that to regulated markets and recover analytics volume elsewhere, but a
page whose own copy promises "no ad network, no data broker" should not set
cookies on anyone before they say yes. Change it in `Analytics.astro` if you
disagree — it is one array.

`ad_storage`, `ad_user_data` and `ad_personalization` are denied permanently and
never requested, because Suvi runs no advertising. Only `analytics_storage`
flips on Accept.

Order matters: the `consent default` call sits **above** the `gtag/js` loader,
not below it as in Google's stock snippet, so defaults are in `dataLayer` before
the tag can read them. The choice is stored in `localStorage`
(`suvi.consent.v1`) and re-applied in the head on later visits, so a returning
visitor who accepted is measured from the first hit instead of waiting on the
banner.

Verified in a fresh browser against a production build:

| Path | Cookies | Consent signal |
|---|---|---|
| First visit, no choice | none | `gcs=G100` (denied, cookieless ping) |
| After **Accept** | `_ga`, `_ga_LN1L115XYK` | `gcs=G101` (granted) |
| After **Decline** | none | `gcs=G100` |
| Reload after either | choice persists, banner stays hidden | matches the choice |

## SEO / AEO

- Canonical, `max-image-preview:large`, OG + Twitter cards — [`Seo.astro`](src/components/Seo.astro)
- JSON-LD `@graph` cross-referenced by `@id`: Organization, WebSite, WebPage,
  SoftwareApplication (+ per-plan `Offer`, monthly plans carrying a
  `UnitPriceSpecification` so the cadence isn't inferred), FAQPage —
  [`JsonLd.astro`](src/components/JsonLd.astro). `FAQPage` is suppressed when
  `FAQ` is empty, so the schema never describes absent content.
- `sitemap-index.xml`, `robots.txt` with an answer-engine allowlist
  (GPTBot, ClaudeBot, PerplexityBot, …), and a generated `llms.txt`
- One `<h1>`; sections under `<h2>`; FAQ built on native `<details>` so answers
  are in the DOM without JS, and each answer is self-contained enough for an
  answer engine to quote in isolation

## Two things worth knowing

**Scroll-driven reveals are range-sensitive.** The design's
`animation-range: entry 0% cover 20%` needs scroll distance that doesn't exist
near the end of the document, so `animation-fill-mode: both` stranded the whole
pricing section at `opacity: 0` for anyone who scrolled to the bottom. It is now
`entry 0% entry 100%`, which resolves as soon as an element finishes entering
the viewport, plus a `@media print` override. Verified at 1280/1024/390 with an
instant scroll to the true page bottom. If you touch
[`global.css`](src/styles/global.css), keep it an `entry` range.

**Astro scoped CSS does not cross component boundaries.** A class passed into
`<Logo class="…">` lands on an `<svg>` that belongs to `Logo.astro`'s scope, so
a rule written in the parent never matches it. Wrap the component instead.

## Verified

Against a real build served by `astro preview`:

- 37 KB HTML, 3 `<script>` tags (Google Analytics + consent banner), no console
  errors, no failed requests
- One `<h1>`, 7 `<h2>`, 15 `<h3>`; all 5 schema types parse; 6 FAQ entries
- No horizontal scroll at 390px; nav collapses to logo + CTA
- No `₹` / SafePhone / Kidli residue anywhere in the output
