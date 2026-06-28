import { Link } from 'react-router-dom'
import { LADDER } from '../data/ladder'
import { BiText, Card, ConsentReminder } from '../components/common'

// Soft, friendly tint per rung — keeps the trio colourful without gamifying.
const RUNG_AVATAR = ['bg-primary/10', 'bg-coral/15', 'bg-teal/15']

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="gradient-primary relative overflow-hidden rounded-card px-6 py-14 text-center shadow-lift sm:px-12">
        <span className="blob -left-10 -top-10 h-56 w-56 bg-primary-light" />
        <span className="blob -bottom-16 -right-10 h-64 w-64 bg-coral" />
        <div className="relative z-10">
          <span
            aria-hidden
            className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-5xl backdrop-blur"
          >
            🪜
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            The Participation Ladder
          </h1>
          <p lang="zh" className="mt-2 text-2xl font-bold text-white/85">
            参与阶梯
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            A warm, simple way to plan memory-engagement activities for seniors —
            where <strong className="font-bold text-white">every senior can join in their own way</strong>,
            at their own pace.
          </p>
          <p lang="zh" className="mx-auto mt-2 max-w-2xl text-lg text-white/80">
            一个温暖、简单的工具，帮助义工为长辈设计回忆活动——让每位长辈都能用自己的方式、按自己的节奏参与。
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/themes"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-white px-8 py-3 text-base font-bold text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              Start planning · 开始规划 →
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/60 px-8 py-3 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              How it works · 如何进行
            </Link>
          </div>
        </div>
      </section>

      {/* Three rungs */}
      <section>
        <h2 className="text-center text-2xl font-extrabold text-heading sm:text-3xl">
          Three ways to take part · 三种参与的方式
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-body">
          The ladder has three gentle rungs. There is no “right” rung — joining
          at any level is a success.
        </p>
        <div className="mt-9 grid gap-6 sm:grid-cols-3">
          {LADDER.map((rung, i) => (
            <Card key={rung.level} className="text-center transition-transform hover:-translate-y-1">
              <div
                aria-hidden
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-4xl ${RUNG_AVATAR[i]}`}
              >
                {rung.icon}
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.15em] text-primary">
                Rung {i + 1}
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-heading">
                <BiText value={rung.title} />
              </h3>
              <p className="mt-3 text-base text-body">{rung.description.en}</p>
              <p lang="zh" className="mt-2 text-base text-muted">
                {rung.description.zh}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* One theme + consent */}
      <section className="grid gap-6 sm:grid-cols-2">
        <Card>
          <h3 className="text-xl font-extrabold text-heading">
            One theme, one shared story · 一个主题，一个共同的故事
          </h3>
          <p className="mt-3 text-base text-body">
            Each session links a <strong className="text-heading">memory-card game</strong> and a{' '}
            <strong className="text-heading">riddle game</strong> using one familiar theme. The
            very same card pictures from the memory game come back as picture
            clues for the riddles — so everything feels connected and easy to
            follow.
          </p>
          <p lang="zh" className="mt-2 text-base text-muted">
            每次活动用一个熟悉的主题，把“记忆卡片游戏”和“猜谜游戏”连起来。记忆游戏里的同一张张图片，会再次出现，成为猜谜的图片提示。
          </p>
        </Card>
        <ConsentReminder className="self-center" />
      </section>
    </div>
  )
}
