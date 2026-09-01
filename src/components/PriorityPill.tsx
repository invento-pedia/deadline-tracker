import type { Priority } from '../types/task'

const STYLES: Record<Priority, string> = {
  High: 'border-overdue/30 text-overdue',
  Medium: 'border-today/30 text-today',
  Low: 'border-ink-soft/30 text-ink-soft',
}

export function PriorityPill({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STYLES[priority]}`}>
      {priority}
    </span>
  )
}
