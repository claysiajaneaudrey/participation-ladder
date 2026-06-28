import { useState } from 'react'
import { getTheme } from '../data/themes'
import { useApp } from '../state'
import { buildPlanText, MEMORY_CARD_COUNT } from '../util/exportText'
import {
  Button,
  ButtonLink,
  Card,
  ConsentReminder,
  PageHeader,
} from '../components/common'
import PictureCard from '../components/PictureCard'
import MemoryGame from '../components/MemoryGame'
import RiddleGame from '../components/RiddleGame'

function StepHeading({
  n,
  icon,
  title,
  zh,
}: {
  n: number
  icon: string
  title: string
  zh: string
}) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-600 text-xl font-extrabold text-white">
        {n}
      </span>
      <div>
        <h2 className="text-2xl font-extrabold text-ink">
          <span aria-hidden className="mr-2">
            {icon}
          </span>
          {title}
        </h2>
        <p lang="zh" className="text-lg font-bold text-ink-soft">
          {zh}
        </p>
      </div>
    </div>
  )
}

export default function ActivityPlan() {
  const { selectedThemeId } = useApp()
  const theme = getTheme(selectedThemeId ?? undefined)
  const [copied, setCopied] = useState(false)

  if (!theme) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="No theme chosen yet"
          intro="Pick a theme first and we’ll generate a ready-to-run session plan for you."
        />
        <ButtonLink to="/themes">Choose a theme · 选择主题 →</ButtonLink>
      </div>
    )
  }

  const memoryCards = theme.cards.slice(0, MEMORY_CARD_COUNT)

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(buildPlanText(theme!))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-12">
      <div>
        <PageHeader
          eyebrow={`Activity plan · ${theme.name.zh}`}
          title={`Session: ${theme.name.en}`}
          intro="A ready-to-run flow. Warm up with the memory-card game, then carry the very same pictures into the riddle game, and end by inviting memories to be shared."
        />
        <div className="flex flex-wrap gap-3">
          <Button onClick={copyPlan} variant="secondary">
            {copied ? '✓ Copied!' : '📋 Copy plan as text · 复制计划'}
          </Button>
          <ButtonLink to="/themes" variant="ghost">
            Change theme · 换主题
          </ButtonLink>
        </div>
      </div>

      <ConsentReminder />

      {/* STEP 1 — MEMORY GAME */}
      <section>
        <StepHeading n={1} icon="🃏" title="Memory-card game" zh="记忆卡片游戏" />
        <p className="mb-5 max-w-2xl text-lg text-ink-soft">
          These {memoryCards.length} familiar cards make up today’s deck. Lay them
          face-down and take turns finding matching pairs. Look, point, and name
          them together — no rush.
        </p>

        <Card className="mb-6">
          <h3 className="mb-4 text-lg font-bold text-ink">
            Today’s cards · 今天的卡片
          </h3>
          <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {memoryCards.map((card) => (
              <li key={card.id}>
                <PictureCard card={card} size="sm" />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-bold text-ink">
            ▶ Try the matching game · 试试配对游戏
          </h3>
          <MemoryGame theme={theme} cards={memoryCards} />
        </Card>
      </section>

      {/* STEP 2 — RIDDLE GAME */}
      <section>
        <StepHeading
          n={2}
          icon="🧩"
          title="Riddle game — same pictures"
          zh="猜谜游戏 — 同样的图片"
        />
        <p className="mb-5 max-w-2xl text-lg text-ink-soft">
          Now the same pictures become clues. Read each riddle aloud and let
          seniors point to the answer they recognise.
        </p>
        <Card>
          <RiddleGame theme={theme} />
        </Card>
      </section>

      {/* STEP 3 — SHARING */}
      <section>
        <StepHeading n={3} icon="❤️" title="Invite a memory" zh="邀请分享回忆" />
        <Card>
          <p className="text-lg text-ink-soft">
            Each picture is a doorway to a story. Use these gentle openers — only
            if the senior wishes to share.
          </p>
          <ul className="mt-4 space-y-3">
            {theme.prompts
              .filter((p) => p.level === 'sharing')
              .map((p, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-clay-100 bg-clay-50 p-4"
                >
                  <p className="text-lg font-bold text-ink">{p.text.en}</p>
                  <p lang="zh" className="text-lg text-ink-soft">
                    {p.text.zh}
                  </p>
                </li>
              ))}
          </ul>
        </Card>
      </section>

      <div className="flex flex-wrap gap-4">
        <ButtonLink to="/prompts" variant="secondary">
          Open the prompt bank · 提问库 →
        </ButtonLink>
        <ButtonLink to="/reflection">After the session: reflect · 活动后反思 →</ButtonLink>
      </div>
    </div>
  )
}
