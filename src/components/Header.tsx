import { NavLink } from 'react-router-dom'
import { Plus, Timer } from 'lucide-react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-soft text-brand' : 'text-ink-soft hover:bg-line'
  }`

export function Header({ onAddTask }: { onAddTask: () => void }) {
  return (
    <header className="border-b border-line bg-paper-raised">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Timer className="h-4.5 w-4.5" strokeWidth={2.25} />
          </div>
          <span className="font-display text-base font-bold tracking-tight text-ink">
            Deadline Tracker
          </span>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className={navLinkClass}>
            All tasks
          </NavLink>
        </nav>

        <button
          onClick={onAddTask}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">Add task</span>
        </button>
      </div>
    </header>
  )
}
