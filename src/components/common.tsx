import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Bilingual } from '../data/types'

/** Stacked bilingual text: English on top, 中文 below. */
export function BiText({
  value,
  className = '',
  zhClassName = '',
}: {
  value: Bilingual
  className?: string
  zhClassName?: string
}) {
  return (
    <span className={className}>
      <span className="block">{value.en}</span>
      <span lang="zh" className={`block text-ink-soft ${zhClassName}`}>
        {value.zh}
      </span>
    </span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string
  title: string
  intro?: ReactNode
}) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-clay-600">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-ink-soft">{intro}</p>}
    </header>
  )
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-3xl border border-clay-100 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      {children}
    </div>
  )
}

type BtnProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
const btnVariants = {
  primary: 'bg-clay-600 text-white hover:bg-clay-700',
  secondary: 'bg-clay-100 text-clay-700 hover:bg-clay-200',
  ghost: 'text-clay-700 hover:bg-clay-100',
}

export function ButtonLink({
  to,
  variant = 'primary',
  className = '',
  children,
}: BtnProps & { to: string }) {
  return (
    <Link to={to} className={`${btnBase} ${btnVariants[variant]} ${className}`}>
      {children}
    </Link>
  )
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${btnBase} ${btnVariants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

/** The always-visible, gentle reminder that participation is never forced. */
export function ConsentReminder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-clay-200 bg-clay-50 p-4 text-ink ${className}`}
    >
      <span aria-hidden className="text-2xl leading-none">
        🤝
      </span>
      <p className="text-base">
        <strong className="font-bold">Participation is always a choice.</strong>{' '}
        Never pressure a senior to join in. Looking, resting, or simply being
        present is welcome.
        <span lang="zh" className="mt-1 block text-ink-soft">
          参与永远是自愿的。请勿勉强长辈。看一看、休息、或只是陪伴，都很好。
        </span>
      </p>
    </div>
  )
}
