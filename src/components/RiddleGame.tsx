import { useState } from 'react'
import type { Theme } from '../data/types'
import { Button } from './common'

/**
 * The riddle game. Each riddle reuses the SAME theme cards from the memory
 * game as picture clues — the volunteer reads the clue aloud and the senior
 * can point to, name, or share a memory about the matching picture.
 *
 * Modelled on a polished quiz UI: large stacked pill answer rows with the
 * familiar picture on the left and big readable text.
 */
export default function RiddleGame({ theme }: { theme: Theme }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)

  const riddle = theme.riddles[index]
  const cardById = (id: string) => theme.cards.find((c) => c.id === id)!
  const isCorrect = picked === riddle.answerCardId
  const answer = cardById(riddle.answerCardId)
  const total = theme.riddles.length

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total)
    setPicked(null)
  }

  return (
    <div>
      {/* Simple progress indicator */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-muted">
          <span>
            Riddle {index + 1} of {total} · 谜语 {index + 1} / {total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
          <div
            className="gradient-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* The clue, read aloud by the volunteer */}
      <div className="rounded-card border border-line bg-primary/5 p-6 sm:p-8">
        <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-primary">
          <span aria-hidden>🔊</span> Read aloud · 读出来
        </p>
        <p className="text-2xl font-extrabold leading-snug text-heading">
          “{riddle.clue.en}”
        </p>
        <p lang="zh" className="mt-3 text-xl font-bold leading-snug text-body">
          “{riddle.clue.zh}”
        </p>
      </div>

      {/* Stacked picture-answer pills — same cards as the memory game */}
      <p className="mb-3 mt-6 text-lg font-bold text-heading">
        Point to the answer · 指出答案
      </p>
      <ul className="space-y-3">
        {riddle.optionCardIds.map((id) => {
          const card = cardById(id)
          const chosen = picked === id
          const answered = picked !== null
          const correctOne = id === riddle.answerCardId

          let state =
            'border-line bg-surface shadow-sm hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft'
          if (answered && correctOne)
            state = 'border-2 border-primary bg-primary/10 shadow-soft'
          else if (answered && chosen)
            state = 'border-2 border-line bg-lavender'
          else if (answered) state = 'border-line bg-surface opacity-60'

          return (
            <li key={id}>
              <button
                onClick={() => setPicked(id)}
                className={`flex min-h-[4.5rem] w-full items-center gap-4 rounded-full border px-4 py-3 text-left transition-all ${state}`}
              >
                <img
                  src={card.image}
                  alt={card.name.en}
                  className="h-16 w-16 shrink-0 rounded-full border border-line object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-bold text-heading">
                    {card.name.en}
                  </span>
                  <span lang="zh" className="block text-base text-muted">
                    {card.name.zh}
                  </span>
                </span>
                {answered && correctOne && (
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white"
                  >
                    ✓
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Feedback + the memory-sharing invitation (top rung of the ladder) */}
      {picked !== null && (
        <div
          className={`mt-6 rounded-card border p-6 ${
            isCorrect ? 'border-primary/30 bg-primary/5' : 'border-line bg-surface'
          }`}
        >
          {isCorrect ? (
            <p className="text-xl font-extrabold text-primary">
              🎉 Yes — it’s {answer.name.en} ({answer.name.zh})! Well done.
            </p>
          ) : (
            <p className="text-xl font-bold text-heading">
              That’s a good guess. The answer is{' '}
              <span className="text-primary">
                {answer.name.en} ({answer.name.zh})
              </span>
              . Let’s look together. 我们一起看看。
            </p>
          )}
          <div className="mt-4 rounded-inner border border-line bg-surface p-4">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
              ❤️ Sharing prompt · 分享提问
            </p>
            <p className="mt-1 text-lg font-bold text-heading">
              {theme.id === 'sg-food'
                ? 'Did you eat this often when you were younger?'
                : 'Have you ever seen this animal in real life?'}
            </p>
            <p lang="zh" className="text-lg text-muted">
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
