import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  accent?: 'brand' | 'overdue' | 'today' | 'completed'
}

const ACCENT: Record<string, string> = {
  brand: 'text-brand bg-brand-soft',
  overdue: 'text-overdue bg-overdue-soft',
  today: 'text-today bg-today-soft',
  completed: 'text-completed bg-completed-soft',
}

export function StatCard({ label, value, icon: Icon, accent = 'brand' }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-paper-raised p-4 shadow-sm">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${ACCENT[accent]}`}>
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </div>
      <div>
        <p className="font-mono text-xl font-semibold leading-none text-ink">{value}</p>
        <p className="mt-1 text-xs text-ink-soft">{label}</p>
      </div>
    </div>
  )
}
