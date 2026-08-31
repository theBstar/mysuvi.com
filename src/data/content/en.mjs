/**
 * English landing-page copy — the source of truth, and the fallback for every
 * other locale.
 *
 * To add a language: copy this file to `<code>.mjs`, translate the values, and
 * add the locale to `src/data/locales.mjs`. Anything you leave out falls back to
 * English rather than rendering blank, so a partial translation is publishable.
 *
 * Two things must NOT be translated, and are marked where they appear:
 *   - `questions[].question` is the key getwaitlist matches answers against.
 *     It has to equal list 21636's `question_value` byte-for-byte. Translate
 *     `label`, which is what the visitor reads.
 *   - `questions[].options[].value` is what gets stored. Translate `label`.
 */
export default {
  /**
   * Page metadata for this locale's landing page. Falls back to SITE.* when a
   * locale omits it.
   */
  meta: {
    title: 'Suvi — Not parental control. Digital growing up.',
    description:
      'A safe phone interface for kids that grows with them. Reading, learning apps and time outdoors earn points toward a real reward — never more screen time.',
  },

  /** Chrome: labels that live in components rather than in a page section. */
  ui: {
    skipToContent: 'Skip to content',
    navPrimary: 'Primary',
    navHome: 'Suvi — home',
    footerNav: 'Footer',
    footerLinks: [
      { href: '#how', label: 'How it works' },
      { href: '#pricing', label: 'Pricing' },
      { href: '/blog', label: 'Blogs' },
      { href: '/about', label: 'About' },
      { href: '/privacy', label: 'Privacy' },
      { href: '#waitlist', label: 'Waitlist' },
    ],
    emailLabel: 'Email address',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    invalidEmail: 'Please enter a valid email address.',
    preferNotToSay: 'Prefer not to say',
    consent: {
      text: 'Suvi uses Google Analytics to see which parts of this page are useful. Nothing goes to advertisers or data brokers.',
      link: 'What we collect',
      decline: 'Decline',
      accept: 'Accept',
    },
    /**
     * Strings inside the device mockups. Decorative, but they are the first
     * thing a visitor reads, so an untranslated mockup on a translated page
     * looks broken. The child's name is deliberately translatable.
     */
    mock: {
      greeting: 'Hey, Arjun',
      level: 'Explorer — Level 3',
      timeValue: '1h 47m',
      timeLabel: 'remaining today',
      questLabel: 'Today\u2019s quest',
      questTitle: 'Read for 20 minutes',
      questReward: '+30 points · bike gear 980/1,500',
      dock: { home: 'Home', phone: 'Phone', brand: 'Suvi', quests: 'Quests' },
      parentDash: 'Parent dashboard',
      thisWeek: 'This week',
    },
  },

  nav: [
  { href: '#how', label: 'How it works' },
  { href: '#parents', label: 'For parents' },
  { href: '#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blogs' },
],

  hero: {
  h1a: 'Not parental control.',
  h1b: 'Digital growing up.',
  sub: 'Suvi is a safe phone interface for kids that grows with them. Instead of blocking everything, it rewards the good hours — reading, a learning app, time outdoors — with points toward something they actually want.',
},

  proofPoints: [
  { stat: '8–13', label: 'The years a first phone usually arrives in a family' },
  { stat: '12', label: 'Phone features that unlock one by one, from calls to a full browser' },
  { stat: '1 screen', label: 'Everything a parent needs to know, without reading their messages' },
],

  steps: [
  {
    n: '01',
    title: 'Set the shape of the week',
    body: 'Pick a daily budget, bedtime, and which apps are open from the start. Ten minutes of setup, then Suvi runs it.',
  },
  {
    n: '02',
    title: 'Effort earns points, not hours',
    body: 'A learning app, twenty minutes of reading, a walk outside, chores at home. Suvi turns that effort into points, and points go toward something real they chose themselves — new gear for the bike, a day out. Never more screen time.',
  },
  {
    n: '03',
    title: 'Freedom widens as trust does',
    body: 'Messaging, a browser, their own app choices. Each one arrives when they’ve shown they can handle the last, and stays.',
  },
],

  kid: {
  eyebrow: 'The kid’s side',
  title: 'An interface that feels like theirs, not a leash.',
  body: 'Quests turn reading, learning and time outdoors into points toward a reward they picked. A tightly guardrailed AI companion answers the awkward questions and builds digital literacy in the moment, age-tuned and narrow by design.',
  points: [
    'Quests you approve, or ones Suvi suggests for their age',
    'A guardrailed AI companion that explains scams, ads and privacy in plain words',
    'Levels and streaks that reward putting the phone down',
  ],
  screens: [
    {
      tab: 'Quests',
      title: 'Today',
      rows: [
        { a: 'Read 20 minutes', b: '+30 pts · in progress' },
        { a: 'Maths app, 15 minutes', b: '+25 pts' },
        { a: 'An hour outside', b: '+20 pts' },
      ],
    },
    {
      tab: 'Reward',
      title: 'Bike gear',
      rows: [
        { a: '980 of 1,500 points', b: 'Goal chosen by Arjun' },
        { a: 'Helmet, lights, gloves', b: 'Agreed together' },
        { a: '2 quests to go', b: 'On track for Saturday' },
      ],
    },
  ],
},

  parent: {
  eyebrow: 'The parent’s side',
  title: 'One glance. No spreadsheet of anxiety.',
  body: 'You see what matters and nothing you don’t need: where they are, what they’re on, how much time is left. Adjust in a tap.',
  live: 'Arjun’s phone is active — YouTube — 12 min',
  metrics: [
    { label: 'Screen time', value: '2h 13m', sub: '18 min less than yesterday' },
    { label: 'Remaining', value: '1h 47m', sub: 'of a 4h budget' },
  ],
  actions: ['+ Add 30 min', 'Pause', 'Bedtime'],
  bars: [
    { d: 'M', h: '58%' }, { d: 'T', h: '72%' }, { d: 'W', h: '44%' },
    { d: 'T', h: '81%' }, { d: 'F', h: '95%' }, { d: 'S', h: '66%' }, { d: 'S', h: '38%' },
  ],
  barsCaption: 'Average 2h 04m a day. Down 18 minutes on last week.',
},

  safety: {
  eyebrow: 'Safety & privacy',
  title: 'Built so we never have to see your child’s life.',
  items: [
    {
      title: 'A companion with guardrails',
      body: 'The companion is tightly constrained for a child’s age: no open-ended chat, no advice it shouldn’t give, and hard limits on what it will discuss. What a child asks it is never used to train anything.',
    },
    {
      title: 'You see signals, not their diary',
      body: 'The dashboard shows time, apps and location. It does not show message contents. Trust only works if it goes both directions.',
    },
    {
      title: 'Nothing to sell',
      body: 'Suvi is paid for by families. There is no ad network, no data broker, and no free tier funded by attention.',
    },
    {
      title: 'Tamper-aware',
      body: 'Suvi is the launcher, not an app to uninstall. Restarts, SIM swaps and factory attempts all reach you.',
    },
  ],
},

  pricing: {
  title: 'Founding member pricing.',
  body: 'Waitlist families get founding pricing, locked for as long as they stay.',
  currency: 'USD',
  plans: [
    {
      name: 'Starter',
      price: 'Free',
      per: '',
      amount: 0,
      badge: 'Founding',
      later: '$49 one-time after launch',
      blurb: 'The safe launcher, a daily budget and bedtime, set up on the phone itself. Enough to replace a hand-me-down phone’s chaos.',
      features: [
        'Suvi launcher and app gating',
        'Daily time budget and bedtime',
        'No parent dashboard or app',
      ],
    },
    {
      name: 'Family',
      price: '$8',
      per: '/ month',
      amount: 8,
      featured: true,
      badge: 'Founding',
      later: '$19 / month after launch',
      blurb: 'Everything that makes Suvi different: quests, unlocks and the AI companion.',
      features: [
        'The parent dashboard and app',
        'Quests, reward points and feature unlocks',
        'Guardrailed AI companion',
        'Location and arrival alerts',
        'Up to four children',
        'Founding price locked as long as you stay',
      ],
    },
  ],
},

  closer: {
  title: 'Start with trust. Widen it as they earn it.',
  body: 'Join the waitlist for early access and founding pricing.',
},

  /**
   * AEO: rendered as visible <details> content AND as FAQPage JSON-LD.
   * Answers are self-contained so an answer engine can quote one in isolation.
   */
  faq: [
  {
    q: 'What age is Suvi for?',
    a: 'Most families start between 8 and 12, at the moment a first phone comes up. Suvi scales down to a locked, call-only setup and scales up to a nearly ordinary phone as trust is earned, so it keeps working for years.',
  },
  {
    q: 'Is this just screen time limits with extra steps?',
    a: 'No. Limits are the floor, not the product. Reading, learning apps and time outdoors earn points toward a real reward your child picks, and demonstrated responsibility unlocks features like messaging and a browser. The phone gets less restricted over time instead of more policed.',
  },
  {
    q: 'What does the AI companion actually do?',
    a: 'It answers questions in the moment: what a scam message looks like, why an app wants a location, whether something they saw is real. It is heavily guardrailed and tuned to the child’s age — it will not hold open-ended conversations, and it redirects anything that belongs with a parent back to you. It is not a chat toy and it does not replace you.',
  },
  {
    q: 'What do the points actually buy?',
    a: 'Something real, agreed between you and your child before they start earning — bicycle gear, a book, a day out. You set the goal and the points it costs together, and Suvi tracks the progress on both your phones. Points are never redeemed for more screen time, which is the whole point of them.',
  },
  {
    q: 'Can my child turn it off?',
    a: 'No — Suvi is the launcher, not an app they can uninstall. But your child can see every rule that applies to them and ask you to change it from their own phone. Nothing about how Suvi works is hidden from them.',
  },
  {
    q: 'Do you sell or train on our family’s data?',
    a: 'Never. We store the minimum needed to run your dashboard and the companion, we do not train models on your child, and you can delete everything in one action.',
  },
  {
    q: 'Does it work on a phone we already own?',
    a: 'Suvi runs on Android today, including hand-me-down devices. iOS is in development and follows the hardware launch — join the waitlist and we’ll tell you the moment it’s ready.',
  },
],

  questions: {
  title: 'Three quick questions',
  intro: 'All optional — they help us build the right thing. Skip if you’d rather not.',
  skipLabel: 'Skip',
  submitLabel: 'Finish',
  items: [
    {
      key: 'age',
      question: 'How old is your child?',
      label: 'How old is your child?',
      type: 'select',
      options: [
        { value: 'Less than 8', label: 'Less than 8' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '13', label: '13' },
        { value: '14', label: '14' },
        { value: '15', label: '15' },
        { value: '16+', label: '16+' },
      ],
    },
    {
      key: 'apps',
      question: 'Do you use tech for parenting? Top 3 apps/sites?',
      label: 'Do you use tech for parenting? Top 3 apps/sites?',
      type: 'text',
      placeholder: 'e.g. YouTube Kids, Family Link, Duolingo',
    },
    {
      key: 'help',
      question: 'Where do you need help in your parenting journey?',
      label: 'Where do you need help in your parenting journey?',
      type: 'textarea',
      placeholder: 'Screen time, safety, homework, sleep…',
    },
  ],
},

  waitlist: {
    firstNamePlaceholder: 'First name',
    lastNamePlaceholder: 'Last name',
    placeholder: 'you@family.com',
    ctaLabel: 'Join the waitlist',
    ctaLabelBusy: 'Joining…',
    ctaLabelDone: 'You’re on the list',
    note: 'No ads, no data brokers, no free tier funded by attention.',
    doneNote: 'Thanks — we’ll email you before early access opens.',
    errorNote: 'That didn’t go through. Try again in a moment?',
    badge: 'Early access opening this autumn',
  },
}
