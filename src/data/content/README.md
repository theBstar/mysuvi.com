# Landing-page copy, per locale

`en.mjs` is the source of truth and the fallback for every other locale. Anything
a locale file omits falls back to English rather than rendering blank, so a
partial translation is publishable — translate the hero, ship it, translate the
FAQ next week.

## Adding a language

1. Register the locale in `src/data/locales.mjs` (`LOCALES`), if it isn't already.
2. Create `<code>.mjs` here, default-exporting the keys you have translated.
3. `node scripts/check-content.mjs && npm run build`.

The route, `hreflang`, `og:locale`, `html lang`, the per-locale `WebPage` node
and the language switcher all follow automatically. There is no other step.

```js
// src/data/content/es.mjs
export default {
  meta: {
    title: 'Suvi — Crecer en digital, no control parental.',
    description: '…',           // 80–165 characters
  },
  hero: {
    h1a: 'No es control parental.',
    h1b: 'Es crecer en digital.',
    sub: '…',
  },
  // Omit anything not translated yet — it falls back to English.
}
```

## Three things that are not translations

**`questions[].question`** is the key getwaitlist matches an answer against. It
must equal list 21636's `question_value` byte-for-byte. Translate `label`, which
is what the visitor actually reads. The same applies to `options[].value`, which
is the answer that gets stored — translate `label`.

`scripts/check-content.mjs` fails the build on both, because the failure is
otherwise silent: answers simply stop being associated, with no error anywhere.

**Arrays replace, they do not merge.** A translated `steps` array with two
entries renders two steps, not two translated entries followed by a stray
English third. Translate a whole array or leave it out.

**Pricing is not here.** It moved to `src/data/pricing.mjs`, keyed by country
rather than language, because the two are different axes: Spanish spans Spain
(EUR) and Mexico (MXN), Portuguese spans Portugal (EUR) and Brazil (BRL), and
India is an English-language market with its own currency. Do not put prices in a
locale file — the country selector will overwrite them at runtime.
