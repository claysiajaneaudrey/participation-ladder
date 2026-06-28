import { useMemo, useState } from 'react'
import type { Card, Theme } from '../data/types'
import { Button } from './common'

interface Tile {
  key: string
  card: Card
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildTiles(cards: Card[]): Tile[] {
  const doubled = cards.flatMap((card) => [
    { key: `${card.id}-a`, card },
    { key: `${card.id}-b`, card },
  ])
  return shuffle(doubled)
}

/**
 * A gentle memory-matching game. Tap two cards to find a matching pair.
 * The same theme cards reappear later as riddle clues.
 */
export default function MemoryGame({ theme, cards }: { theme: Theme; cards: Card[] }) {
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles(cards))
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  const [busy, setBusy] = useState(false)

  const allMatched = matched.size === cards.length

  function reset() {
    setTiles(buildTiles(cards))
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setBusy(false)
  }

  function handleFlip(index: number) {
    if (busy) return
    if (flipped.includes(index)) return
    if (matched.has(tiles[index].card.id)) return

    const next = [...flipped, index]
    setFlipped(next)

    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      if (tiles[a].card.id === tiles[b].card.id) {
        setMatched((prev) => new Set(prev).add(tiles[a].card.id))
        setFlipped([])
      } else {
        setBusy(true)
        window.setTimeout(() => {
          setFlipped([])
          setBusy(false)
        }, 1100)
      }
    }
  }

  const pairsFound = matched.size

  const grid = useMemo(() => {
    // pick a column count that keeps tiles large
    const n = tiles.length
    if (n <= 8) return 'grid-cols-2 sm:grid-cols-4'
    if (n <= 12) return 'grid-cols-3 sm:grid-cols-4'
    return 'grid-cols-3 sm:grid-cols-4'
  }, [tiles.length])

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-[12rem] flex-1">
          <p className="text-base font-bold text-heading">
            Pairs found: {pairsFound} / {cards.length}
            <span className="ml-3 font-medium text-muted">Moves: {moves}</span>
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
            <div
              className="gradient-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${(pairsFound / cards.length) * 100}%` }}
            />
          </div>
        </div>
        <Button variant="secondary" onClick={reset}>
          ↺ Start again <span lang="zh" className="font-normal">重新开始</span>
        </Button>
      </div>

      {allMatched && (
        <div className="mb-4 rounded-inner border border-primary/30 bg-primary/10 p-4 text-center text-lg font-bold text-primary">
          🎉 All pairs matched — wonderful! 全部配对成功，太棒了！
        </div>
      )}

      <ul className={`grid gap-3 sm:gap-4 ${grid}`}>
        {tiles.map((tile, i) => {
          const isUp = flipped.includes(i) || matched.has(tile.card.id)
          const isMatched = matched.has(tile.card.id)
          return (
            <li key={tile.key}>
              <button
                onClick={() => handleFlip(i)}
                disabled={isUp || busy}
                aria-label={isUp ? tile.card.name.en : 'Hidden card'}
                className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-inner border text-center shadow-sm transition-all ${
                  isUp
                    ? isMatched
                      ? 'border-2 border-primary bg-primary/5'
                      : 'border-line bg-surface'
                    : 'cursor-pointer border-line bg-primary/5 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-soft'
                }`}
              >
                {isUp ? (
                  <span className="flex h-full w-full flex-col items-center justify-center p-1.5">
                    <img
                      src={tile.card.image}
                      alt={tile.card.name.en}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <span className="mt-1 line-clamp-1 text-sm font-bold text-heading">
                      {tile.card.name.en}
                    </span>
                  </span>
                ) : (
                  <span aria-hidden className="text-4xl opacity-40 sm:text-5xl">
                    {theme.icon}
                  </span>
                )}
                {isMatched && (
                  <span
                    aria-hidden
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-soft"
                  >
                    ✓
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
