import type { Card } from '../data/types'

/**
 * A familiar picture card with its bilingual name. Reused in the memory game
 * and as the visual clue options in the riddle game.
 */
export default function PictureCard({
  card,
  showName = true,
  size = 'md',
}: {
  card: Card
  showName?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const pad = size === 'lg' ? 'p-4' : size === 'sm' ? 'p-2' : 'p-3'
  return (
    <figure className="flex flex-col items-center">
      <div
        className={`w-full overflow-hidden rounded-2xl border border-clay-100 bg-clay-50 ${pad}`}
      >
        <img
          src={card.image}
          alt={card.name.en}
          loading="lazy"
          className="aspect-square w-full rounded-xl object-cover"
        />
      </div>
      {showName && (
        <figcaption className="mt-2 text-center leading-tight">
          <span className="block text-lg font-bold text-ink">{card.name.en}</span>
          <span lang="zh" className="block text-base text-ink-soft">
            {card.name.zh}
          </span>
        </figcaption>
      )}
    </figure>
  )
}
