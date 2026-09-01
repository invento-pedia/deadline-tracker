import type { DeadlineStatus, Task } from '../types/task'

/**
 * All deadline math lives here as small, pure functions (no side effects,
 * same input always gives the same output). That makes them trivial to
 * reason about and test, and keeps date logic out of components.
 */

/** Returns a Date representing the exact moment a task is due. */
export function getDeadlineDateTime(task: Pick<Task, 'deadlineDate' | 'deadlineTime'>): Date {
  const time = task.deadlineTime ?? '23:59'
  return new Date(`${task.deadlineDate}T${time}:00`)
}

/** Midnight today, used as the boundary for "today" / "overdue" comparisons. */
function startOfToday(): Date {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Whole number of calendar days between the deadline's date and today. */
export function daysUntil(task: Pick<Task, 'deadlineDate' | 'deadlineTime'>): number {
  const deadlineDay = startOfDay(getDeadlineDateTime(task))
  const today = startOfToday()
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((deadlineDay.getTime() - today.getTime()) / msPerDay)
}

/**
 * The single source of truth for a task's status. Called by every part of
 * the UI that needs to know if a task is overdue, due today, etc.
 */
export function getDeadlineStatus(task: Pick<Task, 'deadlineDate' | 'deadlineTime' | 'completed'>): DeadlineStatus {
  if (task.completed) return 'completed'

  const deadline = getDeadlineDateTime(task)
  const now = new Date()
  const days = daysUntil(task)

  if (deadline.getTime() < now.getTime()) return 'overdue'
  if (days === 0) return 'today'
  if (days === 1) return 'tomorrow'
  return 'upcoming'
}

export function isWithinNextDays(task: Task, days: number): boolean {
  if (task.completed) return false
  const d = daysUntil(task)
  return d >= 0 && d <= days
}

const STATUS_LABEL: Record<DeadlineStatus, string> = {
  overdue: 'Overdue',
  today: 'Due today',
  tomorrow: 'Due tomorrow',
  upcoming: 'Upcoming',
  completed: 'Completed',
}

export function getStatusLabel(status: DeadlineStatus): string {
  return STATUS_LABEL[status]
}

/** Short badge text, e.g. "D-3", "TODAY", "D+2 LATE" — the app's countdown-chip signature. */
export function getCountdownLabel(task: Pick<Task, 'deadlineDate' | 'deadlineTime' | 'completed'>): string {
  if (task.completed) return 'DONE'
  const days = daysUntil(task)
  const status = getDeadlineStatus(task)
  if (status === 'overdue') {
    return days === 0 ? 'LATE' : `+${Math.abs(days)}D LATE`
  }
  if (days === 0) return 'TODAY'
  if (days === 1) return 'TOMORROW'
  return `D-${days}`
}

export function formatDeadline(task: Pick<Task, 'deadlineDate' | 'deadlineTime'>): string {
  const date = getDeadlineDateTime(task)
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  if (!task.deadlineTime) return dateStr
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${dateStr} · ${timeStr}`
}
