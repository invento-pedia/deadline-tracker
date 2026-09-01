import { Search } from 'lucide-react'
import { CATEGORIES, PRIORITIES, type TaskFilters } from '../types/task'

interface FilterBarProps {
  filters: TaskFilters
  onChange: (filters: TaskFilters) => void
}

const selectClass =
  'rounded-lg border border-line bg-paper-raised px-2.5 py-1.5 text-sm text-ink outline-none focus:border-brand'

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-3 sm:flex-row sm:items-center sm:flex-wrap">
      <div className="relative flex-1 min-w-[180px]">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search title or description…"
          className="w-full rounded-lg border border-line bg-paper py-1.5 pl-8 pr-3 text-sm text-ink outline-none focus:border-brand"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value as TaskFilters['category'] })}
        className={selectClass}
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value as TaskFilters['priority'] })}
        className={selectClass}
      >
        <option value="All">All priorities</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        value={filters.completion}
        onChange={(e) => onChange({ ...filters, completion: e.target.value as TaskFilters['completion'] })}
        className={selectClass}
      >
        <option value="All">All tasks</option>
        <option value="Active">Active only</option>
        <option value="Completed">Completed only</option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value as TaskFilters['sort'] })}
        className={selectClass}
      >
        <option value="deadline-asc">Soonest deadline first</option>
        <option value="deadline-desc">Latest deadline first</option>
        <option value="priority">Priority (High → Low)</option>
      </select>
    </div>
  )
}
