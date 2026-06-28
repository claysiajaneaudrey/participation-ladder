import { useState } from 'react'
import { getTheme } from '../data/themes'
import { LADDER } from '../data/ladder'
import { useApp } from '../state'
import type { LadderLevel } from '../data/types'
import { buildPlanText, buildReflectionText } from '../util/exportText'
import { Button, ButtonLink, Card, PageHeader } from '../components/common'

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
        <p className="rounded-2xl border border-clay-100 bg-white p-4 text-lg text-ink">
          Reflecting on: <strong>{theme.name.en}</strong>{' '}
          <span lang="zh" className="text-ink-soft">
            （{theme.name.zh}）
          </span>
        </p>
      ) : (
        <p className="rounded-2xl border border-clay-100 bg-white p-4 text-ink-soft">
          No theme selected — you can still write a reflection.{' '}
          <ButtonLink to="/themes" variant="ghost">
            Choose a theme
          </ButtonLink>
        </p>
      )}

      <Card>
        <h2 className="text-xl font-extrabold text-ink">
          Which rungs did seniors join at? · 长辈参与了哪些层级？
        </h2>
        <p className="mt-1 text-base text-ink-soft">Select all that happened.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {LADDER.map((rung) => {
            const active = reflection.levelsJoined.includes(rung.level)
            return (
              <button
                key={rung.level}
                onClick={() => toggleLevel(rung.level)}
                aria-pressed={active}
                className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                  active
                    ? 'border-clay-500 bg-clay-50'
                    : 'border-clay-100 bg-white hover:border-clay-200'
                }`}
              >
                <span className="text-3xl">{rung.icon}</span>
                <span>
                  <span className="block text-lg font-bold text-ink">
                    {rung.title.en}
                  </span>
                  <span lang="zh" className="block text-ink-soft">
                    {rung.title.zh}
                  </span>
                </span>
                <span className="ml-auto text-xl text-clay-600">
                  {active ? '✓' : ''}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      <Card>
        <label className="block">
          <span className="text-xl font-extrabold text-ink">
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
            className="mt-3 w-full rounded-2xl border-2 border-clay-100 bg-cream p-4 text-lg text-ink focus:border-clay-400"
          />
        </label>
      </Card>

      <Card>
        <label className="block">
          <span className="text-xl font-extrabold text-ink">
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
            className="mt-3 w-full rounded-2xl border-2 border-clay-100 bg-cream p-4 text-lg text-ink focus:border-clay-400"
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
        {saved && <span className="text-ink-soft">Saved ✓</span>}
      </div>
    </div>
  )
}
