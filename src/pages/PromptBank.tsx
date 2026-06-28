import { getTheme, THEMES } from '../data/themes'
import { SHARED_PROMPTS, LEVEL_META } from '../data/ladder'
import { useApp } from '../state'
import type { LadderLevel, Prompt } from '../data/types'
import { Card, PageHeader } from '../components/common'

const LEVELS: LadderLevel[] = ['visual', 'verbal', 'sharing']

export default function PromptBank() {
  const { selectedThemeId, setSelectedThemeId } = useApp()
  const theme = getTheme(selectedThemeId ?? undefined)

  const all: Prompt[] = [...SHARED_PROMPTS, ...(theme?.prompts ?? [])]

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Prompt bank · 提问库"
        title="Phrases to read aloud"
        intro="Bilingual phrases volunteers can say during the session, grouped by the three rungs of the ladder. Start gentle, and follow the senior’s lead."
      />

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-clay-100 bg-white p-4">
        <span className="font-bold text-ink">Theme phrases for · 主题提问：</span>
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedThemeId(t.id)}
            className={`rounded-xl px-4 py-2 font-bold transition-colors ${
              selectedThemeId === t.id
                ? 'bg-clay-600 text-white'
                : 'bg-clay-100 text-clay-700 hover:bg-clay-200'
            }`}
          >
            {t.icon} {t.name.en}
          </button>
        ))}
        {!theme && (
          <span className="text-ink-soft">Choose a theme to see food/animal phrases.</span>
        )}
      </div>

      <div className="space-y-6">
        {LEVELS.map((level) => {
          const meta = LEVEL_META[level]
          const prompts = all.filter((p) => p.level === level)
          return (
            <Card key={level}>
              <h2 className="flex items-center gap-3 text-2xl font-extrabold text-ink">
                <span aria-hidden className="text-3xl">
                  {meta.icon}
                </span>
                {meta.label.en}
                <span lang="zh" className="text-xl font-bold text-ink-soft">
                  {meta.label.zh}
                </span>
              </h2>
              <ul className="mt-4 space-y-3">
                {prompts.map((p, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-clay-100 bg-clay-50 p-4"
                  >
                    <p className="text-xl font-bold text-ink">{p.text.en}</p>
                    <p lang="zh" className="text-xl text-ink-soft">
                      {p.text.zh}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
