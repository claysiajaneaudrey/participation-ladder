import type { Reflection } from '../state'
import { SHARED_PROMPTS, LEVEL_META } from '../data/ladder'
import type { LadderLevel, Theme } from '../data/types'

/** Number of cards used in the sample memory game. */
export const MEMORY_CARD_COUNT = 6

/** Plain-text version of the generated activity plan, for copy / export. */
export function buildPlanText(theme: Theme): string {
  const memoryCards = theme.cards.slice(0, MEMORY_CARD_COUNT)
  const lines: string[] = []
  lines.push('PARTICIPATION LADDER — ACTIVITY PLAN')
  lines.push('参与阶梯 — 活动计划')
  lines.push('')
  lines.push(`Theme / 主题: ${theme.name.en} (${theme.name.zh})`)
  lines.push('')
  lines.push('REMINDER: Participation is always a choice. Never pressure a senior to join in.')
  lines.push('提醒：参与永远是自愿的。请勿勉强长辈。')
  lines.push('')
  lines.push('STEP 1 — MEMORY-CARD GAME / 记忆卡片游戏')
  lines.push(`Lay out these ${memoryCards.length} picture cards and match the pairs together:`)
  memoryCards.forEach((c, i) => lines.push(`  ${i + 1}. ${c.name.en} / ${c.name.zh}`))
  lines.push('')
  lines.push('STEP 2 — RIDDLE GAME (same pictures) / 猜谜游戏（同样的图片）')
  lines.push('Read each clue aloud. Seniors point to, name, or share a memory about the matching card.')
  theme.riddles.forEach((r, i) => {
    const answer = theme.cards.find((c) => c.id === r.answerCardId)
    lines.push(`  Riddle ${i + 1}: "${r.clue.en}"`)
    lines.push(`           “${r.clue.zh}”`)
    lines.push(`     → Answer: ${answer?.name.en} / ${answer?.name.zh}`)
  })
  lines.push('')
  lines.push('STEP 3 — SHARING / 分享回忆')
  theme.prompts
    .filter((p) => p.level === 'sharing')
    .forEach((p) => lines.push(`  • ${p.text.en} / ${p.text.zh}`))
  return lines.join('\n')
}

const LEVELS: LadderLevel[] = ['visual', 'verbal', 'sharing']

/** Plain-text version of the reflection form. */
export function buildReflectionText(reflection: Reflection, theme: Theme | undefined): string {
  const lines: string[] = []
  lines.push('PARTICIPATION LADDER — SESSION REFLECTION')
  lines.push('参与阶梯 — 活动反思')
  lines.push('')
  if (theme) lines.push(`Theme / 主题: ${theme.name.en} (${theme.name.zh})`)
  lines.push('')
  lines.push('Which rungs of the ladder did seniors join at? / 长辈参与了哪些层级？')
  if (reflection.levelsJoined.length === 0) {
    lines.push('  (none selected)')
  } else {
    LEVELS.filter((l) => reflection.levelsJoined.includes(l)).forEach((l) =>
      lines.push(`  ✓ ${LEVEL_META[l].label.en} / ${LEVEL_META[l].label.zh}`),
    )
  }
  lines.push('')
  lines.push('What worked well? / 哪些做得好？')
  lines.push(`  ${reflection.whatWorked || '(blank)'}`)
  lines.push('')
  lines.push('What to improve next time? / 下次可以改进什么？')
  lines.push(`  ${reflection.toImprove || '(blank)'}`)
  return lines.join('\n')
}

export { SHARED_PROMPTS }
