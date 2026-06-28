import { useState } from 'react'
import type { Theme } from '../data/types'
import { Button } from './common'

/**
 * The riddle game. Each riddle reuses the SAME theme cards from the memory
 * game as picture clues — the volunteer reads the clue aloud and the senior
 * can point to, name, or share a memory about the matching picture.
 */
export default function RiddleGame({ theme }: { theme: Theme }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)

  const riddle = theme.riddles[index]
  const cardById = (id: string) => theme.cards.find((c) => c.id === id)!
  const isCorrect = picked === riddle.answerCardId
  const answer = cardById(riddle.answerCardId)

  function go(delta: number) {
    const n = theme.riddles.length
    setIndex((i) => (i + delta + n) % n)
    setPicked(null)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-base font-bold text-ink-soft">
          Riddle {index + 1} of {theme.riddles.length} · 谜语 {index + 1} /{' '}
          {theme.riddles.length}
        </p>
      </div>

      {/* The clue, read aloud by the volunteer */}
      <div className="rounded-3xl border border-clay-200 bg-clay-50 p-6 sm:p-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-clay-600">
          Read aloud · 读出来
        </p>
        <p className="text-2xl font-extrabold leading-snug text-ink">
          “{riddle.clue.en}”
        </p>
        <p lang="zh" className="mt-3 text-xl font-bold leading-snug text-ink-soft">
          “{riddle.clue.zh}”
        </p>
      </div>

      {/* Picture clues — the same cards from the memory game */}
      <p className="mb-3 mt-6 text-lg font-bold text-ink">
        Point to the answer · 指出答案
      </p>
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {riddle.optionCardIds.map((id) => {
          const card = cardById(id)
          const chosen = picked === id
          const showState = picked !== null
          const correctOne = id === riddle.answerCardId
          let ring = 'border-clay-100 bg-white hover:border-clay-300'
          if (showState && correctOne) ring = 'border-emerald-400 bg-emerald-50'
          else if (showState && chosen) ring = 'border-rose-300 bg-rose-50'
          return (
            <li key={id}>
              <button
                onClick={() => setPicked(id)}
                className={`flex w-full flex-col items-center rounded-2xl border-2 p-2 transition-colors sm:p-3 ${ring}`}
              >
                <img
                  src={card.image}
                  alt={card.name.en}
                  className="aspect-square w-full rounded-xl object-cover"
                />
                <span className="mt-2 text-center text-base font-bold leading-tight text-ink">
                  {card.name.en}
                  <span lang="zh" className="block font-normal text-ink-soft">
                    {card.name.zh}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Feedback + the memory-sharing invitation (top rung of the ladder) */}
      {picked !== null && (
        <div
          className={`mt-6 rounded-3xl border p-6 ${
            isCorrect
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-clay-200 bg-clay-50'
          }`}
        >
          {isCorrect ? (
            <p className="text-xl font-extrabold text-emerald-800">
              🎉 Yes — it’s {answer.name.en} ({answer.name.zh})! Well done.
            </p>
          ) : (
            <p className="text-xl font-bold text-ink">
              That’s a good guess. The answer is{' '}
              <span className="text-clay-700">
                {answer.name.en} ({answer.name.zh})
              </span>
              . Let’s look together. 我们一起看看。
            </p>
          )}
          <div className="mt-4 rounded-2xl border border-clay-200 bg-white p-4">
            <p className="text-sm font-bold uppercase tracking-widest text-clay-600">
              ❤️ Sharing prompt · 分享提问
            </p>
            <p className="mt-1 text-lg font-bold text-ink">
              {theme.id === 'sg-food'
                ? 'Did you eat this often when you were younger?'
                : 'Have you ever seen this animal in real life?'}
            </p>
            <p lang="zh" className="text-lg text-ink-soft">
              {theme.id === 'sg-food'
                ? '你年轻的时候常常吃这个吗？'
                : '你有亲眼见过这个动物吗？'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="secondary" onClick={() => go(-1)}>
          ← Previous
        </Button>
        <Button variant="primary" onClick={() => go(1)}>
          Next riddle →
        </Button>
      </div>
    </div>
  )
}
