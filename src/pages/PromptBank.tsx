import { getTheme, THEMES } from '../data/themes'
import { SHARED_PROMPTS, LEVEL_META } from '../data/ladder'
import { useApp } from '../state'
import type { LadderLevel, Prompt } from '../data/types'
import { Card, PageHeader } from '../components/common'

const LEVELS: LadderLevel[] = ['visual', 'verbal', 'sharing']
const LEVEL_AVATAR: Record<LadderLevel, string> = {
  visual: 'bg-primary/10',
  verbal: 'bg-coral/15',
  sharing: 'bg-teal/15',
}

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

      <div className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-surface p-4 shadow-soft">
        <span className="font-bold text-heading">Theme phrases for · 主题提问：</span>
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedThemeId(t.id)}
            className={`rounded-full px-5 py-2 font-semibold transition-all ${
              selectedThemeId === t.id
                ? 'gradient-primary text-white shadow-soft'
                : 'bg-primary/10 text-primary hover:bg-primary/15'
            }`}
          >
            {t.icon} {t.name.en}
          </button>
        ))}
        {!theme && (
          <span className="text-muted">Choose a theme to see food/animal phrases.</span>
        )}
      </div>

      <div className="space-y-6">
        {LEVELS.map((level) => {
          const meta = LEVEL_META[level]
          const prompts = all.filter((p) => p.level === level)
          return (
            <Card key={level}>
              <h2 className="flex items-center gap-3 text-2xl font-extrabold text-heading">
                <span
                  aria-hidden
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${LEVEL_AVATAR[level]}`}
                >
                  {meta.icon}
                </span>
                {meta.label.en}
                <span lang="zh" className="text-xl font-bold text-muted">
                  {meta.label.zh}
                </span>
              </h2>
              <ul className="mt-5 space-y-3">
                {prompts.map((p, i) => (
                  <li
                    key={i}
                    className="rounded-inner border border-line bg-lavender p-4"
                  >
                    <p className="text-xl font-bold text-heading">{p.text.en}</p>
                    <p lang="zh" className="text-xl text-body">
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
