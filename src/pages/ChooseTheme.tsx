import { useNavigate } from 'react-router-dom'
import { THEMES } from '../data/themes'
import { useApp } from '../state'
import { PageHeader } from '../components/common'
import { accent } from '../util/accents'

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

      <div className="grid gap-7 sm:grid-cols-2">
        {THEMES.map((theme) => {
          const isSelected = selectedThemeId === theme.id
          const preview = theme.cards.slice(0, 4)
          const a = accent(theme.accent)
          return (
            <button
              key={theme.id}
              onClick={() => choose(theme.id)}
              className={`group flex flex-col overflow-hidden rounded-card border bg-surface text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${
                isSelected
                  ? 'border-2 border-primary ring-4 ring-primary/15'
                  : 'border-line'
              }`}
            >
              {/* Accent header */}
              <div className={`${a.gradient} flex items-center gap-4 px-6 py-5`}>
                <span
                  aria-hidden
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 text-3xl backdrop-blur"
                >
                  {theme.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{theme.name.en}</h2>
                  <p lang="zh" className="text-lg font-bold text-white/90">
                    {theme.name.zh}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-base text-body">{theme.blurb.en}</p>
                <p lang="zh" className="mt-1 text-base text-muted">
                  {theme.blurb.zh}
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2.5">
                  {preview.map((card) => (
                    <img
                      key={card.id}
                      src={card.image}
                      alt={card.name.en}
                      className="aspect-square w-full rounded-inner border border-line object-cover"
                    />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex min-h-[3rem] items-center gap-2 rounded-full px-6 py-3 text-base font-bold text-white shadow-soft transition-transform group-hover:-translate-y-0.5 ${a.chipBg}`}
                  >
                    {isSelected ? 'Selected — open plan' : 'Use this theme'} →
                  </span>
                  <span className={`text-sm font-semibold ${a.text}`}>
                    {theme.cards.length} cards · {theme.riddles.length} riddles
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
