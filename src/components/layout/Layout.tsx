// src/components/layout/Layout.tsx

import { NavLink } from 'react-router-dom'
import { Home, CalendarCheck, Clock3, Trophy, Dog, Settings } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/check-in', label: 'Check', icon: CalendarCheck },
  { path: '/timeline', label: 'Timeline', icon: Clock3 },
  { path: '/achievements', label: 'Awards', icon: Trophy },
  { path: '/my-dog', label: 'My Dog', icon: Dog },
  { path: '/settings', label: 'Settings', icon: Settings },
]

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f7f6] text-stone-800">
      <header className="border-b border-[#d8e4df] bg-[#fbfcfb]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">100 Days Home</h1>

          <nav className="hidden gap-3 text-sm md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-[#5f7a72]'
                    : 'text-stone-500 hover:text-[#5f7a72]'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-6">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex flex-col items-center gap-1 px-2 py-3 text-xs',
                    isActive
                      ? 'font-semibold text-[#5f7a72]'
                      : 'text-stone-500',
                  ].join(' ')
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
