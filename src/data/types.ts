// Core data model for the Participation Ladder planning tool.
// All content lives in plain TS — there is no backend.

/** A bilingual string: English and Simplified Chinese. */
export interface Bilingual {
  en: string
  zh: string
}

/**
 * One familiar picture card. The SAME card image is reused in both the
 * memory-matching game and as a visual clue in the riddle game.
 */
export interface Card {
  id: string
  /** path under /public, e.g. "/cards/sg-food/laksa.png" */
  image: string
  name: Bilingual
}

/**
 * A riddle that reuses the theme's card pictures as visual clues. The
 * volunteer reads the clue aloud; the senior can point to (visual), name
 * (verbal), or share a memory about (sharing) the matching card.
 */
export interface Riddle {
  id: string
  clue: Bilingual
  /** id of the card that answers the riddle */
  answerCardId: string
  /** card ids shown as picture options (includes the answer) */
  optionCardIds: string[]
}

/** The three rungs of the Participation Ladder. */
export type LadderLevel = 'visual' | 'verbal' | 'sharing'

/** A phrase a volunteer can read aloud, tagged by ladder level. */
export interface Prompt {
  level: LadderLevel
  text: Bilingual
}

export interface Theme {
  id: string
  name: Bilingual
  /** short, warm one-liner describing the theme */
  blurb: Bilingual
  /** emoji used as a friendly icon on the theme card */
  icon: string
  /** tailwind-friendly accent (used for soft backgrounds / borders) */
  accent: string
  cards: Card[]
  riddles: Riddle[]
  /** theme-specific prompts (added on top of the shared prompt bank) */
  prompts: Prompt[]
}
