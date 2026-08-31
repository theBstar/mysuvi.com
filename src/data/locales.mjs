/**
 * Locale registry for the writing.
 *
 * Only the blog is localised. The landing page stays English until pricing is
 * localised — see `content/DISTRIBUTION.md`: sending a translated reader to a
 * page quoting USD is the most expensive bounce we can buy.
 *
 * Locale selection is driven by Android share (StatCounter, August 2026), since
 * Suvi is an Android launcher:
 *   Brazil 75.45%  Germany 72.44%  Spain 68.64%  Mexico 66.03%  Hong Kong 52.44%
 *
 * `zh` is Traditional Chinese for Hong Kong and Taiwan. Simplified is
 * deliberately absent: mainland China has neither Google nor the Play Store, so
 * it is not reachable by this strategy at all.
 */

export const DEFAULT_LOCALE = 'en'

export const LOCALES = {
  en: {
    code: 'en',
    /** URL segment. Empty for the default locale, which lives at the root. */
    prefix: '',
    htmlLang: 'en',
    /** hreflang value. Script subtags matter for Chinese. */
    hreflang: 'en',
    ogLocale: 'en_US',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    prefix: 'es',
    htmlLang: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
  },
  pt: {
    code: 'pt',
    prefix: 'pt',
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português',
    dir: 'ltr',
  },
  de: {
    code: 'de',
    prefix: 'de',
    htmlLang: 'de',
    hreflang: 'de',
    ogLocale: 'de_DE',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
  },
  zh: {
    code: 'zh',
    prefix: 'zh',
    htmlLang: 'zh-Hant',
    hreflang: 'zh-Hant',
    ogLocale: 'zh_HK',
    name: 'Chinese (Traditional)',
    nativeName: '繁體中文',
    dir: 'ltr',
  },
}

/** Every locale except the default, i.e. the ones that carry a URL prefix. */
export const TRANSLATED_LOCALES = Object.values(LOCALES).filter((l) => l.code !== DEFAULT_LOCALE)

export const localeCodes = Object.keys(LOCALES)

/**
 * Locale implied by a URL path. `/es/blog/x` -> `es`, `/blog/x` -> `en`.
 *
 * Components derive their locale this way rather than taking a prop, because
 * the site is fully static: the path is known at build time and always agrees
 * with the route that produced it, so prop-drilling a locale through Nav,
 * Footer and every mockup would add ceremony without adding correctness.
 */
export function localeFromPath(pathname) {
  const seg = pathname.split('/').filter(Boolean)[0]
  return seg && LOCALES[seg] && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE
}

/** Site-relative path for a blog article in a given locale. */
export function articlePath(locale, slug) {
  const p = LOCALES[locale].prefix
  return p ? `/${p}/blog/${slug}/` : `/blog/${slug}/`
}

/** Site-relative path for the landing page in a given locale. */
export function homePath(locale) {
  const p = LOCALES[locale].prefix
  return p ? `/${p}/` : '/'
}

/** Site-relative path for the blog index in a given locale. */
export function blogPath(locale) {
  const p = LOCALES[locale].prefix
  return p ? `/${p}/blog/` : `/blog/`
}

/**
 * UI chrome for the article and listing templates. Kept here rather than in the
 * markdown so a copy fix lands in one place across every article in a locale.
 */
