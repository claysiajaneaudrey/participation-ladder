import { NavLink, Outlet } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/themes', label: 'Choose Theme' },
  { to: '/plan', label: 'Activity Plan' },
  { to: '/prompts', label: 'Prompt Bank' },
  { to: '/reflection', label: 'Reflection' },
]

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-clay-100 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <span aria-hidden className="text-3xl">
              🪜
            </span>
            <span className="text-xl font-extrabold leading-none text-ink">
              Participation Ladder
              <span lang="zh" className="block text-sm font-semibold text-ink-soft">
                参与阶梯
              </span>
            </span>
          </NavLink>
          <nav aria-label="Main" className="-mx-1 overflow-x-auto">
            <ul className="flex gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `block whitespace-nowrap rounded-xl px-4 py-2 text-base font-bold transition-colors ${
                        isActive
                          ? 'bg-clay-600 text-white'
                          : 'text-ink-soft hover:bg-clay-100 hover:text-clay-700'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      <footer className="border-t border-clay-100 bg-sand">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-ink-soft sm:px-6">
          A planning tool for volunteers running inclusive memory-engagement
          activities for seniors. · 为长辈设计的包容性回忆活动规划工具
        </div>
      </footer>
    </div>
  )
}
