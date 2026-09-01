import type { Task } from '../types/task'
import { getCountdownLabel, getDeadlineStatus } from '../utils/deadline'

const STYLES: Record<string, string> = {
  overdue: 'bg-overdue-soft text-overdue',
  today: 'bg-today-soft text-today',
  tomorrow: 'bg-tomorrow-soft text-tomorrow',
  upcoming: 'bg-upcoming-soft text-upcoming',
  completed: 'bg-completed-soft text-completed',
}

interface StatusBadgeProps {
  task: Pick<Task, 'deadlineDate' | 'deadlineTime' | 'completed'>
}

/** Renders the "D-3" / "TODAY" / "+2D LATE" countdown chip used on every task card. */
export function StatusBadge({ task }: StatusBadgeProps) {
  const status = getDeadlineStatus(task)
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 font-mono text-xs font-semibold tracking-tight ${STYLES[status]}`}
    >
      {getCountdownLabel(task)}
    </span>
  )
}