export const UI = {
  en: {
    home: 'Home', blog: 'Blog', about: 'About',
    shortAnswer: 'Short answer', onThisPage: 'On this page',
    sources: 'Sources', updated: 'Updated', readIn: 'Read in',
    blogTitle: 'Writing on digital parenting',
    blogIntro: 'Guides on first phones, screen time and what the software in this category can and cannot do. Every article names its sources.',
    ctaHeading: 'Suvi is a phone interface that teaches this, not just blocks it.',
    ctaButton: 'Join the waitlist →',
    englishNote: '',
    clusters: {
    'first-phone': 'The first phone',
    'screen-time': 'Screen time',
    'online-safety': 'Online safety',
    'digital-literacy': 'Digital literacy',
    'family-life': 'Family life',
    },
  },
  es: {
    home: 'Inicio', blog: 'Blog', about: 'Acerca de',
    shortAnswer: 'Respuesta breve', onThisPage: 'En esta página',
    sources: 'Fuentes', updated: 'Actualizado', readIn: 'Leer en',
    blogTitle: 'Escritos sobre crianza digital',
    blogIntro: 'Guías sobre el primer móvil, el tiempo de pantalla y lo que el software de esta categoría puede y no puede hacer. Cada artículo cita sus fuentes.',
    ctaHeading: 'Suvi es una interfaz de teléfono que enseña esto, no que solo lo bloquea.',
    ctaButton: 'Únete a la lista de espera →',
    englishNote: 'La lista de espera y la aplicación están por ahora en inglés.',
    clusters: {
    'first-phone': 'El primer móvil',
    'screen-time': 'Tiempo de pantalla',
    'online-safety': 'Seguridad en internet',
    'digital-literacy': 'Alfabetización digital',
    'family-life': 'Vida familiar',
    },
  },
  pt: {
    home: 'Início', blog: 'Blog', about: 'Sobre',
    shortAnswer: 'Resposta curta', onThisPage: 'Nesta página',
    sources: 'Fontes', updated: 'Atualizado', readIn: 'Ler em',
    blogTitle: 'Textos sobre parentalidade digital',
    blogIntro: 'Guias sobre o primeiro celular, tempo de tela e o que os softwares desta categoria conseguem e não conseguem fazer. Todo artigo cita suas fontes.',
    ctaHeading: 'O Suvi é uma interface de celular que ensina isso, em vez de apenas bloquear.',
    ctaButton: 'Entrar na lista de espera →',
    englishNote: 'A lista de espera e o aplicativo estão em inglês por enquanto.',
    clusters: {
    'first-phone': 'O primeiro celular',
    'screen-time': 'Tempo de tela',
    'online-safety': 'Segurança online',
    'digital-literacy': 'Letramento digital',
    'family-life': 'Vida em família',
    },
  },
  de: {
    home: 'Startseite', blog: 'Blog', about: 'Über uns',
    shortAnswer: 'Kurze Antwort', onThisPage: 'Auf dieser Seite',
    sources: 'Quellen', updated: 'Aktualisiert', readIn: 'Lesen auf',
    blogTitle: 'Texte über Erziehung im digitalen Alltag',
    blogIntro: 'Ratgeber zum ersten Handy, zur Bildschirmzeit und dazu, was die Software in diesem Bereich leisten kann und was nicht. Jeder Artikel nennt seine Quellen.',
    ctaHeading: 'Suvi ist eine Handy-Oberfläche, die das vermittelt, statt es nur zu sperren.',
    ctaButton: 'Auf die Warteliste →',
    englishNote: 'Warteliste und App sind vorerst auf Englisch.',
    clusters: {
    'first-phone': 'Das erste Handy',
    'screen-time': 'Bildschirmzeit',
    'online-safety': 'Sicherheit im Netz',
    'digital-literacy': 'Digitale Kompetenz',
    'family-life': 'Familienalltag',
    },
  },
  zh: {
    home: '首頁', blog: '文章', about: '關於',
    shortAnswer: '簡短回答', onThisPage: '本頁內容',
    sources: '資料來源', updated: '更新於', readIn: '其他語言',
    blogTitle: '數位教養文章',
    blogIntro: '關於第一支手機、螢幕使用時間，以及這類軟體做得到與做不到的事。每篇文章都列出資料來源。',
    ctaHeading: 'Suvi 是一套會教孩子的手機介面，而不只是把功能鎖起來。',
    ctaButton: '加入候補名單 →',
    englishNote: '候補名單與應用程式目前僅提供英文。',
    clusters: {
    'first-phone': '第一支手機',
    'screen-time': '螢幕使用時間',
    'online-safety': '網路安全',
    'digital-literacy': '數位素養',
    'family-life': '家庭生活',
    },
  },
}
