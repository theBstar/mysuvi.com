/**
 * Site configuration and SEO/AEO metadata.
 *
 * Visible copy is NOT here — it lives per locale in `src/data/content/<code>.mjs`
 * so the landing page can be translated. This file holds only what is the same
 * in every language: identifiers, endpoints, keys and social profiles.
 *
 * The English copy is taken from the approved design, `Suvi Landing.dc.html`
 * (Claude Design project 64feec2d). Do not reintroduce anything from the earlier
 * SafePhone device page: Suvi is launching software first — an Android launcher
 * that runs on a phone the family already owns.
 */
/**
 * Social profiles. Rendered in the footer and, via SITE.sameAs, emitted as the
 * Organization's `sameAs` in JSON-LD. Add a profile here and both update.
 */
export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mysuvi' },
  { label: 'Instagram', href: 'https://www.instagram.com/mysuvi.com_official/' },
  { label: 'X', href: 'https://x.com/mysuvi' },
]

export const SITE = {
  url: 'https://mysuvi.com',
  name: 'Suvi',
  legalName: 'Suvi',
  title: 'Suvi — Not parental control. Digital growing up.',
  description:
    'A safe phone interface for kids that grows with them. Reading, learning apps and time outdoors earn points toward a real reward — never more screen time.',
  tagline:
    'Suvi is an Android launcher for children that replaces blanket parental controls with earned freedom. Reading, learning apps and time outdoors earn points toward a real-world reward the child chooses, while demonstrated responsibility unlocks phone features one at a time. Points are never redeemed for more screen time.',
  locale: 'en_US',
  lang: 'en',
  themeColor: '#7C3AED',
  ogImage: '/og.png',
  twitter: '@mysuvi',
  sameAs: SOCIAL.map((s) => s.href),
  contactEmail: 'founder.suvi@gmail.com',
  foundingDate: '',
  /** Platform support, quoted verbatim from the pricing section. */
  platformNote:
    'Android today, including the phone you already own. iOS follows the hardware launch.',
}

/**
 * The named human behind the writing.
 *
 * This is not decoration. Articles previously carried an Organization byline,
 * which (a) is the weakest possible E-E-A-T signal against competitors who put a
 * named tester on every review, and (b) disqualifies us from every
 * journalist-request platform, since all of them require a named source with a
 * title. See `content/DISTRIBUTION.md`.
 */
export const AUTHOR = {
  name: 'Bikram Sutar',
  role: 'Founder, Suvi',
  url: `${SITE.url}/about/`,
  bio:
    'Bikram Sutar is the founder of Suvi, an Android launcher that replaces blanket ' +
    'parental controls with earned freedom. He writes here about first phones, screen ' +
    'time and what the software in this category can and cannot do.',
  /**
   * Personal profiles, emitted as the Person `sameAs`. The journalist-request
   * platforms in `content/DISTRIBUTION.md` verify a named source against one.
   */
  sameAs: ['https://www.linkedin.com/in/thebstar/'],
}

/**
 * getwaitlist.com — the same list the kidli.club landing page feeds
 * (dashboard/21636). website.kidli uses their drop-in WIDGET_1 embed; we post
 * to the API directly instead, the way gethoply does, so the two forms keep the
 * approved design instead of inheriting the widget's stylesheet.
 *
 * NOTE: 21636 is the Kidli list. If Suvi should collect separately, create a
 * new waitlist and change the id here — nothing else needs to move.
 */
export const WAITLIST = {
  waitlistId: 21636,
  apiUrl: 'https://api.getwaitlist.com/api/v1/signup',
  /**
   * List 21636 requires first_name AND last_name — probed against the live API:
   *   email only              -> 400 KEY_MISSING first_name
   *   email + first_name      -> 400 KEY_MISSING last_name
   *   email + first + last    -> 200
   *
   * The design has a single email field, so rather than adding two inputs we
   * derive both names from the address (src/lib/names.mjs) and send them with
   * the signup. Set collectName: true to ask for them explicitly instead.
   */
  collectName: false,
  // Copy (placeholders, labels, notes) lives in src/data/content/<locale>.mjs.
  fieldName: 'email',
}

/**
 * Google Analytics 4. Set to '' to disable entirely.
 * The tag is only emitted in production builds, so `npm run dev` does not
 * pollute the property with local traffic. `npm run preview` serves a
 * production build and therefore DOES send hits.
 */
export const ANALYTICS = {
  gaMeasurementId: 'G-LN1L115XYK',
  /**
   * Consent Mode v2. Every storage type starts denied — worldwide, not just in
   * the EEA — and analytics_storage is granted only if the visitor accepts.
   * Google's `region` parameter could narrow that to regulated markets, but a
   * page whose own copy promises "no ad network, no data broker" should not be
   * setting cookies on anyone before they say yes.
   *
   * ad_* consent is never requested or granted: Suvi runs no advertising.
   */
  consentKey: 'suvi.consent.v1',
}

export const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'meta-externalagent',
]
