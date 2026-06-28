import { LADDER } from '../data/ladder'
import { BiText, ButtonLink, Card, ConsentReminder } from '../components/common'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <span aria-hidden className="text-6xl">
          🪜
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          The Participation Ladder
        </h1>
        <p lang="zh" className="mt-1 text-2xl font-bold text-ink-soft">
          参与阶梯
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-ink-soft">
          A warm, simple way to plan memory-engagement activities for seniors —
          where <strong className="text-ink">every senior can join in their own way</strong>,
          at their own pace.
        </p>
        <p lang="zh" className="mx-auto mt-2 max-w-2xl text-lg text-ink-soft">
          一个温暖、简单的工具，帮助义工为长辈设计回忆活动——让每位长辈都能用自己的方式、按自己的节奏参与。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink to="/themes">Start planning · 开始规划 →</ButtonLink>
          <ButtonLink to="/how-it-works" variant="secondary">
            How it works · 如何进行
          </ButtonLink>
        </div>
      </section>

      <section>
        <h2 className="text-center text-2xl font-extrabold text-ink">
          Three ways to take part · 三种参与的方式
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-lg text-ink-soft">
          The ladder has three gentle rungs. There is no “right” rung — joining
          at any level is a success.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {LADDER.map((rung, i) => (
            <Card key={rung.level} className="text-center">
              <div className="text-5xl">{rung.icon}</div>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-clay-600">
                Rung {i + 1}
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-ink">
                <BiText value={rung.title} />
              </h3>
              <p className="mt-3 text-base text-ink-soft">{rung.description.en}</p>
              <p lang="zh" className="mt-2 text-base text-ink-soft">
                {rung.description.zh}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Card>
          <h3 className="text-xl font-extrabold text-ink">
            One theme, one shared story · 一个主题，一个共同的故事
          </h3>
          <p className="mt-3 text-base text-ink-soft">
            Each session links a <strong>memory-card game</strong> and a{' '}
            <strong>riddle game</strong> using one familiar theme. The very same
            card pictures from the memory game come back as picture clues for the
            riddles — so everything feels connected and easy to follow.
          </p>
          <p lang="zh" className="mt-2 text-base text-ink-soft">
            每次活动用一个熟悉的主题，把“记忆卡片游戏”和“猜谜游戏”连起来。记忆游戏里的同一张张图片，会再次出现，成为猜谜的图片提示。
          </p>
        </Card>
        <ConsentReminder className="self-center" />
      </section>
    </div>
  )
}
