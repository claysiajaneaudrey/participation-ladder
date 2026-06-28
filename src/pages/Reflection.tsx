import { useState } from 'react'
import { getTheme } from '../data/themes'
import { LADDER } from '../data/ladder'
import { useApp } from '../state'
import type { LadderLevel } from '../data/types'
import { buildPlanText, buildReflectionText } from '../util/exportText'
import { Button, ButtonLink, Card, PageHeader } from '../components/common'

const RUNG_AVATAR = ['bg-primary/10', 'bg-coral/15', 'bg-teal/15']

export default function Reflection() {
  const { selectedThemeId, reflection, setReflection } = useApp()
  const theme = getTheme(selectedThemeId ?? undefined)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  function toggleLevel(level: LadderLevel) {
    const has = reflection.levelsJoined.includes(level)
    const levelsJoined = has
      ? reflection.levelsJoined.filter((l) => l !== level)
      : [...reflection.levelsJoined, level]
    setReflection({ ...reflection, levelsJoined, themeId: selectedThemeId })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1500)
  }

  function fullText() {
    const parts = [buildReflectionText(reflection, theme)]
    if (theme) parts.push('\n\n----------------------------------------\n\n' + buildPlanText(theme))
    return parts.join('')
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(fullText())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function download() {
    const blob = new Blob([fullText()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `participation-ladder-${theme?.id ?? 'session'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="After the session · 活动后"
        title="Reflection"
        intro="A short note to capture what happened. Your answers stay on this page during your visit, and you can copy or download them at any time."
      />

      {theme ? (
        <p className="rounded-card border border-line bg-surface p-4 text-lg text-heading shadow-soft">
          Reflecting on: <strong>{theme.name.en}</strong>{' '}
          <span lang="zh" className="text-muted">
            （{theme.name.zh}）
          </span>
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-surface p-4 text-muted shadow-soft">
          <span>No theme selected — you can still write a reflection.</span>
          <ButtonLink to="/themes" variant="ghost">
            Choose a theme
          </ButtonLink>
        </div>
      )}

      <Card>
        <h2 className="text-xl font-extrabold text-heading">
          Which rungs did seniors join at? · 长辈参与了哪些层级？
        </h2>
        <p className="mt-1 text-base text-muted">Select all that happened.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {LADDER.map((rung, i) => {
            const active = reflection.levelsJoined.includes(rung.level)
            return (
              <button
                key={rung.level}
                onClick={() => toggleLevel(rung.level)}
                aria-pressed={active}
                className={`flex items-center gap-3 rounded-inner border p-4 text-left transition-all ${
                  active
                    ? 'border-2 border-primary bg-primary/10 shadow-soft'
                    : 'border-line bg-surface hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft'
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${RUNG_AVATAR[i]}`}
                >
                  {rung.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-bold text-heading">
                    {rung.title.en}
                  </span>
                  <span lang="zh" className="block text-muted">
                    {rung.title.zh}
                  </span>
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white"
                  >
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Card>

      <Card>
        <label className="block">
          <span className="text-xl font-extrabold text-heading">
            What worked well? · 哪些做得好？
          </span>
          <textarea
            value={reflection.whatWorked}
            onChange={(e) =>
              setReflection({
                ...reflection,
                whatWorked: e.target.value,
                themeId: selectedThemeId,
              })
            }
            rows={4}
            placeholder="e.g. Mdm Tan lit up at the laksa card and told us about her mother’s recipe…"
            className="mt-3 w-full rounded-inner border border-line bg-lavender p-4 text-lg text-body transition-colors focus:border-primary focus:bg-surface"
          />
        </label>
      </Card>

      <Card>
        <label className="block">
          <span className="text-xl font-extrabold text-heading">
            What to improve next time? · 下次可以改进什么？
          </span>
          <textarea
            value={reflection.toImprove}
            onChange={(e) =>
              setReflection({
                ...reflection,
                toImprove: e.target.value,
                themeId: selectedThemeId,
              })
            }
            rows={4}
            placeholder="e.g. Use fewer cards next time; speak a little slower…"
            className="mt-3 w-full rounded-inner border border-line bg-lavender p-4 text-lg text-body transition-colors focus:border-primary focus:bg-surface"
          />
        </label>
      </Card>

      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={copyAll}>
          {copied ? '✓ Copied!' : '📋 Copy plan + reflection · 复制'}
        </Button>
        <Button onClick={download} variant="secondary">
          ⬇ Download as text · 下载
        </Button>
        {saved && <span className="font-semibold text-primary">Saved ✓</span>}
      </div>
    </div>
  )
}
