import { LADDER } from '../data/ladder'
import { BiText, ButtonLink, Card, ConsentReminder, PageHeader } from '../components/common'

const STEPS = [
  {
    icon: '🎨',
    title: 'Pick one familiar theme',
    zh: '选择一个熟悉的主题',
    body: 'Choose a theme everyone can relate to — like local food or animals. The whole session stays on this one theme.',
    bodyZh: '选一个大家都熟悉的主题，例如本地美食或动物。整场活动都围绕这一个主题进行。',
  },
  {
    icon: '🃏',
    title: 'Play the memory-card game',
    zh: '玩记忆卡片游戏',
    body: 'Lay out the picture cards and match the pairs together. Seniors look, point, and recognise familiar images — warming up gently.',
    bodyZh: '把图片卡片排开，一起配对。长辈们看图、指认熟悉的画面——轻松地暖身。',
  },
  {
    icon: '🧩',
    title: 'Move to the riddle game — same pictures',
    zh: '进入猜谜游戏——同样的图片',
    body: 'Read a riddle aloud. The SAME cards from the memory game come back as picture clues, so seniors can point to the answer they recognise.',
    bodyZh: '读出谜语。记忆游戏里的同一批图片会再次出现，作为提示，长辈们可以指出他们认得的答案。',
  },
  {
    icon: '❤️',
    title: 'Invite a memory to be shared',
    zh: '邀请分享回忆',
    body: 'Each picture is a doorway to a story. Gently invite seniors to share a memory — but only if they wish to.',
    bodyZh: '每张图片都是一扇通往回忆的门。温柔地邀请长辈分享回忆——但只在他们愿意时。',
  },
]

export default function HowItWorks() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="How it works · 如何进行"
        title="One session, one theme, four gentle steps"
        intro="A session links a memory-card game and a riddle game through a single familiar theme. The cards do double duty — first as a matching game, then as picture clues for the riddles."
      />

      <ol className="space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <Card className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-600 text-xl font-extrabold text-white">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-ink">
                  <span aria-hidden className="mr-2">
                    {step.icon}
                  </span>
                  {step.title}
                </h3>
                <p lang="zh" className="text-lg font-bold text-ink-soft">
                  {step.zh}
                </p>
                <p className="mt-2 text-base text-ink-soft">{step.body}</p>
                <p lang="zh" className="mt-1 text-base text-ink-soft">
                  {step.bodyZh}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ol>

      <section>
        <h2 className="text-2xl font-extrabold text-ink">
          Meeting everyone where they are · 因人而异，量力而为
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-ink-soft">
          Throughout every step, watch which rung of the ladder each senior is
          comfortable on. All three are equally valuable.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {LADDER.map((rung) => (
            <div
              key={rung.level}
              className="rounded-2xl border border-clay-100 bg-white p-5"
            >
              <div className="text-3xl">{rung.icon}</div>
              <h3 className="mt-1 text-lg font-extrabold text-ink">
                <BiText value={rung.title} />
              </h3>
            </div>
          ))}
        </div>
      </section>

      <ConsentReminder />

      <div className="flex flex-wrap gap-4">
        <ButtonLink to="/themes">Choose a theme · 选择主题 →</ButtonLink>
        <ButtonLink to="/prompts" variant="secondary">
          See the prompt bank · 查看提问库
        </ButtonLink>
      </div>
    </div>
  )
}
