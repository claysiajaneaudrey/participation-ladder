import type { Bilingual, LadderLevel, Prompt } from './types'

/**
 * The Participation Ladder — three inclusive ways a senior can take part.
 * Everyone is welcome at whichever rung feels comfortable; no one is ever
 * pushed to climb higher.
 */
export const LADDER: {
  level: LadderLevel
  icon: string
  title: Bilingual
  description: Bilingual
}[] = [
  {
    level: 'visual',
    icon: '👀',
    title: { en: 'Visual', zh: '看一看 · 指一指' },
    description: {
      en: 'Look at and point to the pictures. No words needed — recognising a familiar image is already taking part.',
      zh: '看图片、指一指。不需要说话——认出熟悉的图片就已经是参与了。',
    },
  },
  {
    level: 'verbal',
    icon: '💬',
    title: { en: 'Verbal', zh: '说一说 · 答一答' },
    description: {
      en: 'Name the picture or answer a simple question. A single word or a nod of recognition is wonderful.',
      zh: '说出图片的名字，或回答一个简单的问题。一个字或点头认得，都很好。',
    },
  },
  {
    level: 'sharing',
    icon: '❤️',
    title: { en: 'Sharing', zh: '分享回忆' },
    description: {
      en: 'Tell a memory the picture brings back. A story, a feeling, a person — whatever they wish to share.',
      zh: '分享图片带来的回忆。一个故事、一种感受、一个人——任何他们愿意分享的。',
    },
  },
]

/**
 * Shared bilingual phrases volunteers can read aloud, organised by ladder
 * level. Theme-specific prompts are added on top of these.
 */
export const SHARED_PROMPTS: Prompt[] = [
  { level: 'visual', text: { en: 'Can you point to the picture?', zh: '你可以指一指图片吗？' } },
  { level: 'visual', text: { en: 'Which one do you like the most?', zh: '你最喜欢哪一个？' } },
  { level: 'visual', text: { en: 'Take your time. Just look — there is no hurry.', zh: '慢慢来，看看就好，不用急。' } },
  { level: 'verbal', text: { en: 'What is this? Do you know its name?', zh: '这是什么？你知道它的名字吗？' } },
  { level: 'verbal', text: { en: 'Can you say it with me?', zh: '可以跟我一起说吗？' } },
  { level: 'verbal', text: { en: 'That’s right! Well done.', zh: '对了！做得很好。' } },
  { level: 'sharing', text: { en: 'Does this bring back any memories?', zh: '这个有让你想起什么回忆吗？' } },
  { level: 'sharing', text: { en: 'Tell me more — I’d love to hear about it.', zh: '多说一点吧，我很想听。' } },
  { level: 'sharing', text: { en: 'Thank you for sharing that with me.', zh: '谢谢你跟我分享。' } },
]

export const LEVEL_META: Record<LadderLevel, { icon: string; label: Bilingual }> = {
  visual: { icon: '👀', label: { en: 'Visual', zh: '看一看' } },
  verbal: { icon: '💬', label: { en: 'Verbal', zh: '说一说' } },
  sharing: { icon: '❤️', label: { en: 'Sharing', zh: '分享回忆' } },
}
