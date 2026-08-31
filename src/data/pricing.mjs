/**
 * Pricing by COUNTRY, which is deliberately not the same axis as language.
 *
 * Spanish spans Spain (EUR) and Mexico (MXN); Portuguese spans Portugal (EUR)
 * and Brazil (BRL); Traditional Chinese spans Hong Kong (HKD) and Taiwan (TWD);
 * and India is an English-language market with its own currency. No language
 * key can express any of that, so country and locale are resolved separately.
 *
 * Prices are written out, not converted at build time. A published price should
 * change when we decide to change it, not because the currency market moved
 * overnight. Derived once from a normalised table (rates 31 Aug 2026) using
 * purchasing-power tiers: parity for high-income markets, 70% mid, 45% for
 * India-tier markets.
 */

export const DEFAULT_COUNTRY = 'US'

export const COUNTRIES = {
  US: { name: 'United States', currency: 'USD', starter: '$99',        founding: '$9.99',    amount: 9.99,   usual: '$30' },
  GB: { name: 'United Kingdom', currency: 'GBP', starter: '£72.99',    founding: '£6.99',    amount: 6.99,   usual: '£21.99' },
  DE: { name: 'Germany',        currency: 'EUR', starter: '€84.99',    founding: '€8.99',    amount: 8.99,   usual: '€25.99' },
  AT: { name: 'Austria',        currency: 'EUR', starter: '€84.99',    founding: '€8.99',    amount: 8.99,   usual: '€25.99' },
  CH: { name: 'Switzerland',    currency: 'CHF', starter: 'CHF 79.90', founding: 'CHF 7.90', amount: 7.90,   usual: 'CHF 23.90' },
  HK: { name: 'Hong Kong',      currency: 'HKD', starter: 'HK$778',    founding: 'HK$78',    amount: 78,     usual: 'HK$238' },
  ES: { name: 'Spain',          currency: 'EUR', starter: '€59.99',    founding: '€5.99',    amount: 5.99,   usual: '€17.99' },
  PT: { name: 'Portugal',       currency: 'EUR', starter: '€59.99',    founding: '€5.99',    amount: 5.99,   usual: '€17.99' },
  TW: { name: 'Taiwan',         currency: 'TWD', starter: 'NT$2,190',  founding: 'NT$220',   amount: 220,    usual: 'NT$660' },
  MX: { name: 'Mexico',         currency: 'MXN', starter: 'MX$1,179',  founding: 'MX$119',   amount: 119,    usual: 'MX$359' },
  BR: { name: 'Brazil',         currency: 'BRL', starter: 'R$ 358,90', founding: 'R$ 35,90', amount: 35.90,  usual: 'R$ 108,90' },
  IN: { name: 'India',          currency: 'INR', starter: '₹4,249',    founding: '₹449',     amount: 449,    usual: '₹1,299' },
  ID: { name: 'Indonesia',      currency: 'IDR', starter: 'Rp 789.000',founding: 'Rp 79.000',amount: 79000,  usual: 'Rp 239.000' },
}

/**
 * IANA time zone -> country.
 *
 * The time zone is the only reliable country signal a browser gives us.
 * `navigator.language` looks like the obvious choice and is not: it reports the
 * language a person prefers, not where they are — a browser in Mumbai commonly
 * reports `en-US`, which would price an Indian family in dollars.
 *
 * `Asia/Calcutta` is not a typo. It is the legacy alias, and it is what many
 * browsers still return for India.
 */
export const TIMEZONE_COUNTRY = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN',
  'Europe/London': 'GB',
  'Europe/Berlin': 'DE', 'Europe/Busingen': 'DE',
  'Europe/Vienna': 'AT',
  'Europe/Zurich': 'CH',
  'Asia/Hong_Kong': 'HK',
  'Asia/Taipei': 'TW',
  'Europe/Madrid': 'ES', 'Africa/Ceuta': 'ES', 'Atlantic/Canary': 'ES',
  'Europe/Lisbon': 'PT', 'Atlantic/Madeira': 'PT', 'Atlantic/Azores': 'PT',
  'America/Mexico_City': 'MX', 'America/Cancun': 'MX', 'America/Merida': 'MX',
  'America/Monterrey': 'MX', 'America/Matamoros': 'MX', 'America/Chihuahua': 'MX',
  'America/Ojinaga': 'MX', 'America/Hermosillo': 'MX', 'America/Mazatlan': 'MX',
  'America/Bahia_Banderas': 'MX', 'America/Tijuana': 'MX', 'America/Ciudad_Juarez': 'MX',
  'America/Sao_Paulo': 'BR', 'America/Bahia': 'BR', 'America/Fortaleza': 'BR',
  'America/Recife': 'BR', 'America/Belem': 'BR', 'America/Manaus': 'BR',
  'America/Cuiaba': 'BR', 'America/Campo_Grande': 'BR', 'America/Porto_Velho': 'BR',
  'America/Rio_Branco': 'BR', 'America/Boa_Vista': 'BR', 'America/Santarem': 'BR',
  'America/Maceio': 'BR', 'America/Araguaina': 'BR', 'America/Eirunepe': 'BR',
  'America/Noronha': 'BR',
  'Asia/Jakarta': 'ID', 'Asia/Pontianak': 'ID', 'Asia/Makassar': 'ID', 'Asia/Jayapura': 'ID',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US', 'America/Detroit': 'US', 'America/Boise': 'US',
  'America/Juneau': 'US', 'America/Sitka': 'US', 'America/Nome': 'US',
  'America/Adak': 'US', 'America/Menominee': 'US',
}

/** Countries offered in the selector, alphabetical with the default first. */
export const COUNTRY_OPTIONS = [
  DEFAULT_COUNTRY,
  ...Object.keys(COUNTRIES)
    .filter((c) => c !== DEFAULT_COUNTRY)
    .sort((a, b) => COUNTRIES[a].name.localeCompare(COUNTRIES[b].name)),
]
