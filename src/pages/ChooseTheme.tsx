import { useNavigate } from 'react-router-dom'
import { THEMES } from '../data/themes'
import { useApp } from '../state'
import { PageHeader } from '../components/common'

export default function ChooseTheme() {
  const { selectedThemeId, setSelectedThemeId } = useApp()
  const navigate = useNavigate()

  function choose(id: string) {
    setSelectedThemeId(id)
    navigate('/plan')
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 1 · 第一步"
        title="Choose a theme"
        intro="Pick one familiar theme for the whole session. The pictures you see here are the same ones used in both the memory game and the riddle clues."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {THEMES.map((theme) => {
          const isSelected = selectedThemeId === theme.id
          const preview = theme.cards.slice(0, 4)
          return (
            <button
              key={theme.id}
              onClick={() => choose(theme.id)}
              className={`group flex flex-col rounded-3xl border-2 bg-white p-6 text-left transition-all hover:shadow-md ${
                isSelected ? 'border-clay-500 ring-2 ring-clay-200' : 'border-clay-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-4xl">
                  {theme.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-ink">{theme.name.en}</h2>
                  <p lang="zh" className="text-lg font-bold text-ink-soft">
                    {theme.name.zh}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-base text-ink-soft">{theme.blurb.en}</p>
              <p lang="zh" className="mt-1 text-base text-ink-soft">
                {theme.blurb.zh}
              </p>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {preview.map((card) => (
                  <img
                    key={card.id}
                    src={card.image}
                    alt={card.name.en}
                    className="aspect-square w-full rounded-xl border border-clay-100 object-cover"
                  />
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-2 self-start rounded-2xl bg-clay-600 px-5 py-2.5 text-lg font-bold text-white transition-colors group-hover:bg-clay-700">
                {isSelected ? 'Selected — open plan' : 'Use this theme'} · 选这个 →
              </span>
              <span className="mt-2 text-sm text-ink-soft">
                {theme.cards.length} picture cards · {theme.riddles.length} riddles
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
