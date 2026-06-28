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
      <span lang="zh" className={`block text-muted ${zhClassName}`}>
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
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-extrabold leading-tight text-heading sm:text-4xl">
        {title}
      </h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-body">{intro}</p>}
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
      className={`rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8 ${className}`}
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
  'inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
const btnVariants = {
  primary:
    'gradient-primary text-white shadow-soft hover:shadow-lift hover:-translate-y-0.5',
  secondary:
    'bg-surface text-primary border border-line shadow-sm hover:border-primary/40 hover:shadow-soft',
  ghost: 'text-primary hover:bg-primary/10',
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
      className={`flex items-start gap-4 rounded-card border border-line bg-primary/5 p-5 ${className}`}
    >
      <span
        aria-hidden
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl"
      >
        🤝
      </span>
      <p className="text-base text-body">
        <strong className="font-bold text-heading">
          Participation is always a choice.
        </strong>{' '}
        Never pressure a senior to join in. Looking, resting, or simply being
        present is welcome.
        <span lang="zh" className="mt-1 block text-muted">
          参与永远是自愿的。请勿勉强长辈。看一看、休息、或只是陪伴，都很好。
        </span>
      </p>
    </div>
  )
}
