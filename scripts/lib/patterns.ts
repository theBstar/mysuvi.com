/**
 * AI-writing pattern taxonomy.
 *
 * Adapted from the-antislop (github.com/aplaceforallmystuff/the-antislop,
 * MIT), which in turn builds on Wikipedia's "Signs of AI Writing". Weights and
 * thresholds are theirs; the machine-readable shape is ours, because that skill
 * is a Claude Code slash command with a prose report and no JSON mode — not
 * something a publishing pipeline can gate on.
 *
 * Structure is weighted above vocabulary on purpose: frontier models were tuned
 * against the loud 2023-era words, so lexical hits alone no longer prove much.
 */

/** Legacy + current lexical tells. Scored by DENSITY, not per-word. */
export const TIER1 = [
  'delve', 'game-changer', 'game-changing', 'revolutionary', 'unlock potential',
  'unlock your potential', 'leverage', 'it\'s worth noting', 'today\'s digital landscape',
  'cutting-edge', 'tapestry', 'vibrant', 'interplay', 'garner', 'garnering',
  'underscore', 'underscores', 'testament to', 'stands as', 'serves as', 'boasts',
  'navigating the', 'realm of', 'foster', 'fostering', 'ever-evolving', 'ever-changing',
  'seamless', 'seamlessly', 'landscape of',
]

/** Fine once; a tell when repeated. */
export const TIER2 = [
  'here\'s the thing', 'at the end of the day', 'the bottom line', 'let\'s dive in',
  'without further ado', 'comprehensive and thorough', 'simple and straightforward',
  'in this post', 'in this article', 'by the end of this article', 'we\'ll cover',
]

/** Fine individually; a tell in clusters. */
export const TIER3 = [
  'moving forward', 'robust', 'seamless', 'scalable', 'stakeholder', 'stakeholders',
  'firstly', 'secondly', 'thirdly', 'furthermore', 'moreover',
]

/** Rhetorical hooks that fake a conversation. */
export const ENGAGEMENT_BAIT = [
  'what if i told you', 'ever wondered', 'let\'s be honest', 'picture this',
  'here\'s the thing', 'imagine this', 'let that sink in',
]

/** Headers that promise insight and deliver template. */
export const TEMPLATE_HEADERS = [
  'why this actually works', 'what this means for you', 'the real reason',
  'here\'s what\'s really going on', 'the bottom line', 'key takeaways',
  'final thoughts', 'wrapping up', 'in conclusion',
]

/** Chatbot residue that should never survive to publication. */
export const CHATBOT_ARTIFACTS = [
  'i hope this helps', 'let me know if', 'great question', 'you\'re absolutely right',
  'as an ai', 'feel free to ask', 'certainly!', 'of course!',
  // Refusal boilerplate, spelled out. A bare "i cannot" also matches ordinary
  // quoted speech ("I cannot see who is messaging her"), so match the verb too.
  'i cannot provide', 'i cannot assist', 'i cannot help with', 'i can\'t provide',
  'i am unable to provide', 'i\'m unable to provide',
]

/** Scoring weights, from the-antislop. */
export const WEIGHTS = {
  tier1Isolated: 1,
  tier1Cluster: 4,
  tier2Repeated: 2,
  tier3Cluster: 2,
  horoscopeFail: 5,
  staccato: 4,
  uniformity: 3,
  comparator: 3,
  inlineHeaderList: 3,
  manufacturedPersonality: 4,
  engagementBait: 2,
  trailingAffirmation: 1,
  fabricatedPrecision: 2,
  selfPromotional: 5,
  templateHeader: 2,
  chatbotArtifact: 5,
  emDashOveruse: 2,
  vagueAttribution: 3,
} as const

/** 0-5 low, 6-12 medium, 13+ high. We gate at LOW. */
export const RISK = { low: 5, medium: 12 } as const

export type Risk = 'low' | 'medium' | 'high'
export const riskOf = (score: number): Risk =>
  score <= RISK.low ? 'low' : score <= RISK.medium ? 'medium' : 'high'
